<script lang="ts">
  import { ChevronDown, ChevronUp, Calendar } from '@lucide/svelte';
  import { tick } from 'svelte';

  type ItemType = 'award' | 'certificate';

  interface AwardItem {
    id: number;
    type: ItemType;
    title: string;
    organization: string;
    date: string;
    src: string;
  }

  let { items = [] }: { items: AwardItem[] } = $props();

  let activeTab = $state<'all' | 'award' | 'certificate'>('all');
  let startIndex = $state(0);
  let animKey = $state(0);
  let animDirection = $state<'down' | 'up'>('down');
  let gridEl = $state<HTMLDivElement>();
  let selectedItem = $state<AwardItem | null>(null);
  let dialogEl = $state<HTMLDialogElement>();

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

  $effect(() => {
    if (selectedItem) {
      dialogEl?.showModal();
    } else {
      dialogEl?.close();
    }
  });

  const filteredItems = $derived(
    activeTab === 'all' ? items : items.filter((item) => item.type === activeTab),
  );

  const visibleItems = $derived.by(() => {
    const res = [];
    const len = filteredItems.length;
    // Show 6 items (2 rows of 3)
    for (let i = 0; i < 6; i++) {
      if (len > 0) {
        res.push(filteredItems[(startIndex + i) % len]);
      }
    }
    return res;
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
      class="px-8 py-3 text-base font-medium transition-colors relative cursor-pointer {activeTab ===
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
      class="px-8 py-3 text-base font-medium transition-colors relative cursor-pointer {activeTab ===
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
      class="px-8 py-3 text-base font-medium transition-colors relative cursor-pointer {activeTab ===
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
      <button
        class="bg-base-100 rounded-xl shadow-xs border border-base-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col text-left w-full outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onclick={() => selectedItem = item}
        aria-haspopup="dialog"
      >
        <div class="p-2.5 pb-0 w-full">
          <img
            src={item.src}
            alt={item.title}
            class="w-full aspect-square object-cover rounded-lg bg-base-200/30 transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
        <div class="px-3 pt-3 pb-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-sm font-bold text-base-content leading-snug line-clamp-2">{item.title}</h3>
            <p class="text-primary font-medium text-xs mt-1">{item.organization}</p>
          </div>
          <div class="flex items-center text-base-content/50 text-xs font-medium mt-3">
            <Calendar size={14} class="mr-1.5" />
            {item.date}
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Pagination / Navigation -->
  <div class="flex justify-between items-center bg-base-200/60 rounded-xl p-2.5">
    <button
      class="btn btn-circle btn-sm bg-primary/20 text-primary hover:bg-primary/30 border-none cursor-pointer"
      onclick={goUp}
      aria-label="Go up a row"
    >
      <ChevronUp size={18} />
    </button>

    <div class="flex items-center gap-4">
      <span class="text-base-content/60 font-medium">load more</span>
      <button
        class="btn btn-circle btn-sm btn-primary border-none text-white hover:bg-primary/90 cursor-pointer"
        onclick={goDown}
        aria-label="Go down a row"
      >
        <ChevronDown size={18} />
      </button>
    </div>
  </div>
</div>

<!-- Modal Popup for Full Image View -->
<dialog bind:this={dialogEl} class="modal" onclose={() => selectedItem = null}>
  {#if selectedItem}
    <div
      class="modal-box max-w-4xl bg-base-100 p-0 overflow-hidden relative flex flex-col items-center justify-center border border-base-300 shadow-2xl"
    >
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-50 text-base-content hover:bg-base-300/40 cursor-pointer"
        onclick={() => selectedItem = null}
        aria-label="Close modal"
      >
        ✕
      </button>
      
      <div class="w-full max-h-[70vh] md:max-h-[75vh] overflow-hidden flex items-center justify-center p-4 bg-black/5">
        <img
          src={selectedItem.src}
          alt={selectedItem.title}
          class="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain rounded-md shadow-md"
        />
      </div>
      
      <div class="w-full p-5 bg-base-200/70 border-t border-base-200 text-left">
        <span class="badge badge-primary badge-outline text-[10px] font-semibold tracking-wider uppercase mb-2">
          {selectedItem.type}
        </span>
        <h3 class="text-lg font-bold text-base-content leading-snug">{selectedItem.title}</h3>
        <p class="text-primary font-semibold text-xs mt-1">{selectedItem.organization}</p>
        <div class="flex items-center text-base-content/60 text-xs font-medium mt-3.5">
          <Calendar size={14} class="mr-2" />
          {selectedItem.date}
        </div>
      </div>
    </div>
    
    <form method="dialog" class="modal-backdrop bg-black/60 backdrop-blur-xs">
      <button onclick={() => selectedItem = null}>close</button>
    </form>
  {/if}
</dialog>

