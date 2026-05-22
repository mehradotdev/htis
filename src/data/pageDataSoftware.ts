export interface CapabilityItem {
  title: string;
  desc: string;
}

export interface CapabilityTab {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  items: CapabilityItem[];
}

export const softwareCapabilities: CapabilityTab[] = [
  {
    id: 'saas-products',
    label: 'Standalone SaaS Products',
    shortLabel: 'Standalone SaaS Products',
    description: 'Our proprietary SaaS platforms are mature, cloud-hosted ecosystems designed for immediate deployment. They provide large-scale organizations with out-of-the-box digital control over complex operational and administrative workflows.',
    items: [
      {
        title: 'wfms™ (Workforce Management System)',
        desc: 'Our flagship ERP provides centralized operational control through a high-performance web portal and mobile applications for Android and iOS. Designed to handle thousands of daily users, it features a comprehensive suite of modules including Attendance, Payroll, Finance, and AMC Management.',
      },
      {
        title: 'Educare™ School ERP',
        desc: 'A specialized platform engineered exclusively for the education sector, delivering integrated academic content management and seamless administrative control for institutions.',
      },
      {
        title: 'HRMS & Payroll Engines',
        desc: 'Proprietary, in-house developed software solutions designed to automate complex salary structures, recruitment workflows, and the complete employee lifecycle.',
      },
    ],
  },
  {
    id: 'enterprise-solutions',
    label: 'Enterprise Solutions',
    shortLabel: 'Enterprise Solutions',
    description: 'We architect custom digital assets tailored to the unique operational challenges of enterprise and sovereign clients. From front-end digital experiences to hardcore backend workflow automation, our engineering methodology is entirely requirement-driven.',
    items: [
      {
        title: 'Corporate Web & Portal Design',
        desc: 'Development of high-performance, immersive corporate websites and secure internal web portals designed for scalability and brand authority.',
      },
      {
        title: 'Mobile Application Development',
        desc: 'Cross-platform and native mobile solutions bridging the gap between field operations and administrative management, ensuring real-time data sync on the go.',
      },
      {
        title: 'eCommerce & Retail Platforms',
        desc: 'Secure, high-volume transactional architectures built with robust payment gateways, inventory management, and intuitive user experiences.',
      },
      {
        title: 'Hardcore Digitalization & Workflow Automation',
        desc: 'Transforming legacy, manual processes into intelligent, automated digital workflows. We build integrated reporting systems and dashboards to provide real-time monitoring of productivity, tasks, and claims.',
      },
    ],
  },
  {
    id: 'public-sector',
    label: 'Public Sector Digitalization',
    shortLabel: 'Public Sector Digitalization',
    description: 'With a majority of our bespoke portfolio dedicated to government clients, we are a trusted partner for high-compliance digital infrastructure.',
    items: [
      {
        title: 'Municipal Utility & Revenue Systems',
        desc: 'Secure digital platforms engineered for managing public utilities, vendor administration, and municipal billing operations.',
      },
      {
        title: 'State-Level Workforce & Governance Portals',
        desc: 'Architecting vast manpower management systems and rural digital governance networks that provide administrative oversight at a state-wide scale.',
      },
      {
        title: 'Specialized State Assets & Taxation',
        desc: 'Resilient, high-traffic portals built to manage complex regional ecosystems, including commercial transit taxation, state ecotourism reservations, and agricultural administration.',
      },
    ],
  },
];
