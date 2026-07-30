export const SAMPLE_IDEAS = [
  {
    id: "food-waste",
    title: "AI Food Waste Reduction in Hostels",
    prompt: "Build an AI solution to reduce food waste in college hostels using computer vision, demand forecasting, and inventory optimization.",
    category: "Sustainability & AI",
    difficulty: "Intermediate",
    impact: "94/100",
    readymadeRepo: "https://github.com/insights-copilot/ecomeal-ai-starter",
    readymadeDemo: "https://ecomeal-ai.vercel.app"
  },
  {
    id: "smart-health",
    title: "AI Rural Tele-triage & Early Symptom Scanner",
    prompt: "Create an offline-first mobile AI assistant for low-bandwidth rural clinics to conduct early disease screening using voice & skin image analysis.",
    category: "Healthcare & AI",
    difficulty: "Advanced",
    impact: "98/100",
    readymadeRepo: "https://github.com/insights-copilot/ruralcare-tele-triage",
    readymadeDemo: "https://ruralcare-ai.vercel.app"
  },
  {
    id: "code-sec",
    title: "Autonomous AI Smart Contract Vulnerability Patching",
    prompt: "Develop an LLM agentic pipeline to audit Web3 smart contracts, simulate attack vectors, and generate auto-healing pull requests.",
    category: "Cybersecurity & Web3",
    difficulty: "Hard",
    impact: "91/100",
    readymadeRepo: "https://github.com/insights-copilot/web3-auto-healer",
    readymadeDemo: "https://web3-healer.vercel.app"
  },
  {
    id: "edu-adaptive",
    title: "Multilingual Gamified Micro-Learning for STEM",
    prompt: "Build an adaptive learning engine that turns complex engineering lectures into personalized 3-minute interactive quizzes in native languages.",
    category: "EdTech & AI",
    difficulty: "Beginner-Friendly",
    impact: "89/100",
    readymadeRepo: "https://github.com/insights-copilot/stem-micro-learn",
    readymadeDemo: "https://stem-microlearn.vercel.app"
  }
];

