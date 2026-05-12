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

<div
  class="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-lg overflow-hidden flex flex-col"
>
  <!-- Tabs -->
  <div class="relative w-full border-b border-base-content/10 group">
    {#if canScrollLeft}
      <button
        class="absolute left-0 top-0 bottom-0 z-10 px-2 flex items-center justify-center bg-gradient-to-r from-base-100 via-base-100/90 to-transparent transition-opacity"
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
      class="w-full overflow-x-auto scrollbar-hide relative"
      bind:this={tabsContainer}
      onscroll={checkScroll}
    >
      <div class="flex flex-nowrap px-4 md:px-10 pt-4 w-max min-w-full">
        {#each capabilities as tab, index}
          <button
            class="tab-button cursor-pointer flex-1 min-w-[200px] whitespace-normal py-4 px-2 text-center text-sm md:text-base transition-colors relative pb-5 {activeTab ===
            tab.id
              ? 'text-primary font-semibold'
              : 'text-base-content/60 hover:text-base-content/80'}"
            onclick={() => {
              activeTab = tab.id;
              activeItemIndex = 0;
              scrollTabToActive(index);
            }}
          >
            <span class="md:hidden">{tab.shortLabel || tab.label}</span>
            <span class="hidden md:inline">
              {activeTab === tab.id ? tab.label : tab.shortLabel || tab.label}
            </span>
            {#if activeTab === tab.id}
              <div class="absolute bottom-0 left-0 right-0 h-[3px] bg-primary/20"></div>
              <div
                class="absolute bottom-0 left-0 h-[3px] bg-primary animate-progress"
                style="--duration: {AUTOPLAY_INTERVAL_MS}ms;"
              ></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    {#if canScrollRight}
      <button
        class="absolute right-0 top-0 bottom-0 z-10 px-2 flex items-center justify-center bg-gradient-to-l from-base-100 via-base-100/90 to-transparent transition-opacity"
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

  <!-- Content Area -->
  <div class="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
    <!-- Left: Accordion -->
    <div class="flex flex-col gap-3">
      {#each capabilities.find((t) => t.id === activeTab)?.items || [] as item, index}
        <button
          class="relative cursor-pointer overflow-hidden text-left w-full px-6 py-4 rounded-xl border transition-all duration-300 {activeItemIndex ===
          index
            ? 'bg-base-100 border-base-content/10 shadow-sm'
            : 'border-base-content/5 bg-transparent hover:bg-base-200/30'}"
          onclick={() => (activeItemIndex = activeItemIndex === index ? -1 : index)}
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
        </button>
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

<style>
  @keyframes progress {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  .animate-progress {
    animation: progress var(--duration, 15s) linear forwards;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
