<script lang="ts">
  import {
    Search,
    Landmark,
    HardHat,
    Antenna,
    Zap,
    TrainFront,
    Plane,
    ShieldCheck,
    ArrowUpRight,
  } from '@lucide/svelte';

  let { imgSrc } = $props();

  const caseStudies = [
    {
      id: 1,
      title: 'Data center Modernisation',
      description: 'Modernized backbone infrastructure with redundant fiber connectivity',
      solution: 'System Integration',
      industry: 'Government',
      tags: ['750+ locations', 'Telecom', 'Government'],
    },
    {
      id: 2,
      title: 'National Broadband Rollout',
      description:
        'Deployed high-speed broadband network across rural communities, bridging the digital divide with scalable infrastructure.',
      solution: 'Telecom Services',
      industry: 'Telecom',
      tags: ['500+ miles fiber', 'Telecom', 'Connectivity'],
    },
    {
      id: 3,
      title: 'Airport Security Enhancement',
      description:
        'Upgraded surveillance and access control systems for a major international airport to comply with modern security standards.',
      solution: 'System Integration',
      industry: 'Aviation',
      tags: ['Aviation', 'Security', 'Surveillance'],
    },
    {
      id: 4,
      title: 'Smart City Infrastructure',
      description:
        'Implemented IoT sensors and connected public transport systems to optimize city traffic and energy consumption.',
      solution: 'Software Development',
      industry: 'Infrastructure',
      tags: ['Smart City', 'Infrastructure', 'IoT'],
    },
    {
      id: 5,
      title: 'Transport Fleet Management',
      description:
        'Developed custom software for real-time tracking of logistics fleet, reducing operational delays by 30%.',
      solution: 'Software Development',
      industry: 'Transport',
      tags: ['Logistics', 'Transport', 'Software'],
    },
    {
      id: 6,
      title: 'Renewable Energy Grid',
      description:
        'Integrated smart grid technology for solar and wind power distribution, improving grid resilience and uptime.',
      solution: 'System Integration',
      industry: 'Energy',
      tags: ['Green Energy', 'Power', 'Smart Grid'],
    },
  ];

  const solutions = [
    'Telecom Services',
    'System Integration',
    'Software Development',
    'Resource Management',
  ];

  const industries = [
    { name: 'Government', icon: Landmark },
    { name: 'Infrastructure', icon: HardHat },
    { name: 'Telecom', icon: Antenna },
    { name: 'Energy', icon: Zap },
    { name: 'Transport', icon: TrainFront },
    { name: 'Aviation', icon: Plane },
    { name: 'Security', icon: ShieldCheck },
  ];

  let draftSearch = $state('');
  let draftSolution = $state('');
  let draftIndustries = $state<string[]>([]);

  let search = $state('');
  let solution = $state('');
  let selectedIndustries = $state<string[]>([]);

  function applyFilters() {
    search = draftSearch;
    solution = draftSolution;
    selectedIndustries = [...draftIndustries];
  }

  function clearFilters() {
    draftSearch = '';
    draftSolution = '';
    draftIndustries = [];
    applyFilters();
  }

  let filteredStudies = $derived(
    caseStudies.filter((study) => {
      const matchSearch =
        study.title.toLowerCase().includes(search.toLowerCase()) ||
        study.description.toLowerCase().includes(search.toLowerCase());
      const matchSolution = solution ? study.solution === solution : true;
      const matchIndustry =
        selectedIndustries.length > 0
          ? selectedIndustries.includes(study.industry)
          : true;
      return matchSearch && matchSolution && matchIndustry;
    }),
  );

  function toggleIndustry(ind: string) {
    if (draftIndustries.includes(ind)) {
      draftIndustries = draftIndustries.filter((i) => i !== ind);
    } else {
      draftIndustries = [...draftIndustries, ind];
    }
  }
</script>

