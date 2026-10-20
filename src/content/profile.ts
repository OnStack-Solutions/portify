// Single source of truth for the whole site AND the portfolio assistant.
// Sources: Salman's Nextbridge portfolio document, his final resume, his LinkedIn profile,
// and details he confirmed directly (ADGM full-stack role, APC CRM revamp).
// Do not add anything here that Salman has not confirmed. The assistant answers only from this file.

export const person = {
  name: 'Salman Bashir',
  firstName: 'Salman',
  titles: ['Senior Software Engineer', 'Full Stack Developer', 'AI Integration'],
  headline: 'Full Stack Developer building AI-powered products',
  location: 'Lahore, Pakistan',
  email: 'salmanbashir163@gmail.com',
  phoneDisplay: '+92 313 7713795',
  phoneE164: '+923137713795',
  // wa.me requires the international number with digits only.
  whatsappNumber: '923137713795',
  whatsappGreeting: "Hi Salman, I came across your portfolio and would like to discuss a project.",
  linkedin: 'https://www.linkedin.com/in/salman-bashir-a49021171/',
  linkedinHandle: 'salman-bashir-a49021171',
  resumePath: '/Salman_Bashir_Resume.pdf',
  // Total professional experience, as stated by Salman.
  experienceYears: 5,
  summary:
    'Full Stack Developer with 5+ years of experience building production web applications with React, Next.js, TypeScript and Node.js (Express.js and NestJS). Specialized in AI integration, including natural-language-to-SQL, retrieval-augmented generation and AI assistants, and in integrations with hospitality POS and PMS systems and Xero accounting.',
  intro: [
    "I'm a full stack developer with 5+ years of experience designing and shipping production web applications. I work across the whole stack: React and Next.js on the frontend, Node.js services built with Express.js and NestJS behind them, and MySQL, PostgreSQL and MongoDB underneath.",
    'My focus is AI integration: natural-language-to-SQL with retrieval-augmented generation, AI assistants, and LLM features on OpenAI, Anthropic and self-hosted models. I also build integrations with hospitality POS and PMS systems, including Oracle OHIP, Oracle Gen1 and Gen2, Infrasys, Omega and Foodics, and with Xero accounting.',
  ],
  summaryShort:
    'I build web products end to end, with React and Next.js on the frontend and Node.js (Express.js and NestJS) on the backend, and I integrate LLMs into them.',
  industries: ['Real estate', 'Hospitality', 'CRM and accounting', 'Recruitment', 'Social networking', 'Billing'],
} as const;

export type Role = { title: string; start: string; end: string | null };

export const experience = {
  company: 'Nextbridge Limited',
  companyNote: 'A software services company that builds web platforms for clients.',
  location: 'Lahore, Pakistan',
  start: '2022-04',
  end: null as string | null,
  // Progression as shown on LinkedIn.
  roles: [
    { title: 'Senior Software Engineer', start: '2025-07', end: null },
    { title: 'Software Engineer', start: '2023-07', end: '2025-08' },
    { title: 'Associate Software Engineer', start: '2022-07', end: '2023-08' },
  ] satisfies Role[],
  highlights: [
    'Build and maintain client web applications across the frontend and backend, from new modules and third-party integrations to bug fixes and production support.',
    'Integrate LLM services into real-estate, hospitality and analytics products using OpenAI, Anthropic and self-hosted Ollama models.',
    'Work in client-facing teams, and as the only developer on some products, taking features from design and implementation through to release.',
  ],
} as const;

