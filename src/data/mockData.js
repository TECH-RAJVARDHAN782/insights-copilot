export const SAMPLE_IDEAS = [
  {
    id: "food-waste",
    title: "AI Food Waste Reduction in College Hostels",
    prompt: "Build an AI solution to reduce food waste in college hostels using computer vision, demand forecasting, and inventory optimization.",
    category: "Sustainability & AI",
    difficulty: "Intermediate",
    impact: "94/100"
  },
  {
    id: "smart-health",
    title: "AI Rural Tele-triage & Early Symptom Scanner",
    prompt: "Create an offline-first mobile AI assistant for low-bandwidth rural clinics to conduct early disease screening using voice & skin image analysis.",
    category: "Healthcare & AI",
    difficulty: "Advanced",
    impact: "98/100"
  },
  {
    id: "code-sec",
    title: "Autonomous AI Smart Contract Vulnerability Patching",
    prompt: "Develop an LLM agentic pipeline to audit Web3 smart contracts, simulate attack vectors, and generate auto-healing pull requests.",
    category: "Cybersecurity & Web3",
    difficulty: "Hard",
    impact: "91/100"
  },
  {
    id: "edu-adaptive",
    title: "Multilingual Gamified Micro-Learning for STEM Students",
    prompt: "Build an adaptive learning engine that turns complex engineering lectures into personalized 3-minute interactive quizzes in native languages.",
    category: "EdTech & AI",
    difficulty: "Beginner-Friendly",
    impact: "89/100"
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const DEFAULT_PROJECT_DATA = {
  "food-waste": {
    id: "food-waste",
    title: "EcoMeal AI: Hostel Food Waste Management Engine",
    tagline: "Predictive meal consumption forecasting & real-time cafeteria tray audit using AI computer vision.",
    problemValidation: {
      marketGap: "Hostels waste 35-45% of prepared food daily due to inaccurate headcounts and fixed menu batching.",
      feasibilityScore: 92,
      innovationScore: 95,
      impactScore: 96,
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
          snippet: "ESP32 load cell scale integration code with MQTT data bridge to Node.js backend."
        }
      ]
    },
    existingSolutions: [
      { name: "Manual Mess Registers", pros: "Zero tech cost", cons: "High error rate, 40%+ food waste, no predictive insights", status: "Outdated" },
      { name: "Basic RFID Attendance", pros: "Tracks gate entry", cons: "Doesn't measure actual food consumption or plate waste", status: "Partial" },
      { name: "iNSIGHTS EcoMeal AI", pros: "Predictive headcount + CV tray audit + dynamic kitchen batching alert", cons: "Requires camera overhead mount", status: "Optimal" }
    ],
    architecture: {
      frontend: "React 18 + Tailwind CSS + Recharts + Lucide Icons",
      backend: "FastAPI / Python (PyTorch + YOLOv8 inference)",
      database: "PostgreSQL + Redis (Real-time caching & headcount pub/sub)",
      aiModels: ["YOLOv8 (Plate Segmentation)", "Prophet / XGBoost (Demand Forecast)", "Llama-3-8B (Chef Insights)"],
      apis: ["Weather API (Rainfall impact on attendance)", "WhatsApp Business API (Student RSVP bot)"],
      nodes: [
        { id: "1", label: "RGB Camera / IoT Scale", type: "Input Layer", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500", detail: "Overhead 1080p camera capturing trays and weight load cell scales." },
        { id: "2", label: "YOLOv8 Plate Segmentation Engine", type: "AI Model", color: "bg-purple-500/20 text-purple-300 border-purple-500", detail: "Executes image segmentation to detect food surface area and volume percentage." },
        { id: "3", label: "Prophet Attendance Forecaster", type: "AI Model", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500", detail: "Timeseries engine projecting headcount based on timetable and weather." },
        { id: "4", label: "FastAPI Central Dispatch Engine", type: "Backend", color: "bg-blue-500/20 text-blue-300 border-blue-500", detail: "REST & WebSocket endpoints handling real-time kitchen batching alerts." },
        { id: "5", label: "PostgreSQL & TimescaleDB", type: "Database", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500", detail: "Stores daily consumption logs, batch history, and inventory metrics." },
        { id: "6", label: "Chef Alert Dashboard & WhatsApp Bot", type: "Action Layer", color: "bg-amber-500/20 text-amber-300 border-amber-500", detail: "Sends automated WhatsApp nudges to kitchen staff before meal prep hours." }
      ]
    },
    roadmap: [
      { phase: "Phase 1 (Week 1-2)", title: "Dataset Collection & Model Training", task: "Train YOLOv8 on plate waste dataset and build Prophet forecast script." },
      { phase: "Phase 2 (Week 3-4)", title: "IoT Integration & FastAPI Backend", task: "Connect ESP32 weight sensors to MQTT broker and expose endpoints." },
      { phase: "Phase 3 (Week 5-6)", title: "Hostel Admin & Chef Dashboard UI", task: "Deploy React dashboard with live analytics, meal batch alerts, and WhatsApp agent." },
      { phase: "Phase 4 (Week 7-8)", title: "On-Site Pilot & Impact Metrics", task: "Install pilot setup in Hostel Block B mess; track waste reduction over 14 days." }
    ],
    datasets: [
      { name: "FoodLoss-Vision 15K", size: "2.4 GB", link: "https://kaggle.com/foodloss-vision", license: "MIT" },
      { name: "Hostel Attendance & Calendar Dataset", size: "120 MB", link: "https://github.com/dataset-hostel", license: "CC-BY-4.0" }
    ],
    githubRepos: [
      { name: "ultralytics/yolov8", stars: "28.5k", description: "Real-time object detection and segmentation framework." },
      { name: "facebook/prophet", stars: "17.2k", description: "Automatic forecasting procedure for time-series data." },
      { name: "insights/ecomeal-starter-kit", stars: "1.4k", description: "Starter kit template for hostel waste management." }
    ],
    agentWorkflows: [
      { agent: "Research Agent", avatar: "🔍", text: "Found 4 new arXiv papers on waste estimation using RGB-D depth cameras. Updating knowledge cluster..." },
      { agent: "Architecture Agent", avatar: "🏗️", text: "Designed PostgreSQL schema for daily mess logs and Redis pub/sub queue for peak meal hours." },
      { agent: "Code Copilot Agent", avatar: "🤖", text: "Generated FastAPI inference script for YOLOv8 model serving with Docker support." },
      { agent: "WhatsApp Bot Agent", avatar: "📱", text: "Configured student meal opt-out workflow via WhatsApp: 'Reply 1 to skip dinner tonight'." }
    ]
  },
  "smart-health": {
    id: "smart-health",
    title: "RuralCare AI: Offline-First Tele-triage Scanner",
    tagline: "Voice & skin lesion screening engine built for low-bandwidth rural health clinics.",
    problemValidation: {
      marketGap: "Over 60% of rural clinics lack specialized diagnostic doctors and stable internet connectivity.",
      feasibilityScore: 94,
      innovationScore: 97,
      impactScore: 98,
      targetUsers: ["Rural Healthcare Workers", "NGO Medical Volunteers", "District Health Officers"],
      keyPainPoints: [
        "Zero internet access in remote primary health centers.",
        "Delayed early symptom diagnosis leading to preventable complications.",
        "Language barriers in communicating medical symptoms."
      ]
    },
    deepSearch: {
      summary: "Synthesized 34 medical AI papers from PubMed & arXiv, 18 open-source diagnostic datasets, and Edge-AI mobile models.",
      sourcesCount: 52,
      citations: [
        {
          title: "Quantized MobileNetV3 for On-Device Dermatological Screening in Low-Resource Settings",
          authors: "Gupta et al. (2025)",
          venue: "Lancet Digital Health",
          url: "https://arxiv.org/abs/2305.11029",
          type: "Paper",
          snippet: "Quantized 8-bit model achieves 96.1% diagnostic sensitivity running locally on $80 Android smartphones."
        },
        {
          title: "Offline Voice Acoustic Biomarkers for Respiratory Illness",
          authors: "Chen et al. (2024)",
          venue: "IEEE Transactions on Biomedical Engineering",
          url: "https://arxiv.org/abs/2311.04210",
          type: "Paper",
          snippet: "Extracts spectral features from cough audio clips to screen respiratory anomalies offline."
        }
      ]
    },
    existingSolutions: [
      { name: "Paper-based Health Logs", pros: "Works anywhere", cons: "No diagnostic intelligence or triage urgency scoring", status: "Outdated" },
      { name: "Cloud Telemedicine Apps", pros: "Doctor video calls", cons: "Requires high-speed 4G/5G, fails in remote clinics", status: "Partial" },
      { name: "RuralCare AI Scanner", pros: "Offline MobileNetV3 + Voice Biomarkers + SQLite local store", cons: "Requires camera lens calibration", status: "Optimal" }
    ],
    architecture: {
      frontend: "React Native / Expo + SQLite + Offline PWA",
      backend: "FastAPI Sync Server (Triggers when internet connects)",
      database: "SQLite (Local) + PostgreSQL (Cloud Vault)",
      aiModels: ["MobileNetV3 (Skin Lesion Classifier)", "Whisper-Tiny (Offline Voice Transcriber)"],
      apis: ["District Health Registry API", "SMS Gateway for Critical Alerts"],
      nodes: [
        { id: "1", label: "Mobile Camera & Microphone", type: "Input Layer", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500", detail: "Captures skin images and cough audio." },
        { id: "2", label: "Quantized MobileNetV3 Engine", type: "AI Model", color: "bg-purple-500/20 text-purple-300 border-purple-500", detail: "On-device TFLite model running sub-200ms inference." },
        { id: "3", label: "SQLite Local Cache", type: "Database", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500", detail: "Encrypted local patient log synced when back online." },
        { id: "4", label: "SMS Urgency Alert Gateway", type: "Action Layer", color: "bg-amber-500/20 text-amber-300 border-amber-500", detail: "Dispatches emergency SMS to district hospital doctors." }
      ]
    },
    roadmap: [
      { phase: "Phase 1 (Week 1-2)", title: "TFLite Model Quantization", task: "Convert MobileNetV3 model to TFLite 8-bit format for Android performance." },
      { phase: "Phase 2 (Week 3-4)", title: "Offline PWA & SQLite Sync", task: "Implement offline service worker cache and background sync manager." },
      { phase: "Phase 3 (Week 5-6)", title: "Voice Biomarker Integration", task: "Integrate Whisper-Tiny for multi-lingual audio intake." },
      { phase: "Phase 4 (Week 7-8)", title: "District Clinic Field Test", task: "Deploy test build to 3 rural health centers." }
    ],
    datasets: [
      { name: "DermNet Skin Lesion 25K", size: "3.1 GB", link: "https://kaggle.com", license: "CC-BY-NC" }
    ],
    githubRepos: [
      { name: "tensorflow/tflite-support", stars: "32.1k", description: "Mobile machine learning execution runtime." }
    ],
    agentWorkflows: [
      { agent: "Research Agent", avatar: "🔍", text: "Verified 52 clinical trial citations for on-device diagnostic accuracy." },
      { agent: "Architecture Agent", avatar: "🏗️", text: "Configured offline PWA service worker with background sync fallback." },
      { agent: "Code Copilot Agent", avatar: "🤖", text: "Generated TFLite React Native wrapper code for Android." }
    ]
  }
};
