<script lang="ts">
  import {
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    FileText,
    TrendingUp,
  } from '@lucide/svelte';

  // Svelte 5 Runes Syntax
  const { images } = $props<{ images: string[] }>();

  let scrollContainer = $state<HTMLDivElement | null>(null);

  // Case study structured data
  const caseStudies = [
    {
      title: 'Public Utility & Citizen Services',
      solution: 'Street Vendor Management System & Digital Utility Portals.',
      impact:
        'Digitized urban governance and public utility workflows for municipal corporations. The system handles complex revenue collections, real-time tracking, and automated billing modules while ensuring role-based data isolation across departments.',
      imageIdx: 0,
    },
    {
      title: 'Enterprise Resource Planning (wfms™)',
      solution: 'High-Volume Workforce & Logistics Management System.',
      impact:
        'Supports over 3,000 daily active users, automating attendance, claim submissions, field task assignments, and payroll calculations. Real-time geofencing and offline synchronization reduced operational payroll overhead by 18%.',
      imageIdx: 1,
    },
    {
      title: 'Telecom Workflow Automation',
      solution: 'Carrier-Grade AMC & Complaint Management Engine.',
      impact:
        'Bridges software telemetry with physical telecom nodes. Field maintenance riggers and L1-L6 coordinators gain real-time network fault alerts, routing optimization, and automated ticketing, decreasing MTTR (Mean Time to Repair) by 32%.',
      imageIdx: 2,
    },
  ];

  // Function to programmatically scroll horizontal container
  function scroll(direction: 'left' | 'right') {
    if (!scrollContainer) return;

    const container = scrollContainer;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    const style = window.getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;

    // Calculate perfect snap position for each card using bounding rects (immune to offsetParent changes)
    const containerRect = container.getBoundingClientRect();
    const snapPositions = cards.map(
      (card) =>
        card.getBoundingClientRect().left -
        containerRect.left +
        container.scrollLeft -
        paddingLeft,
    );

    const currentScroll = container.scrollLeft;

    // Find the closest card index based on current scroll position
    let closestIndex = 0;
    let minDifference = Infinity;

    snapPositions.forEach((pos, index) => {
      const diff = Math.abs(pos - currentScroll);
      if (diff < minDifference) {
        minDifference = diff;
        closestIndex = index;
      }
    });

    // Handle edge cases near boundaries where fractional pixels or max scroll bounds apply
    const isAtEnd = currentScroll + container.clientWidth >= container.scrollWidth - 15;
    const isAtStart = currentScroll <= 15;

    let currentIndex = closestIndex;
    if (isAtEnd) {
      currentIndex = cards.length - 1;
    } else if (isAtStart) {
      currentIndex = 0;
    }

    // Determine target index
    let targetIndex = currentIndex;
    if (direction === 'left') {
      targetIndex = Math.max(currentIndex - 1, 0);
    } else {
      targetIndex = Math.min(currentIndex + 1, cards.length - 1);
    }

    // Scroll smoothly to the target snap position
    container.scrollTo({
      left: snapPositions[targetIndex],
      behavior: 'smooth',
    });
  }
</script>

<section class="relative bg-base-200/50 py-24 overflow-hidden">
  <div class="container mx-auto px-6">
    <!-- Section Header with Next/Prev navigation buttons -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6"
    >
      <div class="max-w-3xl text-left">
        <!-- <span class="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
          Proven Success & Deployment Metrics
        </span> -->
        <h2 class="text-4xl font-extrabold tracking-tight text-base-content md:text-5xl">
          Strategic Case Studies & Technical Impact
        </h2>
      </div>

      <!-- Horizontal Controls -->
      <div class="flex gap-4">
        <button
          onclick={() => scroll('left')}
          aria-label="Previous Case Study"
          class="flex h-12 w-12 items-center justify-center rounded-full border border-base-content/15 bg-base-200 text-base-content shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-content hover:border-primary active:scale-95"
        >
          <ChevronLeft class="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          onclick={() => scroll('right')}
          aria-label="Next Case Study"
          class="flex h-12 w-12 items-center justify-center rounded-full border border-base-content/15 bg-base-200 text-base-content shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-content hover:border-primary active:scale-95"
        >
          <ChevronRight class="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  </div>

  <!-- Horizontal scrollable container -->
  <div
    bind:this={scrollContainer}
    class="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar case-studies-scroll-container"
  >
    {#each caseStudies as study}
      <div
        class="flex-none w-[90vw] md:w-[780px] bg-base-100 rounded-3xl p-8 md:p-12 border border-base-content/10 shadow-lg snap-start flex flex-col md:flex-row items-center gap-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20"
      >
        <!-- Link Icon Circle (Top-Right) -->
        <a
          href="/case-study"
          aria-label={`Explore ${study.title} Case Study`}
          class="absolute top-6 right-6 md:top-8 md:right-8 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-content z-20"
        >
          <ArrowUpRight class="w-5 h-5" strokeWidth={2.5} />
        </a>

        <!-- Content Column (Left on desktop) -->
        <div class="w-full md:w-[55%] flex flex-col items-start text-left gap-6 z-10">
          <h3
            class="text-xl md:text-2xl font-black text-base-content tracking-tight leading-tight uppercase font-sans"
          >
            {study.title}
          </h3>

          <div class="w-12 h-1 bg-primary rounded-full"></div>

          <!-- The Solution -->
          <div class="flex flex-col gap-2">
            <span
              class="text-xs font-black tracking-widest text-primary uppercase flex items-center gap-2 font-mono"
            >
              <FileText class="w-4 h-4" strokeWidth={2} />
              The Solution:
            </span>
            <p class="text-base md:text-lg font-bold text-base-content leading-snug">
              {study.solution}
            </p>
          </div>

          <!-- The Impact -->
          <div class="flex flex-col gap-2">
            <span
              class="text-xs font-black tracking-widest text-primary uppercase flex items-center gap-2 font-mono"
            >
              <TrendingUp class="w-4 h-4" strokeWidth={2} />
              The Impact:
            </span>
            <p
              class="text-sm md:text-base text-base-content/80 leading-relaxed text-justify font-medium"
            >
              {study.impact}
            </p>
          </div>
        </div>

        <!-- Mockup Column (Right on desktop) -->
        <div
          class="w-full md:w-[45%] flex items-center justify-center relative overflow-hidden"
        >
          <!-- Subtle decorative radial background flare -->
          <div class="absolute h-48 w-48 rounded-full bg-primary/5 blur-2xl z-0"></div>

          <img
            src={images[study.imageIdx]}
            alt={study.title}
            class="h-[280px] md:h-[380px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 z-10"
            loading="lazy"
          />
        </div>
      </div>
    {/each}
  </div>
</section>
