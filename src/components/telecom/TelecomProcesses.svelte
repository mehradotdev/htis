<script lang="ts">
  import { fade } from 'svelte/transition';

  interface TelecomProcessStep {
    name: string;
    desc: string;
  }

  interface TelecomProcess {
    id: string;
    title: string;
    description: string;
    image: string;
    details: TelecomProcessStep[];
  }

  let {
    heading = 'Telecom Processes —\nBlueprint to Reality.',
    processes = [],
  }: {
    heading?: string;
    processes?: TelecomProcess[];
  } = $props();

  let activeIndex = $state(0);
  let progressWidth = $state(0);
  let navElement = $state<HTMLElement | null>(null);
  let lastCircle = $state<HTMLDivElement | null>(null);
  let trackBottomOffset = $state(22);

  const AUTOPLAY_INTERVAL = 5000;

  /**
   * Autoplay timer: Automatically transitions to the next step
   * every 5 seconds. Re-runs and resets whenever `activeIndex` changes,
   * ensuring manual clicks reset the timer duration.
   */
  $effect(() => {
    activeIndex; // dependency to trigger reset

    const intervalId = setInterval(() => {
      if (processes.length === 0) return;
      activeIndex = (activeIndex + 1) % processes.length;
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalId);
  });

  /**
   * Astro View Transitions Compatibility & Progress Bar Animation:
   *
   * Astro's soft page transitions (ClientRouter) strip dynamically loaded
   * utility classes and keyframe animations from the <head> when navigating
   * away, and they are not re-injected on returning.
   *
   * To prevent styling and animation breakage:
   * 1. Positioning and track layout styles are set inline on DOM nodes.
   * 2. The active step progress bar animation is triggered programmatically
   *    via a CSS transition on the `width` property rather than stylesheet keyframes.
   *
   * This effect resets the width to 0% when the active step changes, then
   * schedules a state update to 100% on the next paint cycle to start the transition.
   */
  $effect(() => {
    activeIndex; // dependency on activeIndex to reset animation on active step change
    progressWidth = 0;

    const timerId = setTimeout(() => {
      progressWidth = 100;
    }, 20);

    return () => clearTimeout(timerId);
  });

  /**
   * Shorten the timeline track on desktop so that it does not extend
   * below the final step's (07) circle. Since the last item aligns its circle
   * to the top (due to items-start layout), we dynamically compute the
   * offset from the bottom of the nav container to the center of the last circle.
   */
  $effect(() => {
    activeIndex; // dependency to recalculate when content height updates active tab

    const updateOffset = () => {
      if (navElement && lastCircle) {
        const navRect = navElement.getBoundingClientRect();
        const circleRect = lastCircle.getBoundingClientRect();
        trackBottomOffset = Math.max(
          0,
          navRect.bottom - circleRect.bottom + circleRect.height / 2,
        );
      }
    };

    // Use requestAnimationFrame to ensure the DOM has updated and rendered
    const frameId = requestAnimationFrame(updateOffset);

    window.addEventListener('resize', updateOffset);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateOffset);
    };
  });
</script>

