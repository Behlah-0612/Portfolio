import { Project } from '../components/ProjectCard';

export const projects: Project[] = [
  {
    id: 'liftsafe',
    title: 'LiftSafe',
    description: 'A camera-based coaching app for workplace lifting safety. A worker does a few lifts in front of any camera, gets instant feedback and a safety score, and the employer gets a dated training record.',
    techStack: ['JavaScript', 'MediaPipe', 'Browser-based'],
    problemSolved: 'Small businesses rarely have a trainer on hand for safe lifting. LiftSafe coaches movement in the browser, and no video is stored or uploaded.',
    githubUrl: 'https://github.com/Behlah-0612/liftsafe',
    liveUrl: 'https://iyassh.github.io/liftsafe/index.html',
    features: ['Camera-based movement coaching', 'Lift safety score and training record', 'Runs entirely in the browser'],
    metrics: ['Runner-up:Kamloops 2026 Hackathon', '3:Person Team']
  },
  {
    id: 'window-crm',
    title: 'Door-to-Door Window CRM',
    description: 'A custom CRM for a door-to-door window cleaning startup in Kamloops, covering the full cycle from knocking on a door to collecting payment.',
    techStack: ['Next.js', 'React', 'TypeScript'],
    problemSolved: 'The team needed one place to track canvassing, schedule jobs, and handle sales rep payment collection instead of juggling spreadsheets and texts.',
    githubUrl: '',
    privateNote: 'Built for a client, so the code is private.',
    features: ['Admin view with an area overview', 'Sales rep view for their own sales', 'Technician view for assigned jobs'],
    metrics: ['June 2026:Started', 'In Testing:Not Yet Shipped']
  },
  {
    id: 'pantrychef',
    title: 'PantryChef',
    description: 'A mobile-first app that turns a household pantry into recipes, a cost dashboard, and a conversational personal chef. Built for the OpenAI Build Week hackathon.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI API'],
    problemSolved: 'The daily question of what to cook. Snap a receipt, and PantryChef works out what you have and suggests dishes at a reasonable cost.',
    githubUrl: 'https://github.com/Behlah-0612/openAI-build-week-Hackathon',
    features: ['Receipt photo parsing', 'Recipe suggestions with cost and nutrition', 'Per-user data protected with row-level security'],
    metrics: ['Hackathon:OpenAI Build Week', 'Full Stack:Next.js and Supabase']
  },
  {
    id: 'lidar',
    title: 'LiDAR Crusher Gap Measurement',
    description: 'My capstone project with Highland Valley Copper (Teck). A Python toolkit that turns raw Livox Avia LiDAR scans of a gyratory crusher into closed side and open side setting measurements.',
    techStack: ['Python', 'NumPy', 'Pandas', 'Open3D', 'SciPy', 'Plotly'],
    problemSolved: 'Measuring crusher gap settings by hand is slow and risky. This pipeline builds a surface from the scan, finds the mantle and the wall, and measures the minimum and maximum gap automatically.',
    githubUrl: 'https://github.com/Behlah-0612/Measuring-CSS-and-OSS-using-Livox-Avia---Highland-Valley-Copper',
    features: ['Point cloud cleaning and normalization', 'Mantle and wall detection using return angle and gradient', 'Batch runs with per-scan Plotly views'],
    metrics: ['Capstone:TRU Computing Science', 'Teck:Industry Partner']
  },
  {
    id: 'iot-health',
    title: 'Smart Health Monitoring Chair',
    description: 'A senior-focused chair with a smart armrest that passively reads vital signs. First-author publication in Gerontechnology.',
    techStack: ['Arduino', 'Python', 'Firebase', 'IoT Sensors'],
    problemSolved: 'Vital sign checks usually need a deliberate action. The armrest collects heart rate and temperature while someone simply sits, and sends it to a cloud dashboard.',
    githubUrl: 'https://github.com/Behlah-0612/Smart-Health-Chair---Wireless-Monitoring-Prototype',
    liveUrl: 'https://doi.org/10.4017/gt.2026.25.2.1516.3',
    liveLabel: 'Read the Paper',
    features: ['Heart rate, temperature and ECG sensing', 'Arduino MKR WiFi 1010 and Uno in the armrest', 'Python bridge syncing data to Firebase'],
    metrics: ['Published:Gerontechnology', 'First:Author']
  },
  {
    id: 'procedural-gen',
    title: 'Madnopoly Board Generator',
    description: 'A hybrid digital and physical Monopoly-style game. It generates one continuous board path on a grid, assigns tiles with seeded randomness, and exports the board as JSON to drive a real-world game board.',
    techStack: ['JavaScript', 'Algorithms', 'Procedural Generation'],
    problemSolved: 'Every board needs to be a valid closed loop and still be reproducible, so a friend group can replay or share any board from its seed.',
    githubUrl: 'https://github.com/Behlah-0612/Madnopoly-Board-Generator',
    liveUrl: 'https://madnopoly-board-generator.netlify.app',
    features: ['Seed-based reproducible boards', 'Closed-loop grid path generation', 'JSON export for a physical board'],
    metrics: ['Live:On Netlify', 'Seeded:Reproducible']
  }
];
