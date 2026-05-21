<script lang="ts">
  import { APPLY_JOB_ENDPOINT, type JobApplicationPayload } from '~/data/jobApi';

  type Props = {
    jobId: string;
    jobTitle: string;
  };

  let { jobId, jobTitle }: Props = $props();

  // Dialog element binding
  let modalRef = $state<HTMLDialogElement | null>(null);

  // Form Fields
  let name = $state('');
  let dob = $state('');
  let contact = $state('');
  let email = $state('');
  let address = $state('');
  let previousCompany = $state('');
  let previousDesignation = $state('');
  let gender = $state('');
  let socialMediaUrl = $state('');
  let resumeFile = $state<File | null>(null);

  // Status & UI state
  let isSubmitting = $state(false);
  let isSuccess = $state(false);
  let errorMessage = $state<string | null>(null);
  let validationErrors = $state<Record<string, string>>({});

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      resumeFile = input.files[0];
      if (validationErrors.resume) {
        validationErrors.resume = '';
      }
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Full name is required';
    if (!dob) errors.dob = 'Date of birth is required';

    if (!contact) {
      errors.contact = 'Contact number is required';
    } else if (!/^[0-9]{10}$/.test(contact)) {
      errors.contact = 'Contact number must be exactly 10 digits';
    }

    if (!email) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address format';
    }

    if (!address.trim()) errors.address = 'Address is required';
    if (!previousCompany.trim())
      errors.previousCompany = 'Previous company is required (or N/A)';
    if (!previousDesignation.trim())
      errors.previousDesignation = 'Previous designation is required (or N/A)';
    if (!gender) errors.gender = 'Gender is required';

    if (!socialMediaUrl) {
      errors.socialMediaUrl = 'Social media profile is required';
    } else {
      try {
        new URL(socialMediaUrl);
      } catch (_) {
        errors.socialMediaUrl =
          'Please enter a valid URL (e.g. https://linkedin.com/in/username)';
      }
    }

    if (!resumeFile) {
      errors.resume = 'Resume / CV file is required';
    } else {
      const maxSizeBytes = 10 * 1024 * 1024; // 10MB
      if (resumeFile.size > maxSizeBytes) {
        const fileSizeMB = (resumeFile.size / (1024 * 1024)).toFixed(2);
        errors.resume = `File size exceeds the 10MB limit (your file is ${fileSizeMB}MB)`;
      }
    }

    validationErrors = errors;
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = null;

    if (!validate()) return;

    isSubmitting = true;

    try {
      if (!resumeFile) {
        throw new Error('Resume / CV file is required');
      }

      const payload: JobApplicationPayload = {
        jobId: Number.parseInt(jobId, 10),
        name: name.trim(),
        dob: new Date(dob).toISOString(),
        contact,
        email,
        address: address.trim(),
        previousCompany: previousCompany.trim(),
        previousDesignation: previousDesignation.trim(),
        gender,
        socialMediaUrl,
        resume: resumeFile,
      };

      const formData = new FormData();
      formData.append('jobId', payload.jobId.toString());
      formData.append('name', payload.name);
      formData.append('dob', payload.dob);
      formData.append('contact', payload.contact);
      formData.append('email', payload.email);
      formData.append('address', payload.address);
      formData.append('previousCompany', payload.previousCompany);
      formData.append('previousDesignation', payload.previousDesignation);
      formData.append('gender', payload.gender);
      formData.append('socialMediaUrl', payload.socialMediaUrl);
      formData.append('resume', payload.resume);

      const response = await fetch(APPLY_JOB_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Server responded with an error');
      }

      const result = await response.json();
      if (result.success) {
        isSuccess = true;
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (err: any) {
      console.error('Error applying for job:', err);
      errorMessage =
        err.message ||
        'An error occurred while submitting your application. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }

  function openModal() {
    isSuccess = false;
    errorMessage = null;
    validationErrors = {};
    // Reset fields
    name = '';
    dob = '';
    contact = '';
    email = '';
    address = '';
    previousCompany = '';
    previousDesignation = '';
    gender = '';
    socialMediaUrl = '';
    resumeFile = null;
    modalRef?.showModal();
  }

  function closeModal() {
    modalRef?.close();
  }
</script>

<div>
  <!-- Trigger Button -->
  <button
    onclick={openModal}
    class="btn w-full rounded-lg border-none bg-primary text-base tracking-wide text-primary-content shadow-md hover:bg-primary/95 transition-all duration-300 transform hover:scale-[1.01]"
  >
    Apply for this role &rarr;
  </button>

  <!-- DaisyUI Modal Dialog -->
  <dialog
    bind:this={modalRef}
    class="modal modal-bottom sm:modal-middle"
    oncancel={(e) => e.preventDefault()}
  >
    <div
      class="modal-box max-w-2xl bg-base-100 border border-base-200 shadow-2xl p-6 md:p-8 rounded-box transition-all"
    >
      <!-- Close button on top right -->
      <button
        onclick={closeModal}
        class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        aria-label="Close dialog"
      >
        ✕
      </button>

      {#if isSuccess}
        <!-- Success State View -->
        <div class="flex flex-col items-center justify-center py-10 px-4 text-center">
          <div
            class="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6 animate-bounce"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-base-content mb-2">
            Application Submitted!
          </h3>
          <p class="text-base-content/70 max-w-md mb-8">
            Thank you for applying for the <strong>{jobTitle}</strong> position. Our recruiting
            team will review your application and contact you soon.
          </p>
          <button onclick={closeModal} class="btn btn-primary rounded-full px-8">
            Back to Careers
          </button>
        </div>
      {:else}
        <!-- Application Form View -->
        <div class="mb-6">
          <h3 class="text-2xl font-extrabold text-base-content">Apply for Role</h3>
          <p class="text-sm text-base-content/60 mt-1">{jobTitle}</p>
        </div>

        {#if errorMessage}
          <div class="alert alert-error shadow-sm mb-6 flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div class="text-sm">{errorMessage}</div>
          </div>
        {/if}

        <form onsubmit={handleSubmit} class="space-y-5">
          <!-- Two-column grid for fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Full Name -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Full Name</legend
              >
              <input
                type="text"
                placeholder="John Doe"
                class="input input-bordered w-full bg-base-100 {validationErrors.name
                  ? 'input-error'
                  : ''}"
                bind:value={name}
                disabled={isSubmitting}
              />
              {#if validationErrors.name}
                <span class="text-xs text-error mt-1">{validationErrors.name}</span>
              {/if}
            </fieldset>

            <!-- Email Address -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Email Address</legend
              >
              <input
                type="email"
                placeholder="john.doe@example.com"
                class="input input-bordered w-full bg-base-100 {validationErrors.email
                  ? 'input-error'
                  : ''}"
                bind:value={email}
                disabled={isSubmitting}
              />
              {#if validationErrors.email}
                <span class="text-xs text-error mt-1">{validationErrors.email}</span>
              {/if}
            </fieldset>

            <!-- Contact Number -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Contact Number</legend
              >
              <input
                type="tel"
                placeholder="9876543210"
                class="input input-bordered w-full bg-base-100 {validationErrors.contact
                  ? 'input-error'
                  : ''}"
                bind:value={contact}
                disabled={isSubmitting}
              />
              {#if validationErrors.contact}
                <span class="text-xs text-error mt-1">{validationErrors.contact}</span>
              {/if}
            </fieldset>

            <!-- Date of Birth -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Date of Birth</legend
              >
              <input
                type="date"
                class="input input-bordered w-full bg-base-100 {validationErrors.dob
                  ? 'input-error'
                  : ''}"
                bind:value={dob}
                disabled={isSubmitting}
              />
              {#if validationErrors.dob}
                <span class="text-xs text-error mt-1">{validationErrors.dob}</span>
              {/if}
            </fieldset>

            <!-- Gender -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Gender</legend
              >
              <select
                class="select select-bordered w-full bg-base-100 {validationErrors.gender
                  ? 'select-error'
                  : ''}"
                bind:value={gender}
                disabled={isSubmitting}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {#if validationErrors.gender}
                <span class="text-xs text-error mt-1">{validationErrors.gender}</span>
              {/if}
            </fieldset>

            <!-- Social Media / LinkedIn URL -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >LinkedIn / Portfolio URL</legend
              >
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                class="input input-bordered w-full bg-base-100 {validationErrors.socialMediaUrl
                  ? 'input-error'
                  : ''}"
                bind:value={socialMediaUrl}
                disabled={isSubmitting}
              />
              {#if validationErrors.socialMediaUrl}
                <span class="text-xs text-error mt-1"
                  >{validationErrors.socialMediaUrl}</span
                >
              {/if}
            </fieldset>

            <!-- Previous Company -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Previous Company</legend
              >
              <input
                type="text"
                placeholder="Google (or N/A)"
                class="input input-bordered w-full bg-base-100 {validationErrors.previousCompany
                  ? 'input-error'
                  : ''}"
                bind:value={previousCompany}
                disabled={isSubmitting}
              />
              {#if validationErrors.previousCompany}
                <span class="text-xs text-error mt-1"
                  >{validationErrors.previousCompany}</span
                >
              {/if}
            </fieldset>

            <!-- Previous Designation -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend font-semibold text-base-content/80"
                >Previous Designation</legend
              >
              <input
                type="text"
                placeholder="Software Engineer (or N/A)"
                class="input input-bordered w-full bg-base-100 {validationErrors.previousDesignation
                  ? 'input-error'
                  : ''}"
                bind:value={previousDesignation}
                disabled={isSubmitting}
              />
              {#if validationErrors.previousDesignation}
                <span class="text-xs text-error mt-1"
                  >{validationErrors.previousDesignation}</span
                >
              {/if}
            </fieldset>
          </div>

          <!-- Full Address (Span full width) -->
          <fieldset class="fieldset w-full">
            <legend class="fieldset-legend font-semibold text-base-content/80"
              >Full Address</legend
            >
            <textarea
              placeholder="Your complete address..."
              class="textarea textarea-bordered w-full bg-base-100 h-20 {validationErrors.address
                ? 'textarea-error'
                : ''}"
              bind:value={address}
              disabled={isSubmitting}
            ></textarea>
            {#if validationErrors.address}
              <span class="text-xs text-error mt-1">{validationErrors.address}</span>
            {/if}
          </fieldset>

          <!-- Resume Upload (Span full width) -->
          <fieldset class="fieldset w-full">
            <legend class="fieldset-legend font-semibold text-base-content/80"
              >Resume / CV (PDF or Word)</legend
            >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              class="file-input file-input-bordered w-full bg-base-100 {validationErrors.resume
                ? 'file-input-error'
                : ''}"
              onchange={handleFileChange}
              disabled={isSubmitting}
            />
            <p class="fieldset-label text-base-content/50 mt-1">
              Accepted formats: PDF, DOC, DOCX. Max size 10MB.
            </p>
            {#if validationErrors.resume}
              <span class="text-xs text-error mt-1">{validationErrors.resume}</span>
            {/if}
          </fieldset>

          <!-- Form Actions -->
          <div class="modal-action flex justify-end gap-3 pt-4 border-t border-base-200">
            <button
              type="button"
              onclick={closeModal}
              class="btn btn-ghost rounded-full px-6"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary rounded-full px-8 min-w-[140px]"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner loading-xs"></span>
                Submitting
              {:else}
                Submit Application
              {/if}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </dialog>
</div>
