<script lang="ts">
  import { untrack } from 'svelte';
  import { slide, fly } from 'svelte/transition';
  import type { CapabilityTab } from '~/data/pageData';

  let { capabilities = [], images = [] }: { capabilities?: CapabilityTab[], images?: string[] } = $props();
  
  let activeTab = $state(untrack(() => capabilities.length > 0 ? capabilities[0].id : ''));
  let activeItemIndex = $state(0);
  let tabsContainer: HTMLElement | undefined = $state();
  
  let currentImage = $derived(
    images.length > 0 && capabilities.length > 0
      ? images[capabilities.findIndex(c => c.id === activeTab) % images.length] || images[0]
      : ''
  );

  // -- Constants --
  const AUTOPLAY_INTERVAL_MS = 5000;

  // -- Effects --
  $effect(() => {
    // Read state synchronously to create dependencies,
    // ensuring user interactions reset the timer.
    activeTab;
    activeItemIndex;
    
    const intervalId = setInterval(() => {
      const currentTabIndex = capabilities.findIndex(t => t.id === activeTab);
      if (currentTabIndex === -1) return;
      
      const currentItems = capabilities[currentTabIndex].items || [];
      
      if (activeItemIndex < currentItems.length - 1) {
        // Move to next item in current tab
        activeItemIndex++;
      } else {
        // Move to next tab and reset item index
        const nextTabIndex = (currentTabIndex + 1) % capabilities.length;
        activeTab = capabilities[nextTabIndex].id;
        activeItemIndex = 0;
        scrollTabToActive(nextTabIndex);
      }
    }, AUTOPLAY_INTERVAL_MS);
    
    return () => clearInterval(intervalId);
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

<div class="bg-base-100/50 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-lg overflow-hidden flex flex-col">
  <!-- Tabs -->
  <div class="border-b border-base-content/10 w-full overflow-x-auto scrollbar-hide" bind:this={tabsContainer}>
    <div class="flex flex-nowrap px-4 md:px-10 pt-4 w-max min-w-full">
      {#each capabilities as tab, index}
        <button 
          class="tab-button flex-1 min-w-[200px] whitespace-normal py-4 px-2 text-center text-sm md:text-base transition-colors relative pb-5 {activeTab === tab.id ? 'text-primary font-semibold' : 'text-base-content/60 hover:text-base-content/80'}"
          onclick={() => { activeTab = tab.id; activeItemIndex = 0; scrollTabToActive(index); }}
        >
          {tab.label}
          {#if activeTab === tab.id}
            <div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-[3px] bg-primary rounded-t-md"></div>
          {/if}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Content Area -->
  <div class="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
    <!-- Left: Accordion -->
    <div class="flex flex-col gap-3">
      {#each capabilities.find(t => t.id === activeTab)?.items || [] as item, index}
        <button 
          class="relative overflow-hidden text-left w-full px-6 py-4 rounded-xl border transition-all duration-300 {activeItemIndex === index ? 'bg-base-100 border-base-content/10 shadow-sm' : 'border-base-content/5 bg-transparent hover:bg-base-200/30'}"
          onclick={() => activeItemIndex = index}
        >
          <!-- Progress bar -->
          {#if activeItemIndex === index}
            <div 
              class="absolute bottom-0 left-0 h-1 bg-primary animate-progress"
              style="--duration: {AUTOPLAY_INTERVAL_MS}ms;"
            ></div>
          {/if}

          <div class="relative z-10 flex justify-between items-center">
            <h4 class="text-base md:text-lg {activeItemIndex === index ? 'text-base-content font-medium' : 'text-base-content/80'}">{item.title}</h4>
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
    <div class="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-2xl overflow-hidden flex items-center justify-center bg-base-100">
      {#key activeTab}
        {#if currentImage}
          <img 
            src={currentImage} 
            alt={capabilities.find(t => t.id === activeTab)?.label} 
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
    from { width: 0%; }
    to { width: 100%; }
  }
  .animate-progress {
    animation: progress var(--duration, 5s) linear forwards;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
