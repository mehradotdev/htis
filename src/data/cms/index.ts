import aboutYaml from './about.yml';
import awardsYaml from './awards.yml';
import contactFormYaml from './contact-form.yml';
import footerYaml from './footer.yml';
import homeYaml from './home.yml';
import jobsYaml from './jobs.yml';
import navigationYaml from './navigation.yml';
import privacyYaml from './privacy.yml';
import resourcingYaml from './resourcing.yml';
import siteYaml from './site.yml';
import softwareYaml from './software.yml';
import systemIntegrationYaml from './system-integration.yml';
import telecomYaml from './telecom.yml';

type AssetModule = { default?: ImageMetadata } | ImageMetadata;

const assetModules = import.meta.glob<AssetModule>('../../assets/*', {
  eager: true,
});

const assets = Object.fromEntries(
  Object.entries(assetModules).map(([path, module]) => {
    const asset = 'default' in module && module.default ? module.default : module;
    return [path.split('/').pop(), asset as ImageMetadata];
  }),
);

export function getCmsAsset(filename: string): ImageMetadata {
  const assetName =
    filename
      .replace(/^src\/assets\//, '')
      .split('/')
      .pop() ?? filename;
  const asset = assets[assetName];
  if (!asset) {
    throw new Error(`CMS asset not found: ${filename}`);
  }

  return asset;
}

export function getCmsAssetSrc(filename: string): string {
  return getCmsAsset(filename).src;
}

export interface CmsLink {
  label: string;
  url: string;
}

export interface CmsNavItem {
  title: string;
  desc: string;
  url: string;
  icon: string;
}

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryCapability {
  title: string;
  description: string;
  bulletPoints: string[];
}

export interface IndustryData {
  slug: string;
  title: string;
  shortTitle: string;
  navOrder?: number;
  summary: string;
  heroSubtitle: string;
  iconName: string;
  techStack: string[];
  challenges: IndustryChallenge[];
  capabilities: IndustryCapability[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyData {
  id: number; // Dynamically assigned based on array index
  slug: string;
  title: string;
  description: string;
  solution: string;
  industry: string;
  tags: string[];
  clientLabel: string;
  heroTitle: string;
  heroSummary: string;
  heroMetrics: string[];
  clientContext: {
    clientType: string;
    industryScale: string;
    environment: string;
    bullets: string[];
  };
  challenge: {
    paragraph: string;
    bullets: string[];
  };
  solutionDetails: {
    paragraph: string;
    bullets: string[];
  };
  outcomes: {
    metrics: CaseStudyMetric[];
    bullets: string[];
  };
  whyHTIS: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface TeamMember {
  img: string;
  name: string;
  role: string;
  desc: string;
}

export interface FootprintMetric {
  value: string;
  suffix?: string;
  label: string;
}

export interface GlobeMarker {
  name: string;
  detail?: string;
  latitude: number;
  longitude: number;
  size: number;
}

export interface ClientLogo {
  image: ImageMetadata;
  alt: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

export interface ArticlePost {
  embedCode: string;
  src: string;
  url: string;
  height: number;
  width: number;
  title: string;
  fallbackTitle: string;
}

export interface AwardGalleryItem {
  id: number;
  type: 'award' | 'certificate';
  title: string;
  organization: string;
  date: string;
  thumbnailSrc: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export interface SoftwarePortfolioItem {
  title: string;
  desc: string;
  image: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface SoftwarePortfolioTab {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  items: SoftwarePortfolioItem[];
}

export interface SoftwareCaseStudyItem {
  title: string;
  solution: string;
  impact: string;
  image: string;
  url?: string;
}

type HomeServiceId = 'telecom' | 'resourcing' | 'software' | 'system';

export interface HomeServiceMetric {
  value: string;
  label: string;
}

export interface HomeServiceFeature {
  iconName: string;
  label: string;
  description: string;
}

export interface HomeService {
  id: HomeServiceId;
  titleHtml: string;
  href: string;
  features: HomeServiceFeature[];
  metrics: HomeServiceMetric[];
}

interface HomeYaml {
  hero: {
    backgroundImage: string;
    titlePrefix: string;
    rotatingWords: string[];
    subtitle: string;
    ctaLabel: string;
    ctaUrl: string;
    trustedByLabel: string;
    partnerLogos: Array<{ image: string; alt: string }>;
  };
  services: {
    headingHtml: string;
    backgroundImage: string;
    items: HomeService[];
  };
  journey: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    milestones: Array<Omit<Milestone, 'imageSrc'> & { image: string }>;
  };
  team: {
    backgroundImage: string;
    meetTeamImage: string;
    heading: string;
    description: string;
    ctaTitle: string;
    ctaLabel: string;
    ctaUrl: string;
    members: Array<{ name: string; role: string; desc: string; image: string }>;
  };
  footprint: {
    heading: string;
    metrics: FootprintMetric[];
    globe: {
      ariaLabel: string;
      markers: GlobeMarker[];
    };
  };
  clients: {
    heading: string;
    ctaUrl: string;
    ctaLabel: string;
    logos: Array<{ image: string; alt: string }>;
  };
  testimonials: {
    headingPrefix: string;
    clientsHighlight: string;
    headingMiddle: string;
    awardsHighlight: string;
    headingSuffix: string;
    ctaUrl: string;
    ctaLabel: string;
    awardsImage: string;
    awardsImageAlt: string;
    items: TestimonialItem[];
  };
  articles: {
    eyebrow: string;
    heading: string;
    ctaLabel: string;
    ctaUrl: string;
    posts: Array<{ embedCode: string; fallbackTitle?: string }>;
  };
}

interface AboutYaml {
  title: string;
  hero: {
    backgroundImage: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  mission: {
    image: string;
    imageAlt: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  lifeAtHtis: {
    backgroundImage: string;
    image: string;
    imageAlt: string;
    title: string;
    highlight: string;
    body: string[];
    ctaLabel: string;
    ctaUrl: string;
  };
  team: {
    members: Array<{
      name: string;
      role: string;
      dept: string;
      image: string;
    }>;
  };
  principles: {
    image: string;
    imageAlt: string;
    title: string;
    highlight: string;
    description: string;
    items: string[];
  };
}

interface AwardsYaml {
  title: string;
  hero: {
    backgroundImage: string;
    title: string;
    subtitle: string;
  };
  items: Array<{
    type: 'award' | 'certificate';
    title: string;
    organization: string;
    date: string;
    thumbnail?: string;
    image?: string;
    imageAlt?: string;
    images?: Array<{
      image: string;
      alt: string;
    }>;
  }>;
}

interface PageHeroYaml {
  backgroundImage: string;
  foregroundImage?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  carouselImages?: string[];
}

interface ExecutionPillarYaml {
  iconName: string;
  title: string;
  description: string;
  url?: string;
  ariaLabel?: string;
}

interface ExecutionYaml {
  heading: string;
  pillars: ExecutionPillarYaml[];
}

interface PartnerTabYaml {
  title: string;
  subtitle: string;
  description: string;
  partners: Array<{ name: string; logo?: string }>;
}

interface CaseStudyYaml {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaUrl: string;
}

interface TelecomYaml {
  title: string;
  hero: PageHeroYaml;
  capabilities: {
    backgroundImage: string;
    heading: string;
    description: string;
    images: string[];
  };
}

interface SystemIntegrationYaml {
  title: string;
  hero: PageHeroYaml;
  strategicPillars: {
    backgroundImage: string;
    centerImage: string;
    heading: string;
  };
  partnerEcosystem: {
    tabs: PartnerTabYaml[];
  };
  execution: ExecutionYaml;
  deployments: {
    heading: string;
    image: string;
    imageAlt: string;
    featured: CaseStudyYaml;
    items: CaseStudyYaml[];
  };
}

interface SoftwareYaml {
  title: string;
  hero: PageHeroYaml;
  portfolio: {
    backgroundImage: string;
    heading: string;
    description: string;
    capabilities: Array<
      Omit<SoftwarePortfolioTab, 'items'> & {
        items: Array<Omit<SoftwarePortfolioItem, 'image'> & { image: string }>;
      }
    >;
  };
  execution: ExecutionYaml;
  caseStudies: {
    heading: string;
    items: Array<Omit<SoftwareCaseStudyItem, 'image'> & { image: string }>;
  };
}

interface ResourcingYaml {
  title: string;
  hero: PageHeroYaml;
  capabilities: {
    backgroundImage: string;
    heading: string;
    description: string;
    items: Array<{
      iconName: string;
      title: string;
      desc: string;
      colSpan?: boolean;
    }>;
  };
}

interface PrivacySubsectionYaml {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface PrivacySectionYaml {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  afterParagraphs?: string[];
  note?: string;
  contactPrompt?: string;
  contactCard?: boolean;
  subsections?: PrivacySubsectionYaml[];
}

interface PrivacyYaml {
  title: string;
  metaTitle: string;
  lastUpdated: string;
  backLink: CmsLink;
  intro: {
    companyName: string;
    websiteLabel: string;
    websiteUrl: string;
    openingTextBeforeCompany: string;
    openingTextAfterCompany: string;
    websiteTextBeforeLink: string;
    websiteTextAfterLink: string;
    consentText: string;
  };
  sections: PrivacySectionYaml[];
  contact: {
    companyName: string;
    websiteLabel: string;
    websiteUrl: string;
    email: string;
  };
}

interface JobsYaml {
  api: {
    jobListEndpoint: string;
    jobDetailEndpoint: string;
    applyJobEndpoint: string;
  };
}

const industryModules = import.meta.glob<IndustryData>('./industries/*.yml', {
  eager: true,
  import: 'default',
});

const caseStudyModules = import.meta.glob<CaseStudyData>('./case-studies/*.yml', {
  eager: true,
  import: 'default',
});

export const site = siteYaml as {
  defaultTitle: string;
  language: string;
  defaultTheme: 'light' | 'dark' | 'system default';
  favicon: string;
  seo: {
    description: string;
    siteUrl: string;
    siteName: string;
    ogImage: string;
    robots: string;
  };
  globalToast: {
    enabled: boolean;
    message: string;
  };
};

export const navigation = navigationYaml as {
  logo: { image: string; alt: string };
  primary: {
    home: { title: string; url: string };
    career: { title: string; url: string };
    contact: { title: string; url: string };
  };
  solutions: {
    label: string;
    heading: string;
    card: {
      image: string;
      alt: string;
      title: string;
      description: string;
      ctaLabel: string;
      ctaUrl: string;
    };
    items: CmsNavItem[];
  };
  industries: {
    label: string;
    heading: string;
    viewAll: CmsNavItem;
  };
  resources: {
    label: string;
    heading: string;
    card: {
      image: string;
      alt: string;
      title: string;
      description: string;
      ctaLabel: string;
      ctaUrl: string;
    };
    items: CmsNavItem[];
  };
};

export interface OfficeItem {
  name: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
}

export interface CountryItem {
  name: string;
  code: string;
}

export const footer = footerYaml as {
  logo: { image: string; alt: string };
  description: string;
  company: { heading: string; links: CmsLink[] };
  services: { heading: string; links: CmsLink[] };
  socials: { links: Array<CmsLink & { icon: string }> };
  contact: { heading: string; phone: string; email: string };
  offices: {
    heading: string;
    indiaFlagCode: string;
    list: OfficeItem[];
  };
  globalPresence: {
    heading: string;
    countries: CountryItem[];
  };
  copyright: string;
  legalLinks: CmsLink[];
};

export const contactForm = contactFormYaml as {
  postUrl: string;
  categories: string[];
};

export const home = (() => {
  const data = homeYaml as HomeYaml;

  return {
    hero: {
      ...data.hero,
      backgroundImage: getCmsAsset(data.hero.backgroundImage),
      partnerLogos: data.hero.partnerLogos.map((logo) => ({
        ...logo,
        image: getCmsAsset(logo.image),
      })),
    },
    journey: {
      ...data.journey,
      milestones: data.journey.milestones.map(({ image, ...milestone }) => ({
        ...milestone,
        imageSrc: getCmsAssetSrc(image),
      })),
    },
    services: {
      ...validateHomeServices(data.services),
      backgroundImage: getCmsAsset(data.services.backgroundImage),
    },
    team: {
      ...data.team,
      backgroundImageSrc: getCmsAssetSrc(data.team.backgroundImage),
      meetTeamImageSrc: getCmsAssetSrc(data.team.meetTeamImage),
      members: data.team.members.map((member) => ({
        img: getCmsAssetSrc(member.image),
        name: member.name,
        role: member.role,
        desc: member.desc,
      })),
    },
    footprint: data.footprint,
    clients: {
      ...data.clients,
      logos: data.clients.logos.map((logo) => ({
        ...logo,
        image: getCmsAsset(logo.image),
      })),
    },
    testimonials: {
      ...data.testimonials,
      awardsImage: getCmsAsset(data.testimonials.awardsImage),
    },
    articles: {
      ...data.articles,
      posts: data.articles.posts.map(resolveLinkedInEmbed),
    },
  };
})();

function getIframeAttribute(embedCode: string, attributeName: string) {
  const pattern = new RegExp(`${attributeName}\\s*=\\s*["']([^"']+)["']`, 'i');
  return embedCode.match(pattern)?.[1];
}

function resolveLinkedInEmbed(post: {
  embedCode: string;
  fallbackTitle?: string;
}): ArticlePost {
  const src = getIframeAttribute(post.embedCode, 'src');
  if (!src) {
    throw new Error('Home articles: LinkedIn iframe embed is missing a src attribute.');
  }

  const embedUrl = new URL(src);
  if (
    embedUrl.hostname !== 'www.linkedin.com' ||
    !embedUrl.pathname.startsWith('/embed/feed/update/')
  ) {
    throw new Error(`Home articles: unsupported LinkedIn embed URL "${src}"`);
  }

  const heightValue = Number(getIframeAttribute(post.embedCode, 'height'));
  const widthValue = Number(getIframeAttribute(post.embedCode, 'width'));
  const title = getIframeAttribute(post.embedCode, 'title') || 'Embedded LinkedIn post';
  const fallbackTitle =
    post.fallbackTitle?.trim() && post.fallbackTitle.trim() !== 'Embedded post'
      ? post.fallbackTitle.trim()
      : 'View this update from HTIS Telecom on LinkedIn.';

  return {
    embedCode: post.embedCode,
    src: embedUrl.toString(),
    url: `https://www.linkedin.com${embedUrl.pathname.replace(
      '/embed/feed/update/',
      '/feed/update/',
    )}`,
    height: Number.isFinite(heightValue) && heightValue > 0 ? heightValue : 670,
    width: Number.isFinite(widthValue) && widthValue > 0 ? widthValue : 504,
    title,
    fallbackTitle,
  };
}

export const about = (() => {
  const data = aboutYaml as AboutYaml;

  return {
    ...data,
    hero: {
      ...data.hero,
      backgroundImage: getCmsAsset(data.hero.backgroundImage),
    },
    mission: {
      ...data.mission,
      image: getCmsAsset(data.mission.image),
    },
    lifeAtHtis: {
      ...data.lifeAtHtis,
      backgroundImage: getCmsAsset(data.lifeAtHtis.backgroundImage),
      image: getCmsAsset(data.lifeAtHtis.image),
    },
    team: {
      members: data.team.members.map((member) => ({
        name: member.name,
        role: member.role,
        dept: member.dept,
        img: getCmsAssetSrc(member.image),
      })),
    },
    principles: {
      ...data.principles,
      image: getCmsAsset(data.principles.image),
    },
  };
})();

export const awards: {
  title: string;
  hero: {
    backgroundImage: ImageMetadata;
    title: string;
    subtitle: string;
  };
  items: AwardGalleryItem[];
} = (() => {
  const data = awardsYaml as AwardsYaml;

  return {
    ...data,
    hero: {
      ...data.hero,
      backgroundImage: getCmsAsset(data.hero.backgroundImage),
    },
    items: data.items.map((item, index) => {
      const fallbackImage = item.image ?? item.thumbnail;
      if (!fallbackImage) {
        throw new Error(`Awards: "${item.title}" is missing a thumbnail or image.`);
      }

      const fallbackAlt = item.imageAlt ?? item.title;
      const images = item.images?.length
        ? item.images
        : [{ image: fallbackImage, alt: fallbackAlt }];
      const thumbnail = item.thumbnail ?? fallbackImage;

      return {
        id: index + 1,
        type: item.type,
        title: item.title,
        organization: item.organization,
        date: item.date,
        thumbnailSrc: getCmsAssetSrc(thumbnail),
        images: images.map((image) => ({
          src: getCmsAssetSrc(image.image),
          alt: image.alt,
        })),
      };
    }),
  };
})();

function resolveHero(hero: PageHeroYaml) {
  return {
    ...hero,
    backgroundImage: getCmsAsset(hero.backgroundImage),
    foregroundImage: hero.foregroundImage ? getCmsAsset(hero.foregroundImage) : undefined,
    carouselImages: hero.carouselImages?.map(getCmsAssetSrc) ?? [],
  };
}

function validateHomeServices(services: HomeYaml['services']) {
  const expectedIds: HomeServiceId[] = ['telecom', 'resourcing', 'software', 'system'];

  if (services.items.length !== 4) {
    throw new Error(
      `Home services: expected exactly 4 services, received ${services.items.length}`,
    );
  }

  const seenIds = new Set<string>();
  for (const service of services.items) {
    if (!expectedIds.includes(service.id)) {
      throw new Error(`Home services: unsupported service id "${service.id}"`);
    }

    if (seenIds.has(service.id)) {
      throw new Error(`Home services: duplicate service id "${service.id}"`);
    }
    seenIds.add(service.id);

    if (service.features.length !== 6) {
      throw new Error(
        `Home services: "${service.id}" must have exactly 6 features, received ${service.features.length}`,
      );
    }

    if (service.metrics.length !== 4) {
      throw new Error(
        `Home services: "${service.id}" must have exactly 4 metrics, received ${service.metrics.length}`,
      );
    }
  }

  return services;
}

function resolveExecution(execution: ExecutionYaml) {
  return {
    ...execution,
    headingHtml: execution.heading.replace(/\n/g, '<br />'),
  };
}

export const telecom = (() => {
  const data = telecomYaml as TelecomYaml;

  return {
    ...data,
    hero: resolveHero(data.hero),
    capabilities: {
      ...data.capabilities,
      backgroundImage: getCmsAsset(data.capabilities.backgroundImage),
      images: data.capabilities.images.map(getCmsAssetSrc),
    },
  };
})();

export const systemIntegration = (() => {
  const data = systemIntegrationYaml as SystemIntegrationYaml;

  return {
    ...data,
    hero: resolveHero(data.hero),
    strategicPillars: {
      ...data.strategicPillars,
      backgroundImage: getCmsAsset(data.strategicPillars.backgroundImage),
      centerImageSrc: getCmsAssetSrc(data.strategicPillars.centerImage),
    },
    partnerEcosystem: {
      tabs: data.partnerEcosystem.tabs.map((tab) => ({
        ...tab,
        partners: tab.partners.map((partner) => ({
          name: partner.name,
          logoSrc: partner.logo ? getCmsAssetSrc(partner.logo) : undefined,
        })),
      })),
    },
    execution: resolveExecution(data.execution),
    deployments: {
      ...data.deployments,
      image: getCmsAsset(data.deployments.image),
    },
  };
})();

export const software = (() => {
  const data = softwareYaml as SoftwareYaml;

  return {
    ...data,
    hero: resolveHero(data.hero),
    portfolio: {
      ...data.portfolio,
      backgroundImage: getCmsAsset(data.portfolio.backgroundImage),
      capabilities: data.portfolio.capabilities.map((tab) => ({
        ...tab,
        items: tab.items.map((item) => ({
          ...item,
          image: getCmsAssetSrc(item.image),
        })),
      })),
    },
    execution: resolveExecution(data.execution),
    caseStudies: {
      ...data.caseStudies,
      items: data.caseStudies.items.map((item) => ({
        ...item,
        image: getCmsAssetSrc(item.image),
      })),
    },
  };
})();

export const resourcing = (() => {
  const data = resourcingYaml as ResourcingYaml;

  return {
    ...data,
    hero: resolveHero(data.hero),
    capabilities: {
      ...data.capabilities,
      backgroundImage: getCmsAsset(data.capabilities.backgroundImage),
    },
  };
})();

export const privacy = privacyYaml as PrivacyYaml;

export const jobs = jobsYaml as JobsYaml;

export const industriesData = Object.values(industryModules).sort(
  (a, b) =>
    (a.navOrder ?? Number.MAX_SAFE_INTEGER) - (b.navOrder ?? Number.MAX_SAFE_INTEGER) ||
    a.title.localeCompare(b.title) ||
    a.slug.localeCompare(b.slug),
);

export const caseStudiesData = Object.values(caseStudyModules)
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((study, index) => ({ ...study, id: index }));

export const orderedIndustriesData = industriesData;

export const industryNavItems: CmsNavItem[] = orderedIndustriesData.map((industry) => ({
  title: industry.title,
  desc: industry.summary,
  url: `/industry/${industry.slug}`,
  icon: industry.iconName,
}));
