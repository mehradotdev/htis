<script lang="ts">
  const metrics = [
    { target: 3000, suffix: '+', label: 'Daily Active Users' },
    { target: 99.9, suffix: '%', label: 'SLA Uptime', isFloat: true },
    { target: 18, suffix: '', label: 'Core Software Engineers' },
    { target: 150, suffix: '+', label: 'Production Deployments' },
  ];

  let currentValues = $state(metrics.map(() => 0));
  let sectionRef: HTMLElement | undefined = $state();
  let isVisible = $state(false);

  $effect(() => {
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

<div bind:this={sectionRef} class="grid grid-cols-2 md:grid-cols-4 gap-8">
  {#each metrics as metric, i}
    <div class="flex flex-col gap-2">
      <div class="flex items-baseline text-primary">
        <span class="text-5xl md:text-6xl lg:text-7xl font-light"
          >{#if metric.target >= 1000 && currentValues[i] >= 1000}{currentValues[
              i
            ].toLocaleString()}{:else}{currentValues[i]}{/if}<span
            class="text-4xl md:text-5xl font-light">{metric.suffix}</span
          ></span
        >
      </div>
      <span class="text-sm md:text-base font-medium text-base-content/70"
        >{metric.label}</span
      >
    </div>
  {/each}
</div>
