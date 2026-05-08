import {
  Wifi,
  ShieldCheck,
  Cable,
  Radio,
  Headset,
  Wrench,
  Users,
  Clock,
  UserSearch,
  FileSignature,
  CircleDollarSign,
  Network,
  Code,
  Smartphone,
  Cloud,
  Database,
  Monitor,
  CheckSquare,
  Blocks,
  Cpu,
  RefreshCw,
  Server,
  Shield,
  Building2,
} from '@lucide/svelte';

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

export function getMilestones(imageSrcs: string[]): Milestone[] {
  if (imageSrcs.length === 0) {
    throw new Error('getMilestones: Expected at least 1 image source');
  }

  const rawMilestones = [
    {
      year: '2008',
      title: 'Establishment',
      description: 'HTIS was officially established.',
    },
    {
      year: '2008',
      title: 'First Customer - Vodafone',
      description: 'Secured Vodafone as our very first customer.',
    },
    {
      year: '2008',
      title: 'Second Customer - Bharti',
      description: 'Expanded our early portfolio with Bharti as our second customer.',
    },
    {
      year: '2012',
      title: 'Firmed HTIS Telecom',
      description: 'Officially firmed as HTIS Telecom Private Limited.',
    },
    {
      year: '2013',
      title: 'Cisco Service Partner',
      description: 'Registered as an official Cisco Service Partner.',
    },
    {
      year: '2014',
      title: 'Jio 4G Roll-out',
      description:
        'Cisco Delivery Jio 4G Roll-out started, delivering over half of India North and West, and deploying lacs of routers until 2019.',
    },
    {
      year: '2017',
      title: 'Global PSSA with Cisco',
      description:
        'Signed Global PSSA with Cisco as a Niche Category Partner in the field of Service Provider (SP) domain.',
    },
    {
      year: '2017',
      title: 'Global Expansion',
      description:
        'Extended our services to Sri Lanka, Bangladesh, South Africa, and the broader Africa region.',
    },
    {
      year: '2018-19',
      title: 'NTT Data Partnership',
      description:
        'Signed a global partnership with NTT data in the UK and deployed 15+ resources based in London for BTS testing.',
    },
    {
      year: '2019',
      title: 'UN Peace Keeping Project',
      description:
        'Delivered a United Nations Peace Keeping Project in the Central African Republic in partnership with Cisco.',
    },
    {
      year: '2020',
      title: 'WFMS Foundation',
      description:
        'Laid the foundation of wfms during the COVID lockdown, evolving into a Line of Business for Software Development.',
    },
    {
      year: '2020',
      title: 'System Integration',
      description:
        'Started envisioning System Integration post-COVID and hired a dedicated sales team across North India.',
    },
    {
      year: '2021',
      title: '100Cr Business Milestone',
      description:
        'Within 1 year of our new vision, we successfully delivered over 100Cr in business.',
    },
    {
      year: '2021',
      title: 'NHM Primary Health Centres',
      description:
        'IT-fied 400 NHM Primary Health Centres in Himachal Pradesh during the 2020 lockdown.',
    },
    {
      year: '2022-24',
      title: '5G Swap for Jio',
      description: 'Executed 5G Swap for Jio across more than 25,000 sites.',
    },
    {
      year: '2024',
      title: 'Samsung Award',
      description: 'Received a prestigious award from Samsung.',
    },
    {
      year: '2024',
      title: 'Cisco Award',
      description: 'Received a prestigious award from Cisco.',
    },
    {
      year: '2024',
      title: 'Smart Classrooms Solution',
      description:
        'Delivered a 5000+ Smart Classrooms Solution in Himachal Pradesh with Samsung hardware and a Learning Management Solution developed by HTIS.',
    },
    {
      year: '2026',
      title: 'wfms 2.0 Launch',
      description:
        'Scheduled launch of the next generation of our wfms platform, wfms 2.0.',
    },
  ];

  return rawMilestones.map((milestone, index) => ({
    ...milestone,
    imageSrc: imageSrcs[index % imageSrcs.length],
  }));
}

export function getTeamMembers(memberImgSrcs: string[]): TeamMember[] {
  if (memberImgSrcs.length !== 8) {
    throw new Error(
      `getTeamMembers: Expected exactly 8 image sources for team members, received ${memberImgSrcs.length}`,
    );
  }
  return [
    {
      img: memberImgSrcs[0],
      name: 'Aditya Kaushik',
      role: 'Managing Director',
      desc: 'Sets the company’s long-term goals and ensures we stay a leader in the technology industry.',
    },
    {
      img: memberImgSrcs[1],
      name: 'Sandeep Aswal',
      role: 'Chief Operating Officer',
      desc: 'Manages daily business tasks to make sure all large projects are completed successfully and on time.',
    },
    {
      img: memberImgSrcs[2],
      name: 'Amit Dhingra',
      role: 'Senior Vice President',
      desc: 'Leads major company projects and manages relationships with our most important partners.',
    },
    {
      img: memberImgSrcs[3],
      name: 'Arvind Sharma',
      role: 'Head - Centre of Excellence',
      desc: 'Sets the high technical standards for our services and finds new ways to solve technology problems.',
    },
    {
      img: memberImgSrcs[4],
      name: 'Soni Jain',
      role: 'Finance Controller',
      desc: 'Manages the company’s budget and handles the costs for our large-scale technology and infrastructure projects.',
    },
    {
      img: memberImgSrcs[5],
      name: 'Kuldeep Singh',
      role: 'HOD - Software Development',
      desc: 'Leads the team that builds secure and reliable software to meet the needs of large businesses and the government.',
    },
    {
      img: memberImgSrcs[6],
      name: 'Rohit Gupta',
      role: 'Delivery Head',
      desc: 'Oversees all technical projects from start to finish to make sure they are completed on time and meet our high-quality standards.',
    },
    {
      img: memberImgSrcs[7],
      name: 'Ram Pal',
      role: 'HOD - Human Resource',
      desc: 'Manages our team of experts and makes sure we have the right people ready for every level of a project.',
    },
  ];
}

