export interface Job {
  id: string;
  role: string;
  department: string;
  location: string;
  experience: string;
  whatYouWillDo: string;
  responsibilities: string[];
  minimumRequirements: string[];
}

const frontendDeveloperDetails = {
  whatYouWillDo: "As a Front-end Software Developer, you'll be responsible for building and maintaining user-facing features for our web applications. You'll work closely with designers, product managers, and backend engineers to deliver high-quality, responsive, and accessible user interfaces. You will participate in architecture discussions, write clean and testable code, and contribute to the continuous improvement of our front-end infrastructure.",
  responsibilities: [
    "Develop new user-facing features using modern front-end technologies like Astro, Svelte, and Tailwind CSS",
    "Build reusable code and libraries for future use",
    "Ensure the technical feasibility of UI/UX designs",
    "Optimize applications for maximum speed, scalability, and accessibility",
    "Collaborate with other team members and stakeholders",
    "Participate in code reviews and provide constructive feedback",
    "Troubleshoot and debug issues in a timely manner"
  ],
  minimumRequirements: [
    "2+ years of professional experience in front-end development",
    "Strong proficiency in JavaScript/TypeScript, HTML, and CSS",
    "Experience with modern front-end frameworks (e.g., Svelte, React, Vue)",
    "Understanding of web performance optimization techniques",
    "Experience with responsive design and cross-browser compatibility",
    "Excellent problem-solving and communication skills",
    "Ability to work effectively in a collaborative team environment"
  ]
};

