<script lang="ts">
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
    if (scrollContainer) {
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.9 : 780;
      const gap = 32; // gap-8 is 32px
      const scrollAmount = cardWidth + gap;

      scrollContainer.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }
</script>

<section class="relative bg-base-200/50 py-24 overflow-hidden">
  <div class="container mx-auto px-6">
    <!-- Section Header with Next/Prev navigation buttons -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
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
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onclick={() => scroll('right')}
          aria-label="Next Case Study"
          class="flex h-12 w-12 items-center justify-center rounded-full border border-base-content/15 bg-base-200 text-base-content shadow-sm transition-all duration-300 hover:bg-primary hover:text-primary-content hover:border-primary active:scale-95"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Horizontal scrollable container -->
  <div
    bind:this={scrollContainer}
    class="flex overflow-x-auto gap-8 px-6 md:px-[10vw] pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
  >
    {#each caseStudies as study}
      <div
        class="flex-none w-[90vw] md:w-[780px] bg-base-100 rounded-3xl p-8 md:p-12 border border-base-content/10 shadow-lg snap-start flex flex-col md:flex-row items-center gap-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20"
      >
        <!-- Content Column (Left on desktop) -->
        <div class="w-full md:w-[55%] flex flex-col items-start text-left gap-6 z-10">
          <div class="flex justify-between items-start w-full">
            <h3
              class="text-xl md:text-2xl font-black text-base-content tracking-tight leading-tight max-w-[80%] uppercase font-sans"
            >
              {study.title}
            </h3>

            <!-- Link Icon Circle -->
            <div
              class="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 cursor-pointer hover:bg-primary hover:text-primary-content"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </div>

          <div class="w-12 h-1 bg-primary rounded-full"></div>

          <!-- The Solution -->
          <div class="flex flex-col gap-2">
            <span
              class="text-xs font-black tracking-widest text-primary uppercase flex items-center gap-2 font-mono"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
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
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941"
                />
              </svg>
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

<style>
  /* Hide scrollbar utility scoped directly to the Svelte component */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
