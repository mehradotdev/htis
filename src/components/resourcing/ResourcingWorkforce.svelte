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

  let { images = [] }: { images?: string[] } = $props();

  const tabs = [
    {
      title: 'Digital Intelligence & Software Talent',
      description:
        'Powered by our proprietary wfms™ ERP, Educare™ School ERP, and HRMS/Payroll engines to deliver secure, high-compliance digital assets and bespoke enterprise solutions.',
      tools: [
        { name: 'wfms™ ERP', icon: Database, color: 'text-purple-400' },
        { name: 'Educare™ ERP', icon: BookOpen, color: 'text-orange-400' },
        { name: 'HRMS Solutions', icon: Users, color: 'text-blue-400' },
        { name: 'Automated Payroll', icon: Banknote, color: 'text-teal-400' },
        { name: 'Bespoke SaaS', icon: Cloud, color: 'text-indigo-400' },
        { name: 'UI/UX Strategy', icon: Layout, color: 'text-pink-400' },
        { name: 'DevSecOps', icon: ShieldCheck, color: 'text-green-400' },
        { name: 'API Integration', icon: Plug, color: 'text-yellow-400' },
        { name: 'High-Compliance Code', icon: FileCheck, color: 'text-cyan-400' },
        { name: 'QA Pipelines', icon: Activity, color: 'text-red-400' },
      ],
    },
    {
      title: 'Infrastructure & Systems Specialists',
      description:
        'Delivering mission-critical technical talent for Data Center stacks and converged IT environments, supported by rigorous HSW safety audits and turnkey facility management.',
      tools: [
        { name: 'ACI Engineers', icon: Network, color: 'text-purple-400' },
        { name: 'Data Center Stacks', icon: Server, color: 'text-blue-400' },
        { name: 'Hybrid Cloud', icon: Cloud, color: 'text-sky-400' },
        { name: 'Cyber-Defense', icon: Shield, color: 'text-red-400' },
        { name: 'HSW Safety Audits', icon: ClipboardList, color: 'text-orange-400' },
        { name: 'VDI Management', icon: MonitorSmartphone, color: 'text-teal-400' },
        { name: 'Identity Governance', icon: Fingerprint, color: 'text-indigo-400' },
        { name: 'Facility Management', icon: Building, color: 'text-gray-400' },
        { name: 'Security Management', icon: Lock, color: 'text-rose-400' },
        { name: 'Enterprise Storage', icon: HardDrive, color: 'text-cyan-400' },
      ],
    },
    {
      title: 'Core Telecom & Network Operations',
      description:
        'Scaling specialized technical workforces for next-gen network rollouts, backed by automated IPDR systems, RF engineering expertise, and 100% statutory compliance',
      tools: [
        { name: 'CCNA Specialists', icon: Award, color: 'text-blue-400' },
        { name: '5G Core Ops', icon: Radio, color: 'text-green-400' },
        { name: 'RF Engineering', icon: Signal, color: 'text-orange-400' },
        { name: 'Fiber Deployment', icon: Cable, color: 'text-yellow-400' },
        { name: 'IPDR Generation', icon: FileCode, color: 'text-purple-400' },
        { name: 'NOC Support', icon: Headset, color: 'text-cyan-400' },
        { name: 'Statutory Compliance', icon: Scale, color: 'text-indigo-400' },
        { name: 'Technical Rigging', icon: Wrench, color: 'text-gray-400' },
        { name: 'Site Coordination', icon: MapPin, color: 'text-red-400' },
        { name: 'Network Lifecycle', icon: Route, color: 'text-teal-400' },
      ],
    },
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
        class="text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer {activeIndex ===
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
        <h3 class="text-2xl">
          {tab.title}
        </h3>
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
        {#key activeIndex}
          <span class="inline-block" in:fade={{ duration: 300 }}>
            {tabs[activeIndex].description}
          </span>
        {/key}
      </h3>
      <a
        href="/#tools"
        class="text-[#64D9A1] font-medium flex items-center gap-2 hover:text-[#4BBE8A] transition-colors"
      >
        View more
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

    <div class="lg:w-2/3 flex flex-wrap gap-3 justify-end items-center">
      {#key activeIndex}
        <div
          class="flex flex-wrap gap-3 justify-end items-center"
          in:fade={{ duration: 300 }}
        >
          {#each tabs[activeIndex].tools as tool}
            {@const Icon = tool.icon}
            <div
              class="flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-4 py-2.5 text-xs md:text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer text-white/90 backdrop-blur-md"
            >
              <Icon size={16} class={tool.color} />
              {tool.name}
            </div>
          {/each}
        </div>
      {/key}
    </div>
  </div>
</div>
