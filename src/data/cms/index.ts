import footerYaml from './footer.yml';
import homeYaml from './home.yml';
import navigationYaml from './navigation.yml';
import siteYaml from './site.yml';

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
  const assetName = filename.split('/').pop() ?? filename;
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
  journey: {
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    images: string[];
    milestones: Array<Omit<Milestone, 'imageSrc'>>;
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

const industryModules = import.meta.glob<IndustryData>('./industries/*.yml', {
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
  const journeyImages = data.journey.images.map(getCmsAssetSrc);

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
      milestones: data.journey.milestones.map((milestone, index) => ({
        ...milestone,
        imageSrc: journeyImages[index % journeyImages.length],
      })),
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
  };
})();

export const industriesData = Object.values(industryModules).sort((a, b) =>
  a.slug.localeCompare(b.slug),
);

const industryOrder = [
  'telcos-and-isps',
  'public-sector-ministries-defence',
  'bfsi',
  'manufacturing-automobile-fmcg',
  'healthcare-education',
  'real-estate-infrastructure-smart-spaces',
];

export const orderedIndustriesData = [...industriesData].sort(
  (a, b) => {
    const aIndex = industryOrder.indexOf(a.slug);
    const bIndex = industryOrder.indexOf(b.slug);

    return (
      (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
        (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex) ||
      a.title.localeCompare(b.title)
    );
  },
);

export const industryNavItems: CmsNavItem[] = orderedIndustriesData.map((industry) => ({
  title: industry.title,
  desc: industry.summary,
  url: `/industry/${industry.slug}`,
  icon: industry.iconName,
}));
