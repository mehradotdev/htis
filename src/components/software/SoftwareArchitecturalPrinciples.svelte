<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { SoftwareArchitecturalPrincipleItem } from '~/data/cms';

  interface Props {
    backgroundImageSrc?: string;
    heading: string;
    description: string;
    items: SoftwareArchitecturalPrincipleItem[];
  }

  let {
    backgroundImageSrc = '',
    heading,
    description,
    items: principles,
  }: Props = $props();

  let activeIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;
  let tabsContainer = $state<HTMLDivElement | null>(null);

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
    if (!principles.length) return;
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

  $effect(() => {
    if (activeIndex >= principles.length) {
      activeIndex = 0;
    }
  });

  function selectTab(index: number) {
    activeIndex = index;
    startInterval();
  }
</script>

<section class="relative overflow-hidden border-t border-base-content/10 bg-base-100 py-24">
  {#if backgroundImageSrc}
    <div class="pointer-events-none absolute inset-0 z-0 opacity-20">
      <img
        src={backgroundImageSrc}
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
        {heading}
      </h2>
      <p class="mt-4 text-lg font-medium text-base-content/70">
        {description}
      </p>
    </div>

    {#if principles.length}
      <div class="relative w-full">
        <div
          bind:this={tabsContainer}
          class="no-scrollbar relative flex w-full flex-nowrap gap-3 overflow-x-auto scroll-smooth pb-5 md:gap-4 lg:grid lg:grid-cols-5"
        >
          {#each principles as principle, i}
            <button
              onclick={() => selectTab(i)}
              class="relative flex min-h-[96px] w-[185px] shrink-0 cursor-pointer items-center justify-center rounded-2xl border px-3.5 pt-8 pb-6 text-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:min-h-[108px] md:w-[240px] md:px-6 md:pt-10 md:pb-8 lg:w-auto
                {activeIndex === i
                ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary font-semibold shadow-md'
                : 'border-base-content/10 bg-base-200/30 text-base-content/70 hover:bg-base-200/60 hover:border-base-content/20 hover:text-base-content'}"
            >
              <div
                class="absolute top-0 right-0 left-0 h-[6px] overflow-hidden rounded-t-[14px] bg-primary/10"
              >
                {#if activeIndex === i}
                  <div
                    class="h-full animate-progress bg-primary"
                    style="--duration: 6000ms;"
                  ></div>
                {:else}
                  <div class="h-full bg-primary/30"></div>
                {/if}
              </div>

              <span class="text-sm leading-snug font-medium md:text-lg lg:text-xl">
                {principle.title}
              </span>

              {#if activeIndex === i}
                <div
                  class="absolute top-full left-1/2 z-10 mt-[-1px] h-0 w-0 -translate-x-1/2 border-t-[12px] border-r-[14px] border-l-[14px] border-t-primary border-r-transparent border-l-transparent"
                ></div>
              {/if}
            </button>
          {/each}
        </div>

        <div
          class="relative mt-2 flex min-h-[160px] items-center overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 p-8 shadow-lg md:min-h-[140px] md:p-12 dark:bg-base-200/40"
        >
          <div
            class="pointer-events-none absolute top-0 right-0 bottom-0 w-1/3 overflow-hidden rounded-r-3xl opacity-25 dark:opacity-10"
          >
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dot-grid-principles"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" class="text-primary" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid-principles)" />
            </svg>
          </div>

          <div class="relative z-10 w-full pr-8">
            {#key activeIndex}
              <div
                in:fade={{ duration: 250 }}
                class="text-justify text-lg leading-relaxed font-normal text-base-content/85 md:text-xl"
              >
                {principles[activeIndex]?.description}
              </div>
            {/key}
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
