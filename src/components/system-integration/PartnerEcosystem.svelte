<script lang="ts">
  import { fade } from 'svelte/transition';
  import {
    Laptop,
    Network,
    ShieldCheck,
    Cloud,
    Database,
    Zap,
    Cctv,
    ChevronLeft,
    ChevronRight,
  } from '@lucide/svelte';

  interface Partner {
    name: string;
    logoSrc?: string;
  }

  interface EcosystemTab {
    title: string;
    subtitle: string;
    description?: string;
    partners: Partner[];
  }

  let { tabs = [] }: { tabs: EcosystemTab[] } = $props();

  let activeIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;
  let carouselContainer = $state<HTMLDivElement | null>(null);
  let tabsContainer = $state<HTMLDivElement | null>(null);

  function scrollTabToActive(index: number) {
    if (!tabsContainer) return;
    const buttons = tabsContainer.querySelectorAll<HTMLButtonElement>('button');
    const targetButton = buttons[index];
    if (!targetButton) return;

    const btnRect = targetButton.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    const scrollLeft =
      tabsContainer.scrollLeft +
      (btnRect.left - containerRect.left) -
      (containerRect.width - btnRect.width) / 2;

    tabsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }

  const iconMap: Record<string, any> = {
    'Compute & Mobility': Laptop,
    'Networking & Fabric': Network,
    Cybersecurity: ShieldCheck,
    'Cloud & Virtualization': Cloud,
    'Storage & Backup': Database,
    'Infra & Power': Zap,
    'Surveillance & AV': Cctv,
  };

  let ActiveIcon = $derived(iconMap[tabs[activeIndex]?.title] || Laptop);

  function startInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % tabs.length;
    }, 6000);
  }

  $effect(() => {
    startInterval();
    return () => {
      clearInterval(interval);
    };
  });

  // Handle auto-scroll and carousel reset on activeIndex changes
  $effect(() => {
    scrollTabToActive(activeIndex);
    if (carouselContainer) {
      carouselContainer.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
    }
  });

  function selectTab(index: number) {
    activeIndex = index;
    startInterval();
  }

  function scroll(direction: 'left' | 'right') {
    if (!carouselContainer) return;
    // Reset autoplay interval on interaction
    startInterval();
    const cardWidth = carouselContainer.firstElementChild?.clientWidth || 200;
    const gap = 16; // gap-4 is 16px
    const scrollAmount =
      direction === 'left' ? -(cardWidth + gap) * 2 : (cardWidth + gap) * 2;
    carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
</script>

<div class="w-full">
  <div class="max-w-4xl mb-12">
    <h2 class="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl text-base-content">
      <span class="text-2xl md:text-3xl lg:text-4xl font-medium">The</span>
      <span class="text-primary">HTIS Partner</span> Ecosystem
    </h2>
    <p class="text-lg md:text-xl text-base-content/70 leading-relaxed">
      We collaborate with a specialized list of global OEMs to deliver end-to-end IT
      excellence. This ecosystem ensures that every layer of your infrastructure, from the
      endpoint to the cloud, is powered by industry-leading technology.
    </p>
  </div>

  <!-- Unified Redesigned Card Container -->
  <div
    class="bg-base-100 dark:bg-base-200/40 border border-base-content/10 shadow-xl rounded-[2rem] p-6 md:p-10 relative"
  >
    <!-- Pills/Tabs at the top -->
    <div
      bind:this={tabsContainer}
      class="flex flex-nowrap gap-2.5 pb-6 border-b border-base-content/10 mb-8 overflow-x-auto no-scrollbar scroll-smooth w-full"
    >
      {#each tabs as tab, i}
        {@const TabIcon = iconMap[tab.title] || Laptop}
        <button
          onclick={() => selectTab(i)}
          class="flex items-center gap-2 px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border shrink-0 relative
            {activeIndex === i
            ? 'border-transparent shadow-md bg-primary text-primary-content'
            : 'bg-base-200/50 text-base-content/80 hover:bg-base-200 border-base-content/5'}"
        >
          <TabIcon class="h-4 w-4 shrink-0" />
          <span>{tab.title}</span>

          {#if activeIndex === i}
            <!-- Progress bar loader effect -->
            <div
              class="absolute bottom-0 left-0 h-[4px] bg-primary-content/85 animate-progress"
              style="--duration: 6000ms;"
            ></div>
            <!-- Downward pointing indicator arrow -->
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary z-10"
            ></div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Active Tab Content Area -->
    <div class="relative min-h-[220px]">
      {#key activeIndex}
        <div in:fade={{ duration: 300 }}>
          <!-- Subtitle and Description Row -->
          <div class="flex flex-col sm:flex-row items-start gap-5 md:gap-6 mb-8">
            <!-- Large Round Icon -->
            <div
              class="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 text-primary shrink-0 shadow-inner"
            >
              <ActiveIcon class="h-7 w-7 md:h-8 md:w-8" />
            </div>

            <!-- Title & Description -->
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-secondary mb-2">
                {tabs[activeIndex].subtitle}
              </h3>
              <div class="w-12 h-1 bg-primary rounded-full my-3"></div>
              <p class="text-base text-base-content/75 max-w-3xl leading-relaxed">
                {tabs[activeIndex].description ||
                  'High-performance, secure and scalable solutions powered by industry-leading technology.'}
              </p>
            </div>
          </div>

          <!-- Partners Carousel -->
          <div class="relative flex items-center w-full mt-6">
            <!-- Left Navigation Button -->
            <button
              onclick={() => scroll('left')}
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all hover:bg-primary hover:text-primary-content active:scale-95 shadow-sm cursor-pointer mr-2 hover:shadow-md"
              aria-label="Previous partners"
            >
              <ChevronLeft class="h-5 w-5" />
            </button>

            <!-- Carousel track/viewport -->
            <div
              bind:this={carouselContainer}
              class="flex-1 overflow-x-auto no-scrollbar scroll-smooth flex gap-4 py-2"
            >
              {#each tabs[activeIndex].partners as partner}
                <div
                  class="shrink-0 w-[170px] md:w-[210px] h-24 md:h-28 bg-base-100 dark:bg-base-300/40 border border-base-content/10 rounded-2xl shadow-xs flex items-center justify-center p-2 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:scale-[1.02] group"
                >
                  {#if partner.logoSrc}
                    <img
                      src={partner.logoSrc}
                      alt={partner.name}
                      class="max-h-16 md:max-h-20 max-w-[92%] object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
                    />
                  {:else}
                    <div
                      class="text-sm md:text-base font-bold text-secondary/80 dark:text-base-content/70 group-hover:text-primary transition-colors text-center uppercase tracking-wider font-sans px-2"
                    >
                      {partner.name}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>

            <!-- Right Navigation Button -->
            <button
              onclick={() => scroll('right')}
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all hover:bg-primary hover:text-primary-content active:scale-95 shadow-sm cursor-pointer ml-2 hover:shadow-md"
              aria-label="Next partners"
            >
              <ChevronRight class="h-5 w-5" />
            </button>
          </div>
        </div>
      {/key}
    </div>
  </div>
</div>
