<script lang="ts">
  import { onMount } from 'svelte';

  const metrics = [
    {
      target: 1.2,
      isFloat: true,
      unit: 'M',
      suffix: '+',
      label: 'Sites Deployed',
      subLabel: '',
    },
    {
      target: 250,
      isFloat: false,
      unit: 'K',
      suffix: '+',
      label: 'Routers Deployed',
      subLabel: '',
    },
    {
      target: 16,
      isFloat: false,
      unit: '',
      suffix: '+',
      label: 'Telecom Circles (India)',
      subLabel: '',
    },
    {
      target: 8,
      isFloat: false,
      unit: '',
      suffix: '+',
      label: 'Countries Served',
      subLabel: 'India, Bangladesh, Nepal, Sri Lanka, South Africa, UK, Nigeria, CAR',
    },
    {
      target: 3,
      isFloat: false,
      unit: '',
      suffix: '/4',
      label: 'Major Indian Operators Served',
      subLabel: '',
    },
  ];

  let currentValues = $state(metrics.map(() => 0));
  let sectionRef: HTMLElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          isVisible = true;
          animateValues();
        }
      },
      { threshold: 0.2 },
    );

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

      currentValues = metrics.map((m) => {
        const val = m.target * easeOutQuart;
        return m.isFloat
          ? Number(Math.min(val, m.target).toFixed(1))
          : Math.min(Math.floor(val), m.target);
      });

      if (step >= steps) {
        clearInterval(timer);
        currentValues = metrics.map((m) => m.target);
      }
    }, interval);
  }
</script>

<div
  bind:this={sectionRef}
  class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6"
>
  {#each metrics as metric, i}
    <div class="flex flex-col gap-2">
      <span class="text-5xl md:text-6xl font-bold text-primary"
        >{currentValues[i]}{metric.unit}<span
          class={metric.suffix === '/4'
            ? 'text-4xl md:text-5xl font-light text-primary/60'
            : 'text-4xl md:text-5xl font-light'}>{metric.suffix}</span
        ></span
      >
      {#if metric.subLabel}
        <div class="flex flex-col">
          <span class="font-medium text-base-content/70">{metric.label}</span>
          <span class="mt-1 text-xs leading-relaxed text-base-content">
            {metric.subLabel}
          </span>
        </div>
      {:else}
        <span class="font-medium text-base-content/70">{metric.label}</span>
      {/if}
    </div>
  {/each}
</div>
