import aboutYaml from './about.yml';
import awardsYaml from './awards.yml';
import footerYaml from './footer.yml';
import homeYaml from './home.yml';
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
  id: number;
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

export interface AwardGalleryItem {
  id: number;
  type: 'award' | 'certificate';
  title: string;
  organization: string;
  date: string;
  src: string;
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
    image: string;
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
    saasImages: string[];
    enterpriseImages: string[];
    publicImages: string[];
  };
  execution: ExecutionYaml;
  caseStudyImages: string[];
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
  theme: string;
  darkTheme: string;
  favicon: string;
  contactAnchor: string;
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

export const footer = footerYaml as {
  logo: { image: string; alt: string };
  description: string;
  sections: Array<{ heading: string; links: CmsLink[] }>;
  socials: { heading: string; links: Array<CmsLink & { icon: string }> };
  contact: { heading: string; phone: string; email: string };
  copyright: string;
  legalLinks: CmsLink[];
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
    services: validateHomeServices(data.services),
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
  };
})();

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
    items: data.items.map((item, index) => ({
      id: index + 1,
      type: item.type,
      title: item.title,
      organization: item.organization,
      date: item.date,
      src: getCmsAssetSrc(item.image),
    })),
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
      saasImages: data.portfolio.saasImages.map(getCmsAssetSrc),
      enterpriseImages: data.portfolio.enterpriseImages.map(getCmsAssetSrc),
      publicImages: data.portfolio.publicImages.map(getCmsAssetSrc),
    },
    execution: resolveExecution(data.execution),
    caseStudyImages: data.caseStudyImages.map(getCmsAssetSrc),
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

export const industriesData = Object.values(industryModules).sort((a, b) =>
  a.slug.localeCompare(b.slug),
);

export const caseStudiesData = Object.values(caseStudyModules).sort(
  (a, b) => a.id - b.id || a.slug.localeCompare(b.slug),
);

const industryOrder = [
  'telcos-and-isps',
  'public-sector-ministries-defence',
  'bfsi',
  'manufacturing-automobile-fmcg',
  'healthcare-education',
  'real-estate-infrastructure-smart-spaces',
];

export const orderedIndustriesData = [...industriesData].sort((a, b) => {
  const aIndex = industryOrder.indexOf(a.slug);
  const bIndex = industryOrder.indexOf(b.slug);

  return (
    (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
      (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex) || a.title.localeCompare(b.title)
  );
});

export const industryNavItems: CmsNavItem[] = orderedIndustriesData.map((industry) => ({
  title: industry.title,
  desc: industry.summary,
  url: `/industry/${industry.slug}`,
  icon: industry.iconName,
}));
