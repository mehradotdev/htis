<script lang="ts">
  import { fade } from 'svelte/transition';

  interface Partner {
    name: string;
    logoSrc?: string;
  }

  interface EcosystemTab {
    title: string;
    subtitle: string;
    partners: Partner[];
  }

  let { tabs = [] }: { tabs: EcosystemTab[] } = $props();

  let activeIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;

  function startInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % tabs.length;
    }, 5000);
  }

  $effect(() => {
    startInterval();
    return () => {
      clearInterval(interval);
    };
  });

  function selectTab(index: number) {
    activeIndex = index;
    startInterval();
  }
</script>

<div class="w-full">
  <div class="max-w-4xl mb-12">
    <h2 class="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl text-base-content">
      The HTIS Partner Ecosystem
    </h2>
    <p class="text-lg md:text-xl text-base-content/70 leading-relaxed">
      We collaborate with a specialized list of global OEMs to deliver end-to-end IT excellence. This ecosystem ensures that every layer of your infrastructure, from the endpoint to the cloud, is powered by industry-leading technology.
    </p>
  </div>

  <!-- Pills -->
  <div class="flex flex-wrap gap-3 mb-16">
    {#each tabs as tab, i}
      <button
        class="px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 relative overflow-hidden cursor-pointer border {activeIndex === i
          ? 'bg-primary text-primary-content border-primary shadow-md'
          : 'bg-primary/20 text-primary border-transparent hover:bg-primary/30 hover:text-primary'}"
        onclick={() => selectTab(i)}
      >
        {#if activeIndex === i}
          <!-- Progress bar effect -->
          <div class="absolute bottom-0 left-0 h-1 bg-primary-content/40 animate-fill-bg"></div>
        {/if}
        {tab.title}
      </button>
    {/each}
  </div>

  <!-- Content Area -->
  <div class="min-h-[160px] relative">
    {#key activeIndex}
      <div in:fade={{ duration: 400 }} class="absolute inset-0">
        <h3 class="text-lg md:text-xl font-medium text-primary mb-8">
          {tabs[activeIndex].subtitle}
        </h3>
        
        <div class="flex flex-wrap items-center gap-8 md:gap-14">
          {#each tabs[activeIndex].partners as partner}
            {#if partner.logoSrc}
              <img
                src={partner.logoSrc}
                alt={partner.name}
                class="h-10 md:h-14 object-contain max-w-[160px] grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            {:else}
              <div class="text-lg md:text-xl font-bold text-base-content/40 hover:text-base-content/70 transition-colors uppercase tracking-wider">
                {partner.name}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/key}
  </div>
</div>

<style>
  @keyframes fillBg {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  .animate-fill-bg {
    animation: fillBg 5s linear forwards;
  }
</style>
