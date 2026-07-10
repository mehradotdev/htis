<script lang="ts">
  import { MapPin, Phone, Mail, Globe } from '@lucide/svelte';
  import type * as LType from 'leaflet';
  import CmsRichTextSvelte from '~/components/CmsRichTextSvelte.svelte';
  import { renderCmsInlineMarkdown } from '~/utils/cmsMarkdown';

  interface Location {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    lat: number;
    lng: number;
    isHQ?: boolean;
  }

  interface Props {
    sectionId?: string;
    title: string;
    description: string;
    globalTabLabel: string;
    indiaTabLabel: string;
    globalLocations: Location[];
    indiaOffices: Location[];
  }

  let {
    sectionId,
    title,
    description,
    globalTabLabel,
    indiaTabLabel,
    globalLocations,
    indiaOffices,
  }: Props = $props();

  let mapContainer = $state<HTMLDivElement | null>(null);
  let map: LType.Map | null = null;
  let L: typeof LType | null = null;
  let activeTab = $state<'global' | 'india'>('global');
  let selectedLocation = $state<Location | null>(null);
  let markersList: { loc: Location; marker: LType.Marker }[] = [];
  let tileLayer: LType.TileLayer | null = null;

  // Dynamic initialization inside $effect to avoid server-side Leaflet window/document execution
  $effect(() => {
    if (!mapContainer) return;

    let isDestroyed = false;
    let observer: MutationObserver | null = null;

    const initMap = async () => {
      const leaflet = await import('leaflet');
      if (isDestroyed) return;
      const LInst = leaflet.default || leaflet;
      L = LInst;

      // Create map instance centered at a neutral coordinate
      map = LInst.map(mapContainer!, {
        center: [20, 15],
        zoom: 2,
        minZoom: 1.5,
        maxZoom: 18,
        scrollWheelZoom: true, // Pinch-to-zoom and scroll-to-zoom enabled as per user feedback
      });

      // Close all tooltips when clicking on the map canvas
      map.on('click', () => {
        closeAllTooltips();
      });

      const getTileUrl = (isDark: boolean) =>
        isDark
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      const getAttribution = () =>
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>';

      const checkIsDark = () =>
        document.documentElement.getAttribute('data-theme') === 'htis-theme-dark';

      // Load theme-aware tile layer
      let isDark = checkIsDark();
      tileLayer = LInst.tileLayer(getTileUrl(isDark), {
        attribution: getAttribution(),
      }).addTo(map);

      // Watch for data-theme changes to swap tile layer
      observer = new MutationObserver(() => {
        if (!map || !LInst) return;
        const currentDark = checkIsDark();
        if (tileLayer) {
          map.removeLayer(tileLayer);
        }
        tileLayer = LInst.tileLayer(getTileUrl(currentDark), {
          attribution: getAttribution(),
        }).addTo(map);
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      // Populate initial markers
      renderMarkers();
    };

    initMap();

    return () => {
      isDestroyed = true;
      if (observer) {
        observer.disconnect();
      }
      if (map) {
        map.remove();
        map = null;
      }
      L = null;
      markersList = [];
    };
  });

  // Track activeTab changes to refresh markers and re-zoom map
  $effect(() => {
    const _ = activeTab;
    if (map && L) {
      renderMarkers();
    }
  });

  function createCustomIcon(isHQ?: boolean) {
    const mainClass = isHQ ? 'presence-marker-hq' : 'presence-marker-office';
    const pulseClass = isHQ ? 'presence-marker-hq-pulse' : 'presence-marker-office-pulse';
    return L!.divIcon({
      className: 'custom-presence-marker',
      html: `
        <div class="relative flex items-center justify-center h-8 w-8">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${pulseClass}"></span>
          <span class="relative inline-flex rounded-full h-4.5 w-4.5 ${mainClass} border-2 border-base-100 shadow-xs"></span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      tooltipAnchor: [0, -12],
    });
  }

  function closeAllTooltips() {
    markersList.forEach(({ marker }) => {
      marker.closeTooltip();
    });
  }

  function renderMarkers() {
    if (!map || !L) return;

    // Clear existing markers
    markersList.forEach(({ marker }) => {
      map!.removeLayer(marker);
    });
    markersList = [];

    const currentList = activeTab === 'global' ? globalLocations : indiaOffices;

    currentList.forEach((loc) => {
      const marker = L!.marker([loc.lat, loc.lng], {
        icon: createCustomIcon(loc.isHQ),
      });

      // Toast-styled tooltip structure with high font sizes and higher color contrast
      const tooltipHtml = `
        <div class="flex flex-col gap-1.5 text-left min-w-[220px] max-w-[290px]">
          <div class="text-sm font-extrabold text-primary flex items-center justify-between gap-2 leading-tight">
            <span>📍 ${renderCmsInlineMarkdown(loc.name)}</span>
            ${loc.isHQ ? '<span class="px-2 py-0.5 rounded-md bg-primary text-primary-content text-[9px] uppercase font-bold tracking-wider shrink-0">HQ</span>' : ''}
          </div>
          <div class="text-sm text-base-content font-medium leading-relaxed mt-0.5">
            ${renderCmsInlineMarkdown(loc.address)}
          </div>
          ${loc.phone ? `<div class="text-xs text-base-content/90 mt-1 flex items-center gap-1 font-sans"><strong>Phone:</strong> ${renderCmsInlineMarkdown(loc.phone)}</div>` : ''}
          ${loc.email ? `<div class="text-xs text-base-content/90 flex items-center gap-1 font-sans"><strong>Email:</strong> ${renderCmsInlineMarkdown(loc.email)}</div>` : ''}
        </div>
      `;

      marker.bindTooltip(tooltipHtml, {
        permanent: false,
        direction: 'top',
        className: 'presence-tooltip',
        opacity: 1.0,
      });

      marker.on('click', (e) => {
        // Prevent map click listener from firing immediately and closing the tooltip
        if (e.originalEvent) {
          e.originalEvent.stopPropagation();
        }

        selectedLocation = loc;
        map!.setView([loc.lat, loc.lng], activeTab === 'global' ? 4 : 7, {
          animate: true,
          duration: 0.8,
        });

        closeAllTooltips();
        marker.openTooltip();
      });

      marker.addTo(map!);
      markersList.push({ loc, marker });
    });

    // Auto center map depending on activeTab
    if (activeTab === 'global') {
      map.setView([20, 15], 2, { animate: true });
    } else {
      // Zoom in to India Offices
      map.setView([22.5, 78.5], 5, { animate: true });
    }
  }

  function selectLocation(loc: Location) {
    selectedLocation = loc;
    if (map && L) {
      map.setView([loc.lat, loc.lng], activeTab === 'global' ? 4 : 7, {
        animate: true,
        duration: 0.8,
      });

      // Close all other tooltips first
      closeAllTooltips();

      // Find marker and trigger tooltip display
      const match = markersList.find((m) => m.loc.name === loc.name);
      if (match) {
        match.marker.openTooltip();
      }
    }
  }
</script>

<section id={sectionId} class="relative overflow-hidden bg-base-200/20 py-16 md:py-24">
  <!-- Subtle aesthetic background glow -->
  <div
    class="absolute -right-40 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
  ></div>
  <div
    class="absolute -left-40 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"
  ></div>

  <div class="container mx-auto px-6">
    <!-- Header -->
    <div class="mb-12 text-center">
      <CmsRichTextSvelte
        value={title}
        tag="h2"
        className="text-3xl font-extrabold tracking-tight text-base-content md:text-4xl"
      />
      <div class="mx-auto mt-4 h-1.5 w-20 rounded-full bg-primary"></div>
      <CmsRichTextSvelte
        value={description}
        tag="p"
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-base-content/85 md:text-lg"
      />
    </div>

    <!-- Map & Dashboard Interface -->
    <div
      class="grid grid-cols-1 overflow-hidden rounded-3xl border border-base-200/60 bg-base-100 shadow-md lg:grid-cols-12"
    >
      <!-- Side Navigation Panel -->
      <div
        class="flex flex-col border-b border-base-200/60 lg:col-span-4 lg:border-r lg:border-b-0"
      >
        <!-- Tabs -->
        <div class="grid grid-cols-2 bg-base-200/35 p-2 border-b border-base-200/50">
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 cursor-pointer {activeTab ===
            'global'
              ? 'bg-base-100 text-primary shadow-sm'
              : 'text-base-content/75'}"
            onclick={() => {
              activeTab = 'global';
              selectedLocation = null;
            }}
          >
            <Globe class="h-4 w-4" />
            <CmsRichTextSvelte value={globalTabLabel} />
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 cursor-pointer {activeTab ===
            'india'
              ? 'bg-base-100 text-primary shadow-sm'
              : 'text-base-content/75'}"
            onclick={() => {
              activeTab = 'india';
              selectedLocation = null;
            }}
          >
            <MapPin class="h-4 w-4" />
            <CmsRichTextSvelte value={indiaTabLabel} />
          </button>
        </div>

        <!-- Scrollable Locations List -->
        <div class="flex-1 max-h-[350px] overflow-y-auto p-4 space-y-2 lg:max-h-[520px]">
          {#each activeTab === 'global' ? globalLocations : indiaOffices as loc}
            <button
              type="button"
              class="w-full text-left p-4 rounded-2xl border transition-all duration-300 hover:bg-base-200/40 hover:border-primary/20 flex flex-col gap-2.5 cursor-pointer group {selectedLocation?.name ===
              loc.name
                ? 'border-primary/30 bg-primary/5'
                : 'border-base-200/60'}"
              onclick={() => selectLocation(loc)}
            >
              <div class="flex items-start justify-between gap-2">
                <span
                  class="font-bold text-base-content group-hover:text-primary transition-colors text-base md:text-lg {selectedLocation?.name ===
                  loc.name
                    ? 'text-primary'
                    : ''}"
                >
                  <CmsRichTextSvelte value={loc.name} />
                </span>
                {#if loc.isHQ}
                  <span
                    class="badge badge-primary badge-sm shrink-0 text-[10px] uppercase font-bold tracking-wider px-2"
                    >HQ</span
                  >
                {/if}
              </div>

              <div
                class="flex items-start gap-2 text-sm text-base-content/90 font-medium leading-relaxed"
              >
                <MapPin
                  class="h-4 w-4 mt-0.5 shrink-0 text-base-content/50 group-hover:text-primary transition-colors"
                />
                <CmsRichTextSvelte value={loc.address} tag="p" className="line-clamp-2" />
              </div>

              {#if loc.phone || loc.email}
                <div
                  class="border-t border-base-200/50 pt-2 mt-1 grid grid-cols-1 gap-1.5"
                >
                  {#if loc.phone}
                    <div
                      class="flex items-center gap-2 text-xs text-base-content/85 font-medium"
                    >
                      <Phone class="h-3.5 w-3.5 text-base-content/50" />
                      <CmsRichTextSvelte value={loc.phone} />
                    </div>
                  {/if}
                  {#if loc.email}
                    <div
                      class="flex items-center gap-2 text-xs text-base-content/85 font-medium"
                    >
                      <Mail class="h-3.5 w-3.5 text-base-content/50" />
                      <CmsRichTextSvelte value={loc.email} />
                    </div>
                  {/if}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Map Display Canvas -->
      <div class="relative min-h-[400px] lg:col-span-8 lg:min-h-[580px] flex flex-col">
        <!-- Leaflet Map Container -->
        <div
          bind:this={mapContainer}
          class="flex-1 w-full z-10 min-h-[400px] lg:min-h-[580px]"
        ></div>
      </div>
    </div>
  </div>
</section>
