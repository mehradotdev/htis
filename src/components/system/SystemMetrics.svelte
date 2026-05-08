<script lang="ts">
  import { onMount } from 'svelte';
  
  const metrics = [
    { target: 1200, suffix: '+', label: 'Sites Deployed' },
    { target: 98, suffix: '%', label: 'On-Time Delivery' },
    { target: 3, suffix: 'x', label: 'Faster Rollouts' },
    { target: 54, suffix: '+', label: 'Industries Served' }
  ];

  let currentValues = metrics.map(() => 0);
  let sectionRef: HTMLElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isVisible) {
        isVisible = true;
        animateValues();
      }
    }, { threshold: 0.2 });

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => {
      if (sectionRef) observer.unobserve(sectionRef);
    };
  });

  function animateValues() {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      currentValues = metrics.map(m => Math.min(Math.floor(m.target * easeOutQuart), m.target));

      if (step >= steps) {
        clearInterval(timer);
        currentValues = metrics.map(m => m.target);
      }
    }, interval);
  }
</script>

<div bind:this={sectionRef} class="py-16">
  <div class="mb-12">
    <h2 class="text-4xl md:text-5xl font-bold text-base-content leading-tight">
      Built to Execute.<br />
      Scaled to Deliver.
    </h2>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-base-content/10">
    {#each metrics as metric, i}
      <div class="flex flex-col gap-2">
        <div class="flex items-baseline text-[#60B68C]">
          <span class="text-5xl md:text-6xl lg:text-7xl font-light">{currentValues[i]}<span class="text-4xl md:text-5xl font-light">{metric.suffix}</span></span>
        </div>
        <span class="text-sm md:text-base font-medium text-base-content/70">{metric.label}</span>
      </div>
    {/each}
  </div>
</div>
