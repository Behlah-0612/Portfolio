import { Project } from '../components/ProjectCard';

export const projects: Project[] = [
  {
    id: 'lidar',
    title: 'LiDAR Point Cloud Pipeline',
    description: 'A high-performance processing pipeline for spatial data, converting raw LiDAR pulses into structured 3D point clouds for analysis.',
    techStack: ['Python', 'C++', 'Open3D', 'NumPy'],
    problemSolved: 'Streamlined the conversion of massive raw sensor data into actionable spatial models with 40% faster processing time.',
    githubUrl: 'https://github.com/Behlah-0612/Measuring-CSS-and-OSS-using-Livox-Avia---Highland-Valley-Copper',
    features: ['Automated CSS/OSS metric computation', 'Point cloud normalization', 'Surface smoothing algorithms'],
    metrics: ['40%:Faster Processing', '98%:Data Accuracy']
  },
  {
    id: 'aurora',
    title: 'Aurora - Music Generation System',
    description: 'A Flask-based procedural music generation app that creates original audio in real time using algorithmic composition and mood presets.',
    techStack: ['Flask', 'Python', 'Web Audio', 'Logic'],
    problemSolved: 'Automated the creation of mood-specific soundtracks, allowing users to generate high-quality audio without musical expertise.',
    githubUrl: 'https://github.com/Behlah-0612/Aurora---Music-Generator',
    features: ['Algorithmic composition engine', 'Real-time audio synthesis', 'Dynamic mood-based presets'],
    metrics: ['100%:Procedural', 'Real-time:Generation']
  },
  {
    id: 'iot-health',
    title: 'IoT Health Monitoring System',
    description: 'Real-time health tracking system using distributed sensors to monitor vitals and provide passive intelligence for risk detection.',
    techStack: ['React', 'Node.js', 'Firebase', 'MQTT'],
    problemSolved: 'Enabled continuous, non-invasive monitoring for elderly patients, reducing emergency response time through automated alerts.',
    githubUrl: 'https://github.com/Behlah-0612/Smart-Health-Chair---Wireless-Monitoring-Prototype',
    features: ['Real-time vital tracking', 'ML-based risk assessment', 'Automated emergency alerts'],
    metrics: ['25%:Lower Latency', '24/7:Monitoring']
  },
  {
    id: 'procedural-gen',
    title: 'Procedural Generation System',
    description: 'A deterministic world-building engine that generates complex, navigable environments based on seed-based logic.',
    techStack: ['Java', 'Processing', 'Algorithms'],
    problemSolved: 'Created infinite, unique, yet reproducible game environments without manual asset creation, ensuring consistent pathfinding.',
    githubUrl: 'https://github.com/Behlah-0612/Madnopoly-Board-Generator',
    features: ['Seed-based reproducibility', 'Infinite world expansion', 'A* Pathfinding integration'],
    metrics: ['100%:Reproducible', '0:Manual Assets']
  },
  {
    id: 'chatgpt-ui',
    title: 'ChatGPT-style Interface',
    description: 'A polished, high-performance AI chat interface optimized for speed and natural interaction flow.',
    techStack: ['React', 'Framer Motion', 'OpenAI API'],
    problemSolved: 'Improved user engagement by optimizing message streaming and reducing perceived latency in AI responses.',
    githubUrl: 'https://github.com/Behlah-0612/ChatBot-GPT',
    features: ['Optimized message streaming', 'Context-aware responses', 'Fluid UI animations'],
    metrics: ['30%:Higher Engagement', '50ms:Response Start']
  },
  {
    id: 'android-app',
    title: 'Android Calendar Application',
    description: 'A robust mobile calendar application designed for efficient scheduling and task management, developed as a core project for a University Android Development course.',
    techStack: ['Java', 'Android SDK', 'SQLite'],
    problemSolved: 'Addressed the need for a simplified, student-focused scheduling tool that integrates deadlines and personal events in a clean, intuitive interface.',
    githubUrl: 'https://github.com/Behlah-0612/To_Do_App',
    features: ['Dynamic event scheduling', 'Customizable reminders', 'Local data persistence with SQLite'],
    metrics: ['Grade: A+', '100%: Course Requirement']
  },
  {
    id: 'wordle-c',
    title: 'Wordle Clone (C)',
    description: 'A low-level implementation of the popular word game, focusing on efficient memory management and logic validation.',
    techStack: ['C', 'Standard Library'],
    problemSolved: 'Demonstrated deep understanding of memory allocation and string manipulation in a resource-constrained environment.',
    githubUrl: 'https://github.com/Behlah-0612/Wordle',
    features: ['Manual memory management', 'Dictionary validation', 'Terminal-based UI'],
    metrics: ['<1MB:Memory Usage', 'O(1):Lookup Time']
  },
  {
    id: 'inventory-system',
    title: 'Inventory Management System',
    description: 'A robust system for tracking assets and stock levels with automated reporting and data visualization.',
    techStack: ['Python', 'Pandas', 'SQLite'],
    problemSolved: 'Eliminated manual tracking errors and provided real-time stock visibility for a small-scale operation.',
    githubUrl: 'https://github.com/Behlah-0612/Inventory-Management-System',
    features: ['Automated reporting', 'Real-time stock visibility', 'Data visualization'],
    metrics: ['95%:Error Reduction', '100%:Stock Accuracy']
  }
];
