<script lang="ts">
  type Job = {
    id: string;
    role: string;
    department: string;
    location: string;
  };

  let { jobs = [] }: { jobs: Job[] } = $props();

  let searchQuery = $state('');
  let selectedDepartments = $state<string[]>([]);
  let selectedLocations = $state<string[]>([]);

  let filteredJobs = $derived(
    jobs.filter((job) => {
      const matchSearch =
        searchQuery === '' || job.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept =
        selectedDepartments.length === 0 || selectedDepartments.includes(job.department);
      const matchLoc =
        selectedLocations.length === 0 || selectedLocations.includes(job.location);
      return matchSearch && matchDept && matchLoc;
    }),
  );

  let hasFilters = $derived(
    searchQuery !== '' || selectedDepartments.length > 0 || selectedLocations.length > 0,
  );

  function clearFilters() {
    searchQuery = '';
    selectedDepartments = [];
    selectedLocations = [];
  }

  let departments = $derived([...new Set(jobs.map((j) => j.department))]);
  let locations = $derived([...new Set(jobs.map((j) => j.location))]);

  function toggleDepartment(dept: string) {
    if (selectedDepartments.includes(dept)) {
      selectedDepartments = selectedDepartments.filter((d) => d !== dept);
    } else {
      selectedDepartments = [...selectedDepartments, dept];
    }
  }

  function toggleLocation(loc: string) {
    if (selectedLocations.includes(loc)) {
      selectedLocations = selectedLocations.filter((l) => l !== loc);
    } else {
      selectedLocations = [...selectedLocations, loc];
    }
  }
</script>

<div>
  <!-- Filters -->
  <div class="flex flex-col md:flex-row gap-4 mb-4">
    <div class="relative flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/50 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search For Job"
        class="input input-bordered w-full pl-12 bg-base-100 border-base-300 focus:outline-none focus:border-primary"
        bind:value={searchQuery}
      />
    </div>

    <!-- Department Dropdown -->
    <details class="dropdown flex-1">
      <summary
        class="btn btn-outline border-base-300 w-full justify-between font-normal bg-base-100 hover:bg-base-200 text-base-content/70 hover:border-base-300"
      >
        <span class="truncate">
          {selectedDepartments.length > 0
            ? `${selectedDepartments.length} Selected`
            : 'Department'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          /></svg
        >
      </summary>
      <ul
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1 border border-base-200 max-h-60 overflow-y-auto block"
      >
        {#each departments as dept}
          <li>
            <label class="label cursor-pointer justify-start gap-3 w-full">
              <input
                type="checkbox"
                class="checkbox checkbox-sm checkbox-primary"
                checked={selectedDepartments.includes(dept)}
                onchange={() => toggleDepartment(dept)}
              />
              <span class="label-text">{dept}</span>
            </label>
          </li>
        {/each}
      </ul>
    </details>

    <!-- Location Dropdown -->
    <details class="dropdown flex-1">
      <summary
        class="btn btn-outline border-base-300 w-full justify-between font-normal bg-base-100 hover:bg-base-200 text-base-content/70 hover:border-base-300"
      >
        <span class="truncate">
          {selectedLocations.length > 0
            ? `${selectedLocations.length} Selected`
            : 'Location'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          /></svg
        >
      </summary>
      <ul
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1 border border-base-200 max-h-60 overflow-y-auto block"
      >
        {#each locations as loc}
          <li>
            <label class="label cursor-pointer justify-start gap-3 w-full">
              <input
                type="checkbox"
                class="checkbox checkbox-sm checkbox-primary"
                checked={selectedLocations.includes(loc)}
                onchange={() => toggleLocation(loc)}
              />
              <span class="label-text">{loc}</span>
            </label>
          </li>
        {/each}
      </ul>
    </details>
  </div>

  <div class="mb-8">
    <button
      class={`text-sm font-medium transition-colors ${hasFilters ? 'text-error hover:underline cursor-pointer' : 'text-error/40 cursor-not-allowed'}`}
      disabled={!hasFilters}
      onclick={clearFilters}
    >
      Clear Filter
    </button>
  </div>

  <!-- Jobs Table -->
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="font-bold text-primary/80 text-base bg-transparent">Role</th>
          <th class="font-bold text-primary/80 text-base bg-transparent">Department</th>
          <th class="font-bold text-primary/80 text-base bg-transparent">Location</th>
        </tr>
      </thead>
      <tbody class="bg-base-100 rounded-box shadow-sm border border-base-200">
        {#if filteredJobs.length === 0}
          <tr>
            <td colspan="3" class="p-8 text-center text-base-content/60">
              No jobs found matching your criteria.
            </td>
          </tr>
        {:else}
          {#each filteredJobs as job, index}
            <tr
              class={`transition-colors hover:bg-base-200/50 cursor-pointer ${index % 2 !== 0 ? 'bg-base-200/30' : 'bg-base-100'}`}
              onclick={() => (window.location.href = `/jobs/${job.id}`)}
            >
              <td class="font-bold text-primary py-5">
                <a href={`/jobs/${job.id}`} class="hover:underline">{job.role}</a>
              </td>
              <td class="text-base-content/70 py-5">{job.department}</td>
              <td class="text-base-content/70 py-5">{job.location}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* Fix details dropdown staying open issues on daisyUI */
  details > summary {
    list-style: none;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }

  /* Ensure proper width for labels inside dropdowns */
  .dropdown-content li {
    width: 100%;
  }
</style>
