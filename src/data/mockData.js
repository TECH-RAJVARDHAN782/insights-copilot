// Mock Data and Real Working Citation URLs for iNSIGHTS Copilot

export const font = "Inter";

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi (मराठी)', flag: '🇮🇳' }
];

export const SAMPLE_IDEAS = [
  {
    id: 'mess-waste',
    title: 'Smart Mess & Hostel Waste Management',
    tagline: 'AI Vision & RFID analytics to cut college food waste by 65%',
    category: 'Sustainability & AI',
    prompt: 'Design an AI-powered system for college hostels to predict daily food demand using historical consumption data and computer vision waste tracking.'
  },
  {
    id: 'talent-verify',
    title: 'AI Student Talent & Hackathon Credential Verification',
    tagline: 'Zero-knowledge proof verification for student project portfolios',
    category: 'EdTech & Blockchain',
    prompt: 'Build a decentralized platform that verifies student GitHub contributions, hackathon awards, and project code authenticity using AI.'
  },
  {
    id: 'disaster-relies',
    title: 'Autonomous Drone Swarm Disaster Response',
    tagline: 'Computer vision thermal mapping for emergency relief teams',
    category: 'Robotics & Computer Vision',
    prompt: 'Develop an edge-AI system for autonomous search and rescue drones during flood and earthquake emergency operations.'
  }
];

export const READYMADE_PROJECTS_CATALOG = [
  {
    id: 'mess-waste',
    title: 'Smart Mess & Hostel Waste Management',
    tagline: 'AI Vision & RFID analytics to cut college food waste by 65%',
    category: 'Sustainability & AI',
    stars: '4.8k',
    forks: '1.2k',
    repoUrl: 'https://github.com/TECH-RAJVARDHAN782/insights-copilot',
    citationsCount: 42,
    techStack: ['React 18', 'Node.js Express', 'FastAPI', 'YOLOv8 Vision']
  },
  {
    id: 'talent-verify',
    title: 'AI Student Talent & Credential Verification',
    tagline: 'Zero-knowledge proof verification for student project portfolios',
    category: 'EdTech & Blockchain',
    stars: '3.9k',
    forks: '890',
    repoUrl: 'https://github.com/TECH-RAJVARDHAN782/insights-copilot',
    citationsCount: 38,
    techStack: ['React 18', 'Solidity', 'FastAPI', 'Gemini 1.5 Pro']
  },
  {
    id: 'disaster-relies',
    title: 'Autonomous Drone Swarm Disaster Response',
    tagline: 'Computer vision thermal mapping for emergency relief teams',
    category: 'Robotics & Computer Vision',
    stars: '5.2k',
    forks: '1.5k',
    repoUrl: 'https://github.com/TECH-RAJVARDHAN782/insights-copilot',
    citationsCount: 51,
    techStack: ['Python PyTorch', 'OpenCV', 'FastAPI', 'Docker']
  }
];

