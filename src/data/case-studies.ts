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

  // Dynamic page custom template fields:
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

export const caseStudiesData: CaseStudyData[] = [
  {
    id: 1,
    slug: 'data-center-modernisation',
    title: 'Data center Modernisation',
    description: 'Modernized backbone infrastructure with redundant fiber connectivity.',
    solution: 'System Integration',
    industry: 'Government',
    tags: ['750+ locations', 'Telecom', 'Government'],
    clientLabel: 'State Govt – Manpower & Hardware',
    heroTitle: 'Virtualized Hyperconverged Compute & Dual-Ring Fiber Loop Integration',
    heroSummary:
      'Migrated legacy administrative systems into an ultra-resilient hyperconverged infrastructure across 750+ government offices, completely eliminating data corruption and application timeouts.',
    heroMetrics: ['750+ Offices', '99.99% Uptime', '50% Faster Response'],
    clientContext: {
      clientType: 'State IT & Administrative Department',
      industryScale: 'State-Wide Administrative Services',
      environment:
        'Decentralized public registries and tax offices crossing multiple remote districts',
      bullets: [
        'Acts as the primary processing node for public land registries, vehicle licensing, and state treasury programs.',
        'Supports daily digital operations and transaction queues for millions of citizens.',
        'Operates within strict security guidelines and high concurrent request profiles.',
      ],
    },
    challenge: {
      paragraph:
        'Before HTIS engaged, the administrative departments struggled with outdated server hardware, erratic power grids, and manual backups, leading to frequent regional outages and lost productivity.',
      bullets: [
        'Single points of failure: Legacy routing networks had no active path redundancy, meaning a single fiber cut offline entire districts.',
        'Downtime & latency: Servers regularly buckled under the load of peak morning administrative queues, leading to transaction losses.',
        'High administrative lag: Manual records processing was heavily delayed due to disjointed software and physical hard drive failures.',
      ],
    },
    solutionDetails: {
      paragraph:
        'HTIS deployed a unified modernization framework, virtualizing local servers and rolling out resilient fiber loops with automated backup path switching.',
      bullets: [
        'Hyperconverged Infrastructure (HCI): Consolidated legacy hardware into highly virtualized, self-healing compute nodes.',
        'Active-passive fiber ring: Engineered dynamic path routing utilizing BGP/OSPF topologies across 750+ sites.',
        'Data migration: Successfully migrated millions of critical citizen records with zero midday service interruption.',
      ],
    },
    outcomes: {
      metrics: [
        { value: '50%', label: 'Faster registry response times' },
        { value: '99.99%', label: 'Active system uptime achieved' },
        { value: '750+', label: 'Administrative offices modernized' },
      ],
      bullets: [
        'Eliminated unscheduled network drops and database corruptions, creating high administrative continuity.',
        'Allowed staff to handle twice the volume of citizen files without experiencing system lags.',
        'Implemented modern AES-256 standard VPN encryption for secure administrative data transmission.',
      ],
    },
    whyHTIS: [
      'Proven experience scaling government systems with complex multi-agency compliance needs.',
      'Flexible deployment resources capable of concurrent execution across remote regions.',
      'Turnkey lifecycle capabilities ranging from initial fiber laying to active virtualization support.',
    ],
  },
  {
    id: 2,
    slug: 'national-broadband-rollout',
    title: 'National Broadband Rollout',
    description:
      'Deployed high-speed broadband network across rural communities, bridging the digital divide with scalable infrastructure.',
    solution: 'Telecom Services',
    industry: 'Telecom',
    tags: ['500+ miles fiber', 'Telecom', 'Connectivity'],
    clientLabel: 'Tier-1 Telecom Operator – Pan-India Rollout',
    heroTitle: 'High-Density Armored Optical Backhaul & Rural Node Commissioning',
    heroSummary:
      'Bridged the remote digital divide by engineering and laying over 500 miles of high-durability fiber backbones, bringing high-speed broadband to 200+ rural villages.',
    heroMetrics: ['500+ Miles', '200+ Villages', '10 Gbps Active Links'],
    clientContext: {
      clientType: 'National Telecom Infrastructure Operator',
      industryScale: 'Pan-India High-Capacity Telecommunication',
      environment:
        'Rugged rural districts with harsh climates, high-elevation zones, and low existing infrastructure',
      bullets: [
        'Aims to deploy scalable rural optical paths compatible with future 5G Standalone (SA) services.',
        'Required coordinating deep clearance permits across municipal, state, and environmental agencies.',
        'Needed custom high-durability passive shelters capable of surviving intense seasonal monsoons.',
      ],
    },
    challenge: {
      paragraph:
        'The target communities were entirely isolated from modern digital grids, relying on erratic satellite links. Deploying traditional optical cables faced severe geographical barriers and regulatory delays.',
      bullets: [
        'Extreme terrains: Mountainous, rocky, and forested paths prohibited standard trenching machinery.',
        'Right-of-way bottlenecks: Delayed permits from multiple local forest, road, and river authorities.',
        'Weather constraints: Landslides and monsoon seasons limited physical work schedules to brief quarterly windows.',
      ],
    },
    solutionDetails: {
      paragraph:
        'HTIS deployed a hybrid routing strategy, combining specialized underground micro-trenching with robust aerial cable poles and solar-backed active cabinets.',
      bullets: [
        'Advanced optical engineering: Laid 500+ miles of high-count armored fiber cables resilient to water and physical impacts.',
        'Hybrid laying models: Executed high-tension aerial line systems across gorges while micro-trenching roadside routes.',
        'Sovereign exchange node grids: Built and powered passive environmental shelters using localized solar arrays.',
      ],
    },
    outcomes: {
      metrics: [
        { value: '500+', label: 'Miles of armored optical fiber active' },
        { value: '200+', label: 'Rural communities connected to broadband' },
        { value: '30%', label: 'Reduction in overall backhaul latency' },
      ],
      bullets: [
        'Enabled instant digital school curriculums and high-definition village telemedicine connections.',
        'Supplied rural commerce centers with instant digital payments and online crop market access.',
        'Delivered 10 Gbps backhaul capacity to support future cellular and network grid expansions.',
      ],
    },
    whyHTIS: [
      'Comprehensive telecom capacity spanning OSP (Outside Plant) engineering to dynamic node configuration.',
      'Adept legal permit navigation, ensuring swift Right-of-Way clearances.',
      'Resilient field force equipped and trained to deploy in high-altitude environments.',
    ],
  },
  {
    id: 3,
    slug: 'airport-security-enhancement',
    title: 'Airport Security Enhancement',
    description:
      'Upgraded surveillance and access control systems for a major international airport to comply with modern security standards.',
    solution: 'System Integration',
    industry: 'Smart Spaces',
    tags: ['Smart Spaces', 'Security', 'Surveillance'],
    clientLabel: 'International Airport Authority',
    heroTitle: 'Unified Smart Space Access Controls & 1000+ AI-Powered IP Camera Array',
    heroSummary:
      'Upgraded a major air hub to a unified high-density PoE network fabric with over 1,000 smart surveillance nodes, accelerating traveler flows while maintaining zero security gaps.',
    heroMetrics: ['1000+ Cameras', 'Zero Blind Spots', '40% Less Gate Queue Time'],
    clientContext: {
      clientType: 'Metro Airport Infrastructure Authority',
      industryScale: 'International Air Hub & Public Transit Space',
      environment:
        'Vast, multi-terminal airport zones spanning commercial passenger halls and high-security airfields',
      bullets: [
        'Processes upwards of 30 million domestic and international passenger movements yearly.',
        'Under strict surveillance supervision from national defense agencies and international flight boards.',
        'Requires continuous system availability with absolutely zero operational maintenance windows.',
      ],
    },
    challenge: {
      paragraph:
        'The existing security structure utilized disconnected analog CCTV feeds and slow paper-based terminal logs, leading to long traveler delays and significant visibility blind spots.',
      bullets: [
        'Perimeter security gaps: Analog setups lacked automated motion detections along dark runway fences.',
        'Terminal bottlenecks: Slow physical credential checks at staff gates created long security queues.',
        'Data compartmentalization: Control centers could not match real-time video feeds with swipe-card logs.',
      ],
    },
    solutionDetails: {
      paragraph:
        'HTIS architected a unified smart space framework, laying a high-performance Cat6A structured cable grid and deploying biometric locks alongside AI camera arrays.',
      bullets: [
        'AI camera deployments: Upgraded and calibrated over 1,000 smart IP nodes with built-in perimeter crossline analytics.',
        'Biometric access nodes: Installed fast facial recognition gates for crew transitions and boarding zones.',
        'Unified security NOC: Engineered centralized command consoles linking biometric access alerts directly to CCTV cameras.',
      ],
    },
    outcomes: {
      metrics: [
        { value: '1,000+', label: 'High-definition AI cameras' },
        { value: '40%', label: 'Reduction in staff gate queue times' },
        { value: '100%', label: 'Coverage of airfield perimeter zones' },
      ],
      bullets: [
        'Enabled instant automated security alarms for any unauthorized airfield crossings.',
        'Streamlined airline crew movements, maximizing overall terminal efficiency.',
        'Conducted entire network and camera swap with absolutely zero airport service interruptions.',
      ],
    },
    whyHTIS: [
      'Superior capabilities in high-density structural cabling and specialized active network arrays.',
      'Proven track record in high-security, zero-downtime public infrastructures.',
      'Unique hardware-software convergence capability for instant alarms and unified NOC interfaces.',
    ],
  },
  {
    id: 4,
    slug: 'smart-city-infrastructure',
    title: 'Smart City Infrastructure',
    description:
      'Implemented IoT sensors and connected public transport systems to optimize city traffic and energy consumption.',
    solution: 'Software Development',
    industry: 'Smart Spaces',
    tags: ['Smart City', 'Smart Spaces', 'IoT'],
    clientLabel: 'Metropolitan Development Authority',
    heroTitle: 'LoRaWAN IoT Sensor Grid & Adaptive Traffic Software Engineering',
    heroSummary:
      'Synchronized thousands of city streetlights, environmental sensors, and public transit nodes onto a centralized smart dashboard, saving millions in municipal utility costs.',
    heroMetrics: ['5000+ IoT Nodes', '25% Energy Savings', '30% Less Congestion'],
    clientContext: {
      clientType: 'Smart City Municipal Corporation',
      industryScale: 'Metropolitan Smart Infrastructure',
      environment:
        'Dense urban commercial corridors and public transit pathways with high traffic volumes',
      bullets: [
        'Aiming to transition standard city services into automated, eco-friendly systems.',
        'Needed a single software system capable of handling concurrent streams from multiple sensor types.',
        'Required hardware to survive extreme heat, moisture, and high electromagnetic dust.',
      ],
    },
    challenge: {
      paragraph:
        'Static municipal schedules led to enormous municipal electricity waste, while uncoordinated traffic lights caused massive rush-hour gridlock without any central oversight.',
      bullets: [
        'Severe lighting waste: Streetlights burned at full capacity during clear moonlight nights, wasting millions.',
        "Gridlocked commutes: Standard timer signals couldn't adjust to traffic spikes, causing long queues.",
        'Data silos: Ambient air quality, municipal buses, and traffic signals operated on disjointed platforms.',
      ],
    },
    solutionDetails: {
      paragraph:
        'HTIS coded a scalable, custom IoT tracking dashboard and deployed ruggedized LoRaWAN edge sensor networks across key city pathways.',
      bullets: [
        'LoRaWAN sensor deployment: Installed 5,000+ rugged telemetry nodes (lighting, environment, transit).',
        'Adaptive signaling software: Built custom scheduling algorithms that adjust signal times based on live sensor data.',
        'Unified Web Platform: Crafted an enterprise dashboard with live GIS mappings showing all municipal stats.',
      ],
    },
    outcomes: {
      metrics: [
        { value: '5,000+', label: 'Active edge IoT sensors' },
        { value: '25%', label: 'Reduction in streetlighting power use' },
        { value: '30%', label: 'Reduction in peak transit delays' },
      ],
      bullets: [
        'Reduced city-wide carbon footprint and electricity bills via automatic smart-dimming rules.',
        'Decreased response times for emergency vehicles by automatically clearing signal paths during distress alerts.',
        'Empowered local citizens with public web apps featuring real-time bus arrivals and ambient air monitors.',
      ],
    },
    whyHTIS: [
      'Proven expertise in massive IoT systems and robust software telemetry architectures.',
      'Sleek software engineering skills delivering highly responsive web platforms.',
      'Agile integration practices managing multi-department municipal requirements.',
    ],
  },
  {
    id: 5,
    slug: 'transport-fleet-management',
    title: 'Transport Fleet Management',
    description:
      'Developed custom software for real-time tracking of logistics fleet, reducing operational delays by 30%.',
    solution: 'Software Development',
    industry: 'Manufacturing',
    tags: ['Logistics', 'Manufacturing', 'Software'],
    clientLabel: 'National Logistics & Supply Chain Enterprise',
    heroTitle: 'Custom Web-Based Dispatch Portal & GPS Fleet Telemetry Integration',
    heroSummary:
      'Created a highly responsive fleet monitoring system for 2,000+ logistics trucks, maximizing routing efficiency and driving down fuel overheads.',
    heroMetrics: ['2000+ Vehicles', '30% Delay Reduction', '15% Fuel Efficiency'],
    clientContext: {
      clientType: 'Multi-State Heavy Logistics Enterprise',
      industryScale: 'Enterprise-Grade Supply Chain Systems',
      environment:
        'Interstate trucking networks covering varying cellular network zones and difficult terrains',
      bullets: [
        'Coordinates daily transits for thousands of valuable retail cargo runs.',
        'Requires exact arrival estimations to prevent warehouse loading jams.',
        'Needs strict security paths to protect cargo against highway thefts.',
      ],
    },
    challenge: {
      paragraph:
        'The client operated with manual driver reports and phone-based tracking, resulting in massive cargo delays, cargo theft risks, and high fuel waste from bad route choices.',
      bullets: [
        'Complete tracking blindness: Dispatchers had no real-time coordinates for high-value trucks.',
        'Fuel waste: Drivers selected paths manually, ignoring optimal highway updates or construction zones.',
        'Warehouse congestion: Slow delivery updates created huge truck queues at loading docks.',
      ],
    },
    solutionDetails: {
      paragraph:
        'HTIS developed an offline-first mobile app for field drivers, configured smart GPS trackers, and programmed a rich, central tracking portal.',
      bullets: [
        'Web tracking portal: Developed a real-time React/Svelte-based interface featuring dynamic leaflet maps.',
        'Offline-first app: Built a lightweight driver utility that saves tracking points during network losses.',
        'Route optimization: Coded automated path recommendations that avoid high-traffic and low-clearance roads.',
      ],
    },
    outcomes: {
      metrics: [
        { value: '2,000+', label: 'Interstate trucks actively tracked' },
        { value: '30%', label: 'Reduction in delivery transit delays' },
        { value: '15%', label: 'Increase in overall fuel efficiency' },
      ],
      bullets: [
        'Prevented cargo thefts by implementing automated real-time alarms for any geofence route deviations.',
        'Maximized warehouse dock throughput using automated SMS alerts when trucks approach.',
        'Improved vehicle health using automatic telemetry warnings for engine overheating or tire pressure drops.',
      ],
    },
    whyHTIS: [
      'Tailored custom software development capabilities surpassing generic pre-built packages.',
      'Deep skills in integrating active hardware telematics with reliable cloud databases.',
      'Intuitive UX/UI designs ensuring rapid, error-free adoption by truck drivers.',
    ],
  },
  {
    id: 6,
    slug: 'renewable-energy-grid',
    title: 'Renewable Energy Grid',
    description:
      'Integrated smart grid technology for solar and wind power distribution, improving grid resilience and uptime.',
    solution: 'System Integration',
    industry: 'Smart Spaces',
    tags: ['Green Energy', 'Smart Spaces', 'Smart Grid'],
    clientLabel: 'Green Power Infrastructure Consortium',
    heroTitle: 'SCADA Telemetry System & High-Speed Solar-Wind Farm Fiber Rings',
    heroSummary:
      'Synchronized remote wind and solar generation centers using sub-millisecond fiber loops, balancing energy loads and preventing grid overload failures.',
    heroMetrics: ['3.5 GW Monitored', '99.9% Resilience', '20% Load Efficiency'],
    clientContext: {
      clientType: 'Renewable Energy Generation Consortium',
      industryScale: 'Utility-Scale Clean Power Generation',
      environment: 'Expansive desert solar arrays and remote coastal wind turbine zones',
      bullets: [
        'Aggregates electricity outputs from multiple far-flung clean energy hubs.',
        'Supplies electricity directly to high-voltage national distribution grids.',
        'Must maintain rigorous safety parameters to avoid transformer burnouts.',
      ],
    },
    challenge: {
      paragraph:
        'Unstable solar and wind generation created intense voltage fluctuations, making distribution dangerous and risking major regional blackouts.',
      bullets: [
        'Volatile power generation: Rapid cloud covers or shifting winds triggered sudden, unpredictable voltage spikes.',
        'Isolated telemetry hubs: Wind and solar systems used distinct, incompatible data collectors.',
        'High latency risks: Slow data reporting prevented grid operators from rerouting power before overloads.',
      ],
    },
    solutionDetails: {
      paragraph:
        'HTIS deployed highly ruggedized fiber ring infrastructures and integrated centralized SCADA monitors to automate power load management.',
      bullets: [
        'Rugged fiber rings: Engineered high-durability fiber pathways connecting all remote farms.',
        'SCADA telemetry link: Combined solar and wind collectors into a single SCADA control dashboard.',
        'Dynamic balancing loops: Programmed automated load shedding and distribution control scripts.',
      ],
    },
    outcomes: {
      metrics: [
        { value: '3.5 GW', label: 'Of renewable energy actively managed' },
        { value: '99.9%', label: 'Active grid resilience and uptime' },
        { value: '20%', label: 'Improvement in load routing efficiency' },
      ],
      bullets: [
        'Completely prevented grid-overload drops using automated real-time power redirection.',
        'Delivered sub-millisecond telemetry feeds to command rooms, improving network reaction times.',
        'Optimized battery grid bank storage systems, reducing wasted excess energy.',
      ],
    },
    whyHTIS: [
      'Superior capacity in industrial fiber deployment and heavy electrical interface protocols.',
      'Rigorous attention to sub-millisecond data transit times in safety-critical networks.',
      'End-to-end telemetry system integration including rugged hardware setup and custom dashboards.',
    ],
  },
];
