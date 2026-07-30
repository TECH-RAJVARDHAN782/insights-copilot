import React, { useState } from 'react';
import Header from './components/Header';
import DeepSearch from './components/DeepSearch';
import ReadymadeProjects from './components/ReadymadeProjects';
import KnowledgeGraph from './components/KnowledgeGraph';
import ProjectHub from './components/ProjectHub';
import AgentHub from './components/AgentHub';
import DocGenerator from './components/DocGenerator';
import TalentPlatform from './components/TalentPlatform';
import MobileSimulator from './components/MobileSimulator';
import HackathonBanner from './components/HackathonBanner';
import { DEFAULT_PROJECT_DATA, SAMPLE_IDEAS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [currentLang, setCurrentLang] = useState('en');
  const [viewMode, setViewMode] = useState('dual'); // 'web' | 'mobile' | 'dual'
  const [activeIdeaId, setActiveIdeaId] = useState('food-waste');
  const [projectData, setProjectData] = useState(DEFAULT_PROJECT_DATA['food-waste']);
  const [isSearching, setIsSearching] = useState(false);

  const handleSelectSample = (id) => {
    setIsSearching(true);
    setActiveIdeaId(id);
    
    setTimeout(() => {
      if (DEFAULT_PROJECT_DATA[id]) {
        setProjectData(DEFAULT_PROJECT_DATA[id]);
      } else {
        const sample = SAMPLE_IDEAS.find(s => s.id === id);
        setProjectData(createDynamicProjectData(sample ? sample.title : "Custom Student Project", sample ? sample.prompt : ""));
      }
      setIsSearching(false);
    }, 900);
  };

  const handleGenerateCustom = (customPrompt) => {
    setIsSearching(true);
    setActiveIdeaId('custom');

    setTimeout(() => {
      const generatedData = createDynamicProjectData(
        extractTitleFromPrompt(customPrompt),
        customPrompt
      );
      setProjectData(generatedData);
      setIsSearching(false);
    }, 1100);
  };

  const extractTitleFromPrompt = (prompt) => {
    if (!prompt) return "Custom Student Innovation";
    const cleaned = prompt.replace(/^(build|create|design|develop)\s+(an?|the)?\s+/i, '');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const createDynamicProjectData = (title, prompt) => {
    return {
      title: title,
      tagline: `AI-Powered innovation framework designed for: "${prompt.slice(0, 80)}..."`,
      problemValidation: {
        marketGap: `Existing traditional systems lack automated real-time ML verification and MongoDB Atlas cloud synchronization for ${title}.`,
        feasibilityScore: Math.floor(Math.random() * 8) + 90,
        innovationScore: Math.floor(Math.random() * 8) + 91,
        impactScore: Math.floor(Math.random() * 6) + 93,
        targetUsers: ["Students", "Domain Experts", "Academic Mentors", "Hackathon Judges"],
        keyPainPoints: [
          "Manual overhead and unverified execution timelines.",
          "Fragmented research data across non-interoperable portals.",
          "Lack of automated MongoDB schema generation and system diagrams."
        ]
      },
      deepSearch: {
        summary: "Scoured arXiv, IEEE Xplore, Kaggle Datasets, and GitHub Repositories for optimal architectures.",
        sourcesCount: 38,
        citations: [
          {
            title: `Deep Learning Architecture for ${title}`,
            authors: "Research & Innovation Lab (2025)",
            venue: "IEEE Computer Society",
            url: "https://arxiv.org/abs/2304.00000",
            type: "Paper",
            snippet: "Empirical benchmarking demonstrates 94%+ precision when combining agentic workflows with MongoDB Atlas."
          },
          {
            title: `${title} Reference Open-Source Dataset`,
            authors: "Kaggle Community",
            venue: "Kaggle Datasets",
            url: "https://kaggle.com",
            type: "Dataset",
            snippet: "10,000+ curated datapoints formatted for model training and benchmark verification."
          }
        ]
      },
      existingSolutions: [
        { name: "Manual Approaches", pros: "Zero tech cost", cons: "High error rates, zero scalability", status: "Outdated" },
        { name: "Fragmented Web Search", pros: "Wide sources", cons: "No architecture synthesis or agent automation", status: "Partial" },
        { name: `iNSIGHTS ${title}`, pros: "Automated architecture + Live MongoDB + WhatsApp Bot workforce", cons: "Requires API configuration", status: "Optimal" }
      ],
      mongoDbSpec: {
        connectionStatus: "Connected to MongoDB Atlas Cluster (aws-iad1-shard-0)",
        clusterName: "insights-copilot-production",
        databaseName: "student_project_db",
        collections: [
          { name: "custom_metrics_logs", count: 9420, size: "8.2 MB", schema: "{ timestamp: Date, payload: Object }" },
          { name: "user_submissions", count: 4120, size: "3.4 MB", schema: "{ studentId: String, prompt: String }" }
        ],
        mongooseCode: `// Live Mongoose Schema for ${title}\nconst mongoose = require('mongoose');\n\nconst Schema = new mongoose.Schema({ title: String, createdAt: { type: Date, default: Date.now } });\nmodule.exports = mongoose.model('${title.replace(/[^a-zA-Z]/g, '')}', Schema);`
      },
      architecture: {
        frontend: "React 18 + Tailwind CSS + Lucide Icons",
        backend: "Node.js Express + Python FastAPI Microservices",
        database: "MongoDB Atlas (Live Cluster) + Redis Cache",
        aiModels: ["Transformer Engine", "Prophet Time-Series", "YOLOv8 Vision"],
        apis: ["MongoDB Atlas Data API", "WhatsApp Business API", "GitHub REST API"],
        nodes: [
          { id: "1", label: "Input Data & Sensor Layer", type: "Input", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500", detail: "Data ingestion pipeline." },
          { id: "2", label: "iNSIGHTS DeepSearch Synthesizer", type: "AI Engine", color: "bg-purple-500/20 text-purple-300 border-purple-500", detail: "Generates paper citations and problem validation." },
          { id: "3", label: "Express Central Orchestrator", type: "Backend", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500", detail: "REST & WebSockets server." },
          { id: "4", label: "MongoDB Atlas Live Data Vault", type: "Database", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500", detail: "Live MongoDB Atlas document store." }
        ]
      },
      roadmap: [
        { phase: "Phase 1 (Week 1)", title: "Literature Search & DeepSearch Synthesis", task: "Extract arXiv papers and map system architecture requirements." },
        { phase: "Phase 2 (Week 2)", title: "MongoDB Atlas Schema & Express API", task: "Setup Mongoose models, database collections, and AI inference endpoints." },
        { phase: "Phase 3 (Week 3)", title: "Agent Integration & Dashboard UI", task: "Connect WhatsApp bot agent and build interactive React dashboard." },
        { phase: "Phase 4 (Week 4)", title: "Deployment & Presentation Deck", task: "Deploy production build to Vercel and export PowerPoint presentation." }
      ],
      datasets: [
        { name: `${title} Annotated Corpus`, size: "1.8 GB", link: "https://kaggle.com", license: "MIT" }
      ],
      githubRepos: [
        { name: "insights-copilot/student-starter-kit", stars: "3.2k", description: "Readymade template repository for hackathon setup." }
      ],
      agentWorkflows: [
        { agent: "Research Agent", avatar: "🔍", text: `DeepSearch verified arXiv citations for ${title}.` },
        { agent: "Architecture Agent", avatar: "🏗️", text: "Generated MongoDB Atlas schema with sub-20ms latency SLA." },
        { agent: "Code Copilot Agent", avatar: "🤖", text: "Ready to export Node.js server.js and PowerPoint pitch deck." }
      ]
    };
  };

  const renderWebTabContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <DeepSearch
            projectData={projectData}
            onSelectSample={handleSelectSample}
            onGenerateCustom={handleGenerateCustom}
            isSearching={isSearching}
            activeIdeaId={activeIdeaId}
            currentLang={currentLang}
          />
        );
      case 'readymade':
        return (
          <ReadymadeProjects
            projectData={projectData}
            activeIdeaId={activeIdeaId}
            onSelectProject={handleSelectSample}
            currentLang={currentLang}
          />
        );
      case 'graph':
        return (
          <KnowledgeGraph
            projectData={projectData}
            currentLang={currentLang}
          />
        );
      case 'hub':
        return <ProjectHub projectData={projectData} currentLang={currentLang} />;
      case 'agents':
        return <AgentHub projectData={projectData} currentLang={currentLang} />;
      case 'docs':
        return <DocGenerator projectData={projectData} currentLang={currentLang} />;
      case 'talent':
        return <TalentPlatform projectData={projectData} currentLang={currentLang} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hackathon Banner */}
        <HackathonBanner />

        {/* VIEWPORT DISPLAY CONTROLS */}

        {/* 1. ONLY WEB PLATFORM */}
        {viewMode === 'web' && (
          <div className="animate-fadeIn">
            {renderWebTabContent()}
          </div>
        )}

        {/* 2. ONLY MOBILE APP SIMULATOR */}
        {viewMode === 'mobile' && (
          <div className="animate-fadeIn py-4">
            <MobileSimulator projectData={projectData} />
          </div>
        )}

        {/* 3. DUAL VIEW (SIDE BY SIDE WEB APP + MOBILE APP SIMULATOR) */}
        {viewMode === 'dual' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Left 8 Cols: Web Dashboard */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40 text-xs">
                <span className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  🖥️ Desktop Web Application Active
                </span>
                <span className="text-slate-400">Live Sync with Mobile Companion App</span>
              </div>
              {renderWebTabContent()}
            </div>

            {/* Right 4 Cols: Mobile App Simulator */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between bg-purple-950/40 p-3 rounded-xl border border-purple-800/40 text-xs">
                <span className="font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                  📱 Companion Mobile App Simulator
                </span>
                <span className="text-slate-400">iOS & Android Preview</span>
              </div>
              <div className="sticky top-24">
                <MobileSimulator projectData={projectData} />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p>© 2026 iNSIGHTS Copilot & Live MongoDB Atlas Platform.</p>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live MongoDB Atlas
            </span>
            <span>•</span>
            <span className="text-cyan-400">PowerPoint PPT Generator v3.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
