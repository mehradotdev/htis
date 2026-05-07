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

export interface CapabilityItem {
  title: string;
  desc: string;
}

export interface CapabilityTab {
  id: string;
  label: string;
  items: CapabilityItem[];
}

export const telecomCapabilities: CapabilityTab[] = [
  {
    id: 'turnkey-dc',
    label: 'Turnkey Data Centre Infrastructure (Physical Layer)',
    items: [
      {
        title: 'End-to-end engineering',
        desc: 'From site acquisition to facility commissioning.',
      },
      {
        title: 'Civil & Structural Works',
        desc: 'Site preparation, specialized floor loading, and internal architectural fit outs.',
      },
      {
        title: 'Power & Electrical Distribution',
        desc: 'High-availability UPS systems, DG sets, and intelligent PDU deployment.',
      },
      {
        title: 'Precision Cooling & Refrigeration',
        desc: 'Cold-aisle/Hot-aisle containment and high-density liquid cooling solutions.',
      },
      {
        title: 'Fire Detection & Suppression',
        desc: 'VESDA (Very Early Smoke Detection) and Novec 1230/FM200 gas-based systems.',
      },
      {
        title: 'Cable Containment & Management',
        desc: 'Overhead/under-floor fibre raceways, intelligent Racking and high-density cable tray engineering.',
      },
      {
        title: 'Building Management Systems (BMS)',
        desc: 'Centralized IoT monitoring for temperature, humidity, and power leakage.',
      },
      {
        title: 'Physical Security & Access Control',
        desc: 'Multi-tier biometric security, IP-CCTV surveillance, and perimeter protection.',
      },
    ],
  },
  {
    id: 'telco-cloud',
    label: 'Telco Cloud & Virtualized Infrastructure (NFVi)',
    items: [
      {
        title: 'Software-defined foundation',
        desc: 'For modern virtualized network functions.',
      },
      {
        title: 'Cloud-Native NFVi Architecture',
        desc: 'Implementation of high-performance compute and storage clusters.',
      },
      {
        title: 'Container-as-a-Service (CaaS)',
        desc: 'Enterprise-grade Kubernetes deployment for Telco microservices.',
      },
      {
        title: 'Virtual Infrastructure Management (VIM)',
        desc: 'OpenStack orchestration and resource isolation for multi-tenancy.',
      },
      {
        title: 'Hardware Acceleration & Offloading',
        desc: 'Deployment of Smart NICs, FPGAs, and GPUs for edge computing.',
      },
      {
        title: 'Software-Defined Storage (SDS)',
        desc: 'Distributed storage solutions (Ceph/vSAN) for high-availability workloads.',
      },
      {
        title: 'Orchestration & MANO',
        desc: 'Management and Network Orchestration for automated VNF/CNF lifecycle.',
      },
      {
        title: 'Edge Cloud Deployment',
        desc: 'Localized compute clusters for Low-Latency (URLLC) application support.',
      },
    ],
  },
  {
    id: 'next-gen-core',
    label: 'Next-Gen Core Network & Voice Systems',
    items: [
      {
        title: 'Mobile connectivity foundation',
        desc: 'Deploying the heart of mobile connectivity for 4G and 5G Standalone (SA) environments.',
      },
      {
        title: '5G Standalone (SA) Core',
        desc: 'Service-Based Architecture (SBA) deployment and UPF optimization.',
      },
      {
        title: 'Evolved Packet Core (EPC)',
        desc: 'MME, SGW, and PGW implementation for legacy-to-next-gen transitions.',
      },
      {
        title: 'IMS Ecosystem Deployment',
        desc: 'VoLTE and VoNR (Voice over New Radio) core infrastructure.',
      },
      {
        title: 'Virtualized Vo-WiFi (ePDG)',
        desc: 'Secure untrusted access gateway integration for seamless indoor coverage.',
      },
      {
        title: 'Policy & Charging (PCRF/PCF)',
        desc: 'Real-time policy control and dynamic charging rule implementation.',
      },
      {
        title: 'Subscriber Data Management',
        desc: 'Unified Data Management (UDM) and Home Subscriber Server (HSS).',
      },
      {
        title: '4G/5G Convergence',
        desc: 'Seamless interworking and mobility management between network generations.',
      },
    ],
  },
  {
    id: 'high-capacity-transport',
    label: 'High-Capacity Transport & Transmission',
    items: [
      {
        title: 'Backbone engineering',
        desc: 'For high-speed, low-latency data transport.',
      },
      {
        title: 'IP/MPLS Segment Routing (SRv6)',
        desc: 'Advanced traffic engineering for simplified, scalable routing.',
      },
      {
        title: 'Optical Transport (DWDM/OTN)',
        desc: '400G/800G interface deployment for high capacity backhaul.',
      },
      {
        title: 'Data Center Interconnect (DCI)',
        desc: 'High-speed dark fiber and active transport between distributed DCs.',
      },
      {
        title: 'Network Disaggregation',
        desc: 'Open-networking integration using White-box switches and NOS.',
      },
      {
        title: 'Carrier Ethernet 3.0',
        desc: 'Standards-based MEF services for metro and wide-area connectivity.',
      },
      {
        title: 'Timing & Synchronization',
        desc: 'Implementation of PTP (IEEE 1588v2) and SyncE for 5G precision.',
      },
      {
        title: 'Automated Traffic Engineering',
        desc: 'Real-time path computation and bandwidth-on-demand services.',
      },
    ],
  },
  {
    id: 'enterprise-connectivity',
    label: 'Enterprise Connectivity & LAN/WAN Services',
    items: [
      {
        title: 'Professional deployment services',
        desc: 'For large-scale campus and industrial environments.',
      },
      {
        title: 'SD-WAN Architecture',
        desc: 'Software-defined edge solutions for centralized enterprise management.',
      },
      {
        title: 'Campus LAN/WAN Design',
        desc: 'High-availability core, distribution, and access layer engineering.',
      },
      {
        title: 'Passive Fiber Deployment',
        desc: 'End-to-end OSP/ISP fiber laying, splicing, and OTDR testing.',
      },
      {
        title: 'Industrial Wi-Fi 7 Integration',
        desc: 'High-throughput, low-latency wireless for smart factories.',
      },
      {
        title: 'Private LTE/5G Networks',
        desc: 'Dedicated on-premises cellular infrastructure for mission-critical apps.',
      },
      {
        title: 'Structured Cabling (I&C)',
        desc: 'International standard Cat6A/Fiber-to-the-Desk installation and certification.',
      },
      {
        title: 'Multi-site VPN & SASE Edge',
        desc: 'Secure site-to-site connectivity for distributed enterprise offices.',
      },
    ],
  },
  {
    id: 'packet-core-specialized',
    label: 'Packet Core Specialized Services & Compliance',
    items: [
      {
        title: 'Optimization and regulatory services',
        desc: 'Tailored for the Indian Telecom landscape.',
      },
      {
        title: 'GI-LAN & Traffic Steering',
        desc: 'Advanced steering of user-plane traffic through specialized service chains.',
      },
      {
        title: 'Deep Packet Inspection (DPI)',
        desc: 'Granular traffic analysis for QoS management and content filtering.',
      },
      {
        title: 'Regulatory IPDR Management',
        desc: 'Automated IP Detail Record generation and secure storage compliance.',
      },
      {
        title: 'Lawful Interception (LI) Systems',
        desc: 'Integration of regulatory-mandated monitoring and capture systems.',
      },
      {
        title: 'DC Gateway & VPCDI',
        desc: 'High-throughput gateway management for virtualized packet core data interfaces.',
      },
      {
        title: 'Video & Header Enrichment',
        desc: 'Optimization techniques for video delivery and billing transparency.',
      },
      {
        title: 'AAA & Identity Management',
        desc: 'RADIUS/Diameter-based authentication and subscriber accounting.',
      },
    ],
  },
  {
    id: 'managed-services',
    label: 'Managed Services & Strategic Support (AMC)',
    items: [
      { title: 'Operational excellence', desc: 'To maintain 99.999% network uptime.' },
      {
        title: '24/7 Network Operations (NOC)',
        desc: 'Proactive monitoring, fault management, and Tier-3 technical support.',
      },
      {
        title: 'Multi-Vendor AMC',
        desc: 'Comprehensive maintenance for multi-brand hardware and software stacks.',
      },
      {
        title: 'On-Site Field Engineering',
        desc: 'Pan-India presence for rapid hardware replacement and L1/L2 support.',
      },
      {
        title: 'Spares & Warehouse Management',
        desc: 'Critical FRU (Field Replaceable Unit) inventory and logistics.',
      },
      {
        title: 'Proactive Network Audits',
        desc: 'Periodic health checks, vulnerability scans, and performance tuning.',
      },
      {
        title: 'Lifecycle Management',
        desc: 'End-to-end tracking of equipment from deployment to decommission.',
      },
      {
        title: 'SLA-Driven Service Delivery',
        desc: 'Guaranteed response and resolution times for mission-critical services.',
      },
    ],
  },
];

