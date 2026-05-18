<script lang="ts">
  import { slide } from 'svelte/transition';
  import { Server, Network, Cloud, Briefcase, ShieldCheck, Cctv, Monitor } from '@lucide/svelte';

  let { centerImageSrc }: { centerImageSrc: string } = $props();

  const pillars = [
    // Left Column
    {
      title: 'Converged Infrastructure & Data Centre Stack',
      description:
        'High-availability compute and storage architectures from the core to the edge.',
      content:
        'We deliver end-to-end infrastructure resilience through Hyperconverged Infrastructure (HCI), enterprise-grade server clusters, and scalable storage solutions, ensuring your Data Center stack remains future-ready and virtualization-optimized.',
      icon: Server,
      column: 'left',
    },
    {
      title: 'Adaptive Networking & Secure Connectivity',
      description:
        'Intelligent LAN, WAN, and Campus fabrics designed for seamless, high-speed data flow.',
      content:
        'Our networking expertise covers the full spectrum of Active (Switches, Routers, IPABX) and Passive (OFC, Rack, Structured Cabling) components, integrated with SD-WAN and SDN technologies for software-defined agility.',
      icon: Network,
      column: 'left',
    },
    {
      title: 'Hybrid Cloud & Digital Workspace',
      description:
        'Transitioning traditional environments into elastic, cloud-native modern workplaces.',
      content:
        'From complex Cloud Migrations (AWS/Azure) to Hybrid Cloud deployments and Virtual Desktop Infrastructure (VDI), we ensure your workforce stays connected and productive through secure, scalable cloud ecosystems.',
      icon: Cloud,
      column: 'left',
    },
    // Center Column
    {
      title: 'Managed Lifecycle & ICT Projects',
      description:
        'Comprehensive service models ensuring long-term operational continuity.',
      content:
        'Our managed services provide strategic stability through specialized Manpower (L1-L6), customized AMC/CAMC models, and end-to-end ICT project management tailored for large-scale government and private sector rollouts.',
      icon: Briefcase,
      column: 'center',
    },
    // Right Column
    {
      title: 'Unified Cyber-Defence & Resilience',
      description:
        'Perimeter-to-Endpoint security frameworks to mitigate modern threat landscapes.',
      content:
        'We deploy robust security architectures including Next-Gen Firewalls, Identity & Access Management (IAM), and advanced EDR/XDR/Email Security solutions to ensure 360-degree data protection and regulatory compliance.',
      icon: ShieldCheck,
      column: 'right',
    },
    {
      title: 'Environmental Control & Physical Security',
      description:
        'Critical infrastructure protection including surveillance, power, and thermal management.',
      content:
        'We secure the physical layer through integrated Surveillance (CCTV) and Access Control, supported by mission-critical power backups (UPS), fire suppression systems, and specialized refrigeration for high-density IT environments.',
      icon: Cctv,
      column: 'right',
    },
    {
      title: 'Professional Compute & Visual Systems',
      description:
        'Specialized hardware and immersive AV/VC solutions for the modern enterprise.',
      content:
        'We provide a full suite of high-performance compute—including workstations, notebooks, and peripherals—alongside advanced AV/VC integrations like LED Walls and professional projection systems for high-impact communication.',
      icon: Monitor,
      column: 'right',
    },
  ];

  let activeIndex = $state(0);
  const AUTOPLAY_INTERVAL = 5000;

  $effect(() => {
    // Read state synchronously
    activeIndex;

    const intervalId = setInterval(() => {
      activeIndex = (activeIndex + 1) % pillars.length;
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalId);
  });

  const leftPillars = pillars.filter((p) => p.column === 'left');
  const centerPillars = pillars.filter((p) => p.column === 'center');
  const rightPillars = pillars.filter((p) => p.column === 'right');
</script>

{#snippet pillarCard(pillar: (typeof pillars)[0])}
  {@const globalIndex = pillars.indexOf(pillar)}
  {@const Icon = pillar.icon}
  <button
    class="flex w-full flex-col items-start gap-3 rounded-2xl border p-6 text-left shadow-sm backdrop-blur-md transition-all duration-300 {activeIndex ===
    globalIndex
      ? 'border-primary/30 bg-primary/5 scale-[1.02] shadow-md'
      : 'border-base-content/20 bg-base-content/2 hover:bg-base-300/60'}"
    onclick={() => (activeIndex = globalIndex)}
  >
    <div
      class="transition-colors {activeIndex === globalIndex
        ? 'text-primary'
        : 'text-base-content/60'}"
    >
      <Icon class="h-8 w-8" strokeWidth={1.5} />
    </div>
    <div class="flex-1 w-full overflow-hidden">
      <h3
        class="mb-2 text-sm font-semibold transition-colors {activeIndex === globalIndex
          ? 'text-primary'
          : 'text-base-content/90'}"
      >
        {pillar.title}
      </h3>
      <p
        class="text-sm font-medium transition-colors {activeIndex === globalIndex
          ? 'text-base-content/90'
          : 'text-base-content/70'}"
      >
        {pillar.description}
      </p>
      {#if activeIndex === globalIndex}
        <div transition:slide={{ duration: 300 }}>
          <div class="mt-4 border-t border-base-content/10 pt-4">
            <p class="text-sm leading-relaxed text-base-content/80">
              {pillar.content}
            </p>
          </div>
        </div>
      {/if}

      <!-- Progress Bar (only visible when active) -->
      {#if activeIndex === globalIndex}
        <div
          class="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl bg-transparent"
        >
          <div
            class="h-full bg-primary/40 animate-progress"
            style="--duration: {AUTOPLAY_INTERVAL}ms;"
          ></div>
        </div>
      {/if}
    </div>
  </button>
{/snippet}

<div
  class="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-stretch"
>
  <!-- Left Column -->
  <div class="flex w-full flex-col justify-center gap-6 lg:w-1/3">
    {#each leftPillars as pillar}
      {@render pillarCard(pillar)}
    {/each}
  </div>

  <!-- Center Column -->
  <div class="flex w-full flex-col items-center justify-center gap-8 lg:w-1/3">
    <div class="flex w-full justify-center">
      <img
        src={centerImageSrc}
        alt="Strategic Pillars"
        class="pointer-events-none max-h-[600px] w-full scale-125 object-contain drop-shadow-2xl lg:scale-150"
        style="-webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%); mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%); filter: var(--filter-invert-dark)"
      />
    </div>
    {#each centerPillars as pillar}
      {@render pillarCard(pillar)}
    {/each}
  </div>

  <!-- Right Column -->
  <div class="flex w-full flex-col justify-center gap-6 lg:w-1/3">
    {#each rightPillars as pillar}
      {@render pillarCard(pillar)}
    {/each}
  </div>
</div>

<style>
  @keyframes progress {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  .animate-progress {
    animation: progress var(--duration, 5s) linear forwards;
  }
</style>