export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  { name: 'Frontend', items: ['React', 'Next.js', 'Redux', 'AngularJS', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Bootstrap', 'Formik', 'HTML', 'CSS'] },
  { name: 'Backend', items: ['Node.js', 'NestJS', 'Express.js', 'Ruby on Rails', 'FastAPI', 'Django', 'REST APIs', 'Microservices'] },
  { name: 'AI and LLMs', items: ['LLM integration', 'OpenAI API', 'Anthropic API', 'Ollama (self-hosted LLMs)', 'Retrieval-augmented generation (RAG)', 'Vector search', 'Natural-language-to-SQL', 'Semantic layer'] },
  { name: 'Data', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Vector databases'] },
  { name: 'Hospitality systems', items: ['Oracle OHIP (POS and PMS)', 'Oracle Gen1', 'Oracle Gen2', 'Infrasys', 'Omega', 'Foodics'] },
  { name: 'Integrations', items: ['Xero API', 'AWS S3', 'Azure Service Bus', 'Algolia', 'Google Maps API', 'Intercom', 'Amplitude', 'Twilio'] },
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Ruby', 'Python', 'SQL'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'Jira', 'Postman', 'Swagger'] },
];

export type Service = { title: string; body: string; evidence: string[] };

// Every service is backed by delivered work (the evidence lists project slugs).
export const services: Service[] = [
  {
    title: 'Full-stack development',
    body: 'Web applications built end to end: React and Next.js on the frontend, Node.js APIs with Express.js or NestJS, and MySQL, PostgreSQL or MongoDB underneath.',
    evidence: ['better-homes', 'apc-crm', 'abu-dhabi-global-management'],
  },
  {
    title: 'AI and LLM integration',
    body: 'Assistants, natural-language-to-SQL and retrieval features built on OpenAI, Anthropic or self-hosted models, with validation and access control for real data.',
    evidence: ['askbase-ai', 'grace-ai', 'ring-n-bring'],
  },
  {
    title: 'System integrations',
    body: 'Connecting products to the systems a business already runs on: hospitality POS and PMS systems such as Oracle OHIP, Oracle Gen1 and Gen2, Infrasys, Omega and Foodics, plus Xero, AWS S3, Algolia and analytics tools.',
    evidence: ['ring-n-bring', 'apc-crm', 'better-homes'],
  },
  {
    title: 'Revamps and maintenance',
    body: 'Modernizing existing applications and extending them safely: new modules, integrations, performance work and production fixes.',
    evidence: ['apc-crm', 'open-source-billing', 'abu-dhabi-global-management'],
  },
];

export const education = {
  degree: 'Bachelor of Science in Computer Science (BSCS)',
  school: 'FAST National University of Computer and Emerging Sciences (FAST-NUCES)',
} as const;

/** One layer in a project's architecture view. `mine` marks the part Salman built. */
export type Layer = { title: string; items?: string[]; groups?: { label: string; items: string[] }[]; mine?: boolean };

/** A small architecture view drawn from confirmed facts about the project. */
export type Diagram =
  | { kind: 'layers'; caption: string; layers: Layer[] }
  | { kind: 'modules'; caption: string; items: string[] };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Two sentences for project cards. */
  summary: string;
  industry: string;
  role: string;
  solo?: boolean;
  featured?: boolean;
  ai?: boolean;
  url?: string;
  /** Optional real logo in /public/logos, e.g. '/logos/better-homes.svg'. */
  logo?: string;
  overview: string;
  features: string[];
  contributions: string[];
  tech: string[];
  diagram?: Diagram;
  /** Extra search terms for the assistant. */
  aliases?: string[];
};

export const projects: Project[] = [
  {
    slug: 'askbase-ai',
    name: 'AskBase AI',
    tagline: 'Natural-language analytics for business databases',
    summary:
      'A SaaS product where clients connect a database and ask questions about it in plain English. I worked across the Next.js frontend and NestJS backend, including the natural-language-to-SQL pipeline.',
    industry: 'AI analytics SaaS',
    role: 'Full Stack Developer',
    featured: true,
    ai: true,
    overview:
      'AskBase AI lets a business ask questions about its own data in plain English. Clients connect a MySQL, PostgreSQL, MongoDB or Firestore database; each question is turned into a query by a locally hosted qwen2.5-coder model via Ollama, validated with sqlglot, run read-only, and answered through a conversational interface. The frontend is a Next.js 15 app with Recharts dashboards and a Three.js 3D chart view; the backend is a Python FastAPI service backed by the askbase NL→query engine.',
    features: [
      'Natural-language questions answered from live business databases',
      'Connects to MySQL/MariaDB, PostgreSQL, MongoDB (Motor) and Google Cloud Firestore',
      'Queries generated by qwen2.5-coder (SQL) and qwen2.5 instruct (chat) via Ollama',
      'sqlglot validates and rewrites generated SQL before execution',
      'Read-only query execution with rate limiting (slowapi) and result caching',
      'Recharts dashboards, Framer Motion animations, and a Three.js 3D chart view',
      'Docker Compose deployment for API, UI and a demo MySQL database',
    ],
    contributions: [
      'Developed the full frontend in Next.js 15 (Turbopack) with React 19 and TypeScript, using Tailwind CSS for styling, Recharts for charts, Framer Motion for animation, and Three.js / React Three Fiber for a 3D chart view.',
      'Built the Python FastAPI backend and the natural-language-to-SQL pipeline using the askbase package, SQLAlchemy (async), sqlglot for SQL parsing and validation, and slowapi for rate limiting.',
      'Integrated locally hosted open-source models through Ollama (qwen2.5-coder for SQL generation and qwen2.5 instruct for chat), with multi-tenant isolation, read-only query execution and caching.',
      'Wired up connections to MySQL/MariaDB, PostgreSQL, MongoDB (Motor) and Google Cloud Firestore, and packaged the whole system with Docker Compose for easy deployment.',
    ],
    tech: [
      'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS',
      'Recharts', 'Framer Motion', 'Three.js', 'React Three Fiber',
      'Python', 'FastAPI', 'Uvicorn', 'SQLAlchemy', 'sqlglot',
      'Ollama', 'qwen2.5-coder', 'qwen2.5 instruct',
      'MySQL', 'PostgreSQL', 'MongoDB', 'Google Cloud Firestore',
      'Docker', 'Docker Compose',
    ],
    diagram: {
      kind: 'layers',
      caption: 'End-to-end pipeline',
      layers: [
        { title: 'UI', items: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Recharts', 'Three.js'] },
        { title: 'API', items: ['FastAPI', 'Uvicorn', 'slowapi'], mine: true },
        { title: 'NL-to-SQL engine', items: ['askbase', 'sqlglot', 'SQLAlchemy', 'Ollama'], mine: true },
        {
          title: 'Databases',
          groups: [
            { label: 'SQL', items: ['MySQL', 'PostgreSQL'] },
            { label: 'NoSQL', items: ['MongoDB', 'Firestore'] },
          ],
        },
      ],
    },
    aliases: ['askbase', 'ask base', 'analytics saas', 'nl to sql', 'text to sql', 'qwen', 'ollama', 'fastapi'],
  },
  {
    slug: 'grace-ai',
    name: 'Grace AI',
    tagline: 'AI assistant for real-estate agents',
    summary:
      'An assistant that gives Better Homes agents instant answers about company listings. I built it end to end as the sole developer, as a standalone app and as a script embedded across Better Homes websites.',
    industry: 'Real estate, AI assistant',
    role: 'Full Stack Developer',
    solo: true,
    featured: true,
    ai: true,
    url: 'https://grace.engageplatform.me/',
    overview:
      'Grace is an AI assistant built for Better Homes, a real-estate company in Dubai. Agents use it to look up company properties for sale or rent and to get help with their day-to-day work. It runs as a standalone application and as an embeddable script inside several Better Homes websites.',
    features: [
      'Instant answers about company listings for sale and rent',
      'Standalone web application',
      'Embeddable script that runs inside other websites',
      'Deployed across multiple Better Homes websites',
    ],
    contributions: [
      'Built the whole application as the only developer, working closely with the AI development team.',
      'Integrated their models into the platform, from the backend to the user interface.',
      'Made sure responses behaved the same in the standalone app and in every embedded version.',
      'Led the rollout of the embed script across multiple Better Homes websites.',
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express.js'],
    diagram: {
      kind: 'layers',
      caption: 'One backend, delivered two ways',
      layers: [
        { title: 'AI models', items: ['Provided by the AI team'] },
        { title: 'Grace backend', items: ['Node.js', 'Express.js'], mine: true },
        { title: 'Clients', items: ['Standalone app', 'Embed script'], mine: true },
        { title: 'Deployed on', items: ['Better Homes websites'] },
      ],
    },
    aliases: ['grace', 'grace assistant'],
  },
  {
    slug: 'better-homes',
    name: 'Better Homes',
    tagline: 'Real-estate platform for a Dubai brokerage',
    summary:
      'The web platform of an established Dubai real-estate company. I developed six of its core modules, used Next.js rendering to keep listings fast and searchable, and integrated AI services for its agents.',
    industry: 'Real estate',
    role: 'Full Stack Developer',
    featured: true,
    ai: true,
    url: 'https://app.engageplatform.ai/',
    overview:
      'Better Homes has been in the Dubai real-estate market for more than 30 years. Its platform lets buyers and investors browse listings and contact agents, and gives agents the tools to manage leads, listings and deals. I worked on it as part of the full-stack team.',
    features: [
      'Server-side rendering and static generation for search-friendly listing pages',
      'Pre-rendered pages and fast route transitions',
      'Algolia search, Intercom, Amplitude event tracking and Google Maps',
      'AI services that help agents reach more customers',
    ],
    contributions: [
      'Developed the leads, listings, deals, communities, properties and customer-calling modules.',
      'Integrated AI services into the main products to help agents reach more customers.',
      'Used Next.js server-side rendering and static generation so listing pages load quickly and can be indexed by search engines.',
      "Worked with the platform's Algolia search, Intercom, Amplitude and Google Maps integrations.",
    ],
    tech: ['Next.js', 'NestJS', 'React', 'Ant Design', 'Bootstrap', 'AWS', 'Anthropic API', 'FastAPI', 'Algolia', 'Intercom', 'Amplitude', 'Google Maps API', 'Swagger'],
    diagram: {
      kind: 'modules',
      caption: 'Modules I developed',
      items: ['Leads', 'Listings', 'Deals', 'Communities', 'Properties', 'Customer calling'],
    },
    aliases: ['betterhomes', 'engage', 'engage platform', 'dubai real estate'],
  },
  {
    slug: 'ring-n-bring',
    name: 'Ring N Bring',
    tagline: 'Ordering and operations platform for hotels and restaurants',
    summary:
      'A hospitality platform where guests order and pay by scanning a QR code. I built the NestJS services that connect it to the POS and PMS systems venues already run, including Oracle OHIP, Oracle Gen1 and Gen2, Infrasys, Omega and Foodics.',
    industry: 'Hospitality',
    role: 'Full Stack Developer',
    featured: true,
    ai: true,
    url: 'https://ringnbring.com/',
    overview:
      'Ring N Bring connects guests, venue staff and operators. Guests scan a QR code to see the menu, order, ask for service, pay and leave feedback. Staff receive requests in real time on phones, tablets and wearables, and operators run the venue from admin dashboards. The platform is a large Firebase-based monorepo and integrates with POS, PMS and payment systems including Oracle Simphony, Foodics, Stripe and PayTabs.',
    features: [
      'QR menus, ordering, service requests, payments and feedback',
      'Open-tab ordering, reservations, charge-to-room, loyalty and multilingual support',
      'Admin dashboards for menus, tables, QR codes, staff, devices and analytics',
      'Real-time receiver apps for staff on mobile, tablet and wearable devices',
      'POS, PMS and payment integrations',
    ],
    contributions: [
      'Built and maintained the NestJS services that integrate the platform with venue POS and PMS systems: Oracle OHIP, Oracle Gen1 and Gen2, Infrasys, Omega and Foodics.',
      "Added new features to these integrations and kept orders, menus and billing in sync between the platform and each venue's systems.",
      'Integrated the OpenAI and Anthropic APIs to add AI features that support sales.',
    ],
    tech: ['NestJS', 'MySQL', 'MongoDB', 'Azure Service Bus', 'Firebase', 'Oracle OHIP', 'Oracle Gen1', 'Oracle Gen2', 'Infrasys', 'Omega', 'Foodics', 'OpenAI API', 'Anthropic API'],
    diagram: {
      kind: 'layers',
      caption: 'Integration architecture',
      layers: [
        { title: 'Ring N Bring', items: ['Guest QR app', 'Staff apps', 'Admin dashboards'] },
        { title: 'Integration services', items: ['NestJS', 'MySQL', 'MongoDB'], mine: true },
        {
          title: 'Venue systems',
          groups: [
            { label: 'POS', items: ['Oracle OHIP', 'Oracle Gen1', 'Oracle Gen2', 'Infrasys', 'Omega', 'Foodics'] },
            { label: 'PMS', items: ['Oracle OHIP'] },
            { label: 'AI', items: ['OpenAI', 'Anthropic'] },
          ],
        },
      ],
    },
    aliases: ['ringnbring', 'ring and bring', 'rnb', 'oracle', 'ohip', 'pos', 'pms', 'hospitality', 'infrasys', 'omega', 'foodics', 'gen1', 'gen2'],
  },
  {
    slug: 'apc-crm',
    name: 'APC CRM',
    tagline: 'CRM revamp with Xero accounting integration',
    summary:
      'A customer relationship management platform rebuilt on React, Node.js and Express.js. I worked across the stack on the revamp and implemented the Xero integration.',
    industry: 'CRM and accounting',
    role: 'Full Stack Developer',
    featured: true,
    url: 'https://apc-crm.com/',
    overview:
      'APC CRM is a customer relationship management platform. I worked on it as a full-stack developer while it was being revamped onto React, Node.js and Express.js, and implemented its integration with Xero accounting.',
    features: ['Rebuilt React frontend', 'Node.js and Express.js backend services', 'MySQL database', 'Xero accounting integration'],
    contributions: [
      'Worked on the revamp of the existing CRM, rebuilding the frontend in React and the backend in Node.js and Express.js.',
      'Implemented the Xero accounting integration.',
      'Worked on the MySQL data layer behind the new application.',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'Xero API'],
    diagram: {
      kind: 'layers',
      caption: 'The revamped stack',
      layers: [
        { title: 'Frontend', items: ['React'], mine: true },
        { title: 'Backend', items: ['Node.js', 'Express.js'], mine: true },
        { title: 'Data and accounting', items: ['MySQL', 'Xero'], mine: true },
      ],
    },
    aliases: ['apc', 'apc crm', 'xero'],
  },
  {
    slug: 'abu-dhabi-global-management',
    name: 'Abu Dhabi Global Management',
    tagline: 'Rental platform with client and admin portals',
    summary:
      'A real-estate rental platform with separate client and admin portals. I worked full stack, owning the React and Redux frontend services and their integrations with the backend microservices.',
    industry: 'Real estate',
    role: 'Full Stack Developer',
    featured: true,
    url: 'https://www.adgm.com/',
    overview:
      'A real-estate website for rental services, with one portal for clients and another for administrators. It covers sign-in and permissions, live notifications, sales transactions and payments.',
    features: ['Authentication and authorization', 'Live notifications', 'Sales transactions and payment methods', 'Client portal and admin portal'],
    contributions: [
      'Worked full stack, mainly owning the frontend services in React and Redux.',
      'Handled integrations for the platform, connecting the frontend services with the backend microservices.',
      'Built features across the client and admin portals and fixed issues across the stack.',
    ],
    tech: ['React', 'Redux', 'JavaScript', 'Microservices', 'Java', '.NET Core', 'MySQL'],
    diagram: {
      kind: 'layers',
      caption: 'Portals, services and integrations',
      layers: [
        { title: 'Portals', items: ['Client portal', 'Admin portal'] },
        { title: 'Frontend services', items: ['React', 'Redux'], mine: true },
        { title: 'Backend', items: ['Microservices', 'Java', '.NET Core'] },
      ],
    },
    aliases: ['adgm', 'abu dhabi'],
  },
  {
    slug: 'outdoor-sports-connection',
    name: 'Outdoor Sports Connection',
    tagline: 'Social networking platform for outdoor sports',
    summary: 'A social network built in Ruby on Rails. I worked on frontend sections, testing and UI fixes.',
    industry: 'Social networking',
    role: 'Full Stack Developer',
    overview: 'A social networking website where users create profiles, share photos and videos, message each other and stay in touch.',
    features: ['Profiles, feeds and connections', 'Live chat between connections', 'Posts, uploads and comments'],
    contributions: ['Built user listing sections and other frontend sections, tested the application and fixed UI bugs.'],
    tech: ['Ruby on Rails', 'JavaScript', 'HTML', 'CSS'],
    aliases: ['osc', 'outdoor sports'],
  },
  {
    slug: 'national-career-fairs',
    name: 'National Career Fairs',
    tagline: 'Job fair platform for employers and job seekers',
    summary: 'A Rails platform for organizing job fairs. I fixed frontend, PDF generation and SMS campaign issues.',
    industry: 'Recruitment',
    role: 'Full Stack Developer',
    overview: 'A web application where company representatives post jobs and organize job fairs, and advertise the events to job seekers.',
    features: ['User and admin portals', 'Email and SMS campaigns', 'Reports and a payment gateway', 'PDF generation for job fairs'],
    contributions: ['Tested the application and fixed frontend, PDF generation and SMS campaign issues.'],
    tech: ['Ruby on Rails', 'PostgreSQL', 'Twilio', 'jQuery', 'JavaScript'],
    aliases: ['ncf', 'career fairs', 'job fair'],
  },
  {
    slug: 'open-source-billing',
    name: 'Open Source Billing',
    tagline: 'Multi-company invoicing and billing',
    summary: 'An invoicing application built in Rails. I stabilized parts of the UI and backend and worked on the invoice PDF template.',
    industry: 'Billing',
    role: 'Full Stack Developer',
    url: 'http://opensourcebilling.org/',
    overview: 'An invoicing application for creating and sending invoices, taking payments and managing clients and companies, in multiple languages and currencies.',
    features: ['Recurring invoices and partial payments', 'PayPal and card payments', 'Billing for several companies under one account', 'Reports, and imports from QuickBooks and FreshBooks'],
    contributions: ['Fixed UI and backend issues to stabilize the application and worked on the invoice PDF template.'],
    tech: ['Ruby on Rails', 'MySQL', 'HAML', 'AJAX', 'JavaScript'],
    aliases: ['osb', 'billing', 'invoicing'],
  },
  {
    slug: 'group-captain',
    name: 'Group Captain',
    tagline: 'Project and team management portal',
    summary: 'A platform for managing projects, employees, timesheets and daily reporting. I built the complete frontend in React with TypeScript.',
    industry: 'Project management',
    role: 'Full Stack Developer',
    overview: 'Group Captain lets teams manage projects and resources in one place. Managers get project progress views, timesheet breakdowns, attendance tracking and end-of-day delivery reports. Organisation charts give visibility across the entire company.',
    features: [
      'Dashboard with feature navigation icons',
      'Timesheet for logging daily project work',
      'End-of-day reporting',
      'Daily attendance check-in and check-out',
      'Project listing per user fetched from the API',
      'Work-from-home request flow',
      'Organisation charts',
    ],
    contributions: [
      'Developed the complete frontend using React with TypeScript.',
      'Built the timesheet, end-of-day reporting and attendance modules.',
      'Integrated all modules with the backend API.',
      'Implemented the work-from-home request feature.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    aliases: ['group captain', 'groupcaptain', 'team management', 'timesheet'],
  },
  {
    slug: 'nexttalent',
    name: 'NexTalent',
    tagline: 'End-to-end recruitment management for Nextbridge',
    summary: 'An ATS-based recruitment platform that manages the full hiring lifecycle, from job creation to candidate selection. I worked across the stack, building key modules and fixing issues.',
    industry: 'Recruitment',
    role: 'Full Stack Developer',
    overview: 'NexTalent streamlines the entire recruitment process at Nextbridge, from posting a vacancy to scheduling interviews and making decisions. Jobs created in NexTalent appear on the official Nextbridge careers page. The platform handles candidate data, interview scheduling, email communication, analytics and vacancy requisitions.',
    features: [
      'Job creation that publishes to the official Nextbridge page',
      'Detailed hiring workflow from application to selection',
      'Interview roster for scheduling',
      'Job sharing to professional and social platforms',
      'Automated email scheduling for candidates and interviewers',
      'ATS-based candidate tracking',
      'Vacancy requisition management',
      'Analytics per job broken down by platform',
    ],
    contributions: [
      'Worked on the job roster section for interview scheduling.',
      'Developed the employee details section in the Jobs module.',
      'Added missing form validations that were causing bugs.',
      'Integrated S3 bucket file uploads from the frontend.',
      'Implemented Formik-based dynamic forms across multiple pages.',
      'Fixed file upload issues on the S3 bucket from the frontend.',
    ],
    tech: ['React', 'Tailwind CSS', 'Material UI', 'Node.js', 'Express.js', 'MongoDB', 'AWS S3'],
    aliases: ['nexttalent', 'nextalent', 'recruitment', 'ats', 'hiring'],
  },
  {
    slug: 'meals-app',
    name: 'Meals App',
    tagline: 'Employee meal ordering and management system',
    summary: 'A meal ordering platform for employees, with a React Native mobile app and a React web admin portal for managing meals, billing and reporting.',
    industry: 'Food and workplace tech',
    role: 'Full Stack Developer',
    overview: 'The Meals App streamlines employee meal services. Employees use the React Native mobile app to browse menus, customise and place orders, and collect meals via QR code. The web admin portal handles meal scheduling, billing and reporting. Real-time updates keep staff and employees in sync.',
    features: [
      'Mobile app for iOS and Android built in React Native',
      'Meal customisation and ordering',
      'QR code integration for meal collection',
      'Real-time order updates',
      'Admin portal for meal scheduling and roster management',
      'Billing and reporting',
    ],
    contributions: [
      'Developed frontend components of the web admin portal.',
      'Built the meal scheduling roster on the frontend.',
      'Integrated the frontend with the Node/Express.js API.',
    ],
    tech: ['React', 'React Native', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Bootstrap'],
    aliases: ['meals app', 'mealsapp', 'meal ordering', 'canteen'],
  },
  {
    slug: 'nextdesk',
    name: 'NextDesk',
    tagline: 'Employee helpdesk and ticketing system',
    summary: 'A helpdesk portal where employees raise tickets to any department. I was the sole developer, adding new features and optimising the existing Rails application.',
    industry: 'Enterprise SaaS',
    role: 'Full Stack Developer',
    solo: true,
    overview: 'NextDesk is a helpdesk portal where employees raise tickets to any department. The relevant team receives and resolves each ticket while automated emails keep all parties informed at every status change. A feedback form closes the loop on resolution. Admins get a full reporting view with graphical stats.',
    features: [
      'Ticket creation with attachments, routed to the right department',
      'Automated email notifications on every status change',
      'Feedback and star rating on ticket resolution',
      'Graphical stats for users and admins',
      'Multiple roles: super-admin, admin, department-admin, resolver, manager, team lead and view-only user',
      'View-only role for cross-department visibility without action rights',
      'API for the companion mobile application',
    ],
    contributions: [
      'Added new features to existing modules of the Rails application.',
      'Developed a view-only admin role for cross-department ticket visibility.',
      'Built a manager preference to stop subordinate emails from the profile.',
      'Implemented automated email campaigns on ticket resolution.',
      'Developed the mobile API exposing the core features.',
      'Optimised the application and improved the UI/UX.',
      'Wrote Rake tasks to pull data from external APIs.',
    ],
    tech: ['Ruby on Rails', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Bootstrap'],
    aliases: ['nextdesk', 'helpdesk', 'ticketing', 'support portal'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Total professional experience in years, shown as "5+ years". */
export function yearsOfExperience(): number {
  return person.experienceYears;
}

export function formatMonth(ym: string | null): string {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}
