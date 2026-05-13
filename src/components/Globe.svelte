<script lang="ts">
  import createGlobe, { type COBEOptions } from 'cobe';

  type GlobeConfig = Partial<COBEOptions>;

  let {
    className = '',
    config,
  }: {
    className?: string;
    config?: GlobeConfig;
  } = $props();

  let wrapperRef = $state<HTMLDivElement | undefined>(undefined);
  let canvasRef = $state<HTMLCanvasElement | undefined>(undefined);

  const MOVEMENT_DAMPING = 1400;
  const FALLBACK_SIZE = 400;
  const ROTATION_STEP = 0.005;
  const SPRING_DAMPING = 0.08;
  const INTERNAL_SCALE = 2;

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
    markers: [
      { location: [14.5995, 120.9842], size: 0.03 },
      { location: [19.076, 72.8777], size: 0.06 },
      { location: [23.8103, 90.4125], size: 0.03 },
      { location: [30.0444, 31.2357], size: 0.04 },
      { location: [39.9042, 116.4074], size: 0.05 },
      { location: [-23.5505, -46.6333], size: 0.06 },
      { location: [19.4326, -99.1332], size: 0.06 },
      { location: [40.7128, -74.006], size: 0.06 },
      { location: [34.6937, 135.5022], size: 0.03 },
      { location: [41.0082, 28.9784], size: 0.03 },
    ],
  };

  // Pointer interaction state (plain variables — no reactivity needed)
  let pointerInteracting: number | null = null;
  let phi = 0;
  let size = $state(FALLBACK_SIZE);

  // Spring-like value for smooth drag interaction
  let r = 0;
  let springR = 0;
  let isDarkMode = false;

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
    if (canvasRef) {
      canvasRef.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting !== null) {
      const delta = clientX - pointerInteracting;
      r += delta / MOVEMENT_DAMPING;
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
      markers: config?.markers ?? GLOBE_CONFIG.markers,
      arcs: config?.arcs ?? GLOBE_CONFIG.arcs,
    };
    phi = actualConfig.phi ?? 0;

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
      width: size * INTERNAL_SCALE,
      height: size * INTERNAL_SCALE,
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

      globe.update({
        phi: phi + springR,
        width: size * INTERNAL_SCALE,
        height: size * INTERNAL_SCALE,
        dark: config?.dark ?? (isDarkMode ? 1 : 0),
      });

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
  class={`absolute inset-0 m-auto ${className}`}
  style={`width: ${size}px; height: ${size}px;`}
>
  <canvas
    bind:this={canvasRef}
    class="size-full cursor-grab touch-none opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
    onpointerdown={(e) => {
      pointerInteracting = e.clientX;
      updatePointerInteraction(e.clientX);
    }}
    onpointerup={() => updatePointerInteraction(null)}
    onpointercancel={() => updatePointerInteraction(null)}
    onpointerout={() => updatePointerInteraction(null)}
    onpointermove={(e) => updateMovement(e.clientX)}
    ontouchmove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
  ></canvas>
</div>
