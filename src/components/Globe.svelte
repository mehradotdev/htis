<script lang="ts">
  import { untrack } from 'svelte';
  import createGlobe, { type COBEOptions } from 'cobe';

  type GlobeConfig = Partial<COBEOptions>;

  interface MarkerLabel {
    location: [number, number];
    size: number;
    name: string;
    detail: string;
  }

  let {
    className = '',
    config,
    expandable = true,
  }: {
    className?: string;
    config?: GlobeConfig;
    expandable?: boolean;
  } = $props();

  let wrapperRef = $state<HTMLDivElement | undefined>(undefined);
  let canvasRef = $state<HTMLCanvasElement | undefined>(undefined);

  const MOVEMENT_DAMPING = 400;
  const FALLBACK_SIZE = 400;
  const ROTATION_STEP = 0.005;
  const SPRING_DAMPING = 0.15;
  const INTERNAL_SCALE = 2;

  // Marker data with labels
  const LABELED_MARKERS: MarkerLabel[] = [
    {
      location: [28.4595, 77.0266],
      size: 0.07,
      name: 'India',
      detail: 'HTIS Tower, Cyber City, Gurugram 122002',
    },
    {
      location: [23.8103, 90.4125],
      size: 0.04,
      name: 'Bangladesh',
      detail: 'Gulshan-2, Dhaka 1212',
    },
    {
      location: [6.9271, 79.8612],
      size: 0.04,
      name: 'Sri Lanka',
      detail: 'World Trade Center, Colombo 01',
    },
    {
      location: [-26.2041, 28.0473],
      size: 0.05,
      name: 'South Africa',
      detail: 'Sandton City, Johannesburg 2196',
    },
    {
      location: [51.5074, -0.1278],
      size: 0.05,
      name: 'United Kingdom',
      detail: '30 St Mary Axe, London EC3A 8BF',
    },
    {
      location: [6.5244, 3.3792],
      size: 0.04,
      name: 'Nigeria',
      detail: 'Victoria Island, Lagos 101241',
    },
  ];

  const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.5,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [0.5, 0.5, 0.5],
    markerElevation: 0.0,
    // No cobe dot markers — we use HTML labels instead
    markers: [],
  };

  // Pointer interaction state (plain variables — no reactivity needed)
  let pointerInteracting: number | null = null;
  let phi = 0;
  let size = $state(FALLBACK_SIZE);

  // Spring-like value for smooth drag interaction
  let r = 0;
  let springR = 0;
  let isDarkMode = false;

  // Track which label is expanded
  let expandedIndex = $state<number | null>(null);

  // Label refs for direct DOM manipulation (avoids $state per-frame reactivity cost)
  let labelEls: HTMLElement[] = [];

  /**
   * Project lat/lng to 2D using cobe's EXACT coordinate system.
   * Reverse-engineered from cobe source: functions U() and O().
   *
   * U([lat, lng]):
   *   latRad = lat * PI / 180
   *   lngRad = lng * PI / 180 - PI
   *   return [-cos(latRad)*cos(lngRad), sin(latRad), cos(latRad)*sin(lngRad)]
   *
   * O(point3d) with f=phi, l=theta, B=scale=1, T=offset=[0,0]:
   *   c = cos(phi)*point[0] + sin(phi)*point[2]
   *   s = sin(phi)*sin(theta)*point[0] + cos(theta)*point[1] - cos(phi)*sin(theta)*point[2]
   *   screenX = (c + 1) / 2   (when scale=1, offset=0, aspect=1)
   *   screenY = (-s + 1) / 2
   *   visible = -sin(phi)*cos(theta)*point[0] + sin(theta)*point[1] + cos(phi)*cos(theta)*point[2] >= 0
   */
  function projectMarkerCobe(
    lat: number,
    lng: number,
    currentPhi: number,
    theta: number,
    globeSize: number,
  ): { x: number; y: number; visible: boolean } {
    // Step 1: cobe's U() — convert lat/lng to 3D point on unit sphere
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180 - Math.PI;
    const cosLat = Math.cos(latRad);
    const px = -cosLat * Math.cos(lngRad);
    const py = Math.sin(latRad);
    const pz = cosLat * Math.sin(lngRad);

    // Step 2: cobe's O() — project 3D to 2D screen coordinates
    const cosPhi = Math.cos(currentPhi);
    const sinPhi = Math.sin(currentPhi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    // Apply marker elevation (same as cobe: multiply point by (0.8 + elevation))
    const elevation = 0.8; // cobe's ee constant
    const markerElev = GLOBE_CONFIG.markerElevation ?? 0.05;
    const radius = elevation + markerElev;
    const ex = px * radius;
    const ey = py * radius;
    const ez = pz * radius;

    const c = cosPhi * ex + sinPhi * ez;
    const s = sinPhi * sinTheta * ex + cosTheta * ey - cosPhi * sinTheta * ez;

    // Scale=1, offset=0, aspect ratio = 1 (square canvas)
    const screenX = (c + 1) / 2;
    const screenY = (-s + 1) / 2;

    // Visibility: front-hemisphere check from cobe
    const zCheck =
      -sinPhi * cosTheta * ex + sinTheta * ey + cosPhi * cosTheta * ez;
    const visible = zCheck >= 0;

    return {
      x: screenX * globeSize,
      y: screenY * globeSize,
      visible,
    };
  }

  function toggleLabel(index: number) {
    if (!expandable) return;
    expandedIndex = expandedIndex === index ? null : index;
  }

  $effect(() => {
    const updateTheme = () => {
      isDarkMode =
        document.documentElement.getAttribute('data-theme') === 'htis-theme-dark';
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting = value;
    if (wrapperRef) {
      wrapperRef.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting !== null) {
      const delta = clientX - pointerInteracting;
      r += delta / MOVEMENT_DAMPING;
      pointerInteracting = clientX;
    }
  };

  $effect(() => {
    const wrapper = wrapperRef;
    const canvas = canvasRef;
    if (!wrapper || !canvas) return;

    const actualConfig: COBEOptions = {
      ...GLOBE_CONFIG,
      ...config,
      dark: config?.dark ?? (isDarkMode ? 1 : 0),
      markers: GLOBE_CONFIG.markers,
    };
    phi = actualConfig.phi ?? 0;
    const thetaVal = actualConfig.theta ?? 0.3;

    const maxSize = actualConfig.width || 600;

    const updateSize = () => {
      let parent = wrapper.parentElement;
      // Astro injects an <astro-island> wrapper for hydrated components (like client:visible).
      // Since it often reports a clientWidth of 0, we bypass it to measure the actual parent div.
      if (parent && parent.tagName.toLowerCase() === 'astro-island') {
        parent = parent.parentElement;
      }

      if (!parent) {
        size = FALLBACK_SIZE;
        return;
      }

      size = Math.min(parent.clientWidth, maxSize) || FALLBACK_SIZE;
    };

    updateSize();

    const globe = createGlobe(canvas, {
      ...actualConfig,
      width: untrack(() => size) * INTERNAL_SCALE,
      height: untrack(() => size) * INTERNAL_SCALE,
    });

    const resizeObserver = new ResizeObserver(updateSize);

    let observerTarget = wrapper.parentElement;
    if (observerTarget && observerTarget.tagName.toLowerCase() === 'astro-island') {
      observerTarget = observerTarget.parentElement;
    }
    resizeObserver.observe(observerTarget ?? wrapper);

    let frameId = 0;

    const render = () => {
      if (pointerInteracting === null) {
        phi += ROTATION_STEP;
      }

      springR += (r - springR) * SPRING_DAMPING;

      const currentPhi = phi + springR;

      globe.update({
        phi: currentPhi,
        width: size * INTERNAL_SCALE,
        height: size * INTERNAL_SCALE,
        dark: config?.dark ?? (isDarkMode ? 1 : 0),
      });

      // Update label positions via direct DOM manipulation (no $state per frame)
      for (let i = 0; i < LABELED_MARKERS.length; i++) {
        const el = labelEls[i];
        if (!el) continue;

        const marker = LABELED_MARKERS[i];
        const pos = projectMarkerCobe(
          marker.location[0],
          marker.location[1],
          currentPhi,
          thetaVal,
          size,
        );

        if (pos.visible) {
          el.style.left = `${pos.x}px`;
          el.style.top = `${pos.y}px`;
          el.style.display = 'flex';
          el.style.opacity = '1';
        } else {
          el.style.display = 'none';
          el.style.opacity = '0';
        }
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    setTimeout(() => {
      if (canvas) canvas.style.opacity = '1';
    }, 0);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      globe.destroy();
    };
  });
</script>

<div
  bind:this={wrapperRef}
  class={`absolute inset-0 m-auto cursor-grab touch-none ${className}`}
  style={`width: ${size}px; height: ${size}px;`}
  role="img"
  aria-label="Interactive globe showing HTIS office locations"
  onpointerdown={(e) => {
    pointerInteracting = e.clientX;
    updatePointerInteraction(e.clientX);
  }}
  onpointerup={() => updatePointerInteraction(null)}
  onpointercancel={() => updatePointerInteraction(null)}
  onpointerout={() => updatePointerInteraction(null)}
  onpointermove={(e) => updateMovement(e.clientX)}
  ontouchmove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
>
  <canvas
    bind:this={canvasRef}
    class="size-full cursor-grab touch-none opacity-0 transition-opacity duration-500 contain-[layout_paint_size] pointer-events-none"
  ></canvas>

  <!-- Interactive marker labels -->
  {#each LABELED_MARKERS as marker, i}
    {@const isExpanded = expandedIndex === i}
    <button
      bind:this={labelEls[i]}
      class="globe-marker"
      class:expanded={isExpanded}
      style="display: none;"
      onclick={() => toggleLabel(i)}
      aria-label={`${marker.name}: ${marker.detail}`}
      aria-expanded={isExpanded}
    >
      <!-- Small connecting dot -->
      <span class="marker-dot"></span>

      <!-- Label badge — always visible, shows country name -->
      <span class="marker-badge">
        <span class="marker-name">{marker.name}</span>
      </span>

      <!-- Expanded detail panel -->
      {#if isExpanded}
        <span class="marker-detail">
          {marker.detail}
        </span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .globe-marker {
    position: absolute;
    transform: translate(-50%, -100%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    pointer-events: none;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  /* The connecting dot at the bottom of the label */
  .marker-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: oklch(0.45 0.03 264.542);
    margin-top: 2px;
    flex-shrink: 0;
    box-shadow: 0 0 4px oklch(0.45 0.03 264.542 / 0.4);
    transition: all 0.25s ease;
    pointer-events: auto;
  }

  .expanded .marker-dot {
    background: oklch(0.588 0.158 241.966);
    box-shadow: 0 0 8px oklch(0.588 0.158 241.966 / 0.5);
  }

  /* The name badge — always visible */
  .marker-badge {
    display: flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 4px;
    background: oklch(0.45 0.03 264.542 / 0.85);
    backdrop-filter: blur(6px);
    box-shadow:
      0 2px 6px oklch(0 0 0 / 0.12),
      0 0 0 1px oklch(0 0 0 / 0.05);
    transition: all 0.25s ease;
    pointer-events: auto;
  }

  .expanded .marker-badge {
    background: oklch(0.588 0.158 241.966 / 0.92);
    border-radius: 4px 4px 0 0;
  }

  .marker-name {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: white;
    line-height: 1;
    font-family: system-ui, -apple-system, sans-serif;
  }

  /* Expanded detail panel below the badge */
  .marker-detail {
    display: block;
    padding: 4px 8px 5px;
    border-radius: 0 0 4px 4px;
    background: oklch(0.588 0.158 241.966 / 0.82);
    backdrop-filter: blur(6px);
    font-size: 9px;
    font-weight: 500;
    color: oklch(0.95 0.01 264.542);
    line-height: 1.3;
    font-family: system-ui, -apple-system, sans-serif;
    box-shadow: 0 3px 8px oklch(0 0 0 / 0.1);
    animation: label-expand 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes label-expand {
    from {
      opacity: 0;
      transform: translateY(-4px) scaleY(0.6);
    }
    to {
      opacity: 1;
      transform: translateY(0) scaleY(1);
    }
  }
</style>
