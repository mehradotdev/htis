<script lang="ts">
  import { fade } from 'svelte/transition';

  interface Props {
    bgImageSrc?: string;
  }

  let { bgImageSrc = '' }: Props = $props();

  let activeIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;
  let tabsContainer = $state<HTMLDivElement | null>(null);

  const principles = [
    {
      title: 'Intelligent Operational Flow',
      description:
        'We design systems that streamline processes, reduce manual effort, and enable real-time decision making through automation, orchestration, and data-driven insights.',
    },
    {
      title: 'Omni-Channel Deployment',
      description:
        'Our shift toward React-based architectures allows us to maintain visual and functional consistency across web, mobile, and TV, ensuring a unified user experience for both government and corporate stakeholders.',
    },
    {
      title: 'Cloud-Native Scalability',
      description:
        'Leveraging AWS cloud servers, we provide the resilient infrastructure necessary to host high-compliance government portals and large-scale enterprise SaaS products with zero performance compromise.',
    },
    {
      title: 'Security & Integrity (RBAC)',
      description:
        'Every application, from mobile field tools to TV-based dashboards, implements rigorous Role-Based Access Control (RBAC) to safeguard sensitive data across all endpoints.',
    },
    {
      title: 'Modular Engineering Reuse',
      description:
        'By maintaining a library of common technical components, our 18-member core team accelerates delivery timelines while ensuring every line of code meets our strict quality benchmarks.',
    },
  ];

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

  function startInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % principles.length;
    }, 6000);
  }

  $effect(() => {
    startInterval();
    return () => {
      clearInterval(interval);
    };
  });

  $effect(() => {
    scrollTabToActive(activeIndex);
  });

  function selectTab(index: number) {
    activeIndex = index;
    startInterval();
  }
</script>

<section class="relative overflow-hidden border-t border-base-content/10 bg-base-100 py-24">
  <!-- Background mesh grid -->
  {#if bgImageSrc}
    <div class="pointer-events-none absolute inset-0 z-0 opacity-20">
      <img
        src={bgImageSrc}
        alt=""
        aria-hidden="true"
        class="h-full w-full object-cover object-center"
        style="filter: var(--filter-invert-dark)"
      />
    </div>
  {/if}

  <div class="relative z-10 container mx-auto px-6">
    <div class="mb-16 max-w-3xl text-left">
      <h2 class="text-4xl font-extrabold tracking-tight text-base-content md:text-5xl">
        Architectural Principles
      </h2>
      <p class="mt-4 text-lg font-medium text-base-content/70">
        Our core engineering philosophies designed to build secure, scalable, and
        high-performance digital ecosystems.
      </p>
    </div>

    <div class="relative w-full">
      <!-- Tabs Container -->
      <!-- On mobile, scrolls horizontally. On desktop, switches to a clean 5-column grid layout -->
      <div
        bind:this={tabsContainer}
        class="flex lg:grid lg:grid-cols-5 flex-nowrap gap-3 md:gap-4 pb-5 overflow-x-auto no-scrollbar scroll-smooth w-full relative"
      >
        {#each principles as principle, i}
          <button
            onclick={() => selectTab(i)}
            class="relative flex items-center justify-center text-center px-3.5 pt-8 pb-6 md:px-6 md:pt-10 md:pb-8 rounded-2xl border transition-all duration-300 cursor-pointer shrink-0 min-h-[96px] md:min-h-[108px] w-[185px] md:w-[240px] lg:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
              {activeIndex === i
              ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary font-semibold shadow-md'
              : 'border-base-content/10 bg-base-200/30 text-base-content/70 hover:bg-base-200/60 hover:border-base-content/20 hover:text-base-content'}"
          >
            <!-- Progress Bar / Top Accent Border (clipped at top corners) -->
            <div class="absolute top-0 left-0 right-0 h-[6px] bg-primary/10 rounded-t-[14px] overflow-hidden">
              {#if activeIndex === i}
                <div
                  class="h-full bg-primary animate-progress"
                  style="--duration: 6000ms;"
                ></div>
              {:else}
                <div class="h-full bg-primary/30"></div>
              {/if}
            </div>

            <span class="text-sm md:text-lg lg:text-xl font-medium leading-snug">{principle.title}</span>

            {#if activeIndex === i}
              <!-- Downward pointing indicator arrow -->
              <div
                class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[12px] border-t-primary z-10 mt-[-1px]"
              ></div>
            {/if}
          </button>
        {/each}
      </div>

      <!-- Description Card -->
      <div
        class="mt-2 bg-base-100 dark:bg-base-200/40 border border-base-content/10 shadow-lg rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[160px] md:min-h-[140px] flex items-center"
      >
        <!-- Background mesh/dot grid decoration on the right -->
        <div class="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 dark:opacity-10 pointer-events-none overflow-hidden rounded-r-3xl">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-grid-principles" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" class="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-principles)" />
          </svg>
        </div>

        <!-- Content with Svelte fade effect on activeIndex updates -->
        <div class="relative z-10 w-full pr-8">
          {#key activeIndex}
            <div
              in:fade={{ duration: 250 }}
              class="text-base-content/85 text-lg md:text-xl leading-relaxed text-justify font-normal"
            >
              {principles[activeIndex].description}
            </div>
          {/key}
        </div>
      </div>
    </div>
  </div>
</section>
