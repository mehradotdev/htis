<script lang="ts">
  import type { Milestone } from '~/data/pageData';

  interface Props {
    /** List of chronological milestones to display in the journey */
    milestones: Milestone[];
  }

  let { milestones }: Props = $props();

  // -- Constants & Derived --
  const AUTOPLAY_INTERVAL_MS = 4000;
  let N = $derived(milestones.length);
  // Calculate exact angle and radius multiplier to form a perfect closed circle
  let thetaVal = $derived(360 / N);
  let rMultiplier = $derived(1 / (2 * Math.tan(Math.PI / N)));

  // -- State --
  let activeIndex = $state(0);
  let rotationIndex = $state(0);
  let timelineContainer: HTMLElement | undefined = $state();

  // -- Effects --
  // Automatically advance to the next slide.
  $effect(() => {
    activeIndex;
    const intervalId = setInterval(nextSlide, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(intervalId);
  });

  // -- Handlers --
  /** Moves to the next slide, wrapping around to the start */
  function nextSlide() {
    goToSlide((activeIndex + 1) % milestones.length);
  }

  /** Navigates to a specific slide and ensures the timeline scrolls to it */
  function goToSlide(index: number) {
    // Calculate the shortest path on the circle to avoid backward spinning
    let currentMod = ((rotationIndex % N) + N) % N; 
    let diff = index - currentMod;
    
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    
    rotationIndex += diff;
    activeIndex = index;
    scrollTimelineToActive(index);
  }

  /** Smoothly scrolls the horizontal timeline so the active node is centered */
  function scrollTimelineToActive(index: number) {
    if (!timelineContainer) return;

    // Target specific timeline nodes by class to avoid selecting the 3D film frames
    const nodes = timelineContainer.querySelectorAll<HTMLElement>('.timeline-node');
    const targetNode = nodes[index];
    if (!targetNode) return;

    const nodeRect = targetNode.getBoundingClientRect();
    const containerRect = timelineContainer.getBoundingClientRect();

    // Calculate exact scroll position to center the target node
    const scrollLeft =
      timelineContainer.scrollLeft +
      (nodeRect.left - containerRect.left) -
      (containerRect.width - nodeRect.width) / 2;

    timelineContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }
</script>

<section
  class="relative w-full overflow-hidden bg-base-100 px-4 py-12 md:py-16 transition-colors duration-500"
  id="journey-section"
>
  <div class="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
    <!-- Title Area -->
    <div class="mb-8 text-center md:mb-12">
      <h2 class="text-5xl font-extrabold tracking-tight text-base-content md:text-7xl">
        Our <span class="text-primary">Journey</span>
      </h2>
      <p
        class="mx-auto mt-4 max-w-2xl text-base font-medium text-base-content/80 md:text-xl"
      >
        A timeline of innovation, milestones, and achievements<br
          class="hidden md:block"
        /> that shaped our path forward.
      </p>
    </div>

    <!-- 3D Film Strip Carousel -->
    <div class="carousel-container relative mt-4 w-full" style="--theta: {thetaVal}deg; --r-mult: {rMultiplier};">
      <!-- Glow behind the center active item -->
      <div class="glow-effect"></div>

      <div
        class="carousel-scene"
        style="transform: translateZ(calc(var(--r) * -1)) rotateY(calc({rotationIndex} * var(--theta) * -1));"
      >
        {#each milestones as milestone, index}
          {@const rawDist = Math.abs(activeIndex - index)}
          {@const distance = rawDist > N / 2 ? N - rawDist : rawDist}
          <!-- Fade items slightly in the back of the circle -->
          {@const opacity = 1 - (distance / (N / 2)) * 0.7}

          <button
            class="film-frame {activeIndex === index ? 'active' : ''}"
            style="
              --index: {index}; 
              opacity: {opacity};
              pointer-events: {distance <= N / 3 ? 'auto' : 'none'};
            "
            onclick={() => goToSlide(index)}
            aria-label={`View milestone for ${milestone.year}`}
            aria-current={activeIndex === index ? 'true' : undefined}
          >
            <!-- Top Perforations -->
            <div class="film-border top"></div>

            <!-- Image -->
            <div class="film-content">
              <img
                src={milestone.imageSrc}
                alt={milestone.title}
                class="film-image"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              <div class="film-overlay"></div>
            </div>

            <!-- Bottom Perforations -->
            <div class="film-border bottom"></div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Active Milestone Info -->
    <div
      class="mt-4 flex h-[140px] flex-col items-center justify-end text-center md:mt-8"
    >
      {#key activeIndex}
        <div class="animate-fade-in-up flex flex-col items-center px-4">
          <h2 class="text-4xl font-extrabold text-primary md:text-5xl">
            {milestones[activeIndex].year}
          </h2>
          <h3 class="mt-2 text-xl font-bold text-base-content md:text-2xl">
            {milestones[activeIndex].title}
          </h3>
          <p
            class="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-base-content/80 md:text-base"
          >
            {milestones[activeIndex].description}
          </p>
        </div>
      {/key}

      <!-- Vertical Connecting Line to Timeline -->
      <div class="mt-6 h-10 w-[2px] rounded-full bg-primary/40 md:mt-8"></div>
    </div>

    <!-- Timeline Navigation -->
    <div class="relative mt-2 w-full max-w-4xl px-2 md:px-4">
      <div
        class="hide-scrollbar overflow-x-auto pb-4 pt-2"
        bind:this={timelineContainer}
      >
        <div class="relative flex w-max min-w-full items-start justify-between">
          <!-- Horizontal Connecting Line -->
          <div
            class="absolute left-0 right-0 top-5 z-0 h-[2px] -translate-y-1/2 bg-primary/20"
          ></div>

          {#each milestones as milestone, index}
          <button
            class="timeline-node group relative z-10 flex w-20 shrink-0 cursor-pointer flex-col items-center md:w-24"
            type="button"
            aria-current={activeIndex === index ? 'step' : undefined}
            onclick={() => goToSlide(index)}
          >
            <!-- Node Dot -->
            <div class="relative flex h-10 w-10 items-center justify-center">
              {#if activeIndex === index}
                <div
                  class="h-4 w-4 rounded-full border-[3px] border-primary bg-white shadow-[0_0_12px_rgba(42,69,61,0.4)]"
                ></div>
              {:else}
                <div
                  class="h-2.5 w-2.5 rounded-full bg-primary/20 transition-colors group-hover:bg-primary/50"
                ></div>
              {/if}
            </div>

            <!-- Node Text -->
            <div
              class="mt-2 text-center transition-all duration-300 {activeIndex === index
                ? 'opacity-100'
                : 'opacity-40 group-hover:opacity-70'}"
            >
              <div
                class="text-sm font-extrabold text-base-content {activeIndex === index
                  ? 'scale-110 transform'
                  : ''} transition-transform"
              >
                {milestone.year}
              </div>
              <div class="mt-0.5 text-[10px] font-bold text-base-content/70 md:text-xs">
                {milestone.title}
              </div>
            </div>
          </button>
        {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* ── Utilities ── */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.5s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up {
      opacity: 1;
      animation: none;
    }
  }

  /* ── 3D Carousel Variables ── */
  .carousel-container {
    --w: 260px; /* Frame width mobile */
    --r: calc(var(--w) * var(--r-mult));

    height: 280px;
    perspective: 800px;
    /* Negative Y pulls the perspective up, making the cylinder look like an upward smile/arc */
    perspective-origin: 50% -15%;
  }

  @media (min-width: 768px) {
    .carousel-container {
      --w: 320px; /* Frame width desktop */
      height: 320px;
      perspective: 1000px;
      perspective-origin: 50% -35%;
    }
  }

  .carousel-scene {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.25, 1, 0.4, 1);
  }

  /* ── Glow Effect ── */
  .glow-effect {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 90%;
    max-width: 800px;
    height: 100px;
    transform: translateX(-50%);
    background: radial-gradient(
      ellipse at center,
      rgba(32, 178, 112, 0.35) 0%,
      rgba(32, 178, 112, 0.1) 40%,
      transparent 70%
    );
    filter: blur(20px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Film Frame ── */
  .film-frame {
    width: var(--w);
    height: calc(var(--w) * 0.65); /* ~16:10 aspect ratio */
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: calc(var(--w) / -2);
    margin-top: calc(var(--w) * -0.325);

    /* Position each frame on the 3D cylinder surface */
    transform: rotateY(calc(var(--index) * var(--theta))) translateZ(var(--r));

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: opacity 0.8s ease;
    z-index: 1;
    cursor: pointer;
  }

  /* 
   * Realistic film perforations using pure CSS gradients.
   * This technique relies on layering linear gradients to draw the solid black
   * film strips around the holes, leaving the holes fully transparent so the 
   * page background and glow effects can show through flawlessly on all browsers.
   */
  .film-border {
    height: 24px;
    width: 100%;
    background-color: transparent;
    background-image:
      linear-gradient(to bottom, #111 7px, transparent 7px, transparent 17px, #111 17px),
      repeating-linear-gradient(
        to right,
        #111 0px,
        #111 12px,
        transparent 12px,
        transparent 18px
      );
  }
  @media (min-width: 768px) {
    .film-border {
      height: 32px;
      background-image:
        linear-gradient(
          to bottom,
          #111 9px,
          transparent 9px,
          transparent 23px,
          #111 23px
        ),
        repeating-linear-gradient(
          to right,
          #111 0px,
          #111 16px,
          transparent 16px,
          transparent 24px
        );
    }
  }

  /* ── Image Content ── */
  .film-content {
    flex: 1;
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #000;
    /* Use borders for the black gaps between frames, ensuring holes above/below remain transparent */
    border-left: 2px solid #111;
    border-right: 2px solid #111;
    box-sizing: border-box;
  }

  .film-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1) brightness(0.7);
    transition:
      filter 1s ease,
      transform 1s ease;
    transform: scale(1.02); /* Slight scale to avoid 3D edge bleeding */
  }

  .film-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      transparent,
      rgba(0, 0, 0, 0.3)
    );
    pointer-events: none;
    transition: opacity 1s ease;
    opacity: 1;
  }

  /* ── Active State Enhancements ── */
  .film-frame.active .film-image {
    filter: grayscale(0%) contrast(1) brightness(1);
  }

  .film-frame.active .film-overlay {
    opacity: 0;
  }

  .film-frame.active {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  }

  /* Hover effect for non-active frames */
  .film-frame:not(.active):hover .film-image {
    filter: grayscale(50%) contrast(1.1) brightness(0.9);
  }
</style>
