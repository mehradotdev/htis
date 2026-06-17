import { jobs } from './cms';

export const JOB_LIST_ENDPOINT = jobs.api.jobListEndpoint;
export const JOB_DETAIL_ENDPOINT = jobs.api.jobDetailEndpoint;
export const APPLY_JOB_ENDPOINT = jobs.api.applyJobEndpoint;

export interface HiringApiJob {
  // Astro route props normalize IDs to strings even though the upstream API returns integers.
  jobId: string | number;
  jobCode?: string;
  title?: string;
  requiredDateOfJoining?: string;
  vacancies?: number;
  location?: string;
  employmentType?: string;
  skills?: string;
  qualification?: string;
  ageLimit?: number;
  minExperience?: number;
  maxExperience?: number;
  minCtc?: string;
  maxCtc?: string;
  gender?: string;
  description?: string;
}

export interface JobListItem {
  id: string;
  role: string;
  department: string;
  location: string;
}

export interface HiringApiEnvelope<TData> {
  success: boolean;
  data: TData;
}

export interface JobApplicationPayload {
  jobId: number;
  name: string;
  dob: string;
  contact: string;
  email: string;
  address: string;
  previousCompany: string;
  previousDesignation: string;
  gender: string;
  socialMediaUrl: string;
  resume: File;
}

type JobListResponse = HiringApiEnvelope<HiringApiJob[]> & {
  totalCount?: number;
};

type JobDetailResponse = HiringApiEnvelope<HiringApiJob>;

type JobStaticPath = {
  params: { id: string };
  props: { apiJob: HiringApiJob };
};

const fallbackJobs: HiringApiJob[] = [
  {
    jobId: '5',
    title: '.Net Technical Lead',
    location: 'CHANDIGARH',
    skills: 'Programming & Development',
    minExperience: 5,
    maxExperience: 15,
    description: 'Testing',
  },
  {
    jobId: '4',
    title: 'Accountant',
    location: 'CHANDIGARH',
    skills: 'Additional Specialized Skills',
    minExperience: 2,
    maxExperience: 10,
    description: 'Testing',
  },
  {
    jobId: '1',
    title: 'Software Developer',
    location: 'BILASPUR',
    skills: 'Programming & Development',
    minExperience: 2,
    maxExperience: 5,
    description: 'Testing',
  },
];

function normalizeJobId(jobId: HiringApiJob['jobId']): string {
  return String(jobId);
}

function createStaticPath(job: HiringApiJob): JobStaticPath {
  return {
    params: { id: normalizeJobId(job.jobId) },
    props: {
      apiJob: {
        ...job,
        jobId: normalizeJobId(job.jobId),
      },
    },
  };
}

function isJobListResponse(value: unknown): value is JobListResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<JobListResponse>;
  return candidate.success === true && Array.isArray(candidate.data);
}

function isJobDetailResponse(value: unknown): value is JobDetailResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<JobDetailResponse>;
  return (
    candidate.success === true && !!candidate.data && typeof candidate.data === 'object'
  );
}

function isHiringApiJob(value: unknown): value is HiringApiJob {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<HiringApiJob>;
  return candidate.jobId !== undefined;
}

/**
 * Returns a cloned copy of the known-safe fallback jobs used when the Hiring API
 * is unavailable during static generation.
 */
export function getFallbackJobs(): HiringApiJob[] {
  return fallbackJobs.map((job) => ({ ...job }));
}

/**
 * Converts a raw Hiring API job record into the smaller view model used by the
 * jobs listing table and its client-side filters.
 */
export function mapApiJobToListItem(job: HiringApiJob): JobListItem {
  return {
    id: normalizeJobId(job.jobId),
    role: job.title?.trim() || '',
    department: job.skills?.trim() || 'Other',
    location: job.location?.trim() || 'Remote',
  };
}

/**
 * Fetches the job list from the Hiring API and validates the documented JSON
 * envelope before returning the raw job records.
 */
export async function fetchHiringJobs(
  options: { signal?: AbortSignal } = {},
): Promise<HiringApiJob[]> {
  const response = await fetch(JOB_LIST_ENDPOINT, { signal: options.signal });

  if (!response.ok) {
    throw new Error(`JobList request failed with status ${response.status}`);
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    throw new Error(
      `JobList request returned unexpected content-type: ${contentType || 'unknown'}`,
    );
  }

  const result = await response.json();
  if (!isJobListResponse(result)) {
    throw new Error(
      'JobList response payload does not match the documented success/data shape',
    );
  }

  return result.data;
}

/**
 * Fetches a single job record from the Hiring detail endpoint and accepts both
 * the documented success/data envelope and the live bare-object response shape.
 */
export async function fetchHiringJobDetail(
  jobId: string,
  options: { signal?: AbortSignal } = {},
): Promise<HiringApiJob> {
  const response = await fetch(`${JOB_DETAIL_ENDPOINT}/${jobId}`, {
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`JobDetail request failed with status ${response.status}`);
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    throw new Error(
      `JobDetail request returned unexpected content-type: ${contentType || 'unknown'}`,
    );
  }

  const result = await response.json();
  if (isJobDetailResponse(result)) {
    return {
      ...result.data,
      jobId: normalizeJobId(result.data.jobId),
    };
  }

  if (isHiringApiJob(result)) {
    return {
      ...result,
      jobId: normalizeJobId(result.jobId),
    };
  }

  throw new Error('JobDetail response payload does not match any supported shape');
}

/**
 * Builds the static paths for the dynamic job detail route by combining the
 * live Hiring API jobs with a small fallback set for resilient builds.
 */
export async function getJobStaticPaths(): Promise<JobStaticPath[]> {
  try {
    const apiJobs = await fetchHiringJobs();
    const allPathsMap = new Map<string, JobStaticPath>();

    // Keep a few known IDs available even when the build-time API is unavailable.
    [...getFallbackJobs(), ...apiJobs].forEach((job) => {
      allPathsMap.set(normalizeJobId(job.jobId), createStaticPath(job));
    });

    return Array.from(allPathsMap.values());
  } catch (error) {
    console.error('Failed to fetch jobs at build time, using numeric fallbacks:', error);
    return getFallbackJobs().map(createStaticPath);
  }
}
