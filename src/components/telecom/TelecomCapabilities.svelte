<script lang="ts">
  import { untrack } from 'svelte';
  import { slide, fly, fade } from 'svelte/transition';
  import { CirclePlus, CircleMinus, ChevronLeft, ChevronRight } from '@lucide/svelte';
  import type { CapabilityTab } from '~/data/pageDataTelecom';

  let {
    capabilities = [],
    images = [],
  }: { capabilities?: CapabilityTab[]; images?: string[] } = $props();

  let activeTab = $state(
    untrack(() => (capabilities.length > 0 ? capabilities[0].id : '')),
  );
  let activeItemIndex = $state(0);
  let tabsContainer: HTMLElement | undefined = $state();

  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  let currentImage = $derived(
    images.length > 0 && capabilities.length > 0
      ? images[capabilities.findIndex((c) => c.id === activeTab) % images.length] ||
          images[0]
      : '',
  );

  // -- Constants --
  const AUTOPLAY_INTERVAL_MS = 15000;

  // -- Effects --
  $effect(() => {
    // Read state synchronously to create dependencies,
    // ensuring user interactions reset the timer.
    activeTab;

    const intervalId = setInterval(() => {
      const currentTabIndex = capabilities.findIndex((t) => t.id === activeTab);
      if (currentTabIndex === -1) return;

      const nextTabIndex = (currentTabIndex + 1) % capabilities.length;
      activeTab = capabilities[nextTabIndex].id;
      activeItemIndex = 0;
      scrollTabToActive(nextTabIndex);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(intervalId);
  });

  function checkScroll() {
    if (!tabsContainer) return;
    canScrollLeft = tabsContainer.scrollLeft > 0;
    // Use a small tolerance of 1px for float rounding issues
    canScrollRight =
      Math.ceil(tabsContainer.scrollLeft + tabsContainer.clientWidth) <
      tabsContainer.scrollWidth - 1;
  }

  $effect(() => {
    if (tabsContainer) {
      checkScroll();
      const observer = new ResizeObserver(() => checkScroll());
      observer.observe(tabsContainer);
      return () => observer.disconnect();
    }
  });

  // -- Handlers --
  function scrollTabToActive(index: number) {
    if (!tabsContainer) return;
    const tabs = tabsContainer.querySelectorAll<HTMLElement>('.tab-button');
    const targetTab = tabs[index];
    if (!targetTab) return;

    const tabRect = targetTab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    const scrollLeft =
      tabsContainer.scrollLeft +
      (tabRect.left - containerRect.left) -
      (containerRect.width - tabRect.width) / 2;

    tabsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }
</script>

<div class="w-full" role="region" aria-label="Telecom Capabilities">
  <!-- Tabs Navigation -->
  <div
    class="relative w-full bg-base-100/60 backdrop-blur-md rounded-2xl border border-base-content/10 p-2 mb-6 group"
  >
    {#if canScrollLeft}
      <button
        class="absolute left-1 top-1 bottom-1 z-10 px-2 flex items-center justify-center bg-gradient-to-r from-base-100 via-base-100/90 to-transparent transition-opacity rounded-l-xl"
        onclick={() => {
          if (tabsContainer) tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
        }}
        transition:fade={{ duration: 150 }}
        aria-label="Scroll left"
      >
        <div
          class="bg-primary text-primary-content rounded-full p-1.5 shadow-md hover:scale-105 transition-transform"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </div>
      </button>
    {/if}

    <div
      class="w-full overflow-x-auto no-scrollbar relative"
      bind:this={tabsContainer}
      onscroll={checkScroll}
    >
      <div class="flex flex-nowrap gap-2 w-max lg:w-full min-w-full justify-start px-1">
        {#each capabilities as tab, index}
          <button
            class="tab-button cursor-pointer flex-1 min-w-[140px] md:min-w-[160px] lg:min-w-0 px-6 py-4 rounded-xl font-medium transition-all duration-300 text-sm md:text-xl text-center select-none overflow-hidden relative
              {activeTab === tab.id
              ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-[1.02]'
              : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'}"
            onclick={() => {
              activeTab = tab.id;
              activeItemIndex = 0;
              scrollTabToActive(index);
            }}
          >
            <span class="relative z-10">{tab.shortLabel || tab.label}</span>
            {#if activeTab === tab.id}
              <span
                class="absolute bottom-0 left-0 h-[6px] bg-primary-content/85 animate-progress block"
                style="--duration: {AUTOPLAY_INTERVAL_MS}ms;"
              ></span>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    {#if canScrollRight}
      <button
        class="absolute right-1 top-1 bottom-1 z-10 px-2 flex items-center justify-center bg-linear-to-l from-base-100 via-base-100/90 to-transparent transition-opacity rounded-r-xl"
        onclick={() => {
          if (tabsContainer) tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
        }}
        transition:fade={{ duration: 150 }}
        aria-label="Scroll right"
      >
        <div
          class="bg-primary text-primary-content rounded-full p-1.5 shadow-md hover:scale-105 transition-transform"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </div>
      </button>
    {/if}
  </div>

  <!-- Content Container (Card Area) -->
  <div
    class="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-lg overflow-hidden p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6"
  >
    {#if capabilities.find((t) => t.id === activeTab)}
      <h3
        class="lg:col-span-2 text-2xl md:text-3xl font-medium text-base-content tracking-tight mb-2 md:mb-4"
      >
        {capabilities.find((t) => t.id === activeTab)?.label}
      </h3>
    {/if}

    <!-- Left: Accordion -->
    <div class="flex flex-col gap-3">
      {#each capabilities.find((t) => t.id === activeTab)?.items || [] as item, index}
        <div
          role="button"
          tabindex="0"
          class="relative cursor-pointer overflow-hidden text-left w-full px-6 py-4 rounded-xl border transition-all duration-300 {activeItemIndex ===
          index
            ? 'bg-base-100 border-base-content/10 shadow-sm'
            : 'border-base-content/5 bg-transparent hover:bg-base-200/30'}"
          onclick={() => (activeItemIndex = activeItemIndex === index ? -1 : index)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              activeItemIndex = activeItemIndex === index ? -1 : index;
            }
          }}
        >
          <div class="relative z-10 flex justify-between items-center w-full">
            <h4
              class="text-base md:text-lg pr-4 {activeItemIndex === index
                ? 'text-base-content font-medium'
                : 'text-base-content/80'}"
            >
              {item.title}
            </h4>
            <div class="text-base-content/50 shrink-0">
              {#if activeItemIndex === index}
                <CircleMinus size={20} />
              {:else}
                <CirclePlus size={20} />
              {/if}
            </div>
          </div>
          {#if activeItemIndex === index}
            <div transition:slide={{ duration: 300 }} class="relative z-10 mt-2">
              <p class="text-base-content/60 text-sm pb-1">{item.desc}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Right: Image -->
    <div
      class="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-2xl overflow-hidden flex items-center justify-center bg-base-100"
    >
      {#key activeTab}
        {#if currentImage}
          <img
            src={currentImage}
            alt={capabilities.find((t) => t.id === activeTab)?.label}
            class="w-full h-full object-contain object-center p-4"
            in:fly={{ y: 10, duration: 400 }}
          />
        {/if}
      {/key}
    </div>
  </div>
</div>
