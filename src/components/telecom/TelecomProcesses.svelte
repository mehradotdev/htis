<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TelecomProcess } from '~/data/pageDataTelecom';

  let { processes, images }: { processes: TelecomProcess[]; images: string[] } = $props();

  let activeIndex = $state(0);
</script>

<section class="relative bg-base-200/30 py-24">
  <div class="container mx-auto px-6">
    <h2 class="mb-16 text-center text-4xl font-bold text-base-content md:text-5xl">
      Telecom Processes - Blueprint to Reality
    </h2>
    <div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
      <div class="join join-vertical w-full bg-base-100 shadow-xl">
        {#each processes as process, i}
          <div class="collapse-arrow collapse join-item border border-base-content/10">
            <input 
              type="radio" 
              name="telecom-processes" 
              checked={i === activeIndex}
              onchange={() => activeIndex = i}
            />
            <div class="collapse-title text-lg font-semibold text-base-content/80 md:text-xl">
              <span class="mr-2 font-bold text-primary">{process.id}</span>
              {process.title}
            </div>
            <div class="collapse-content text-base-content/70">
              <p class="mb-4 leading-relaxed">{process.description}</p>
              <ul class="flex flex-col gap-3">
                {#each process.details as detail}
                  <li class="text-sm">
                    <strong class="font-medium text-base-content/90">
                      {detail.name}:
                    </strong>{' '}
                    {detail.desc}
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
      <div
        class="sticky top-28 aspect-4/3 w-full overflow-hidden rounded-2xl shadow-xl lg:aspect-auto lg:h-[600px] relative bg-base-100"
      >
        {#key activeIndex}
          <img
            in:fade={{ duration: 300, delay: 100 }}
            out:fade={{ duration: 300 }}
            src={images[activeIndex]}
            alt={processes[activeIndex].title}
            class="absolute inset-0 h-full w-full object-cover object-center"
          />
        {/key}
      </div>
    </div>
  </div>
</section>
