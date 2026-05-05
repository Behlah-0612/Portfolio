export const experience = [
  {
    category: 'Real-Time Operations',
    role: 'Guest Services Agent',
    company: 'Prestige, PHI',
    description: 'Managed high-pressure guest interactions and real-time problem solving in a luxury hospitality environment.',
    takeaway: 'Mastered the art of maintaining system stability under high human concurrency.',
    details: {
      did: "Handled front-facing guest relations, managed reservations, and resolved complex logistical issues in real-time.",
      learned: "The critical importance of empathy and clear communication when managing high-stress human systems.",
      matters: "This role built the foundation for my ability to handle high-concurrency environments with poise."
    }
  },
  {
    category: 'Financial Handling',
    role: 'Night Auditor',
    company: 'Prestige',
    description: 'Conducted overnight financial audits, transaction reconciliations, and system maintenance.',
    takeaway: 'Developed extreme attention to detail and accuracy in data-heavy environments.',
    details: {
      did: "Reconciled daily financial transactions, identified discrepancies, and prepared comprehensive audit reports.",
      learned: "Precision is non-negotiable when dealing with financial data and system integrity.",
      matters: "Ensured the financial health and data accuracy of the entire operation during critical downtime."
    }
  },
  {
    category: 'Sales',
    role: 'Sales Representative',
    company: 'Legacy Marketing',
    description: 'Engaged in door-to-door sales, refining communication and persuasion skills through direct human interaction.',
    takeaway: 'Learned to navigate complex social systems and build trust quickly.',
    details: {
      did: "Conducted direct outreach, managed a sales pipeline, and closed deals through persuasive communication.",
      learned: "How to read social cues and adapt technical explanations for diverse audiences.",
      matters: "Refined the 'human interface' skills necessary for translating complex ideas into value."
    }
  },
  {
    category: 'Other Roles',
    role: 'Service Associate',
    company: 'Canada Post / Rexall',
    description: 'Handled logistics, customer service, and inventory management in fast-paced retail environments.',
    takeaway: 'Gained practical experience in physical system logistics and operations.',
    details: {
      did: "Managed inventory levels, processed high-volume shipments, and provided direct customer support.",
      learned: "Logistics is the backbone of any functional system, whether physical or digital.",
      matters: "Gave me a ground-level view of how supply chains and inventory systems operate."
    }
  },
  {
    category: 'Leadership',
    role: 'Board Member',
    company: 'TRUSU Cybersecurity Club',
    description: 'Organized workshops and events focused on digital security and systems protection.',
    takeaway: 'Fostered a community of systems-thinkers focused on security and ethics.',
    details: {
      did: "Led club initiatives, organized technical workshops, and collaborated with industry professionals.",
      learned: "Leadership is about empowering others to think critically about the systems they build.",
      matters: "Built a community focused on the ethical and secure advancement of technology."
    }
  }
];

export interface SkillDetail {
  name: string;
  category: string;
  where: string;
  why: string;
  usage: string;
  summary: string;
  projectId?: string; // Link to a project in projects.ts
}