export const READYMADE_PROJECTS_CATALOG = [
  {
    id: "ecomeal-ai",
    title: "EcoMeal AI — Smart Hostel Cafeteria Management",
    category: "AI & Sustainability",
    description: "Complete full-stack production repo featuring YOLOv8 plate waste segmentation, Prophet headcount forecasting, MongoDB Atlas data vault, and WhatsApp RSVP bot.",
    techStack: ["React 18", "Node.js / Express", "MongoDB Atlas", "PyTorch YOLOv8", "WhatsApp Webhook"],
    githubUrl: "https://github.com/insights-copilot/ecomeal-ai-starter",
    demoUrl: "https://ecomeal-ai.vercel.app",
    stars: "2.4k",
    forks: 480,
    downloadFiles: ["server.js", "model_yolo.py", "docker-compose.yml", "seed_mongo.js"]
  },
  {
    id: "ruralcare-ai",
    title: "RuralCare AI — Offline Tele-Triage & Diagnostic Scanner",
    category: "Healthcare & Mobile AI",
    description: "Readymade PWA & React Native project equipped with quantized 8-bit MobileNetV3 skin scanner, Whisper voice audio biomarkers, and local PWA offline storage.",
    techStack: ["React Native", "MongoDB Atlas Sync", "TFLite 8-bit", "Whisper Audio", "PWA Worker"],
    githubUrl: "https://github.com/insights-copilot/ruralcare-tele-triage",
    demoUrl: "https://ruralcare-ai.vercel.app",
    stars: "1.9k",
    forks: 310,
    downloadFiles: ["App.tsx", "tflite_model.tflite", "mongo_realm_sync.js"]
  },
  {
    id: "smart-contract-healer",
    title: "DeFi Vulnerability Auto-Healer & LLM Auditor",
    category: "Cybersecurity & Web3",
    description: "Agentic pipeline scanning Solidity smart contracts, generating attack simulation vector graphs, and auto-submitting patched GitHub Pull Requests.",
    techStack: ["Node.js", "Solidity Slither", "MongoDB Atlas", "Llama-3 LLM", "GitHub API"],
    githubUrl: "https://github.com/insights-copilot/web3-auto-healer",
    demoUrl: "https://web3-healer.vercel.app",
    stars: "3.1k",
    forks: 620,
    downloadFiles: ["auditor.py", "patcher_agent.js", "contract_schema.json"]
  },
  {
    id: "adaptive-microlearn",
    title: "Multilingual STEM Micro-Quiz Generator",
    category: "EdTech & NLP",
    description: "Engine converting long lecture MP4 videos and PDFs into 3-minute gamified native language quizzes with real-time student leaderboard.",
    techStack: ["React 18", "Python FastAPI", "MongoDB Atlas", "Whisper AI", "Tailwind CSS"],
    githubUrl: "https://github.com/insights-copilot/stem-micro-learn",
    demoUrl: "https://stem-microlearn.vercel.app",
    stars: "1.5k",
    forks: 240,
    downloadFiles: ["quiz_engine.py", "server.js", "mongo_quiz_collection.js"]
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const DEFAULT_PROJECT_DATA = {
  "food-waste": {
    id: "food-waste",
    title: "EcoMeal AI: Hostel Food Waste Management Engine",
    tagline: "Predictive meal consumption forecasting & real-time cafeteria tray audit using AI computer vision and Live MongoDB Atlas.",
    problemValidation: {
      marketGap: "Hostels waste 35-45% of prepared food daily due to inaccurate headcounts and fixed menu batching.",
      feasibilityScore: 94,
      innovationScore: 96,
      impactScore: 98,
      targetUsers: ["Hostel Wardens", "Mess Vendors", "Student Committees", "Sustainability Officers"],
      keyPainPoints: [
        "Unpredictable student attendance during weekends and exams.",
        "Lack of real-time inventory tracking for perishable ingredients.",
        "Zero automated feedback loops between food preference and daily waste volume."
      ]
    },
    deepSearch: {
      summary: "Synthesized 28 research papers from IEEE & arXiv, 14 open-source GitHub repositories, and 4 public food waste datasets.",
      sourcesCount: 46,
      citations: [
        {
          title: "Deep Learning for Automated Plate Waste Estimation in Institutional Dining",
          authors: "Zhang et al. (2025)",
          venue: "IEEE Transactions on Cybernetics",
          url: "https://arxiv.org/abs/2304.10291",
          type: "Paper",
          snippet: "YOLOv8 + ResNet50 dual architecture achieves 94.2% accuracy in quantifying residual food volume from overhead RGB cameras."
        },
        {
          title: "Hybrid LSTM-Prophet Model for Daily Mess Headcount Forecasting",
          authors: "Sharma & Patel (2024)",
          venue: "Journal of Big Data Analytics",
          url: "https://arxiv.org/abs/2309.08812",
          type: "Paper",
          snippet: "Combining historical biometric gate entries with class timetable schedules reduces attendance prediction error to under 3.5%."
        },
        {
          title: "FoodLoss-Vision Dataset (Kaggle)",
          authors: "Global Food Tech Lab",
          venue: "Kaggle Datasets",
          url: "https://kaggle.com/datasets/foodloss-vision",
          type: "Dataset",
          snippet: "15,000 labeled images of dining plates categorized into grains, proteins, and vegetables with weight approximations."
        },
        {
          title: "Smart-Mess-IoT GitHub Repository",
          authors: "OpenSource-EcoHub",
          venue: "GitHub",
          url: "https://github.com/example/smart-mess-iot",
          type: "GitHub",
          snippet: "ESP32 load cell scale integration code with MQTT data bridge to MongoDB Atlas backend."
        }
      ]
    },
    existingSolutions: [
      { name: "Manual Mess Registers", pros: "Zero tech cost", cons: "High error rate, 40%+ food waste, no predictive insights", status: "Outdated" },
      { name: "Basic RFID Attendance", pros: "Tracks gate entry", cons: "Doesn't measure actual food consumption or plate waste", status: "Partial" },
      { name: "iNSIGHTS EcoMeal AI", pros: "Predictive headcount + CV tray audit + Live MongoDB Atlas batching alert", cons: "Requires camera overhead mount", status: "Optimal" }
    ],
    mongoDbSpec: {
      connectionStatus: "Connected to MongoDB Atlas Cluster (aws-iad1-shard-0)",
      clusterName: "insights-copilot-production",
      databaseName: "ecomeal_db",
      collections: [
        { name: "daily_waste_logs", count: 14280, size: "12.4 MB", schema: "{ timestamp: Date, hostelBlock: String, plateWasteKg: Number, detectedItems: Array }" },
        { name: "student_rsvp_records", count: 8520, size: "6.8 MB", schema: "{ studentId: ObjectId, date: Date, mealType: String, optOut: Boolean }" },
        { name: "kitchen_batches", count: 1240, size: "3.2 MB", schema: "{ batchId: String, recommendedPortions: Number, actualPrepared: Number }" }
      ],
      mongooseCode: `// Live MongoDB Mongoose Schema
const mongoose = require('mongoose');

const WasteLogSchema = new mongoose.Schema({
  hostelBlock: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  plateWasteKg: { type: Number, required: true },
  detectedItems: [{ name: String, confidence: Number }],
  headcountForecast: { type: Number }
});

module.exports = mongoose.model('WasteLog', WasteLogSchema);`
    },
    architecture: {
      frontend: "React 18 + Tailwind CSS + Lucide Icons",
      backend: "Node.js / Express + FastAPI PyTorch Microservices",
      database: "MongoDB Atlas (Live Cluster) + Redis Cache",
      aiModels: ["YOLOv8 (Plate Segmentation)", "Prophet / XGBoost (Demand Forecast)", "Llama-3-8B (Chef Insights)"],
      apis: ["MongoDB Atlas Data API", "WhatsApp Business API", "Weather API"],
      nodes: [
        { id: "1", label: "RGB Camera / IoT Scale", type: "Input Layer", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500", detail: "Overhead 1080p camera capturing trays and weight load cell scales." },
        { id: "2", label: "YOLOv8 Plate Segmentation Engine", type: "AI Model", color: "bg-purple-500/20 text-purple-300 border-purple-500", detail: "Executes image segmentation to detect food surface area and volume percentage." },
        { id: "3", label: "Prophet Attendance Forecaster", type: "AI Model", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500", detail: "Timeseries engine projecting headcount based on timetable and weather." },
        { id: "4", label: "MongoDB Atlas Live Data Vault", type: "Database", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500", detail: "Real-time document storage for daily mess logs, RSVP records, and kitchen batches." },
        { id: "5", label: "Chef Alert Dashboard & WhatsApp Bot", type: "Action Layer", color: "bg-amber-500/20 text-amber-300 border-amber-500", detail: "Sends automated WhatsApp nudges to kitchen staff before meal prep hours." }
      ]
    },
    roadmap: [
      { phase: "Phase 1 (Week 1-2)", title: "Dataset Collection & Model Training", task: "Train YOLOv8 on plate waste dataset and build Prophet forecast script." },
      { phase: "Phase 2 (Week 3-4)", title: "MongoDB Atlas Setup & Express API", task: "Connect Mongoose models to MongoDB Atlas cluster and expose endpoints." },
      { phase: "Phase 3 (Week 5-6)", title: "Hostel Admin Dashboard & WhatsApp Bot", task: "Deploy React dashboard with live analytics, meal batch alerts, and WhatsApp agent." },
      { phase: "Phase 4 (Week 7-8)", title: "On-Site Pilot & Impact Metrics", task: "Install pilot setup in Hostel Block B mess; track waste reduction over 14 days." }
    ],
    datasets: [
      { name: "FoodLoss-Vision 15K", size: "2.4 GB", link: "https://kaggle.com/foodloss-vision", license: "MIT" },
      { name: "Hostel Attendance & Calendar Dataset", size: "120 MB", link: "https://github.com/dataset-hostel", license: "CC-BY-4.0" }
    ],
    githubRepos: [
      { name: "insights-copilot/ecomeal-ai-starter", stars: "2.4k", description: "Complete readymade student project template for hostel waste management." }
    ],
    agentWorkflows: [
      { agent: "Research Agent", avatar: "🔍", text: "Found 4 new arXiv papers on waste estimation using RGB-D depth cameras. Updating knowledge cluster..." },
      { agent: "Architecture Agent", avatar: "🏗️", text: "Configured MongoDB Atlas Mongoose schemas and Redis pub/sub queue for peak dining hours." },
      { agent: "Code Copilot Agent", avatar: "🤖", text: "Generated Node.js server.js script connected to live MongoDB Atlas database." },
      { agent: "WhatsApp Bot Agent", avatar: "📱", text: "Interactive WhatsApp Bot active: students can type custom meal opt-out responses!" }
    ]
  }
};
