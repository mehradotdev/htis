<script lang="ts">
  import { ChevronDown, ChevronUp, Calendar } from '@lucide/svelte';
  import { fade } from 'svelte/transition';

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

  const filteredItems = $derived(
    activeTab === 'all' ? allItems : allItems.filter((item) => item.type === activeTab),
  );

  const visibleItems = $derived.by(() => {
    const items = [];
    const len = filteredItems.length;
    // Show 9 items (3 rows of 3)
    for (let i = 0; i < 9; i++) {
      if (len > 0) {
        items.push(filteredItems[(startIndex + i) % len]);
      }
    }
    return items;
  });

  function handleTabChange(tab: 'all' | 'award' | 'certificate') {
    activeTab = tab;
    startIndex = 0;
  }

  function goUp() {
    if (filteredItems.length === 0) return;
    startIndex = (startIndex - 3 + filteredItems.length) % filteredItems.length;
  }

  function goDown() {
    if (filteredItems.length === 0) return;
    startIndex = (startIndex + 3) % filteredItems.length;
  }
</script>

<div class="flex flex-col gap-10">
  <!-- Tabs -->
  <div class="flex border-b border-base-300">
    <button
      class="px-10 py-4 text-lg font-medium transition-colors relative {activeTab ===
      'all'
        ? 'text-primary'
        : 'text-base-content/60 hover:text-base-content'}"
      onclick={() => handleTabChange('all')}
    >
      All
      {#if activeTab === 'all'}
        <div
          class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
          transition:fade={{ duration: 200 }}
        ></div>
      {/if}
    </button>
    <button
      class="px-10 py-4 text-lg font-medium transition-colors relative {activeTab ===
      'award'
        ? 'text-primary'
        : 'text-base-content/60 hover:text-base-content'}"
      onclick={() => handleTabChange('award')}
    >
      Awards
      {#if activeTab === 'award'}
        <div
          class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
          transition:fade={{ duration: 200 }}
        ></div>
      {/if}
    </button>
    <button
      class="px-10 py-4 text-lg font-medium transition-colors relative {activeTab ===
      'certificate'
        ? 'text-primary'
        : 'text-base-content/60 hover:text-base-content'}"
      onclick={() => handleTabChange('certificate')}
    >
      Certificates
      {#if activeTab === 'certificate'}
        <div
          class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
          transition:fade={{ duration: 200 }}
        ></div>
      {/if}
    </button>
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each visibleItems as item (item.id + '-' + activeTab + '-' + startIndex)}
      <div
        class="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden"
        transition:fade={{ duration: 300 }}
      >
        <div class="p-4 pb-0">
          <img
            src={photoSrc}
            alt={item.title}
            class="w-full h-auto object-cover rounded-xl"
          />
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-base-content mb-1">{item.title}</h3>
          <p class="text-primary font-medium mb-4">{item.organization}</p>
          <div class="flex items-center text-base-content/50 text-sm font-medium">
            <Calendar size={16} class="mr-2" />
            {item.date}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Pagination / Navigation -->
  <div class="flex justify-between items-center bg-base-200/60 rounded-2xl p-4 mt-2">
    <button
      class="btn btn-circle bg-primary/20 text-primary hover:bg-primary/30 border-none"
      onclick={goUp}
      aria-label="Go up a row"
    >
      <ChevronUp size={24} />
    </button>

    <div class="flex items-center gap-4">
      <span class="text-base-content/60 font-medium">Scroll to load more</span>
      <button
        class="btn btn-circle btn-primary border-none text-white hover:bg-primary/90"
        onclick={goDown}
        aria-label="Go down a row"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  </div>
</div>
