<script lang="ts">
  import { fade } from 'svelte/transition';
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

  interface TeamMember {
    name: string;
    role: string;
    dept: string;
    img: string;
  }

  interface Props {
    team: TeamMember[];
  }

  let { team }: Props = $props();

  let scrollContainer = $state<HTMLDivElement | null>(null);
  let scrollProgress = $state(0);
  let hasScrollableContent = $state(false);

  function updateScrollState() {
    if (!scrollContainer) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    const maxScroll = scrollWidth - clientWidth;
    hasScrollableContent = maxScroll > 0;
    scrollProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
  }

  function handleScroll() {
    updateScrollState();
  }

  function scrollLeftDir() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: -340, behavior: 'smooth' });
    }
  }

  function scrollRightDir() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: 340, behavior: 'smooth' });
    }
  }

  $effect(() => {
    if (!scrollContainer) return;

    // Initial check
    updateScrollState();

    // Watch for size changes of the container or window
    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(scrollContainer);

    return () => {
      resizeObserver.disconnect();
    };
  });
</script>

<section
  id="team"
  class="bg-base-100 py-16 md:py-24 border-t border-base-200/60 relative overflow-hidden"
>
  <div class="container mx-auto px-6">
    <!-- Header Content with Scroll Buttons -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
      <div class="max-w-3xl">
        <h2
          class="text-3xl font-extrabold tracking-tight text-base-content md:text-4xl lg:text-5xl"
        >
          The Team behind the <span class="text-primary">HTIS</span>
        </h2>
        <div class="mt-3 h-1.5 w-20 rounded-full bg-primary mb-6"></div>
        <p class="text-base font-medium text-base-content/85 md:text-lg">
          A passionate team of experts collaborating to deliver excellence.
        </p>
      </div>
      <!-- Scroll Buttons -->
      {#if hasScrollableContent}
        <div transition:fade={{ duration: 200 }} class="flex gap-4 shrink-0">
          <button
            onclick={scrollLeftDir}
            aria-label="Scroll left"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-base-content/15 bg-base-200 text-base-content shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-content hover:border-primary active:scale-95"
          >
            <ChevronLeft class="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            onclick={scrollRightDir}
            aria-label="Scroll right"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-base-content/15 bg-base-200 text-base-content shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-content hover:border-primary active:scale-95"
          >
            <ChevronRight class="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      {/if}
    </div>

    <!-- Scrollable Grid Container -->
    <div class="relative w-full">
      <div
        bind:this={scrollContainer}
        onscroll={handleScroll}
        class="no-scrollbar grid grid-flow-col grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
      >
        {#each team as member}
          <div
            class="flex items-center gap-4 p-4 rounded-2xl border border-base-200 bg-base-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 w-[290px] sm:w-[320px] shrink-0 select-none snap-start"
          >
            <div
              class="h-16 w-16 overflow-hidden rounded-xl border border-base-200/60 bg-base-200 shrink-0"
            >
              <img src={member.img} alt={member.name} class="h-full w-full object-cover" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-lg font-bold text-base-content leading-tight truncate"
                >{member.name}</span
              >
              <span class="text-sm font-semibold text-primary mt-1 leading-tight truncate"
                >{member.role}</span
              >
              <span class="text-xs text-base-content/60 mt-1 leading-tight truncate"
                >{member.dept}</span
              >
            </div>
          </div>
        {/each}
      </div>

      <!-- Custom Scroll Progress Bar -->
      {#if hasScrollableContent}
        <div transition:fade={{ duration: 200 }} class="mt-8 flex justify-center">
          <div class="relative h-1 w-48 rounded-full bg-base-content/20 overflow-hidden">
            <div
              class="absolute top-0 bottom-0 bg-primary rounded-full transition-all duration-75"
              style="width: 30%; left: {scrollProgress * (100 - 30)}%"
            ></div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>
