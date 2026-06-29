<script lang="ts">
  import { fade } from 'svelte/transition';
  import {
    Database,
    BookOpen,
    Users,
    Banknote,
    Cloud,
    Layout,
    ShieldCheck,
    Plug,
    FileCheck,
    Activity,
    Network,
    Server,
    Shield,
    ClipboardList,
    MonitorSmartphone,
    Fingerprint,
    Building,
    Lock,
    HardDrive,
    Award,
    Radio,
    Signal,
    Cable,
    FileCode,
    Headset,
    Scale,
    Wrench,
    MapPin,
    Route,
    ArrowRight,
  } from '@lucide/svelte';

  type WorkforceTool = {
    iconName: string;
    name: string;
  };

  type WorkforceTab = {
    title: string;
    description: string;
    image: string;
    tools: WorkforceTool[];
  };

  type Workforce = {
    heading: string;
    ctaLabel: string;
    ctaUrl: string;
    tabs: WorkforceTab[];
  };

  const iconMap = {
    Database,
    BookOpen,
    Users,
    Banknote,
    Cloud,
    Layout,
    ShieldCheck,
    Plug,
    FileCheck,
    Activity,
    Network,
    Server,
    Shield,
    ClipboardList,
    MonitorSmartphone,
    Fingerprint,
    Building,
    Lock,
    HardDrive,
    Award,
    Radio,
    Signal,
    Cable,
    FileCode,
    Headset,
    Scale,
    Wrench,
    MapPin,
    Route,
  };

  const iconColors = [
    'text-purple-400',
    'text-orange-400',
    'text-blue-400',
    'text-teal-400',
    'text-indigo-400',
    'text-pink-400',
    'text-green-400',
    'text-yellow-400',
    'text-cyan-400',
    'text-red-400',
  ];

  let { workforce }: { workforce: Workforce } = $props();

  let activeIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;
  const AUTOPLAY_INTERVAL_MS = 7000;

  const tabs = $derived(workforce.tabs);
  const activeTab = $derived(tabs[activeIndex] ?? tabs[0]);

  function resolveIcon(iconName: string) {
    return iconMap[iconName as keyof typeof iconMap] ?? Database;
  }

  function startInterval() {
    clearInterval(interval);

    if (tabs.length <= 1) {
      return;
    }

    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % tabs.length;
    }, AUTOPLAY_INTERVAL_MS);
  }

  $effect(() => {
    if (activeIndex >= tabs.length) {
      activeIndex = 0;
    }

    startInterval();
    return () => {
      clearInterval(interval);
    };
  });

  function selectTab(index: number) {
    activeIndex = index;
    startInterval();
  }
</script>

<div class="rounded-[2.5rem] bg-[#2A4839] p-8 text-white shadow-2xl md:p-12 lg:p-16">
  <h2 class="mb-10 text-3xl font-bold md:text-4xl lg:text-5xl">
    {workforce.heading}
  </h2>

  {#if tabs.length > 0 && activeTab}
    <div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
      {#each tabs as tab, i}
        <button
          class="relative cursor-pointer overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 {activeIndex ===
          i
            ? 'border-white/30 bg-white/10 shadow-lg'
            : 'border-white/10 bg-transparent hover:border-white/20'}"
          onclick={() => selectTab(i)}
        >
          {#if activeIndex === i}
            <div
              class="animate-fill-bg absolute inset-y-0 left-0 bg-white/5"
              style="--duration: {AUTOPLAY_INTERVAL_MS}ms;"
            ></div>
            <div
              class="animate-fill-bg absolute bottom-0 left-0 h-1 bg-[#64D9A1]"
              style="--duration: {AUTOPLAY_INTERVAL_MS}ms;"
            ></div>
          {/if}
          <h3 class="text-2xl">
            {tab.title}
          </h3>
        </button>
      {/each}
    </div>

    <div
      class="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5 lg:aspect-[2.3/1]"
    >
      {#key activeIndex}
        <img
          src={activeTab.image}
          alt={activeTab.title}
          class="absolute inset-0 h-full w-full object-cover"
          transition:fade={{ duration: 700 }}
        />
      {/key}
    </div>

    <div
      class="relative z-10 mx-4 -mt-12 flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-xl md:mx-6 md:-mt-20 lg:mx-8 lg:-mt-28 lg:flex-row lg:p-8"
    >
      <div class="lg:w-1/3">
        <h3 class="mb-4 text-lg leading-tight font-bold text-white md:text-xl">
          {#key activeIndex}
            <span class="inline-block" in:fade={{ duration: 300 }}>
              {activeTab.description}
            </span>
          {/key}
        </h3>
        <a
          href={workforce.ctaUrl}
          class="flex items-center gap-2 font-medium text-[#64D9A1] transition-colors hover:text-[#4BBE8A]"
        >
          {workforce.ctaLabel}
          <ArrowRight class="h-4 w-4" />
        </a>
      </div>

      <div class="flex flex-wrap items-center justify-end gap-3 lg:w-2/3">
        {#key activeIndex}
          <div
            class="flex flex-wrap items-center justify-end gap-3"
            in:fade={{ duration: 300 }}
          >
            {#each activeTab.tools as tool, toolIndex}
              {@const Icon = resolveIcon(tool.iconName)}
              <div
                class="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 text-xs font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-white/10 md:text-sm"
              >
                <Icon size={16} class={iconColors[toolIndex % iconColors.length]} />
                {tool.name}
              </div>
            {/each}
          </div>
        {/key}
      </div>
    </div>
  {/if}
</div>
