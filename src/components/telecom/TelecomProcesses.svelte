<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TelecomProcess } from '~/data/pageDataTelecom';

  let { processes, images }: { processes: TelecomProcess[]; images: string[] } = $props();

  let activeIndex = $state(0);

  const AUTOPLAY_INTERVAL = 5000;

  // Autoplay: reset timer on every activeIndex change (including manual clicks)
  $effect(() => {
    activeIndex;

    const intervalId = setInterval(() => {
      activeIndex = (activeIndex + 1) % processes.length;
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalId);
  });
</script>

<section class="relative bg-base-100 pb-24 pt-24 md:pb-32 md:pt-32">
  <div class="container mx-auto px-6">
    <!-- Main Heading -->
    <h2
      class="mb-10 text-center text-4xl leading-tight font-medium tracking-tight text-base-content md:mb-16 md:text-5xl lg:text-6xl max-w-5xl mx-auto"
    >
      Telecom Processes &mdash; <br class="md:hidden" />
      <span class="italic font-light text-base-content/80">Blueprint to Reality.</span>
    </h2>

    <!-- Two Column Layout -->
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
      <!-- Left: Vertical Stepper -->
      <div class="w-full lg:w-[38%] flex-shrink-0">
        <nav class="relative flex flex-col" aria-label="Process steps">
          <!-- Timeline track (full grey line) -->
          <div
            class="absolute left-[1.19rem] top-7 bottom-7 w-[2px] bg-base-300 pointer-events-none rounded-full"
          ></div>

          <!-- Timeline progress fill (green up to active step) -->
          <div
            class="absolute left-[1.19rem] top-7 w-[2px] bg-primary pointer-events-none rounded-full transition-all duration-500 ease-out"
            style="height: {activeIndex === 0
              ? '0px'
              : `calc(${(activeIndex / (processes.length - 1)) * 100}% - 3.5rem)`}"
          ></div>

          {#each processes as process, i}
            <button
              onclick={() => (activeIndex = i)}
              class="group relative flex items-center gap-4 text-left py-3.5 pl-4 pr-5 rounded-xl cursor-pointer transition-all duration-300
                {activeIndex === i
                ? 'bg-base-200/70 border-l-[3px] border-l-primary'
                : 'border-l-[3px] border-l-transparent hover:bg-base-200/30'}"
              aria-current={activeIndex === i ? 'step' : undefined}
            >
              <!-- Number circle -->
              <span
                class="relative z-10 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  {activeIndex === i
                  ? 'bg-primary text-primary-content shadow-md shadow-primary/25'
                  : i < activeIndex
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-base-100 text-base-content/50 border border-base-300 group-hover:border-primary/30'}"
              >
                {process.id}
              </span>

              <!-- Title (hidden on mobile/tablet, visible on lg+) -->
              <span
                class="hidden lg:inline text-[0.94rem] font-medium leading-snug transition-colors duration-300
                  {activeIndex === i
                  ? 'text-base-content'
                  : 'text-base-content/55 group-hover:text-base-content/80'}"
              >
                {process.title}
              </span>

              <!-- Autoplay progress bar on active step -->
              {#if activeIndex === i}
                <div
                  class="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-xl bg-transparent"
                >
                  <div
                    class="h-full bg-primary/40 animate-progress"
                    style="--duration: {AUTOPLAY_INTERVAL}ms;"
                  ></div>
                </div>
              {/if}
            </button>
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
                class="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold"
              >
                {processes[activeIndex].id}
              </span>
              <h3
                class="text-xl md:text-2xl xl:text-[1.7rem] font-bold text-base-content leading-snug"
              >
                {processes[activeIndex].title}
              </h3>
            </div>

            <!-- Description -->
            <p
              class="text-base text-base-content/65 font-light mb-6 lg:mb-8 text-center max-w-xl mx-auto leading-relaxed"
            >
              {processes[activeIndex].description}
            </p>

            <!-- Details + Image Grid -->
            <div class="flex flex-col md:flex-row gap-6 lg:gap-8">
              <!-- Details -->
              <div class="flex-1 min-w-0">
                <ul class="flex flex-col gap-4">
                  {#each processes[activeIndex].details as detail}
                    <li class="flex flex-col gap-0.5">
                      <strong class="text-sm font-semibold tracking-wide text-base-content/90">
                        {detail.name}
                      </strong>
                      <span class="text-sm font-light leading-relaxed text-base-content/60">
                        {detail.desc}
                      </span>
                    </li>
                  {/each}
                </ul>
              </div>

              <!-- Image -->
              <div
                class="w-full md:w-[42%] flex-shrink-0 rounded-2xl overflow-hidden aspect-[3/4] bg-base-300/30"
              >
                {#key activeIndex}
                  <img
                    in:fade={{ duration: 500, delay: 100 }}
                    src={images[activeIndex]}
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
  </div>
</section>
