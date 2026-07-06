<script lang="ts">
  import CmsIconSvelte from '~/components/CmsIconSvelte.svelte';

  interface ScrollCardItem {
    iconName?: string;
    title: string;
    text?: string;
    textHtml?: string;
  }

  let {
    items = [],
    ariaLabel = 'Scrollable cards',
    eyebrow,
    title,
    descriptionHtml,
    eyebrowClass = 'text-primary',
  }: {
    items?: ScrollCardItem[];
    ariaLabel?: string;
    eyebrow?: string;
    title?: string;
    descriptionHtml?: string;
    eyebrowClass?: string;
  } = $props();

  const MIN_CARD_W = 240;
  const MAX_CARD_W = 320;
  const GAP = 24;
  const STICKY_TOP = 96;

  let sectionEl = $state<HTMLElement>();
  let stickyEl = $state<HTMLElement>();
  let stageEl = $state<HTMLElement>();
  let viewportWidth = $state(0);
  let stickyHeight = $state(360);
  let progress = $state(0);

  let count = $derived(items.length);
  let cardWidth = $derived(
    Math.round(Math.min(MAX_CARD_W, Math.max(MIN_CARD_W, viewportWidth * 0.72))),
  );
  let travel = $derived(Math.max(0, (count - 1) * (cardWidth + GAP)));
  let sectionHeight = $derived(`${stickyHeight + travel}px`);
  let trackX = $derived(viewportWidth / 2 - cardWidth / 2 - progress * travel);
  let activeIndex = $derived(count <= 1 ? 0 : Math.round(progress * (count - 1)));

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function measure() {
    viewportWidth = stageEl?.clientWidth ?? 0;
    stickyHeight = stickyEl?.offsetHeight ?? stickyHeight;
  }

  function updateProgress() {
    if (!sectionEl) return;

    const rect = sectionEl.getBoundingClientRect();
    progress = travel > 0 ? clamp((STICKY_TOP - rect.top) / travel, 0, 1) : 0;
  }

  $effect(() => {
    measure();
    updateProgress();

    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', updateProgress);
    };
  });
</script>

{#if count > 0}
  <div
    bind:this={sectionEl}
    class="t6-scroll-section relative -mx-6 md:mx-0"
    style:height={sectionHeight}
    role="region"
    aria-label={ariaLabel}
  >
    <div bind:this={stickyEl} class="sticky top-24 overflow-hidden pt-2 pb-8">
      <div
        class="mx-auto mb-6 flex max-w-4xl flex-col items-center gap-4 px-6 text-center"
      >
        {#if eyebrow}
          <div
            class="text-xs font-bold tracking-widest uppercase md:text-sm {eyebrowClass}"
          >
            {eyebrow}
          </div>
        {/if}

        {#if title}
          <h2
            class="max-w-3xl text-3xl font-extrabold tracking-tight text-base-content md:text-4xl"
          >
            {title}
          </h2>
        {/if}

        {#if descriptionHtml}
          <p class="max-w-3xl text-sm leading-relaxed text-base-content/75 md:text-base">
            {@html descriptionHtml}
          </p>
        {/if}
      </div>

      <div bind:this={stageEl} class="relative w-full overflow-hidden pt-6 pb-4">
        <div
          class="t6-scroll-track flex items-center gap-6 will-change-transform"
          style:transform={`translate3d(${trackX}px, 0, 0)`}
        >
          {#each items as card, cardIndex}
            {@const isActive = activeIndex === cardIndex}
            <article
              class="group relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border p-7 text-center transition-all duration-300 md:p-8 {isActive
                ? 'z-10 h-[340px] border-primary/30 bg-primary/5 shadow-xl shadow-primary/10'
                : 'z-0 h-[300px] border-base-content/10 bg-base-100/50 shadow-sm hover:border-base-content/20'}"
              style:width={`${cardWidth}px`}
              style:transform={isActive ? 'scale(1.08)' : 'scale(0.92)'}
              aria-current={isActive ? 'true' : undefined}
            >
              <div class="flex h-full flex-col items-center justify-center gap-5">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm transition-transform duration-300 {isActive
                    ? 'scale-105'
                    : 'group-hover:scale-105'}"
                >
                  <CmsIconSvelte name={card.iconName ?? 'ShieldCheck'} class="h-7 w-7" />
                </div>

                {#if card.title}
                  <h3
                    class="max-w-[15rem] text-xl font-medium tracking-tight text-base-content md:text-2xl"
                  >
                    {card.title}
                  </h3>
                {/if}

                {#if card.textHtml || card.text}
                  <p
                    class="max-w-[15rem] text-sm leading-relaxed text-base-content/70 md:text-base"
                  >
                    {@html card.textHtml ?? card.text}
                  </p>
                {/if}
              </div>
            </article>
          {/each}
        </div>

        <div class="mt-8 flex items-center justify-center gap-1">
          {#each items as _, cardIndex}
            <span
              class="block rounded-full transition-all duration-300 {activeIndex ===
              cardIndex
                ? 'h-2.5 w-2.5 bg-primary'
                : 'h-1.5 w-1.5 bg-primary/25'}"
              aria-hidden="true"
            ></span>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
