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
    { name: 'Python', category: 'Programming', where: 'LiDAR capstone, Smart Health Chair', usage: 'Data cleaning and analysis for point clouds, and a serial bridge from Arduino sensors to the cloud.', why: 'Handles large datasets, hardware glue code and ML work in the same language.', summary: 'My primary language for data, automation and ML.', projectId: 'lidar' },
    { name: 'Java', category: 'Programming', where: 'University coursework, Android development', usage: 'Object-oriented coursework and an Android app built in Android Studio.', why: 'A solid foundation in object-oriented design and typed languages.', summary: 'Strong grounding in OOP from coursework.' },
    { name: 'JavaScript', category: 'Programming', where: 'LiftSafe, Madnopoly, web projects', usage: 'Browser-based apps, procedural generation logic and interactive interfaces.', why: 'The language of the interactive web.', summary: 'Powering interaction and front-end logic.', projectId: 'liftsafe' },
    { name: 'TypeScript', category: 'Programming', where: 'PantryChef, this portfolio, CRM work', usage: 'Typed front-end and full-stack code in React and Next.js projects.', why: 'Catches mistakes early and keeps larger codebases maintainable.', summary: 'Type-safe development for larger apps.', projectId: 'pantrychef' },
    { name: 'C/C++', category: 'Systems', where: 'Wordle clone, systems coursework', usage: 'Manual memory handling and string work, plus GNU assembly and loop optimization in a computer systems course.', why: 'Shows what the machine is actually doing under higher-level code.', summary: 'Low-level control and a feel for how code runs.' },
    { name: 'SQL', category: 'Database', where: 'PantryChef, startup work', usage: 'Wrote migrations and queries against Supabase Postgres and MySQL.', why: 'Reliable, structured data underpins almost every product I build.', summary: 'Relational schemas and querying.', projectId: 'pantrychef' }
  ],
  frameworks: [
    { name: 'React', category: 'Frontend', where: 'Portfolio, CRM, startup UI work', usage: 'Component-based interfaces, state management and animation.', why: 'Lets me build interfaces that stay maintainable as they grow.', summary: 'Dynamic UI component architecture.', projectId: 'window-crm' },
    { name: 'Next.js', category: 'Full-stack', where: 'Door-to-door CRM, PantryChef', usage: 'Full-stack apps with server routes, authentication and database access.', why: 'One framework for the front end and the API layer.', summary: 'Full-stack React with server routes.', projectId: 'pantrychef' },
    { name: 'Node.js', category: 'Backend', where: 'Startup projects', usage: 'Server-side logic and backend services for early-stage product work.', why: 'Keeps front end and back end in one language.', summary: 'Server-side JavaScript.' },
    { name: 'Flask', category: 'Backend', where: 'Aurora music generator', usage: 'A Python web app that serves generated audio and visuals in real time.', why: 'A lightweight way to put Python logic behind a web interface.', summary: 'Python on the web, kept simple.' },
    { name: 'Firebase', category: 'Backend/Cloud', where: 'Smart Health Chair, Android app', usage: 'Cloud data sync for sensor readings and app storage.', why: 'Quick serverless infrastructure for real-time data.', summary: 'Rapid serverless storage and sync.', projectId: 'iot-health' },
    { name: 'Supabase', category: 'Backend/Cloud', where: 'PantryChef, startup work', usage: 'Postgres, authentication and row-level security so each user only sees their own data.', why: 'Production-shaped data controls without running a server.', summary: 'Postgres, auth and row-level security.', projectId: 'pantrychef' }
  ],
  systemsArchitecture: [
    { name: 'System Design', category: 'Engineering', where: 'Smart Health Chair, LiDAR capstone, CRM', usage: 'Planned how sensors, pipelines, data stores and interfaces fit together before building.', why: 'Parts that work alone still have to work together.', summary: 'Blueprinting integrated systems.', projectId: 'iot-health' },
    { name: 'LLM Integration', category: 'AI', where: 'PantryChef, startup grading system, automation pipeline', usage: 'Connected language models to real products, with validated structured output and a human reviewing the result where it matters.', why: 'AI features need guardrails to be trusted in a real product.', summary: 'Practical, reviewable AI features.', projectId: 'pantrychef' },
    { name: 'Data Pipelines', category: 'Engineering', where: 'LiDAR capstone, Smart Health Chair', usage: 'Moved raw scans and sensor readings through cleaning, processing and visualization.', why: 'Raw data is rarely useful until it is cleaned and shaped.', summary: 'Turning raw data into something usable.', projectId: 'lidar' },
    { name: 'Embedded and IoT', category: 'Hardware', where: 'Smart Health Chair', usage: 'Wired heart rate and temperature sensors to Arduino boards and streamed readings to a cloud dashboard.', why: 'Connects software work to the physical world.', summary: 'Sensors, microcontrollers and cloud sync.', projectId: 'iot-health' },
    { name: 'Access Control', category: 'Security', where: 'Door-to-door CRM, PantryChef', usage: 'Role-based views for admins, reps and technicians, and row-level security in Supabase.', why: 'People should only see and change what they are meant to.', summary: 'Roles, permissions and data isolation.', projectId: 'window-crm' }
  ],
  tools: [
    { name: 'Git/GitHub', category: 'Collaboration', where: 'All engineering work', usage: 'Version control, branches and collaboration on team projects including a hackathon.', why: 'The standard for working on code with other people.', summary: 'Versioning and collaboration.' },
    { name: 'Figma', category: 'UI/UX Design', where: 'Startup work, portfolio and app design', usage: 'Wireframes, user flows and interface layouts before building.', why: 'Bridges the gap between an idea and a working interface.', summary: 'Designing the experience first.' },
    { name: 'Tailwind CSS', category: 'UI', where: 'Front-end projects', usage: 'Responsive layouts and consistent design styling.', why: 'Fast to iterate on while staying consistent.', summary: 'Utility-first styling.' },
    { name: 'Make', category: 'Automation', where: 'AI content automation pipeline', usage: 'Chained ChatGPT and ElevenLabs into an automated script and voiceover workflow.', why: 'Connects tools into one system without custom glue code.', summary: 'No-code workflow automation.' },
    { name: 'Netlify', category: 'Hosting', where: 'Portfolio, Madnopoly board generator', usage: 'Deployed and hosted front-end projects.', why: 'Gets a project in front of people quickly.', summary: 'Fast front-end hosting.', projectId: 'procedural-gen' },
    { name: 'Microsoft 365 Copilot', category: 'Certification', where: 'Microsoft and LinkedIn Learning, Aug 2026', usage: 'Completed the Microsoft 365 Copilot Essentials Professional Certificate.', why: 'Shows how AI assistants fit into everyday business tools.', summary: 'Copilot Essentials certified.' },
    { name: 'Azure', category: 'Certification', where: 'Microsoft and LinkedIn Learning, Aug 2026', usage: 'Completed the Microsoft Azure Essentials Professional Certificate.', why: 'A grounding in core cloud concepts.', summary: 'Azure Essentials certified.' }
  ]
};
