<script lang="ts">
  import { slide } from 'svelte/transition';
  import {
    Server,
    Network,
    Cloud,
    Briefcase,
    ShieldCheck,
    Cctv,
    Monitor,
  } from '@lucide/svelte';

  interface PillarCard {
    iconName: string;
    title: string;
    description: string;
    content: string;
    column: 'left' | 'center' | 'right';
  }

  const iconMap = {
    Briefcase,
    Cctv,
    Cloud,
    Monitor,
    Network,
    Server,
    ShieldCheck,
  };

  let { centerImageSrc, cards }: { centerImageSrc: string; cards: PillarCard[] } =
    $props();

  const pillars = $derived(cards.map((card) => ({
    ...card,
    icon: iconMap[card.iconName as keyof typeof iconMap] ?? Server,
  })));

  let activeIndex = $state(0);
  const AUTOPLAY_INTERVAL = 5000;

  // The order in which pillars should autoplay to create a U-shape loop.
  const autoplaySequence = $derived([0, 1, 2, 3, 6, 5, 4].filter(
    (index) => index < pillars.length,
  ));

  $effect(() => {
    activeIndex;

    const intervalId = setInterval(() => {
      if (autoplaySequence.length === 0) {
        return;
      }

      const currentSeqIndex = autoplaySequence.indexOf(activeIndex);
      const nextSeqIndex = (currentSeqIndex + 1) % autoplaySequence.length;
      activeIndex = autoplaySequence[nextSeqIndex];
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalId);
  });

  const leftPillars = $derived(pillars.filter((p) => p.column === 'left'));
  const centerPillars = $derived(pillars.filter((p) => p.column === 'center'));
  const rightPillars = $derived(pillars.filter((p) => p.column === 'right'));

  const getIconPosition = (index: number) => {
    const positions = [
      'top: 15%; left: 15%;',
      'top: 45%; left: 0%;',
      'top: 75%; left: 15%;',
      'top: 85%; left: 50%; transform: translateX(-50%);',
      'top: 15%; right: 15%;',
      'top: 45%; right: 0%;',
      'top: 75%; right: 15%;',
    ];
    return positions[index] ?? 'top: 50%; left: 50%; transform: translate(-50%, -50%);';
  };
</script>

{#snippet pillarCard(pillar: (typeof pillars)[0])}
  {@const globalIndex = pillars.indexOf(pillar)}
  {@const Icon = pillar.icon}
  <button
    class="relative flex w-full flex-col items-start gap-3 rounded-2xl border p-6 text-left shadow-sm backdrop-blur-md transition-all duration-300 {activeIndex ===
    globalIndex
      ? 'border-primary/30 bg-primary/5 scale-[1.02] shadow-md'
      : 'border-base-content/20 bg-base-content/2 hover:bg-base-300/60'}"
    onclick={() => (activeIndex = globalIndex)}
  >
    <div class="flex-1 w-full overflow-hidden">
      <h3
        class="mb-2 text-2xl font-medium transition-colors {activeIndex === globalIndex
          ? 'text-primary'
          : 'text-base-content/90'}"
      >
        {pillar.title}
      </h3>
      <p
        class="text-base font-medium transition-colors {activeIndex === globalIndex
          ? 'text-base-content/90'
          : 'text-base-content/70'}"
      >
        {pillar.description}
      </p>
      {#if activeIndex === globalIndex}
        <div transition:slide={{ duration: 300 }}>
          <div class="mt-4 border-t border-base-content/10 pt-4">
            <p class="text-sm leading-relaxed text-base-content">
              {pillar.content}
            </p>
          </div>
        </div>
      {/if}

      {#if activeIndex === globalIndex}
        <div
          class="absolute right-0 bottom-0 left-0 h-1 overflow-hidden rounded-b-2xl bg-transparent"
        >
          <div
            class="h-full animate-progress bg-primary/40"
            style="--duration: {AUTOPLAY_INTERVAL}ms;"
          ></div>
        </div>
      {/if}
    </div>
  </button>
{/snippet}

<div class="lg:min-h-[770px]">
  <div
    class="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-stretch"
  >
    <div class="flex w-full flex-col justify-center gap-6 lg:w-1/3">
      {#each leftPillars as pillar}
        {@render pillarCard(pillar)}
      {/each}
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-8 lg:w-1/3">
      <div class="relative flex w-full items-center justify-center">
        <img
          src={centerImageSrc}
          alt="Strategic Pillars"
          class="pointer-events-none max-h-[600px] w-full scale-125 object-contain drop-shadow-2xl lg:scale-150"
          style="-webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%); mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%); filter: var(--filter-invert-dark)"
        />
        {#each pillars as pillar, i}
          {@const Icon = pillar.icon}
          <button
            class="absolute z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 md:h-14 md:w-14 {activeIndex ===
            i
              ? 'border-primary bg-base-100 text-primary scale-110 shadow-lg shadow-primary/25'
              : 'border-base-content/15 bg-base-100 text-base-content/60 hover:scale-105 hover:bg-base-200 hover:text-base-content/90'}"
            style={getIconPosition(i)}
            onclick={() => (activeIndex = i)}
            aria-label={pillar.title}
          >
            {#if activeIndex === i}
              <div class="pointer-events-none absolute inset-0 bg-primary/15"></div>
            {/if}
            <Icon class="relative z-10 h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
          </button>
        {/each}
      </div>
      {#each centerPillars as pillar}
        {@render pillarCard(pillar)}
      {/each}
    </div>

    <div class="flex w-full flex-col justify-center gap-6 lg:w-1/3">
      {#each rightPillars as pillar}
        {@render pillarCard(pillar)}
      {/each}
    </div>
  </div>
</div>
