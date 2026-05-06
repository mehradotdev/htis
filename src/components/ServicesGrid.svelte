<script>
  let active = $state('collapsed');
  let gridRef = $state();

  import { servicesData as services } from '../data/pageData';

  // 5x5 geometric grid mapping - Perfect 4x4 Expanded Square
  const stateLayouts = {
    collapsed: {
      titles: {
        telecom: { c: 0, r: 0, cs: 2.5, rs: 2.5 },
        software: { c: 2.5, r: 0, cs: 2.5, rs: 2.5 },
        system: { c: 0, r: 2.5, cs: 2.5, rs: 2.5 },
        manpower: { c: 2.5, r: 2.5, cs: 2.5, rs: 2.5 },
      },
      icons: Array(6).fill({ c: 2, r: 2 }),
      stats: Array(4).fill({ c: 2, r: 2 }),
    },
    telecom: {
      titles: {
        telecom: { c: 0, r: 0, cs: 3, rs: 2 },
        software: { c: 4, r: 0, cs: 1, rs: 4 },
        system: { c: 0, r: 4, cs: 3, rs: 1 },
        manpower: { c: 3, r: 4, cs: 2, rs: 1 },
      },
      icons: [
        { c: 0, r: 2 },
        { c: 1, r: 2 },
        { c: 2, r: 2 },
        { c: 0, r: 3 },
        { c: 1, r: 3 },
        { c: 2, r: 3 },
      ],
      stats: [
        { c: 3, r: 0 },
        { c: 3, r: 1 },
        { c: 3, r: 2 },
        { c: 3, r: 3 },
      ],
    },
    manpower: {
      titles: {
        telecom: { c: 0, r: 0, cs: 3, rs: 1 },
        software: { c: 3, r: 0, cs: 2, rs: 1 },
        system: { c: 0, r: 1, cs: 1, rs: 4 },
        manpower: { c: 1, r: 1, cs: 3, rs: 2 },
      },
      icons: [
        { c: 1, r: 3 },
        { c: 2, r: 3 },
        { c: 3, r: 3 },
        { c: 1, r: 4 },
        { c: 2, r: 4 },
        { c: 3, r: 4 },
      ],
      stats: [
        { c: 4, r: 1 },
        { c: 4, r: 2 },
        { c: 4, r: 3 },
        { c: 4, r: 4 },
      ],
    },
    software: {
      titles: {
        telecom: { c: 0, r: 0, cs: 1, rs: 4 },
        software: { c: 1, r: 0, cs: 3, rs: 2 },
        system: { c: 0, r: 4, cs: 3, rs: 1 },
        manpower: { c: 3, r: 4, cs: 2, rs: 1 },
      },
      icons: [
        { c: 1, r: 2 },
        { c: 2, r: 2 },
        { c: 3, r: 2 },
        { c: 1, r: 3 },
        { c: 2, r: 3 },
        { c: 3, r: 3 },
      ],
      stats: [
        { c: 4, r: 0 },
        { c: 4, r: 1 },
        { c: 4, r: 2 },
        { c: 4, r: 3 },
      ],
    },
    system: {
      titles: {
        telecom: { c: 0, r: 0, cs: 3, rs: 1 },
        software: { c: 3, r: 0, cs: 2, rs: 1 },
        system: { c: 0, r: 1, cs: 3, rs: 2 },
        manpower: { c: 4, r: 1, cs: 1, rs: 4 },
      },
      icons: [
        { c: 0, r: 3 },
        { c: 1, r: 3 },
        { c: 2, r: 3 },
        { c: 0, r: 4 },
        { c: 1, r: 4 },
        { c: 2, r: 4 },
      ],
      stats: [
        { c: 3, r: 1 },
        { c: 3, r: 2 },
        { c: 3, r: 3 },
        { c: 3, r: 4 },
      ],
    },
  };

  const mobileOrder = {
    telecom: 'order-1',
    icons: 'order-2',
    stats: 'order-3',
    software: 'order-4',
    system: 'order-5',
    manpower: 'order-6',
  };

  function getStyle(c, r, cs = 1, rs = 1) {
    return `--md-top: ${r * 20}%; --md-left: ${c * 20}%; --md-w: ${cs * 20}%; --md-h: ${rs * 20}%; --md-z: ${30 - c * 5 - r};`;
  }

  function getBorders(c, r, cs = 1, rs = 1, type = 'title', idx = 0) {
    let classes = 'border-base-content/30 border-solid ';

    // Mobile borders
    if (type === 'icon') {
      if (idx % 3 !== 2) classes += 'border-r-2 ';
      if (idx < 3) classes += 'border-b-2 ';
    } else if (type === 'stat') {
      if (idx < 3) classes += 'border-b-2 ';
    } else {
      classes += 'border-b-2 ';
    }

    // Desktop borders
    if (c + cs < 5) classes += 'md:border-r-2 ';
    else classes += 'md:border-r-0 ';

    if (r + rs < 5) classes += 'md:border-b-2 ';
    else classes += 'md:border-b-0 ';

    return classes;
  }

  $effect(() => {
    if (!gridRef) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active === 'collapsed') active = 'telecom';
      },
      { threshold: 0.9 },
    );
    observer.observe(gridRef);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={gridRef}
  class="relative w-full flex flex-col md:block md:aspect-square overflow-hidden bg-base-100 lg:w-[60%]"
