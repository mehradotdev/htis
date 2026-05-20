<script lang="ts">
  import { ChevronDown, ChevronUp, Calendar } from '@lucide/svelte';
  import { tick } from 'svelte';

  let { photoSrc }: { photoSrc: string } = $props();

  type ItemType = 'award' | 'certificate';

  interface AwardItem {
    id: number;
    type: ItemType;
    title: string;
    organization: string;
    date: string;
  }

  // Generate fake data
  const generateData = (): AwardItem[] => {
    const data: AwardItem[] = [];
    for (let i = 1; i <= 12; i++) {
      data.push({
        id: i,
        type: 'award',
        title: `IT Service Excellence Award ${2026 - Math.floor((i - 1) / 3)}`,
        organization: 'NASSCOM',
        date: `May 15, 2026`,
      });
    }
    for (let i = 1; i <= 12; i++) {
      data.push({
        id: i + 12,
        type: 'certificate',
        title: `Technical Innovation Certificate ${2026 - Math.floor((i - 1) / 3)}`,
        organization: 'NASSCOM',
        date: `June 10, 2026`,
      });
    }
    return data;
  };

  const allItems = generateData();

  let activeTab = $state<'all' | 'award' | 'certificate'>('all');
  let startIndex = $state(0);
  let animKey = $state(0);
  let animDirection = $state<'down' | 'up'>('down');
  let gridEl = $state<HTMLDivElement>();

  $effect(() => {
    animKey; // subscribe
    tick().then(() => {
      if (!gridEl) return;
      gridEl.style.animation = 'none';
      void gridEl.offsetWidth;
      const name = animDirection === 'down' ? 'slideDown' : 'slideUp';
      gridEl.style.animation = `${name} 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    });
  });

  const filteredItems = $derived(
    activeTab === 'all' ? allItems : allItems.filter((item) => item.type === activeTab),
  );

  const visibleItems = $derived.by(() => {
    const items = [];
    const len = filteredItems.length;
    // Show 6 items (2 rows of 3)
    for (let i = 0; i < 6; i++) {
      if (len > 0) {
        items.push(filteredItems[(startIndex + i) % len]);
      }
    }
    return items;
  });

  function handleTabChange(tab: 'all' | 'award' | 'certificate') {
    activeTab = tab;
    startIndex = 0;
    animDirection = 'down';
    animKey++;
  }

  function goUp() {
    if (filteredItems.length === 0) return;
    animDirection = 'up';
    startIndex = (startIndex - 3 + filteredItems.length) % filteredItems.length;
    animKey++;
  }

  function goDown() {
    if (filteredItems.length === 0) return;
    animDirection = 'down';
    startIndex = (startIndex + 3) % filteredItems.length;
    animKey++;
  }
</script>

<div class="flex flex-col gap-4 max-w-6xl mx-auto">
  <!-- Tabs -->
  <div class="flex border-b border-base-300">
    <button
      class="px-8 py-3 text-base font-medium transition-colors relative {activeTab ===
      'all'
        ? 'text-primary'
        : 'text-base-content/60 hover:text-base-content'}"
      onclick={() => handleTabChange('all')}
    >
      All
      {#if activeTab === 'all'}
        <div class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"></div>
      {/if}
    </button>
    <button
      class="px-8 py-3 text-base font-medium transition-colors relative {activeTab ===
      'award'
        ? 'text-primary'
        : 'text-base-content/60 hover:text-base-content'}"
      onclick={() => handleTabChange('award')}
    >
      Awards
      {#if activeTab === 'award'}
        <div class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"></div>
      {/if}
    </button>
    <button
      class="px-8 py-3 text-base font-medium transition-colors relative {activeTab ===
      'certificate'
        ? 'text-primary'
        : 'text-base-content/60 hover:text-base-content'}"
      onclick={() => handleTabChange('certificate')}
    >
      Certificates
      {#if activeTab === 'certificate'}
        <div class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"></div>
      {/if}
    </button>
  </div>

  <!-- Grid -->
  <div
    bind:this={gridEl}
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
  >
    {#each visibleItems as item}
      <div
        class="bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden"
      >
        <div class="p-2.5 pb-0">
          <img
            src={photoSrc}
            alt={item.title}
            class="w-full max-h-[180px] object-contain rounded-lg bg-base-200/30"
          />
        </div>
        <div class="px-3 pt-2 pb-3">
          <h3 class="text-sm font-bold text-base-content leading-snug">{item.title}</h3>
          <p class="text-primary font-medium text-xs mt-0.5">{item.organization}</p>
          <div class="flex items-center text-base-content/50 text-xs font-medium mt-1.5">
            <Calendar size={14} class="mr-1.5" />
            {item.date}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Pagination / Navigation -->
  <div class="flex justify-between items-center bg-base-200/60 rounded-xl p-2.5">
    <button
      class="btn btn-circle btn-sm bg-primary/20 text-primary hover:bg-primary/30 border-none"
      onclick={goUp}
      aria-label="Go up a row"
    >
      <ChevronUp size={18} />
    </button>

    <div class="flex items-center gap-4">
      <span class="text-base-content/60 font-medium">load more</span>
      <button
        class="btn btn-circle btn-sm btn-primary border-none text-white hover:bg-primary/90"
        onclick={goDown}
        aria-label="Go down a row"
      >
        <ChevronDown size={18} />
      </button>
    </div>
  </div>
</div>

<style>
  /* 
    The keyframes must be declared :global because Svelte's scoped compiler hashes 
    any style/keyframe names declared here by default. Since we are dynamically applying 
    the animation via JavaScript inline style assignment (gridEl.style.animation) 
    in the $effect above, Svelte cannot statically analyze that the keyframes are used, 
    and would otherwise hash/strip them, making them unreachable from our JS.
  */
  :global {
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
