export interface CapabilityItem {
  title: string;
  desc: string;
}

export interface CapabilityTab {
  id: string;
  label: string;
  shortLabel?: string;
  items: CapabilityItem[];
}

export const telecomCapabilities: CapabilityTab[] = [
  {
    id: 'turnkey-dc',
    label: 'Turnkey Data Centre Infrastructure (Physical Layer)',
    shortLabel: 'Physical Layer',
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
    shortLabel: 'NFVi',
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
    shortLabel: 'Next-Gen Network',
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
    shortLabel: 'T&T',
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
    shortLabel: 'Connectivity',
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
    shortLabel: 'PACO',
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
    shortLabel: 'Managed Services',
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