export const DEFAULT_PROJECT_DATA = {
  'mess-waste': {
    title: 'Smart Mess & Hostel Waste Management',
    tagline: 'AI Vision & RFID analytics to cut college food waste by 65%',
    problemValidation: {
      marketGap: 'College hostels lose 250kg of food daily due to static cooking estimations and lack of real-time head-count forecasting.',
      feasibilityScore: 96,
      innovationScore: 94,
      impactScore: 98,
      targetUsers: ['Hostel Wardens', 'College Mess Managers', 'Student Councils', 'Sustainability Officers'],
      keyPainPoints: [
        'Static meal preparation numbers leading to 35% food wastage.',
        'No real-time tracking of student attendance during weekends.',
        'High financial loss for university administration.'
      ]
    },
    deepSearch: {
      summary: 'Scoured 42 empirical research papers and open datasets focusing on food waste computer vision and demand forecasting.',
      sourcesCount: 42,
      citations: [
        {
          title: 'Deep Learning Vision for Food Waste Quantification (2025)',
          authors: 'Dr. R. Verma, Dr. S. Patel',
          venue: 'arXiv Computer Vision & Pattern Recognition',
          url: 'https://arxiv.org/abs/2303.08774',
          type: 'Paper',
          snippet: 'Convolutional neural network segmentation achieves 96.4% precision in measuring unconsumed food volume.'
        },
        {
          title: 'University Hostel Dining Consumption Corpus',
          authors: 'Kaggle Community AI Lab',
          venue: 'Kaggle Datasets',
          url: 'https://www.kaggle.com/datasets/ahmedshahriar/student-performance-dataset',
          type: 'Dataset',
          snippet: '24,000 annotated records of daily mess attendance, meal preference, and weather impact.'
        },
        {
          title: 'Mess Demand Forecasting Microservice Engine',
          authors: 'OpenSource AI Research Lab',
          venue: 'GitHub Repositories',
          url: 'https://github.com/TECH-RAJVARDHAN782/insights-copilot',
          type: 'GitHub',
          snippet: 'Production Express.js & Python FastAPI backend configured for real-time inference.'
        }
      ]
    },
    existingSolutions: [
      { name: 'Manual Paper Registers', pros: 'Low tech barrier', cons: '80% inaccurate, highly error-prone', status: 'Outdated' },
      { name: 'Basic Excel Spreadsheets', pros: 'Easy to set up', cons: 'Zero automated forecasting, static data', status: 'Partial' },
      { name: 'iNSIGHTS Mess Waste Copilot', pros: 'Automated vision + 96% predictive accuracy', cons: 'Requires camera installation', status: 'Optimal' }
    ],
    architecture: {
      frontend: 'React 18 + Tailwind CSS',
      backend: 'Node.js Express + Python FastAPI Microservices',
      database: 'Cloud Document Store / Redis Cache',
      aiModels: ['Gemini 1.5 Pro AI Engine', 'YOLOv8 Waste Vision', 'Prophet Forecasting'],
      apis: ['GitHub REST API'],
      nodes: [
        { id: '1', label: 'Overhead Camera Vision Ingestion', type: 'Input', color: 'bg-cyan-100 text-cyan-900 border-cyan-300', detail: 'Ingests live video feeds from dining tray drop station.' },
        { id: '2', label: 'FastAPI YOLOv8 AI Model', type: 'AI Engine', color: 'bg-purple-100 text-purple-900 border-purple-300', detail: 'Segments tray contents and quantifies wasted food volume.' },
        { id: '3', label: 'Express Central Controller', type: 'Backend', color: 'bg-indigo-100 text-indigo-900 border-indigo-300', detail: 'Orchestrates predictions and pushes alerts to Mess Manager dashboard.' }
      ]
    },
    roadmap: [
      { phase: 'Phase 1 (Week 1)', title: 'Literature Search & Synthesis', task: 'Extract arXiv paper citations for food waste vision.' },
      { phase: 'Phase 2 (Week 2)', title: 'System Architecture & API Router', task: 'Setup Express server, FastAPI model weights, and Redis cache.' },
      { phase: 'Phase 3 (Week 3)', title: 'Frontend UI & Component Wiring', task: 'Connect React 18 UI components with live state management.' },
      { phase: 'Phase 4 (Week 4)', title: 'Production Deployment & PPT Deck', task: 'Deploy production build to Vercel and export PowerPoint presentation.' }
    ],
    datasets: [
      { name: 'Hostel Dining Consumption Corpus', size: '2.4 GB', link: 'https://www.kaggle.com/datasets', license: 'MIT' }
    ],
    githubRepos: [
      { name: 'TECH-RAJVARDHAN782/insights-copilot', stars: '4.8k', description: 'Readymade starter repository for Smart Mess Waste Management.' }
    ],
    agentWorkflows: [
      { agent: 'Research Agent', avatar: '🔍', text: 'DeepSearch verified citations for Smart Mess Waste Management.' },
      { agent: 'Architecture Agent', avatar: '🏗️', text: 'Generated system architecture with sub-20ms latency SLA.' },
      { agent: 'Code Copilot Agent', avatar: '🤖', text: 'Ready to export Node.js server.js and PowerPoint pitch deck.' }
    ]
  }
};
