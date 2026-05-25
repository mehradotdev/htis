<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TelecomProcess } from '~/data/pageDataTelecom';

  let { processes, images }: { processes: TelecomProcess[]; images: string[] } = $props();

  let activeIndex = $state(0);
  let itemRefs = $state<HTMLElement[]>([]);

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            activeIndex = index;
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Exact vertical center
        threshold: 0,
      },
    );

    itemRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  });
</script>

<section class="relative bg-base-100 pb-32 pt-24 md:pt-32">
  <div class="container mx-auto px-6">
    <!-- Main Heading -->
    <h2
      class="mb-10 md:mb-12 text-center text-4xl text-base-content md:text-5xl lg:text-6xl max-w-5xl mx-auto leading-tight font-medium tracking-tight"
    >
      Telecom Processes &mdash; <br class="md:hidden" />
      <span class="italic font-light text-base-content/80">Blueprint to Reality.</span>
    </h2>

    <div class="relative w-full">
      <!-- Sticky Content Area (The "Clipped" Section) -->
      <div
        class="sticky top-20 lg:top-28 w-full h-[85vh] lg:h-[75vh] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16 z-10 bg-base-200/40 rounded-3xl p-6 lg:p-12 overflow-hidden shadow-sm border border-base-content/5"
      >
        <!-- Left Side: Text Container -->
        <div class="relative w-full flex-1 lg:h-full lg:w-1/2 overflow-hidden">
          <div
            class="h-full w-full flex flex-col transition-transform duration-700 ease-out"
            style="transform: translateY(-{activeIndex * 100}%);"
          >
            {#each processes as process, i}
              <div
                class="w-full h-full shrink-0 flex flex-col justify-center transition-opacity duration-700"
                class:opacity-100={activeIndex === i}
                class:opacity-10={activeIndex !== i}
                class:pointer-events-auto={activeIndex === i}
                class:pointer-events-none={activeIndex !== i}
              >
                <!-- Title -->
                <h3
                  class="mb-4 text-2xl font-medium text-base-content md:mb-6 md:text-3xl lg:text-4xl"
                >
                  {process.title}
                </h3>

                <!-- Description -->
                <p
                  class="mb-6 text-base leading-relaxed font-light text-base-content/70 md:mb-8 md:text-lg lg:text-xl"
                >
                  {process.description}
                </p>

                <!-- Details List -->
                {#if process.details && process.details.length > 0}
                  <ul
                    class="flex flex-col gap-3 pl-4 border-l-2 border-primary/20 md:gap-4"
                  >
                    {#each process.details as detail}
                      <li class="flex flex-col">
                        <strong
                          class="text-sm font-semibold tracking-wide text-base-content/90"
                        >
                          {detail.name}
                        </strong>
                        <span
                          class="text-sm font-light leading-relaxed text-base-content/60"
                        >
                          {detail.desc}
                        </span>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Right Side: Image Container -->
        <div
          class="relative w-full h-[30vh] lg:h-full lg:w-1/2 rounded-2xl lg:rounded-4xl overflow-hidden bg-base-100 shadow-md"
        >
          {#key activeIndex}
            <img
              in:fade={{ duration: 600, delay: 100 }}
              out:fade={{ duration: 600 }}
              src={images[activeIndex]}
              alt={processes[activeIndex].title}
              class="absolute inset-0 h-full w-full object-cover object-center"
            />
          {/key}
        </div>
      </div>

      <!-- Scroll Spacers for IntersectionObserver (giving the container its scroll height) -->
      <div class="-mt-[85vh] lg:-mt-[75vh] w-full pointer-events-none">
        <!-- Offset for the first item -->
        <div class="h-[40vh]"></div>
        {#each processes as _, i}
          <div class="h-[80vh] w-full" bind:this={itemRefs[i]} data-index={i}></div>
        {/each}
        <!-- Extra space at the bottom to ensure the last item triggers smoothly -->
        <div class="h-[40vh]"></div>
      </div>
    </div>
  </div>
</section>
