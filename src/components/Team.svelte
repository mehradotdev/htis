<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TeamMember } from '~/data/pageData';

  interface Props {
    team: TeamMember[];
    bgImageSrc: string;
    meetTeamImageSrc: string;
  }

  let { team, bgImageSrc, meetTeamImageSrc }: Props = $props();
  let activeIndex = $state(0);
</script>

<section id="team" class="relative w-full overflow-hidden pt-32 pb-24 md:pt-40">
  <!-- Background Image Layer -->
  <div class="absolute inset-0 z-0 bg-base-100">
    <img
      src={bgImageSrc}
      alt=""
      aria-hidden="true"
      class="h-full w-full object-cover opacity-70"
      style="filter: var(--filter-invert-dark)"
    />
    <div
      class="absolute inset-0 bg-linear-to-t from-base-200 via-base-100/60 to-base-100/20"
    ></div>
  </div>

  <div class="relative z-10 container mx-auto px-4 lg:px-8">
    <div class="mb-12 max-w-3xl">
      <h2 class="mb-6 text-4xl font-extrabold text-base-content md:text-5xl">
        The Visionary Core
      </h2>
      <p class="text-lg font-medium text-base-content/80 md:text-xl leading-relaxed">
        Our leadership team brings together decades of experience in telecommunications,
        software engineering, and systems integration, guiding HTIS toward continuous
        innovation and excellence.
      </p>
    </div>

    <!-- Horizontal Accordion Gallery -->
    <div
      class="flex h-[24rem] w-full flex-row gap-1 overflow-hidden sm:h-[28rem] sm:gap-2 md:h-[32rem] md:gap-4"
    >
      {#each team as member, index}
        <div
          class="team-member-card relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:rounded-3xl {activeIndex ===
          index
            ? 'active bg-base-content/10 backdrop-blur-sm'
            : ''}"
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
              class="mb-2 text-xs font-bold tracking-wider whitespace-nowrap text-primary uppercase sm:text-sm md:mb-4 md:text-base"
            >
              {member.role}
            </p>
          </div>

          <!-- Description Overlay over the image with text highlighter effect -->
          {#if activeIndex === index}
            <div
              in:fade={{ duration: 300, delay: 150 }}
              class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-[85%] text-center pointer-events-none"
            >
              <span
                class="bg-base-100/60 dark:bg-base-200/60 text-base-content text-sm sm:text-base font-semibold px-2.5 py-1.5 rounded-md shadow-md leading-[1.8] inline box-decoration-clone"
              >
                {member.desc}
              </span>
            </div>
          {/if}

          <!-- Image Content -->
          <div
            class="pointer-events-none absolute bottom-0 flex h-[80%] w-full items-end justify-center px-2 text-center md:h-[75%] lg:px-4"
          >
            <img
              src={member.img}
              alt={member.name}
              class="team-img h-full w-auto max-w-none origin-bottom object-contain transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </div>
        </div>
      {/each}

      <!-- Meet the Team Card -->
      <div
        class="team-member-card relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:rounded-3xl {activeIndex ===
        team.length
          ? 'active bg-primary/10 border-primary/30 backdrop-blur-sm'
          : 'bg-base-200/40 border border-base-content/10'}"
        role="button"
        tabindex="0"
        onmouseenter={() => (activeIndex = team.length)}
        onfocus={() => (activeIndex = team.length)}
        onclick={() => (activeIndex = team.length)}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activeIndex = team.length;
          }
        }}
      >
        <!-- Background Image Layer -->
        <div
          class="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out {activeIndex ===
          team.length
            ? 'opacity-30'
            : 'opacity-10'} pointer-events-none"
        >
          <img
            src={meetTeamImageSrc}
            alt=""
            class="h-full w-full object-cover filter grayscale scale-105"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-base-100/80 via-transparent to-transparent"
          ></div>
        </div>

        <!-- Overlay Content for Active State -->
        <div
          class="card-content absolute inset-x-0 top-0 z-20 w-[260px] max-w-[90vw] p-4 pb-16 transition-opacity duration-700 ease-in-out sm:p-6 md:w-[320px] md:p-8 lg:w-[360px] h-full flex flex-col justify-between"
        >
          <div>
            <h3
              class="mb-2 text-xl leading-tight font-bold text-primary drop-shadow-sm sm:text-2xl md:text-3xl"
            >
              Meet the Team
            </h3>
          </div>

          {#if activeIndex === team.length}
            <div in:fade={{ duration: 300, delay: 150 }} class="mb-4">
              <a
                href="/about#team"
                class="btn btn-primary rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 pointer-events-auto"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 ml-1 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          {/if}
        </div>

        <!-- Inactive State Content (Vertical title/icon) -->
        <div
          class="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 transition-opacity duration-700 ease-in-out pointer-events-none {activeIndex ===
          team.length
            ? 'opacity-0'
            : 'opacity-100'}"
        >
          <!-- Styled Group/Arrow Icon -->
          <div
            class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3 sm:mb-4 inactive-icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span
            class="text-[10px] sm:text-xs font-bold tracking-widest text-primary uppercase vertical-text"
          >
            Meet the Team
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
