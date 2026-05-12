<script lang="ts">
  import { fade } from 'svelte/transition';
  import {
    ShieldCheck,
    UserCheck,
    HeartHandshake,
    Briefcase,
    FileSignature,
    BookOpen,
    Fingerprint,
    Map,
    Users,
    Target,
    ArrowRight,
  } from '@lucide/svelte';

  let { images = [] }: { images?: string[] } = $props();

  const tabs = [
    {
      title:
        'Actionable AI for approving hiring, payroll, IT flows. More scaling, not headcount.',
    },
    {
      title:
        'Centralized operations control Manage requests, replacements, and issue resolution from one system',
    },
    {
      title: 'Track deployment, attendance, and site activity across locations',
    },
  ];

  const tools = [
    { name: 'Endpoint Protection', icon: ShieldCheck, color: 'text-purple-400' },
    { name: 'PEO', icon: UserCheck, color: 'text-orange-400' },
    { name: 'Engage', icon: HeartHandshake, color: 'text-blue-400' },
    { name: 'Device Lifecycle Management', icon: Briefcase, color: 'text-teal-400' },
    { name: 'Deel Benefits', icon: FileSignature, color: 'text-indigo-400' },
    { name: 'Deel Mobility', icon: Map, color: 'text-cyan-400' },
    { name: 'Mobile Device Management', icon: ShieldCheck, color: 'text-red-400' },
    { name: 'Talent', icon: Target, color: 'text-yellow-400' },
    { name: 'Background Checks', icon: Fingerprint, color: 'text-green-400' },
    { name: 'Equity Consulting', icon: Briefcase, color: 'text-pink-400' },
    { name: 'Workforce Planning', icon: Users, color: 'text-blue-300' },
    { name: 'Contractor', icon: UserCheck, color: 'text-orange-300' },
  ];

  let activeIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;

  function startInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % tabs.length;
    }, 5000);
  }

  $effect(() => {
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

<div class="rounded-[2.5rem] bg-[#2A4839] p-8 md:p-12 lg:p-16 text-white shadow-2xl">
  <h2 class="mb-10 text-3xl font-bold md:text-4xl lg:text-5xl">
    One modern experience for today’s workforce
  </h2>

  <!-- Tabs -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
    {#each tabs as tab, i}
      <button
        class="text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden {activeIndex ===
        i
          ? 'bg-white/10 border-white/30 shadow-lg'
          : 'border-white/10 hover:border-white/20 bg-transparent'}"
        onclick={() => selectTab(i)}
      >
        {#if activeIndex === i}
          <!-- Progress bar effect -->
          <div class="absolute inset-y-0 left-0 bg-white/5 animate-fill-bg"></div>
          <div class="absolute bottom-0 left-0 h-1 bg-[#64D9A1] animate-fill-bg"></div>
        {/if}
        <p
          class="text-sm md:text-base font-medium opacity-90 leading-relaxed relative z-10"
        >
          {tab.title}
        </p>
      </button>
    {/each}
  </div>

  <!-- Image Display -->
  <div
    class="relative w-full rounded-2xl overflow-hidden bg-white/5 aspect-video lg:aspect-[2.3/1]"
  >
    {#key activeIndex}
      {#if images.length > 0}
        <img
          src={images[activeIndex] || images[0]}
          alt="Platform Preview"
          class="absolute inset-0 w-full h-full object-cover"
          transition:fade={{ duration: 700 }}
        />
      {/if}
    {/key}
  </div>

  <!-- Bottom Section overlaying the image -->
  <div
    class="relative z-10 -mt-12 md:-mt-20 lg:-mt-28 mx-4 md:mx-6 lg:mx-8 bg-black/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 justify-between items-center border border-white/10 shadow-2xl"
  >
    <div class="lg:w-1/3">
      <h3 class="text-lg md:text-xl font-bold mb-4 leading-tight text-white">
        Built on in-house infrastructure, with single payroll engines, owned entities, and
        more.
      </h3>
      <a
        href="/#tools"
        class="text-[#64D9A1] font-medium flex items-center gap-2 hover:text-[#4BBE8A] transition-colors"
      >
        View all tools
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

    <div class="lg:w-2/3 flex flex-wrap gap-3 justify-end items-center">
      {#each tools as tool}
        {@const Icon = tool.icon}
        <div
          class="flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-4 py-2.5 text-xs md:text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer text-white/90 backdrop-blur-md"
        >
          <Icon size={16} class={tool.color} />
          {tool.name}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @keyframes fillBg {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  .animate-fill-bg {
    animation: fillBg 5s linear forwards;
  }
</style>