>
  <!-- Radial Greenish Blur Background -->
  <div class="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
    <div class="w-full h-full md:w-[80%] md:h-[80%] rounded-full bg-primary/20 blur-[80px]"></div>
  </div>
  {#each services as service}
    {@const pos = stateLayouts[active].titles[service.id]}
    <button
      class="grid-block flex cursor-pointer transition-all duration-700 ease-in-out hover:bg-base-100/90 hover:shadow-lg bg-base-100/70 backdrop-blur-md p-6 md:p-8 {mobileOrder[
        service.id
      ]} {getBorders(pos.c, pos.r, pos.cs, pos.rs, 'title', 0)} {active === service.id
        ? 'flex-row items-center justify-between text-left'
        : 'flex-col items-center justify-center text-center'}"
      style={getStyle(pos.c, pos.r, pos.cs, pos.rs)}
      onmouseenter={() => (active = service.id)}
      onfocus={() => (active = service.id)}
      onclick={() => {
        if (active === service.id) {
          if (service.id === 'telecom') window.location.href = '/telecom';
        } else {
          active = service.id;
        }
      }}
    >
      <h3
        class="font-bold text-base-content/80 transition-all duration-700 {active ===
        service.id
          ? 'text-2xl md:text-3xl mt-0'
          : active === 'collapsed'
            ? 'text-2xl md:text-4xl mt-0'
            : 'text-xl mt-8 md:mt-4'}"
      >
        {@html service.titleHtml}
      </h3>

      <div
        class="{active === service.id
          ? 'relative shrink-0'
          : 'absolute top-4 right-4'} flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary transition-transform duration-700 {active ===
        service.id
          ? '-rotate-45'
          : 'rotate-0'}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </button>
  {/each}

  <!-- Icons Drawer -->
  <div class="relative w-full h-[250px] md:h-auto md:contents {mobileOrder.icons}">
    {#each services as service}
      <div
        class="absolute inset-0 grid grid-cols-3 grid-rows-2 md:static md:contents transition-opacity duration-700 {active ===
        service.id
          ? 'opacity-100 z-10 pointer-events-auto'
          : 'opacity-0 z-0 pointer-events-none md:opacity-100'}"
      >
        {#each service.icons as icon, idx}
          {@const pos = stateLayouts[active].icons[idx]}
          <div
            class="grid-block flex flex-col items-center justify-center p-4 text-center bg-base-100/70 backdrop-blur-md md:transition-all md:duration-700 ease-in-out {getBorders(
              pos.c,
              pos.r,
              1,
              1,
              'icon',
              idx,
            )} {active === service.id
              ? 'md:opacity-100 md:pointer-events-auto'
              : 'md:opacity-0 md:pointer-events-none'}"
            style={getStyle(pos.c, pos.r)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mb-2 h-8 w-8 text-primary"
            >
              {@html icon.svg}
            </svg>
            <span class="text-xs font-medium text-base-content/70"
              >{@html icon.label}</span
            >
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <!-- Stats Box -->
  <div class="relative w-full h-[390px] md:h-auto md:contents {mobileOrder.stats}">
    {#each services as service}
      <div
        class="absolute inset-0 flex flex-col md:contents transition-opacity duration-700 {active ===
        service.id
          ? 'opacity-100 z-10 pointer-events-auto'
          : 'opacity-0 z-0 pointer-events-none md:opacity-100'}"
      >
        {#each service.stats as stat, idx}
          {@const pos = stateLayouts[active].stats[idx]}
          <div
            class="grid-block flex flex-1 flex-col items-center justify-center space-y-1 p-4 text-center bg-base-100/70 backdrop-blur-md md:transition-all md:duration-700 ease-in-out {getBorders(
              pos.c,
              pos.r,
              pos.cs || 1,
              pos.rs || 1,
              'stat',
              idx,
            )} {active === service.id
              ? 'md:opacity-100 md:pointer-events-auto'
              : 'md:opacity-0 md:pointer-events-none'}"
            style={getStyle(pos.c, pos.r, pos.cs || 1, pos.rs || 1)}
          >
            <span class="text-2xl font-bold text-primary">{stat.val}</span>
            <span class="text-xs font-medium text-base-content/70"
              >{@html stat.label}</span
            >
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .grid-block {
    position: relative;
    width: 100%;
    height: auto;
  }
  @media (min-width: 768px) {
    .grid-block {
      position: absolute !important;
      top: var(--md-top);
      left: var(--md-left);
      width: var(--md-w);
      height: var(--md-h);
      z-index: var(--md-z, 10);
    }
    button.grid-block:hover {
      z-index: 40 !important;
    }
  }
</style>