export interface ServiceStat {
  val: string;
  label: string;
}

export interface ServiceIcon {
  icon: any;
  label: string;
}

export interface ServiceData {
  id: string;
  titleHtml: string;
  stats: ServiceStat[];
  icons: ServiceIcon[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'telecom',
    titleHtml: 'Tele&shy;communica&shy;tions',
    stats: [
      { val: '100+', label: 'Network<br/>Deployment' },
      { val: '11+', label: 'Years of<br/>Experience' },
      { val: '99%', label: 'Guaranteed<br/>Network<br/>Uptime' },
      { val: '500+', label: 'Critical Network<br/>Nodes Managed' },
    ],
    icons: [
      {
        icon: Wifi,
        label: 'Wireless<br/>Solutions',
      },
      {
        icon: ShieldCheck,
        label: 'Network<br/>Security',
      },
      {
        icon: Cable,
        label: 'Fiber<br/>Deployment',
      },
      {
        icon: Radio,
        label: 'RF<br/>Engineering',
      },
      {
        icon: Headset,
        label: 'AMC<br/>Support',
      },
      {
        icon: Wrench,
        label: 'Telecom<br/>Maintenance',
      },
    ],
  },
  {
    id: 'manpower',
    titleHtml: 'Resourcing',
    stats: [
      { val: '500+', label: 'Technical Professionals<br/>Deployed' },
      { val: '50+', label: 'Tier-1<br /> Corporate Partners' },
      { val: '98%', label: 'Resource<br /> Retention Rate' },
      { val: '10K+', label: 'Technical Man-Hours<br/>Managed Monthly' },
    ],
    icons: [
      {
        icon: Users,
        label: 'IT Staff<br/>Augmentation',
      },
      {
        icon: Clock,
        label: 'Temporary<br/>Hiring',
      },
      {
        icon: UserSearch,
        label: 'Executive<br/>Search',
      },
      {
        icon: FileSignature,
        label: 'Contract to<br/>Hire',
      },
      {
        icon: CircleDollarSign,
        label: 'Payroll<br/>Management',
      },
      {
        icon: Network,
        label: 'Project<br/>Teams',
      },
    ],
  },
  {
    id: 'software',
    titleHtml: 'Software<br class="hidden md:block" /> Development',
    stats: [
      { val: '500+', label: 'Technical Modules<br/>Deployed' },
      { val: '1.2M+', label: 'End-Users Supported' },
      { val: '99.99%', label: 'System Availability' },
      { val: '20+', label: 'Dedicated<br/>Govt/Public Sector Platforms' },
    ],
    icons: [
      {
        icon: Code,
        label: 'Custom<br/>Software',
      },
      {
        icon: Smartphone,
        label: 'App<br/>Development',
      },
      {
        icon: Cloud,
        label: 'Cloud<br/>Solutions',
      },
      {
        icon: Database,
        label: 'Database<br/>Design',
      },
      {
        icon: Monitor,
        label: 'Web<br/>Applications',
      },
      {
        icon: CheckSquare,
        label: 'QA &<br/>Testing',
      },
    ],
  },
  {
    id: 'system',
    titleHtml: 'System<br class="hidden md:block" /> Integrations',
    stats: [
      { val: '50+', label: 'High-Density Data Centers<br/>Integrated' },
      { val: '10 PB+', label: 'Data Managed<br/>& Orchestrated' },
      { val: '24/7', label: 'Proactive SOC/NOC<br/>Monitoring' },
      { val: '100%', label: 'Compliance with Regulatory Standards' },
    ],
    icons: [
      {
        icon: Blocks,
        label: 'API<br/>Integration',
      },
      {
        icon: Cpu,
        label: 'IoT<br/>Solutions',
      },
      {
        icon: RefreshCw,
        label: 'Legacy<br/>Modernization',
      },
      {
        icon: Server,
        label: 'Data<br/>Center',
      },
      {
        icon: Shield,
        label: 'Security<br/>Systems',
      },
      {
        icon: Building2,
        label: 'Enterprise<br/>Systems',
      },
    ],
  },
];