export interface TelecomProcessStep {
  name: string;
  desc: string;
}

export interface TelecomProcess {
  id: string;
  title: string;
  description: string;
  details: TelecomProcessStep[];
}

export const telecomProcesses: TelecomProcess[] = [
  {
    id: '01',
    title: 'Strategic Planning & Site Acquisition (SAQ)',
    description:
      "The foundational phase where the network's physical and regulatory footprint is defined.",
    details: [
      {
        name: 'RF Nominal Planning',
        desc: 'Defining coverage targets and capacity requirements for 4G/5G rollout.',
      },
      {
        name: 'Technical Feasibility & TSSR',
        desc: 'Conducting Technical Site Survey Reports to evaluate structural and power readiness.',
      },
      {
        name: 'Regulatory & Compliance',
        desc: 'Managing SACFA clearances, spectrum coordination, and local authority permissions.',
      },
      {
        name: 'Site Acquisition',
        desc: 'Negotiating and securing land, rooftops, or tower space for the Points of Presence (PoP).',
      },
    ],
  },
  {
    id: '02',
    title: 'Network Architecture & Detailed Engineering (HLD/LLD)',
    description: 'Translating the blueprint into granular, executable technical designs.',
    details: [
      {
        name: 'High-Level Design (HLD)',
        desc: 'Defining end-to-end topology, including core integration and backhaul strategy.',
      },
      {
        name: 'Low-Level Design (LLD)',
        desc: 'Detailed port mapping, IP addressing schemes, and rack layouts for the Data Center.',
      },
      {
        name: 'Link Budgeting',
        desc: 'Calculation of signal gains and losses to ensure seamless transmission quality.',
      },
      {
        name: 'Fiber Route Engineering',
        desc: 'Designing the path for high-capacity backhaul through trenching or aerial fiber.',
      },
    ],
  },
  {
    id: '03',
    title: 'Technical Procurement & BoQ Management (BOQ)',
    description:
      'Ensuring the right multi-vendor hardware is sourced according to engineering specs.',
    details: [
      {
        name: 'BoQ (Bill of Quantities) Finalization',
        desc: 'Detailed listing of every active and passive component needed.',
      },
      {
        name: 'Vendor Ecosystem Integration',
        desc: 'Coordinating with OEMs like Ericsson, Nokia, or Cisco for specialized hardware.',
      },
      {
        name: 'Logistics & Spares Management',
        desc: 'Ensuring "Just-in-Time" delivery of critical components to remote sites.',
      },
    ],
  },
  {
    id: '04',
    title: 'Passive & Active Installation & Commissioning (I&C)',
    description: 'The ground-level execution where the physical network is built.',
    details: [
      {
        name: 'Civil & Structural Works',
        desc: 'Execution of tower foundations, earthing systems, and Data Center civil fit-outs.',
      },
      {
        name: 'Active Equipment I&C',
        desc: 'Mounting antennas, installing RRUs (Remote Radio Units), and configuring Core routers.',
      },
      {
        name: 'Power & Utility Setup',
        desc: 'Integration of Rectifiers, Battery Banks, and Green Energy (Solar/DG) solutions.',
      },
    ],
  },
  {
    id: '05',
    title: 'Network Integration & Core Connectivity',
    description: 'Connecting the physical site to the global telecom heartbeat.',
    details: [
      {
        name: 'Core Network Integration',
        desc: "Mapping the local site into the operator's PCRF, EPC, or 5G Core.",
      },
      {
        name: 'Call Flow Testing',
        desc: 'Verifying end-to-end voice and data paths (VoLTE/VoNR) through the newly deployed nodes.',
      },
      {
        name: 'Cross-Connect Management',
        desc: 'Establishing high-speed fiber interconnects between the DC and the Telco backbone.',
      },
    ],
  },
  {
    id: '06',
    title: 'Quality Assurance & Acceptance Testing (ATP)',
    description:
      'Rigorous benchmarking to ensure the network meets Tier-1 performance standards.',
    details: [
      {
        name: 'ATP (Acceptance Test Procedure)',
        desc: 'Executing client-approved test cases to ensure the site is ready for traffic.',
      },
      {
        name: 'KPI Benchmarking',
        desc: 'Measuring Latency, Throughput, and Handover success rates against target thresholds.',
      },
      {
        name: 'Regulatory Compliance Audit',
        desc: 'Final verification of EMF (Electromagnetic Field) radiation and safety standards.',
      },
    ],
  },
  {
    id: '07',
    title: 'Lifecycle Managed Services & NOC Operations',
    description: 'Shifting from deployment to 24/7 proactive stability and optimization.',
    details: [
      {
        name: 'NOC Operations',
        desc: 'Real-time monitoring of network health through a centralized Network Operations Centre.',
      },
      {
        name: 'Preventive & Corrective Maintenance',
        desc: 'Managing MTTR (Mean Time to Repair) through skilled field technical teams.',
      },
      {
        name: 'Ongoing Optimization',
        desc: 'Continuous tuning of RF parameters and software patches to maintain peak performance.',
      },
    ],
  },
];

