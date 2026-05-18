<script>
  import { servicesData as services } from '~/data/pageData';
  import { ArrowRight } from '@lucide/svelte';

  const serviceHrefs = { telecom: '/telecom', resourcing: '/resourcing', system: '/system-integration', software: '/system-integration' };

  // Open 'telecom' by default on mobile
  let active = $state('telecom');
</script>

<div class="flex w-full flex-col bg-base-100 md:hidden">
  <!-- Radial Greenish Blur Background -->
  <div class="relative w-full overflow-hidden">
    <div class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      <div class="h-[150%] w-[150%] rounded-full bg-primary/20 blur-[80px]"></div>
    </div>

    <div class="relative z-10 flex flex-col">
      {#each services as service}
        <div
          class="flex flex-col border-b-2 border-solid border-base-content/30 bg-base-100/70 backdrop-blur-md transition-colors last:border-b-0 hover:bg-base-100/90"
        >
          <!-- Header Row -->
          <div class="flex w-full items-center justify-between p-6">
            <button
              class="m-0 flex-1 cursor-pointer appearance-none border-none bg-transparent p-0 text-left"
              onclick={() => {
                active = active === service.id ? 'collapsed' : service.id;
              }}
              aria-expanded={active === service.id}
            >
              <h3 class="m-0 text-2xl leading-tight font-bold text-base-content/80">
                {@html service.titleHtml}
              </h3>
            </button>

            <a
              href={serviceHrefs[service.id]}
              class="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary transition-transform duration-300 hover:bg-primary/20 {active === service.id ? '-rotate-45' : 'rotate-0'}"
              aria-label="Go to page"
            >
              <ArrowRight class="h-5 w-5" />
            </a>
          </div>

          <!-- Accordion Content (Stats) -->
          <div
            class="flex flex-col overflow-hidden transition-all duration-500 ease-in-out {active ===
            service.id
              ? 'max-h-[1000px] opacity-100'
              : 'max-h-0 opacity-0'}"
            aria-hidden={active !== service.id}
          >
            {#each service.stats as stat}
              <div
                class="flex flex-col items-center justify-center border-t border-solid border-base-content/20 bg-base-100/40 py-6 px-4 text-center"
              >
                <span class="mb-1 text-3xl font-bold text-primary">{stat.val}</span>
                <span class="text-sm font-medium text-base-content/70">{@html stat.label}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
