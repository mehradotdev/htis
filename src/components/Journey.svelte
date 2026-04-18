<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Milestone } from '~/data/pageData';

  interface Props {
    milestones: Milestone[];
  }

  let { milestones }: Props = $props();
  let activeIndex = $state(0);
  let intervalId: ReturnType<typeof setInterval> | undefined;
  let timelineContainer: HTMLElement | undefined = $state();

  const INTERVAL_MS = 4000;

  function goToSlide(index: number) {
    activeIndex = index;
    scrollTimelineToActive(index);
  }

  function scrollTimelineToActive(index: number) {
    if (!timelineContainer) return;
    const btn = timelineContainer.querySelectorAll<HTMLElement>('button')[index];
    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = timelineContainer.getBoundingClientRect();
    const scrollLeft =
      timelineContainer.scrollLeft +
      (btnRect.left - containerRect.left) -
      (containerRect.width - btnRect.width) / 2;
    timelineContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }

  function nextSlide() {
    goToSlide((activeIndex + 1) % milestones.length);
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoPlay() {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  }

  function handleTimelineClick(index: number) {
    goToSlide(index);
    startAutoPlay();
  }

  onMount(() => {
    startAutoPlay();
  });

  onDestroy(() => {
    stopAutoPlay();
  });
</script>

<section
  class="relative mx-auto max-w-7xl overflow-hidden px-4 py-24"
  id="journey-section"
>
  <!-- Subtle grid background -->
  <div
    class="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxbC00MCAuMDAxem0wIDM5LjAwMWg0MHYxSC4wMDF6bTM5LjAwMS0zOS4wMDFoMXY0MGgtMXpNMCAwaDF2NDBIMHoiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz4KPC9zdmc+')] opacity-50"
  ></div>

  <div class="relative z-10 flex flex-col items-center">
    <!-- Slide Area -->
    <div class="relative mx-auto mt-10 w-full max-w-5xl">
      <!-- Static decorative text -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto mt-16 h-0 w-[90%] md:mt-24 md:w-[75%]"
      >
        <div class="absolute top-0.5 -right-4 translate-x-1/2">
          <div class="relative">
            <div
              class="absolute right-[70%] bottom-[90%] text-5xl leading-none font-extrabold tracking-tight text-[#2a453d] drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] md:text-[80px]"
            >
              Our
            </div>
            <div
              class="translate-y-4 text-5xl font-extrabold tracking-tight text-primary drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] md:text-[80px]"
              style="writing-mode: vertical-rl;"
            >
              Journey
            </div>
          </div>
        </div>
      </div>

      <!-- Slides -->
      {#each milestones as milestone, index}
        <div class="journey-slide" class:active={activeIndex === index}>
          <div class="relative mx-auto mt-16 mb-32 w-[90%] md:mt-24 md:mb-44 md:w-[75%]">
            <!-- Main Image -->
            <div
              class="image-box relative z-20 aspect-[4/3] w-full overflow-hidden bg-base-200 shadow-xl md:aspect-[16/9]"
            >
              <img
                src={milestone.imageSrc}
                alt={`HTIS journey in ${milestone.year}: ${milestone.title}`}
                class="absolute inset-0 h-full w-full object-cover"
                loading={index < 2 ? 'eager' : 'lazy'}
              />
              <div
                class="pointer-events-none absolute inset-0 bg-white/10 mix-blend-overlay"
              ></div>
              <!-- Gradient for Year (Top Left) -->
              <div
                class="pointer-events-none absolute inset-0 bg-linear-to-br from-white/80 via-transparent to-transparent opacity-80"
              ></div>
              <!-- Gradient for Title & Desc (Bottom Left) -->
              <div
                class="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/80 via-transparent to-transparent opacity-80"
              ></div>
            </div>

            <!-- Year (Overlap Top Left) -->
            <div
              class="year-text absolute -top-10 -left-6 z-30 text-6xl leading-none font-extrabold tracking-tight text-[#2a453d] drop-shadow-md md:-top-16 md:-left-12 md:text-[110px]"
            >
              {milestone.year}
            </div>

            <!-- Title & Description (Overlap Bottom Left) -->
            <div
              class="slide-info absolute top-full -mt-6 -left-2 z-30 max-w-sm md:-mt-10 md:-left-12 md:max-w-lg"
            >
              <h3
                class="title-text text-5xl leading-none font-extrabold tracking-tight text-[#2a453d] drop-shadow-md md:text-[80px]"
              >
                {milestone.title}
              </h3>
              <p
                class="desc-box mt-2 ml-1 text-base leading-relaxed font-medium text-[#2a453d]/80 md:mt-4 md:text-xl"
              >
                {milestone.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Timeline Navigation -->
    <div class="relative mt-16 w-full max-w-5xl md:mt-20">
      <div
        class="hide-scrollbar relative flex items-end justify-between overflow-x-auto pt-10 pb-4"
        bind:this={timelineContainer}
      >
        <!-- Connecting Line -->
        <div
          class="absolute right-0 bottom-4.5 left-0 z-0 h-[2px] border-t-2 border-dashed border-primary/20"
        ></div>

        {#each milestones as milestone, index}
          <button
            class="relative z-10 flex h-[100px] min-w-[70px] cursor-pointer flex-col items-center transition-all duration-300 hover:opacity-100 md:min-w-[80px] {activeIndex ===
            index
              ? 'opacity-100'
              : 'opacity-50'}"
            type="button"
            onclick={() => handleTimelineClick(index)}
          >
            <div
              class="mb-1 transition-all duration-300 {activeIndex === index
                ? '-translate-y-[2px] text-base font-extrabold text-[#2a453d]'
                : 'text-sm font-medium text-base-content/45'}"
            >
              {milestone.year}
            </div>
            <div
              class="mb-2 px-1 text-center transition-all duration-300 {activeIndex ===
              index
                ? '-translate-y-[2px] text-sm font-bold text-[#2a453d]'
                : 'text-xs font-medium text-base-content/45'}"
            >
              {milestone.title}
            </div>
            <div
              class="w-[3px] rounded-full bg-primary transition-all duration-500 ease-out {activeIndex ===
              index
                ? 'mt-0 h-8 opacity-100 shadow-[0_0_10px_rgba(42,69,61,0.25)]'
                : 'mt-2.5 h-3 opacity-35'}"
            ></div>
          </button>
        {/each}
      </div>

      <!-- Small dots for timeline spacing (visual only) -->
      <div
        class="pointer-events-none absolute bottom-[1.12rem] left-0 hidden w-full justify-between px-[40px] md:flex"
      >
        {#each Array(40) as _}
          <div class="h-1.5 w-1.5 rounded-full bg-primary/20"></div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Scrollbar hiding */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* ── Slide layout ── */
  .journey-slide {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    z-index: 0;
    transition: opacity 0.8s ease;
  }
  .journey-slide.active {
    position: relative;
    opacity: 1;
    pointer-events: auto;
    z-index: 10;
  }

  /* ── Slide element entrance animations ── */
  .journey-slide .year-text {
    transform: translateY(-20px);
    opacity: 0;
    transition:
      transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
      opacity 0.8s ease 0.05s;
  }
  .journey-slide.active .year-text {
    transform: translateY(0);
    opacity: 0.9;
  }

  .journey-slide .image-box {
    transform: scale(0.96) translateY(12px);
    opacity: 0;
    transition:
      transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s,
      opacity 0.7s ease 0.1s;
  }
  .journey-slide.active .image-box {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .journey-slide .title-text {
    transform: translateX(-25px);
    opacity: 0;
    transition:
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s,
      opacity 0.6s ease 0.25s;
  }
  .journey-slide.active .title-text {
    transform: translateX(0);
    opacity: 1;
  }

  .journey-slide .desc-box {
    transform: translateY(15px);
    opacity: 0;
    transition:
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s,
      opacity 0.6s ease 0.4s;
  }
  .journey-slide.active .desc-box {
    transform: translateY(0);
    opacity: 1;
  }
</style>