export interface ServiceStat {
  val: string;
  label: string;
}

export interface ServiceIcon {
  svg: string;
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
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />',
        label: 'Wireless<br/>Solutions',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
        label: 'Network<br/>Security',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
        label: 'Fiber<br/>Deployment',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.665-4.665M5.25 5.25l2.25 3.182m0 0h3.182m-3.182 0l-3.182 3.182m0 0v-3.182m0 3.182l3.182 3.182" />',
        label: 'RF<br/>Engineering',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />',
        label: 'AMC<br/>Support',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />',
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
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.492M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />',
        label: 'IT Staff<br/>Augmentation',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />',
        label: 'Temporary<br/>Hiring',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />',
        label: 'Executive<br/>Search',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V8.25zM6.75 21v-3.375c0-.621.504-1.125 1.125-1.125H11.25c.621 0 1.125.504 1.125 1.125V21" />',
        label: 'Contract to<br/>Hire',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />',
        label: 'Payroll<br/>Management',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />',
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
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />',
        label: 'Custom<br/>Software',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />',
        label: 'App<br/>Development',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />',
        label: 'Cloud<br/>Solutions',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />',
        label: 'Database<br/>Design',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />',
        label: 'Web<br/>Applications',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.58-1.995 1.056-.19 1.956-1.025 2.062-2.095M9.75 18v-.192c0-.983-.658-1.829-1.58-1.995-1.056-.19-1.956-1.025-2.062-2.095M15 11.25v.75m-6-.75v.75m6-3v.75m-6-.75v.75m6-3v.75m-6-.75v.75m6-3v.75m-6-.75v.75" />',
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
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />',
        label: 'API<br/>Integration',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />',
        label: 'IoT<br/>Solutions',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />',
        label: 'Legacy<br/>Modernization',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />',
        label: 'Data<br/>Center',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
        label: 'Security<br/>Systems',
      },
      {
        svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />',
        label: 'Enterprise<br/>Systems',
      },
    ],
  },
];
