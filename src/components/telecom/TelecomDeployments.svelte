<script lang="ts">
  import { ArrowUpRight, ArrowRight } from '@lucide/svelte';

  const deployments = [
    {
      title: 'PACO',
      badges: ['750+ locations', 'SD-WAN', 'MPLS hybrid architecture'],
      description: 'Nationwide government network transformation project.',
    },
    {
      title: 'PACO',
      badges: ['750+ locations', 'SD-WAN', 'MPLS hybrid architecture'],
      description: 'Nationwide government network transformation project.',
    },
    {
      title: 'Taxnet 2.0',
      badges: ['750+ locations', 'SD-WAN', 'MPLS hybrid architecture'],
      description: 'Nationwide government network transformation project.',
    },
    {
      title: 'PACO',
      badges: ['750+ locations', 'SD-WAN', 'MPLS hybrid architecture'],
      description: 'Nationwide government network transformation project.',
    },
    {
      title: 'PACO',
      badges: ['750+ locations', 'SD-WAN', 'MPLS hybrid architecture'],
      description: 'Nationwide government network transformation project.',
    },
  ];

  const count = deployments.length;

  /** Currently centered card index */
  let activeIndex = $state(0);

  /** Whether transition is animating (prevent rapid clicks) */
  let isAnimating = $state(false);

  /** Card dimensions */
  const CARD_W = 280; // px base card width
  const GAP = 24; // px gap between cards
  const SCALE_ACTIVE = 1.08;
  const SCALE_INACTIVE = 0.92;

  /** Modular wrap helper: always returns 0..count-1 */
  function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  /**
   * Build an ordered array of indices centred on `activeIndex`.
   * For 5 cards we want positions: -2, -1, 0, +1, +2
   * For even counts the logic still works.
   */
  function getVisibleSlots(): { index: number; offset: number }[] {
    const half = Math.floor(count / 2);
    const slots: { index: number; offset: number }[] = [];
    for (let pos = -half; pos <= half; pos++) {
      // For even counts, skip the far-left duplicate
      if (count % 2 === 0 && pos === -half) continue;
      slots.push({
        index: mod(activeIndex + pos, count),
        offset: pos,
      });
    }
    return slots;
  }

  let slots = $derived(getVisibleSlots());

  function goTo(index: number) {
    if (isAnimating || index === activeIndex) return;
    isAnimating = true;
    activeIndex = index;
    setTimeout(() => (isAnimating = false), 500);
  }

  function next() {
    goTo(mod(activeIndex + 1, count));
  }

  function prev() {
    goTo(mod(activeIndex - 1, count));
  }
</script>

<section class="relative bg-base-100 py-24 overflow-hidden">
  <div class="container mx-auto px-6">
    <div
      class="mb-10 flex flex-col items-end justify-between gap-8 md:flex-row md:items-start"
    >
      <div class="max-w-3xl">
        <h2
          class="mb-6 text-4xl font-bold tracking-tight text-base-content md:text-5xl"
        >
          Proven Network Deployments
        </h2>
        <p class="text-lg text-base-content/70 md:text-xl">
          Explore how we design, deploy, and transform networks across hundreds of sites
          and thousands of devices.
        </p>
      </div>

      <div class="flex gap-4">
        <button
          onclick={next}
          class="group flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-content hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          aria-label="Next deployment"
        >
          <ArrowRight class="h-7 w-7 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>

    <!-- Carousel track -->
    <div class="carousel-viewport relative" style="height: {CARD_W * 1.4}px;">
      {#each slots as slot (slot.index)}
        {@const isActive = slot.offset === 0}
        {@const scale = isActive ? SCALE_ACTIVE : SCALE_INACTIVE}
        {@const translateX = slot.offset * (CARD_W + GAP)}
        {@const zIndex = count - Math.abs(slot.offset)}
        {@const opacity = Math.abs(slot.offset) <= 1 ? 1 : 0.5}
        {@const project = deployments[slot.index]}

        <button
          type="button"
          onclick={() => goTo(slot.index)}
          class="carousel-card absolute left-1/2 top-1/2 flex flex-col gap-5 rounded-2xl border p-6 text-left cursor-pointer
            {isActive
            ? 'border-primary/30 bg-primary/5 shadow-xl shadow-primary/10 h-[340px]'
            : 'border-base-content/10 bg-base-100/50 hover:border-base-content/20 h-[300px]'}"
          style="
            width: {CARD_W}px;
            transform: translate(-50%, -50%) translateX({translateX}px) scale({scale});
            z-index: {zIndex};
            opacity: {opacity};
          "
          aria-label="View {project.title} deployment"
        >
          <div class="flex items-start justify-between">
            <h3 class="text-xl font-medium tracking-tight md:text-2xl">
              {project.title}
            </h3>
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full border border-base-content/5 bg-base-200 text-primary transition-colors"
            >
              <ArrowUpRight class="h-5 w-5" />
            </div>
          </div>
          <p class="max-w-[200px] flex-1 text-base leading-relaxed text-base-content/70">
            {project.description}
          </p>
          <div class="mt-auto flex max-w-[220px] flex-wrap gap-2">
            {#each project.badges as badge}
              <span
                class="px-2.5 py-1 text-[10px] font-semibold tracking-tight text-secondary bg-secondary/10 border border-secondary/20 dark:text-base-content dark:bg-primary/15 dark:border-primary/25 rounded-md uppercase transition-colors hover:bg-secondary/20 dark:hover:bg-primary/25"
              >
                {badge}
              </span>
            {/each}
          </div>
        </button>
      {/each}
    </div>

    <!-- Pagination dots -->
    <div class="mt-8 flex items-center justify-center gap-1">
      {#each deployments as _, i}
        <button
          onclick={() => goTo(i)}
          class="flex items-center justify-center p-2 transition-all duration-300"
          aria-label="Go to deployment {i + 1}"
        >
          <span
            class="block rounded-full transition-all duration-300 {activeIndex === i
              ? 'h-2.5 w-2.5 bg-primary'
              : 'h-1.5 w-1.5 bg-primary/25 hover:bg-primary/50'}"
          ></span>
        </button>
      {/each}
    </div>
  </div>
</section>