<div class="flex flex-col lg:flex-row gap-8">
  <!-- Filter Sidebar -->
  <div
    class="card bg-base-100 border border-base-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 w-full lg:w-[320px] shrink-0 h-fit rounded-[1.5rem]"
  >
    <h2 class="text-xl font-bold mb-6 text-base-content tracking-tight">Filter</h2>

    <div class="mb-6 relative">
      <Search
        class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40"
      />
      <input
        type="text"
        placeholder="Search"
        bind:value={draftSearch}
        class="input input-bordered w-full pl-11 bg-base-100 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-300"
      />
    </div>

    <div class="mb-6">
      <select
        bind:value={draftSolution}
        class="select select-bordered w-full bg-base-100 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-base-content/80 font-normal appearance-none"
      >
        <option value="">Select Solution</option>
        {#each solutions as sol}
          <option value={sol}>{sol}</option>
        {/each}
      </select>
    </div>

    <div class="mb-8">
      <h3
        class="text-xs font-semibold text-base-content/50 mb-4 uppercase tracking-wider"
      >
        Industries
      </h3>
      <div class="space-y-4">
        {#each industries as ind}
          <label class="flex items-center gap-3.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={draftIndustries.includes(ind.name)}
              onchange={() => toggleIndustry(ind.name)}
              class="checkbox checkbox-sm border-base-300 rounded focus:ring-primary focus:ring-offset-1 transition-all duration-200 checked:bg-primary checked:border-primary"
            />
            <ind.icon
              class="w-4 h-4 text-base-content/60 group-hover:text-primary transition-colors"
            />
            <span
              class="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors select-none"
              >{ind.name}</span
            >
          </label>
        {/each}
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        onclick={applyFilters}
        class="btn btn-primary flex-1 rounded-full shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 font-semibold"
      >
        Apply filter
      </button>
      <button
        onclick={clearFilters}
        class="btn btn-ghost text-error/80 hover:text-error hover:bg-error/10 rounded-full font-medium transition-colors"
      >
        Clear Filter
      </button>
    </div>
  </div>

  <!-- Case Studies List -->
  <div class="flex-1 space-y-6">
    {#each filteredStudies as study (study.id)}
      <div
        class="card bg-base-100 border border-base-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-[1.5rem] p-4 sm:p-5 flex flex-col sm:flex-row gap-5 group"
      >
        <!-- Image Container -->
        <div
          class="w-full sm:w-[220px] lg:w-[260px] shrink-0 rounded-xl overflow-hidden bg-base-200 relative"
        >
          <img
            src={imgSrc}
            alt={study.title}
            class="w-full h-full object-cover aspect-[4/3] sm:aspect-auto sm:absolute sm:inset-0 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 flex flex-col justify-center relative py-1 sm:pr-8">
          <!-- Top Right Icon -->
          <div class="hidden sm:flex absolute top-0 right-0">
            <button
              class="btn btn-circle btn-sm btn-ghost border border-base-300 text-primary opacity-60 group-hover:opacity-100 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-content transition-all duration-300 transform group-hover:scale-110"
            >
              <ArrowUpRight class="w-4 h-4" />
            </button>
          </div>

          <h3
            class="text-xl sm:text-2xl font-bold text-base-content mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2 pr-10 sm:pr-0"
          >
            {study.title}
          </h3>

          <p class="text-base sm:text-sm text-base-content/70 mb-5 leading-relaxed">
            {study.description}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-auto">
            {#each study.tags as tag}
              <div
                class="badge badge-outline border-base-200 text-base-content/70 bg-base-50 text-[11px] font-medium py-2.5 px-3 rounded-full hover:border-primary/30 transition-colors"
              >
                {tag}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <!-- Empty State -->
      <div
        class="py-16 px-6 text-center border-2 border-base-200 border-dashed rounded-[1.5rem] bg-base-100/50 flex flex-col items-center justify-center"
      >
        <div class="bg-base-200/50 p-4 rounded-full mb-4">
          <Search class="w-8 h-8 text-base-content/40" />
        </div>
        <h3 class="text-lg font-bold text-base-content mb-2">No results found</h3>
        <p class="text-base-content/60 max-w-sm mb-6">
          We couldn't find any case studies matching your current filters. Try adjusting
          your search criteria.
        </p>
        <button
          onclick={clearFilters}
          class="btn btn-outline btn-primary rounded-full px-6"
        >
          Clear all filters
        </button>
      </div>
    {/each}
  </div>
</div>