export const jobs: Job[] = [
  {
    id: 'account-executive',
    role: 'Account Executive',
    department: 'Sales',
    location: 'Gurugram',
    experience: '4+ Year of Experience',
    whatYouWillDo: "As an Account Executive, you'll own the full sales cycle, from prospecting and closing to managing existing relationships and identifying new opportunities to expand our footprint within existing accounts. Specifically, we're looking for someone who can execute on long-term sales strategies, engage with internal and external stakeholders, align on technical and business requirements with product teams, build value in competitive situations, lead commercial negotiations, and close deals.",
    responsibilities: [
      "Own the full sales cycle, from business case development, to deal structuring and negotiating, to close",
      "Own a named account list and develop account plans for winning and expanding business with high growth technology companies",
      "Develop outbound strategies to create and nurture opportunities",
      "Work with both new and existing customers to develop and execute long-term sales strategies to expand revenue",
      "Drive deal strategy and commercial negotiations for large, complex renewals",
      "Develop relationships with executive stakeholders within your book of business",
      "Be responsible for account mapping and coordinating effective meetings with the appropriate external stakeholders expanding the customer relationship",
      "Lead and contribute to team projects to develop and refine our sales process and help shape the sales culture"
    ],
    minimumRequirements: [
      "6+ years of sales experience, preferably selling a highly technical product to enterprise customers, with a track record of top performance",
      "Ability to understand technical requirements and craft solutions across multiple products",
      "Ability to develop and execute account plans spanning multiple business units across complex organizations",
      "A knack for working well with a wide range of people, both internally and externally",
      "Strong presentation skills, particularly for in-person meetings with multiple stakeholders",
      "Proven ability to lead complex negotiations involving bespoke commercial agreements",
      "Superior verbal and written communication skills in English",
      "Ability to operate in a highly ambiguous and fast-paced environment",
      "Strong interest in technology and a deep understanding of the space"
    ]
  },
  {
    id: 'front-end-software-developer',
    role: 'Front-end Software Developer',
    department: 'Software',
    location: 'Gurugram',
    experience: '2+ Year of Experience',
    ...frontendDeveloperDetails
  },
  {
    id: 'front-end-software-developer-2',
    role: 'Front-end Software Developer',
    department: 'Software',
    location: 'Gurugram',
    experience: '2+ Year of Experience',
    ...frontendDeveloperDetails
  },
  {
    id: 'front-end-software-developer-3',
    role: 'Front-end Software Developer',
    department: 'Software',
    location: 'Gurugram',
    experience: '2+ Year of Experience',
    ...frontendDeveloperDetails
  },
  {
    id: 'front-end-software-developer-4',
    role: 'Front-end Software Developer',
    department: 'Software',
    location: 'Gurugram',
    experience: '2+ Year of Experience',
    ...frontendDeveloperDetails
  },
  {
    id: 'front-end-software-developer-5',
    role: 'Front-end Software Developer',
    department: 'Software',
    location: 'Gurugram',
    experience: '2+ Year of Experience',
    ...frontendDeveloperDetails
  },
  {
    id: 'front-end-software-developer-6',
    role: 'Front-end Software Developer',
    department: 'Software',
    location: 'Gurugram',
    experience: '2+ Year of Experience',
    ...frontendDeveloperDetails
  },
  {
    id: 'backend-engineer',
    role: 'Backend Engineer',
    department: 'Software',
    location: 'Mumbai',
    experience: '3+ Year of Experience',
    whatYouWillDo: "As a Backend Engineer, you will be responsible for designing, building, and maintaining the core services that power our applications. You will work on building scalable APIs, optimizing database queries, and ensuring the reliability and performance of our infrastructure.",
    responsibilities: [
      "Design, build, and maintain efficient, reusable, and reliable backend code",
      "Develop and maintain RESTful APIs and microservices",
      "Ensure the best possible performance, quality, and responsiveness of applications",
      "Identify bottlenecks and bugs, and devise solutions to these problems",
      "Help maintain code quality, organization, and automatization",
      "Collaborate with front-end developers to integrate user-facing elements with server-side logic"
    ],
    minimumRequirements: [
      "3+ years of experience in backend development",
      "Strong proficiency in Node.js, Python, or Go",
      "Experience with relational databases (e.g., PostgreSQL, MySQL) and NoSQL databases",
      "Familiarity with cloud platforms (e.g., AWS, GCP, Azure)",
      "Understanding of fundamental design principles behind a scalable application",
      "Proficient understanding of code versioning tools, such as Git"
    ]
  },
  {
    id: 'product-manager',
    role: 'Product Manager',
    department: 'Product',
    location: 'Mumbai',
    experience: '5+ Year of Experience',
    whatYouWillDo: "As a Product Manager, you will lead the ideation, development, and launch of innovative products. You will work closely with cross-functional teams including engineering, design, and marketing to execute the product vision and deliver value to our users.",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product and customer requirements",
      "Work closely with engineering to deliver winning products",
      "Develop product pricing and positioning strategies",
      "Act as a product evangelist to build awareness and understanding",
      "Represent the company by visiting customers to solicit feedback on company products and services"
    ],
    minimumRequirements: [
      "5+ years of experience as a Product Manager in a technology company",
      "Proven track record of managing all aspects of a successful product throughout its lifecycle",
      "Solid technical background with understanding and/or hands-on experience in software development and web technologies",
      "Strong problem-solving skills and willingness to roll up one's sleeves to get the job done",
      "Excellent written and verbal communication skills",
      "Skilled at working effectively with cross-functional teams in a matrix organization"
    ]
  },
  {
    id: 'ux-designer',
    role: 'UX Designer',
    department: 'Design',
    location: 'Mumbai',
    experience: '2+ Year of Experience',
    whatYouWillDo: "As a UX Designer, you will be responsible for delivering the best online user experience. You will be designing ideas using various methods and latest technology. You will be designing graphic user interface elements, like menus, tabs, and widgets.",
    responsibilities: [
      "Conduct user research and evaluate user feedback",
      "Create wireframes, storyboards, user flows, process flows, and site maps to effectively communicate interaction and design ideas",
      "Design graphic user interface elements, like menus, tabs, and widgets",
      "Build page navigation buttons and search fields",
      "Develop UI mockups and prototypes that clearly illustrate how sites function and look like",
      "Identify and troubleshoot UX problems (e.g. responsiveness)",
      "Adhere to style standards on fonts, colors, and images"
    ],
    minimumRequirements: [
      "2+ years of experience as a UX Designer, UI Designer, or similar role",
      "Portfolio of design projects",
      "Knowledge of wireframe tools (e.g., Wireframe.cc, InVision)",
      "Up-to-date knowledge of design software like Figma, Sketch, or Adobe XD",
      "Team spirit; strong communication skills to collaborate with various stakeholders",
      "Good time-management skills"
    ]
  }
];