export const skills: Record<string, SkillDetail[]> = {
  programming: [
    { name: 'Python', category: 'Programming', where: 'LiDAR Pipeline, IoT System', usage: 'Implemented high-performance data processing, automation, and machine learning workflows.', why: 'Crucial for handling large datasets and complex algorithmic computations efficiently.', summary: 'The backbone of my data and automation logic.', projectId: 'lidar' },
    { name: 'Java', category: 'Programming', where: 'University Coursework, Enterprise Dev', usage: 'Developed scalable backend applications with strong object-oriented design patterns.', why: 'Provides a solid foundation for robust, type-safe systemic architecture.', summary: 'Strong foundation in OOP and backend logic.', projectId: 'procedural-gen' },
    { name: 'JavaScript', category: 'Programming', where: 'Web Applications, AI Interfaces', usage: 'Created dynamic, responsive frontend experiences and complex interactive modules.', why: 'Essential for building the modern, interactive web interfaces users expect today.', summary: 'Powering interaction and frontend logic.', projectId: 'chatgpt-ui' },
    { name: 'TypeScript', category: 'Programming', where: 'Modern Web Apps', usage: 'Implemented type-safe frontend and backend logic to reduce bugs and improve maintainability.', why: 'Standard for professional-grade web development and scalable systems.', summary: 'Type-safe development for complex apps.' },
    { name: 'C/C++', category: 'Systems', where: 'Wordle Engine, Algorithms', usage: 'Optimized low-level memory management and high-performance algorithmic logic.', why: 'Ensures software executes with maximum efficiency at the hardware layer.', summary: 'Low-level control and performance optimization.', projectId: 'wordle-c' },
    { name: 'SQL', category: 'Database', where: 'Inventory systems, Backend projects', usage: 'Designed relational schemas and optimized complex queries for data retrieval and reporting.', why: 'The standard for reliable, structured data management in production environments.', summary: 'Relational database architecture & querying.', projectId: 'inventory-system' }
  ],
  frameworks: [
    { name: 'React', category: 'Frontend', where: 'Portfolio, Real-time Dashboards', usage: 'Built complex component-based UIs with advanced state management and fluid animations.', why: 'Allows for the creation of scalable, maintainable, and high-performance user interfaces.', summary: 'Dynamic UI component architecture.', projectId: 'iot-health' },
    { name: 'Next.js', category: 'Full-stack', where: 'Modern Web Platforms', usage: 'Leveraged server-side rendering and static generation for SEO-friendly, fast web apps.', why: 'The leading framework for production-ready React applications.', summary: 'Server-side rendering & optimized performance.' },
    { name: 'Node.js', category: 'Backend', where: 'AI Chat Systems, APIs', usage: 'Developed event-driven server-side applications and efficient RESTful APIs.', why: 'Ensures fast, non-blocking backend operations ideal for data-intensive apps.', summary: 'Scalable server-side execution.', projectId: 'chatgpt-ui' },
    { name: 'Express', category: 'Backend', where: 'Middleware, REST Service', usage: 'Built robust routing and request handling for backend services.', why: 'Minimalist and flexible framework for Node.js API development.', summary: 'Standard Node.js web framework.' },
    { name: 'Firebase', category: 'Backend/Cloud', where: 'Android App, Contact Forms', usage: 'Integrated real-time databases, authentication, and cloud hosting for rapid scaling.', why: 'Provides a robust, serverless infrastructure for modern application needs.', summary: 'Rapid serverless deployment & syncing.', projectId: 'android-app' }
  ],
  systemsArchitecture: [
    { name: 'System Design', category: 'Engineering', where: 'IoT & LiDAR Projects', usage: 'Architected end-to-end solutions combining sensors, data pipelines, and user interfaces.', why: 'Ensures all components work in harmony to solve a unified real-world problem.', summary: 'Blueprinting integrated technologies.', projectId: 'iot-health' },
    { name: 'REST APIs', category: 'Integration', where: 'Cross-platform Data Sync', usage: 'Designed and consumed standardized APIs to enable seamless communication between services.', why: 'The protocol that connects the modern internet and fragmented systems.', summary: 'The bridge for interconnected systems.', projectId: 'chatgpt-ui' },
    { name: 'Data Pipelines', category: 'Engineering', where: 'Real-time Vital Tracking', usage: 'Architected automated flows that ingest, process, and present data with minimal delay.', why: 'Transforming data into real-time action requires robust and reliable pipelines.', summary: 'Automating the flow of information.', projectId: 'iot-health' },
    { name: 'Auth & Security', category: 'Backend', where: 'User Systems', usage: 'Implemented JWT, OAuth, and secure session management principles.', why: 'Non-negotiable for protecting user trust and system integrity.', summary: 'Securing digital entry points.' }
  ],
  tools: [
    { name: 'Git/GitHub', category: 'Collaboration', where: 'All Engineering Work', usage: 'Managed complex codeversions and collaborated using branches, PRs, and team workflows.', why: 'The fundamental standard for collaborative software development and deployment.', summary: 'Standard for collaboration & versioning.' },
    { name: 'Docker', category: 'DevOps', where: 'Containerized Services', usage: 'Packaged applications into portable containers for consistent deployment across environments.', why: 'Eliminates "works on my machine" issues and streamlines the CI/CD pipeline.', summary: 'Containerization and environment parity.' },
    { name: 'CI/CD', category: 'DevOps', where: 'Automated Deployments', usage: 'Implemented automated testing and deployment workflows to ensure code quality.', why: 'Increases deployment frequency and prevents regressions in production.', summary: 'Automating the delivery pipeline.' },
    { name: 'Figma', category: 'UI/UX Design', where: 'Portfolio & App Design', usage: 'Visualized user flows and crafted UI blueprints before high-fidelity implementation.', why: 'Bridging the gap between conceptual design and full-stack development.', summary: 'Architecting visual user experiences.' },
    { name: 'Tailwind CSS', category: 'UI', where: 'Frontend Projects', usage: 'Rapidly styled responsive and modern layouts using utility-first principles.', why: 'Dramatically faster development cycle and consistent design tokens.', summary: 'Utility-first rapid styling.' }
  ]
};
