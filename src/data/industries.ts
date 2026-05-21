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
  heroSubtitle: string;
  iconName:
    | 'RadioTower'
    | 'Landmark'
    | 'Building2'
    | 'Factory'
    | 'HeartPulse'
    | 'HardHat';
  techStack: string[];
  challenges: IndustryChallenge[];
  capabilities: IndustryCapability[];
}

export const industriesData: IndustryData[] = [
  {
    slug: 'telcos-and-isps',
    title: 'Telcos and ISPs',
    shortTitle: 'Telecom',
    heroSubtitle:
      'Powering national-scale connectivity with high-capacity optical backhaul, virtualized cores, and robust active/passive infrastructure.',
    iconName: 'RadioTower',
    techStack: [
      '5G Standalone (SA)',
      'SRv6 Segment Routing',
      'DWDM / OTN',
      'Containerized NFVi',
      'Regulatory IPDR',
      'Unified NOC Operations',
    ],
    challenges: [
      {
        title: 'Exploding Bandwidth Demand',
        description:
          'Dealing with exponentially growing user data volumes and ultra-HD streaming media without degrading local quality of service.',
      },
      {
        title: 'High Operational Overhead',
        description:
          'Scaling physical site maintenance, high-density power requirements, and multi-vendor AMC contracts across remote regions.',
      },
      {
        title: 'Strict Regulatory Compliance',
        description:
          'Ensuring absolute regulatory compliance with Indian IPDR logs, lawful interception networks, and zero-downtime security standards.',
      },
    ],
    capabilities: [
      {
        title: 'High-Capacity Optical Backhaul',
        description:
          'Designing and deploying high-speed backbone infrastructure, including DWDM/OTN active layers, dark fiber route engineering, and advanced IP/MPLS Segment Routing (SRv6) for seamless cross-site transport.',
        bulletPoints: [
          'High-speed 400G/800G interface commissioning',
          'Trenching, aerial laying, and OTDR verification testing',
          'Dynamic path computation and automated bandwidth-on-demand services',
        ],
      },
      {
        title: 'Cloud-Native 5G & Packet Core',
        description:
          'Deploying robust mobile network nodes, virtualized IMS voice systems (VoLTE/VoNR), and scalable Edge computing clusters using modern Service-Based Architectures (SBA).',
        bulletPoints: [
          'Service-Based Architecture (SBA) deployment and UPF path tuning',
          'Kubernetes Container-as-a-Service (CaaS) orchestration for Telco microservices',
          'OpenStack VIM multi-tenancy and hardware acceleration offloads',
        ],
      },
      {
        title: 'Turnkey OSP & ISP Infrastructure',
        description:
          'End-to-end ground-level execution including strategic site acquisition (SAQ), structural site builds, heavy power utility setup, and physical room fit-outs.',
        bulletPoints: [
          'Site clearance, RF nominal planning, and local authority SACFA permissions',
          'High-availability UPS systems, DG sets, and intelligent PDU distributions',
          'Multi-tier biometrics, IP-CCTV networks, and environmental monitoring',
        ],
      },
    ],
  },
  {
    slug: 'public-sector-ministries-defence',
    title: 'Public Sector, Ministries & Defence',
    shortTitle: 'Government',
    heroSubtitle:
      'Providing highly secure, sovereign IT infrastructure, national defense network backbones, and smart governance platforms.',
    iconName: 'Landmark',
    techStack: [
      'Sovereign Data Centers',
      'Zero-Trust Networks',
      'Secure Web Portals',
      'Novec 1230 Suppression',
      'IPsec Encryption',
      'Military-Grade SLA',
    ],
    challenges: [
      {
        title: 'Legacy Digital Debt',
        description:
          'Migrating sprawling, outdated municipal and ministerial legacy software databases into modern, secure, and user-friendly digital portals.',
      },
      {
        title: 'Strict Data Sovereignty',
        description:
          'Adapting physical and digital infrastructure to absolute data residency guidelines, localized database hosting, and high-security isolation.',
      },
      {
        title: 'Mass Concurrent Users',
        description:
          'Engineering systems and networks that can reliably scale to handle millions of simultaneous citizen requests under sudden peaks.',
      },
    ],
    capabilities: [
      {
        title: 'Sovereign Secure Data Centers',
        description:
          'Building ultra-resilient Tier-III/IV physical data center facilities with comprehensive military-grade safety systems, clean power backups, and air flow isolation.',
        bulletPoints: [
          'VESDA air sampling and eco-friendly gas-based fire suppression (Novec 1230/FM200)',
          'Heavy civil structural adjustments and customized raised-floor weight distribution',
          'Aero-thermal HVAC design with cold-aisle / hot-aisle containment systems',
        ],
      },
      {
        title: 'Tactical Secure Networking',
        description:
          'Designing highly encrypted wide-area networks (WAN) and private routing protocols tailored for tactical defense zones and inter-agency communications.',
        bulletPoints: [
          'Military-grade IPsec hardware encryption deployments',
          'Secure isolated VPN overlays and strict micro-segmentation policies',
          'High-availability redundant cross-connect paths for absolute network uptime',
        ],
      },
      {
        title: 'Digital Governance Platforms',
        description:
          'Developing sovereign, high-compliance portals and custom software solutions designed to digitize public services and optimize citizen experiences.',
        bulletPoints: [
          'Scalable custom API backends for multi-department data exchanges',
          'Responsive frontends adhering to strict public web accessibility guidelines',
          'Robust automated workflow databases supporting high-velocity records management',
        ],
      },
    ],
  },
  {
    slug: 'bfsi',
    title: 'BFSI (Banking, Financial Services & Insurance)',
    shortTitle: 'Banking',
    heroSubtitle:
      'Driving ultra-secure digital banking transformation with zero-trust networking, low-latency transaction routing, and high-availability backup systems.',
    iconName: 'Building2',
    techStack: [
      'Zero-Trust Architecture',
      'Next-Gen Firewalls',
      'HSM Integrations',
      'Active-Active DR',
      'Micro-segmentation',
      'Low-Latency Fabrics',
    ],
    challenges: [
      {
        title: 'Sophisticated Security Exploits',
        description:
          'Safeguarding massive volumes of sensitive customer financial records and transactions against coordinate digital exploits and state-sponsored groups.',
      },
      {
        title: 'Zero Downtime Tolerances',
        description:
          'Avoiding catastrophic losses from system outages through fail-safe system structures, real-time database syncing, and instant backups.',
      },
      {
        title: 'Transaction Latency Bottlenecks',
        description:
          'Executing intensive, multi-tier compliance check-ups and cryptographic validations within fractions of a second to ensure seamless transaction completions.',
      },
    ],
    capabilities: [
      {
        title: 'Zero-Trust Cyber Defense',
        description:
          'Deploying state-of-the-art security postures that assume zero absolute perimeter trust, relying on rigorous verification, encryption, and isolated compartments.',
        bulletPoints: [
          'Next-gen application-aware firewalls and automated intrusion preventions',
          'Hardware Security Module (HSM) deployment for high-performance cryptographic keys',
          'Continuous real-time anomaly detection and extended threat hunting (XDR)',
        ],
      },
      {
        title: 'Active-Active Disaster Recovery',
        description:
          'Orchestrating real-time, zero-lag replication layouts across multiple physical server hubs to guarantee immediate automated recovery in any disaster scenario.',
        bulletPoints: [
          'Synchronous zero-loss database replication strategies',
          'Automated, state-monitored network failover route configurations',
          'Proactive periodic offline-drills and capacity checks',
        ],
      },
      {
        title: 'Low-Latency Banking Fabrics',
        description:
          'Architecting high-frequency, high-bandwidth internal routing switches and networks optimized for rapid payment settlement and trade processing.',
        bulletPoints: [
          'Software-defined local networking optimization inside core banking centers',
          'Traffic prioritization rules favoring mission-critical API payloads',
          'Dense fiber interconnect layout engineering with ultra-low transit hops',
        ],
      },
    ],
  },
  {
    slug: 'manufacturing-automobile-fmcg',
    title: 'Manufacturing, Automobile & FMCG',
    shortTitle: 'Manufacturing',
    heroSubtitle:
      'Accelerating Industry 4.0 with resilient industrial Wi-Fi networks, IoT-driven automation grids, and high-performance supply chain software.',
    iconName: 'Factory',
    techStack: [
      'Industrial Wi-Fi 7',
      'Private LTE/5G Cores',
      'Ruggedized Switches',
      'OT/IT Convergence',
      'Real-Time GPS Fleet',
      'Telemetry Processing',
    ],
    challenges: [
      {
        title: 'Extreme Physical Environments',
        description:
          'Ensuring computing hardware and routing switches function reliably in areas prone to heat, dust, oils, and intense electromagnetic hums.',
      },
      {
        title: 'Dense Sensor Data Ingestion',
        description:
          'Managing tens of thousands of continuous mechanical sensors and telemetry feeds without creating high local packet latency.',
      },
      {
        title: 'Fragmented Supply Chains',
        description:
          'Losing operational efficiency due to uncoordinated stock alerts, manual vehicle tracking, and slow warehouse handoffs.',
      },
    ],
    capabilities: [
      {
        title: 'Rugged Industrial Connectivity',
        description:
          'Designing and scaling network layouts across vast mechanical yards and hot assembly floors using specialized, protected active hardware.',
        bulletPoints: [
          'IP67 dust/waterproof Wi-Fi 7 and industrial access point deployments',
          'Private LTE/5G wireless overlays for interference-free wireless coverage',
          'Ruggedized POE+ network routing switch commissionings',
        ],
      },
      {
        title: 'Operational Technology (OT) Integration',
        description:
          'Bridging the divide between digital IT databases and physical shop-floor machinery, facilitating real-time telemetry processing.',
        bulletPoints: [
          'Secure edge gateways connecting machinery to centralized cloud databases',
          'Sub-millisecond data routing priorities for real-time robotic controls',
          'Centralized IoT sensor dashboards reporting health and energy use',
        ],
      },
      {
        title: 'Logistics & Fleet Management',
        description:
          'Developing high-impact custom software platforms to trace inventory movements, coordinate dispatches, and track trucks.',
        bulletPoints: [
          'Real-time vehicle GPS tracking systems with automated geofenced alarms',
          'Centralized ERP modules optimizing truck space and dispatch orders',
          'Sleek mobile field utility apps keeping drivers connected with main stations',
        ],
      },
    ],
  },
  {
    slug: 'healthcare-education',
    title: 'Healthcare & Education',
    shortTitle: 'Healthcare & Edu',
    heroSubtitle:
      'Bridging distances with high-capacity telemedicine networks, cloud-managed clinical platforms, and interactive smart classroom environments.',
    iconName: 'HeartPulse',
    techStack: [
      'Smart Classrooms',
      'Custom LMS Systems',
      'Telehealth Wireless',
      'HIPAA Secure Storage',
      'Encrypted WAN Networks',
      'Samsung Display Arrays',
    ],
    challenges: [
      {
        title: 'Rigid Medical Privacy Rules',
        description:
          'Engineering file systems and databases that fully satisfy strict healthcare privacy acts (like HIPAA) without slowing down physician access.',
      },
      {
        title: 'Unequal Remote Network Quality',
        description:
          'Providing crisp, high-definition educational streams and telehealth links to under-connected village clinics and rural classrooms.',
      },
      {
        title: 'Unengaged Legacy Learning',
        description:
          'Transitioning static local schools away from traditional chalkboards into immersive, interactive, and cloud-connected learning grids.',
      },
    ],
    capabilities: [
      {
        title: 'Interactive Smart Classrooms',
        description:
          'Architecting and deploying large-scale connected learning rooms featuring digital displays, high-fidelity media, and customized software systems (such as the 5,000+ classroom Himachal Pradesh deployment).',
        bulletPoints: [
          'Samsung Interactive Display array installations and network calibrations',
          'Custom cloud Learning Management Software (LMS) custom-built by HTIS',
          'Reliable, high-bandwidth school campus Wi-Fi infrastructure layouts',
        ],
      },
      {
        title: 'High-Capacity Telemedicine Networks',
        description:
          'Connecting remote healthcare centers directly to expert urban medical hubs with stable, high-bandwidth streaming channels.',
        bulletPoints: [
          'High-definition low-latency video and audio transmission channels',
          'Integrated secure diagnostic feed routings (EEG, vital monitors)',
          'Point-to-point wireless or dedicated fiber backhaul infrastructure',
        ],
      },
      {
        title: 'HIPAA-Compliant Patient Data Systems',
        description:
          'Constructing secure, encrypted database environments designed to store, manage, and retrieve highly private electronic health records (EHR).',
        bulletPoints: [
          'AES-256 database-level encryption at rest and in transit',
          'Comprehensive audit logging and multi-factor staff logins',
          'Secure high-availability hosting options with automated hourly back-ups',
        ],
      },
    ],
  },
  {
    slug: 'real-estate-infrastructure-smart-spaces',
    title: 'Real Estate, Infrastructure & Smart Spaces',
    shortTitle: 'Smart Spaces',
    heroSubtitle:
      'Transforming physical buildings into highly efficient, future-ready smart spaces with centralized IoT controls and unified network fabrics.',
    iconName: 'HardHat',
    techStack: [
      'Centralized IoT BMS',
      'Cat6A Cabling Systems',
      'PoE Switch Networks',
      'IP Camera Arrays',
      'Access Control Systems',
      'Smart HVAC Systems',
    ],
    challenges: [
      {
        title: 'Disconnected Hardware Stacks',
        description:
          'Attempting to coordinate entirely distinct security, lighting, elevator, and heating systems from separate old control stations.',
      },
      {
        title: 'Massive PoE Cable Loads',
        description:
          'Managing a massive, complex structural spiderweb of high-capacity PoE lines for security cameras and smart light bulbs.',
      },
      {
        title: 'Intense Energy Waste',
        description:
          'Incurring massive utility costs and failing modern eco ratings due to manual, uncoordinated heating and lighting schedules.',
      },
    ],
    capabilities: [
      {
        title: 'Intelligent Building Systems (BMS)',
        description:
          'Creating centralized, automated software dashboards that monitor real-time temperatures, check for water leakages, and track active power loads.',
        bulletPoints: [
          'Seamless integration of diverse hardware types over BACnet/Modbus standards',
          'Smart HVAC control maps that dynamically adapt output to local weather forecasts',
          'Alert systems reporting critical structural deviations to staff instantly',
        ],
      },
      {
        title: 'High-Density Structured Cabling',
        description:
          'Planning, laying, and certifying heavy cable grids to support dense configurations of wireless hubs, smart appliances, and PoE devices.',
        bulletPoints: [
          'End-to-end Cat6A copper and fiber backbone structural design and laying',
          'Overhead and under-floor cable tray system pathways and grounding layouts',
          'High-performance PoE+ access-layer routing switch racks configured for scale',
        ],
      },
      {
        title: 'Unified Smart Space Access & Security',
        description:
          'Securing building premises with connected biometric scans, card scanners, and AI-assisted high-definition security camera grids.',
        bulletPoints: [
          'Multi-tier biometric (face/fingerprint) access gate installation',
          'Centralized security control centers routing hundreds of live IP feeds',
          'Automated, secure guest check-in systems feeding visitor databases',
        ],
      },
    ],
  },
];