<section class="relative bg-base-100 pb-24 pt-24 md:pb-32 md:pt-32">
  <div class="container mx-auto px-6">
    <!-- Main Heading -->
    <h2
      class="mb-10 text-center text-4xl leading-tight font-medium tracking-tight text-base-content md:mb-16 md:text-5xl max-w-5xl mx-auto"
    >
      {@html heading.replace(/\n/g, '<br class="md:hidden" />')}
    </h2>

    <!-- Two Column Layout -->
    {#if processes.length > 0}
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
        <!-- Left: Vertical Stepper -->
        <div class="w-full lg:w-[336px] shrink-0">
          <nav
            bind:this={navElement}
            class="relative flex flex-row lg:flex-col justify-between gap-4 lg:gap-0 lg:h-full"
            aria-label="Process steps"
          >
            <!-- Timeline track (responsive: horizontal on mobile/tablet, vertical on desktop) -->
            <div
              class="absolute bg-base-300 pointer-events-none rounded-full
                   top-[18px] left-[18px] right-[18px] h-[2px]
                   lg:left-[1.125rem] lg:top-[22px] lg:bottom-[var(--track-bottom,22px)] lg:right-auto lg:w-[2px] lg:h-auto"
              style="--track-bottom: {trackBottomOffset}px;"
            >
              <!-- Timeline progress fill (Mobile: horizontal) -->
              <div
                class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out lg:hidden"
                style="width: {processes.length > 1
                  ? (activeIndex / (processes.length - 1)) * 100
                  : 100}%"
              ></div>
              <!-- Timeline progress fill (Desktop: vertical) -->
              <div
                class="absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-500 ease-out hidden lg:block"
                style="height: {processes.length > 1
                  ? (activeIndex / (processes.length - 1)) * 100
                  : 100}%"
              ></div>
            </div>

            {#each processes as process, i}
              <div
                onclick={() => (activeIndex = i)}
                onkeydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activeIndex = i;
                  }
                }}
                role="button"
                tabindex="0"
                class="group relative flex items-center lg:items-start gap-0 lg:gap-5 text-left w-auto lg:w-full cursor-pointer focus:outline-none"
                aria-current={activeIndex === i ? 'step' : undefined}
              >
                <!-- Number circle (outside the card) -->
                {#if i === processes.length - 1}
                  <div
                    bind:this={lastCircle}
                    class="relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 lg:mt-1
                    {activeIndex === i
                      ? 'bg-primary text-primary-content shadow-md shadow-primary/25'
                      : 'bg-base-100 text-base-content/50 border border-base-300 group-hover:border-primary/30'}"
                  >
                    {process.id}
                  </div>
                {:else}
                  <div
                    class="relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 lg:mt-1
                    {activeIndex === i
                      ? 'bg-primary text-primary-content shadow-md shadow-primary/25'
                      : 'bg-base-100 text-base-content/50 border border-base-300 group-hover:border-primary/30'}"
                  >
                    {process.id}
                  </div>
                {/if}

                <!-- Title Card (hidden on mobile/tablet, max-width of 280px on desktop to force 2 lines) -->
                <div
                  class="hidden lg:block relative grow max-w-[280px] py-3.5 px-5 rounded-xl transition-all duration-300 border overflow-hidden
                  {activeIndex === i
                    ? 'bg-primary/10 border-primary text-primary font-semibold shadow-sm'
                    : 'bg-base-100 border-base-content/10 text-base-content/75 hover:bg-base-200/50 hover:border-base-content/20'}"
                >
                  <span class="text-[0.94rem] leading-snug">
                    {process.title}
                  </span>

                  <!-- Autoplay progress bar on active step -->
                  {#if activeIndex === i}
                    <div
                      class="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl bg-transparent"
                      style="height: 2px;"
                    >
                      <div
                        style="
                        height: 100%;
                        background-color: var(--color-primary);
                        opacity: 0.4;
                        width: {progressWidth}%;
                        transition: width {progressWidth === 0
                          ? '0ms'
                          : `${AUTOPLAY_INTERVAL}ms`} linear;
                      "
                      ></div>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </nav>
        </div>

        <!-- Right: Content Panel -->
        <div
          class="w-full lg:flex-1 bg-base-200/40 rounded-3xl p-6 md:p-8 lg:p-10 border border-base-content/5 shadow-sm"
        >
          {#key activeIndex}
            <div in:fade={{ duration: 350 }}>
              <!-- Header with badge -->
              <div class="flex items-center gap-3 mb-2">
                <span
                  class="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold"
                >
                  {processes[activeIndex].id}
                </span>
                <h3
                  class="text-xl md:text-2xl xl:text-[1.7rem] font-medium text-base-content leading-snug"
                >
                  {processes[activeIndex].title}
                </h3>
              </div>

              <!-- Description -->
              <p
                class="text-base text-base-content font-light mb-6 lg:mb-8 text-center max-w-xl mx-auto leading-relaxed"
              >
                {processes[activeIndex].description}
              </p>

              <!-- Process Image (Mobile only: positioned between description and details) -->
              <div
                class="w-full rounded-2xl overflow-hidden aspect-3/4 bg-base-300/30 mb-6 md:hidden"
              >
                {#key activeIndex}
                  <img
                    in:fade={{ duration: 500, delay: 100 }}
                    src={processes[activeIndex].image}
                    alt={processes[activeIndex].title}
                    class="h-full w-full object-cover object-center"
                  />
                {/key}
              </div>

              <!-- Details + Image Grid -->
              <div class="flex flex-col md:flex-row gap-6 lg:gap-8">
                <!-- Details -->
                <div class="flex-1 min-w-0">
                  <ul class="flex flex-col gap-4">
                    {#each processes[activeIndex].details as detail}
                      <li class="flex flex-col gap-0.5">
                        <strong
                          class="text-base font-semibold tracking-wide text-base-content/90"
                        >
                          {detail.name}
                        </strong>
                        <span
                          class="text-base font-light leading-relaxed text-base-content"
                        >
                          {detail.desc}
                        </span>
                      </li>
                    {/each}
                  </ul>
                </div>

                <!-- Process Image (Desktop only: positioned side-by-side with details) -->
                <div
                  class="w-full md:w-[42%] shrink-0 rounded-2xl overflow-hidden aspect-3/4 bg-base-300/30 hidden md:block"
                >
                  {#key activeIndex}
                    <img
                      in:fade={{ duration: 500, delay: 100 }}
                      src={processes[activeIndex].image}
                      alt={processes[activeIndex].title}
                      class="h-full w-full object-cover object-center"
                    />
                  {/key}
                </div>
              </div>
            </div>
          {/key}
        </div>
      </div>
    {/if}
  </div>
</section>
