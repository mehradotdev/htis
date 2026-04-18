<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TeamMember } from '~/data/pageData';

  interface Props {
    team: TeamMember[];
    bgImageSrc: string;
  }

  let { team, bgImageSrc }: Props = $props();
  let activeIndex = $state(0);
</script>

<section id="team" class="relative w-full overflow-hidden py-24">
  <!-- Background Image Layer -->
  <div class="absolute inset-0 z-0 bg-base-100">
    <img
      src={bgImageSrc}
      alt=""
      class="h-full w-full object-cover opacity-60 mix-blend-luminosity"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-base-200 via-base-100/60 to-base-100/20"
    ></div>
  </div>

  <div class="relative z-10 container mx-auto px-4 lg:px-8">
    <div class="mb-12 max-w-3xl">
      <h2 class="mb-6 text-4xl font-extrabold text-primary md:text-5xl">Meet the Team</h2>
      {#key activeIndex}
        <p
          class="min-h-[5rem] text-lg font-medium text-base-content/80 md:text-xl"
          in:fade={{ duration: 200 }}
        >
          {team[activeIndex].desc}
        </p>
      {/key}
    </div>

    <!-- Horizontal Accordion Gallery -->
    <div
      class="flex h-[28rem] w-full flex-row gap-1 overflow-hidden sm:h-[32rem] sm:gap-2 md:h-[40rem] md:gap-4"
    >
      {#each team as member, index}
        <div
          class="team-member-card relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:rounded-3xl"
          class:active={activeIndex === index}
          role="button"
          tabindex="0"
          onmouseenter={() => (activeIndex = index)}
          onfocus={() => (activeIndex = index)}
          onclick={() => (activeIndex = index)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              activeIndex = index;
            }
          }}
        >
          <!-- Overlay Content -->
          <div
            class="card-content absolute inset-x-0 top-0 z-20 w-[260px] max-w-[90vw] p-4 pb-16 transition-opacity duration-700 ease-in-out sm:p-6 md:w-[320px] md:p-8 lg:w-[360px]"
          >
            <h3
              class="mb-1 text-xl leading-tight font-bold whitespace-nowrap text-primary drop-shadow-sm sm:text-2xl md:text-3xl"
            >
              {member.name}
            </h3>
            <p
              class="mb-2 text-xs font-bold tracking-wider whitespace-nowrap text-primary/80 uppercase sm:text-sm md:mb-4 md:text-base"
            >
              {member.role}
            </p>
          </div>

          <!-- Image Content -->
          <div
            class="pointer-events-none absolute bottom-0 flex h-[90%] w-full items-end justify-center px-2 text-center md:h-[85%] lg:px-4"
          >
            <img
              src={member.img}
              alt={member.name}
              class="team-img h-full w-auto max-w-none origin-bottom object-contain transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .team-member-card {
    flex: 1 1 0;
    /* Basic border for inactive state using a subtle tone */
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: none;
    background-color: transparent; /* No background for inactive */
  }

  .team-member-card.active {
    flex: 6 1 0;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-top: none;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
    backdrop-filter: blur(16px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Initial state for inactive cards */
  .team-member-card:not(.active) .card-content {
    opacity: 0;
    pointer-events: none;
  }

  .team-member-card:not(.active) .team-img {
    filter: grayscale(100%) contrast(1.1) brightness(0.9);
    transform: scale(1.1) translateY(2%);
    opacity: 0.8;
  }

  /* Active state overrides */
  .team-member-card.active .card-content {
    opacity: 1;
    pointer-events: auto;
  }

  .team-member-card.active .team-img {
    filter: grayscale(0%) contrast(1) brightness(1);
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  /* Focus styling for keyboard accessibility */
  .team-member-card:focus-visible {
    outline: 2px solid var(--color-primary, #2a6b56);
    outline-offset: 2px;
  }
</style>
