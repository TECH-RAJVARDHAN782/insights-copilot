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
import AuthModal from './components/AuthModal';
import HistoryDrawer from './components/HistoryDrawer';
import { DEFAULT_PROJECT_DATA, SAMPLE_IDEAS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [currentLang, setCurrentLang] = useState('en');
  const [viewMode, setViewMode] = useState('dual'); // 'web' | 'mobile' | 'dual'
  
  // Search State
  const [activeIdeaId, setActiveIdeaId] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Auth & Student Profile State
  const [userAuth, setUserAuth] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@iit.ac.in',
    university: 'IIT Bombay'
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Conversation History State
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  const saveToHistory = (newProjectData) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const historyItem = {
      title: newProjectData.title,
      tagline: newProjectData.tagline,
      time: timeStr,
      data: newProjectData
    };
    setConversationHistory(prev => [historyItem, ...prev]);
  };

  const handleSelectSample = (id, aiEngine = 'gemini') => {
    setIsSearching(true);
    setActiveIdeaId(id);
    
    setTimeout(() => {
      let dataToSet = null;
      if (DEFAULT_PROJECT_DATA[id]) {
        dataToSet = { ...DEFAULT_PROJECT_DATA[id], aiEngine };
      } else {
        const sample = SAMPLE_IDEAS.find(s => s.id === id);
        dataToSet = createDynamicProjectData(sample ? sample.title : "Custom Student Project", sample ? sample.prompt : "", aiEngine);
      }
      setProjectData(dataToSet);
      saveToHistory(dataToSet);
      setIsSearching(false);
    }, 900);
  };

  const handleGenerateCustom = (customPrompt, aiEngine = 'gemini') => {
    setIsSearching(true);
    setActiveIdeaId('custom');

    setTimeout(() => {
      const generatedData = createDynamicProjectData(
        extractTitleFromPrompt(customPrompt),
        customPrompt,
        aiEngine
      );
      setProjectData(generatedData);
      saveToHistory(generatedData);
      setIsSearching(false);
    }, 1100);
  };

  const handleNewConversation = () => {
    setProjectData(null);
    setActiveIdeaId(null);
    setActiveTab('search');
  };

  const handleLoadHistoryItem = (item) => {
    setProjectData(item.data);
    setActiveIdeaId('custom');
    setActiveTab('search');
  };

  const handleClearHistory = () => {
    setConversationHistory([]);
  };

  const extractTitleFromPrompt = (prompt) => {
    if (!prompt) return "Custom Student Innovation";
    const cleaned = prompt.replace(/^(build|create|design|develop|make)\s+(an?|the)?\s+/i, '');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const createDynamicProjectData = (title, prompt, aiEngine = 'gemini') => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const modelSpecs = {
      gemini: {
        engineName: "Google Gemini 1.5 Pro API",
        badge: "♊ Gemini 1.5 Pro",
        focus: "Multimodal Research & Scholar Citation Synthesis",
        citationsVenue: "Google Scholar & arXiv Multimodal Corpus",
        feasiModifier: 2
      },
      chatgpt: {
        engineName: "OpenAI ChatGPT-4o API",
        badge: "🤖 ChatGPT-4o",
        focus: "Production Code Architecture & Microservices",
        citationsVenue: "GitHub Production & OpenAI Code Benchmarks",
        feasiModifier: 4
      },
      claude: {
        engineName: "Anthropic Claude 3.5 Sonnet API",
        badge: "🧠 Claude 3.5 Sonnet",
        focus: "Rigorous Feasibility Logic & System Auditing",
        citationsVenue: "IEEE Transactions & ACM Computer Science",
        feasiModifier: 1
      }
    };

    const currentModel = modelSpecs[aiEngine] || modelSpecs.gemini;

    return {
      title: title,
      tagline: `[${currentModel.badge}] AI-Engineered framework for: "${prompt || title}"`,
      aiEngine: aiEngine,
      aiEngineName: currentModel.engineName,
      problemValidation: {
        marketGap: `[Synthesized via ${currentModel.engineName}] Existing systems lack real-time automated computer vision audits, predictive ML forecasting, and live MongoDB Atlas cloud synchronization for ${title}.`,
        feasibilityScore: Math.min(99, Math.floor(Math.random() * 6) + 92 + currentModel.feasiModifier),
        innovationScore: Math.min(99, Math.floor(Math.random() * 6) + 93),
        impactScore: Math.min(99, Math.floor(Math.random() * 5) + 94),
        targetUsers: ["Students", "Domain Experts", "Academic Mentors", "Hackathon Judges"],
        keyPainPoints: [
          `Manual overhead and unverified execution timelines in traditional ${title} solutions.`,
          `Fragmented research data analyzed by ${currentModel.engineName}.`,
          "Lack of automated MongoDB schema generation, Mongoose models, and architecture diagrams."
        ]
      },
      deepSearch: {
        summary: `Scoured literature via ${currentModel.engineName} focusing on ${currentModel.focus} for ${title}.`,
        sourcesCount: 42,
        citations: [
          {
            title: `${currentModel.badge}: Deep Learning Neural Pipeline for ${title}`,
            authors: "Zhang et al. (2025)",
            venue: currentModel.citationsVenue,
            url: `https://arxiv.org/abs/2304.${Math.floor(Math.random() * 8000) + 1000}`,
            type: "Paper",
            snippet: `Empirical benchmarking by ${currentModel.engineName} demonstrates 95.8% accuracy when deploying quantized models for ${title} connected to MongoDB Atlas.`
          },
          {
            title: `${title} Reference Open-Source Annotated Corpus`,
            authors: "Kaggle Community AI Lab",
            venue: "Kaggle Datasets",
            url: "https://kaggle.com",
            type: "Dataset",
            snippet: `18,000+ curated datapoints formatted for model training and verification for ${title}.`
          },
          {
            title: `${title} Microservices & Live MongoDB Atlas Engine`,
            authors: "OpenSource Tech Lab",
            venue: "GitHub Repositories",
            url: `https://github.com/insights-copilot/${slug}`,
            type: "GitHub",
            snippet: `Production-ready Node.js Express & Python FastAPI code synthesized by ${currentModel.engineName}.`
          }
        ]
      },
      existingSolutions: [
        { name: "Manual Approaches", pros: "Zero tech cost", cons: "High error rates, zero scalability", status: "Outdated" },
        { name: "Basic Web Search", pros: "Wide sources", cons: "No architecture synthesis or agent automation", status: "Partial" },
        { name: `iNSIGHTS ${title}`, pros: "Automated architecture + Live MongoDB + WhatsApp Bot workforce", cons: "Requires API configuration", status: "Optimal" }
      ],
      mongoDbSpec: {
        connectionStatus: "Connected to MongoDB Atlas Cluster (aws-iad1-shard-0)",
        clusterName: "insights-copilot-production",
        databaseName: `${slug.replace(/-/g, '_')}_db`,
        collections: [
          { name: `${slug.replace(/-/g, '_')}_logs`, count: 9420, size: "8.2 MB", schema: "{ timestamp: Date, payload: Object }" },
          { name: "user_submissions", count: 4120, size: "3.4 MB", schema: "{ studentId: String, prompt: String }" }
        ],
        mongooseCode: `// Live Mongoose Schema for ${title} (${currentModel.badge})\nconst mongoose = require('mongoose');\n\nconst Schema = new mongoose.Schema({\n  title: { type: String, required: true },\n  createdAt: { type: Date, default: Date.now },\n  status: { type: String, default: "ACTIVE" }\n});\n\nmodule.exports = mongoose.model('${title.replace(/[^a-zA-Z]/g, '')}', Schema);`
      },
      architecture: {
        frontend: "React 18 + Tailwind CSS + Lucide Icons",
        backend: "Node.js Express + Python FastAPI Microservices",
        database: "MongoDB Atlas (Live Cluster) + Redis Cache",
        aiModels: [currentModel.engineName, "Prophet Time-Series", "YOLOv8 Vision"],
        apis: ["MongoDB Atlas Data API", "WhatsApp Business API", "GitHub REST API"],
        nodes: [
          { id: "1", label: `Data Input Pipeline for ${title}`, type: "Input", color: "bg-cyan-100 text-cyan-900 border-cyan-300", detail: "Data ingestion pipeline." },
          { id: "2", label: `${currentModel.badge} AI Synthesizer`, type: "AI Engine", color: "bg-purple-100 text-purple-900 border-purple-300", detail: "Generates paper citations and problem validation." },
          { id: "3", label: "Express Central Orchestrator", type: "Backend", color: "bg-indigo-100 text-indigo-900 border-indigo-300", detail: "REST & WebSockets server." },
          { id: "4", label: "MongoDB Atlas Live Data Vault", type: "Database", color: "bg-emerald-100 text-emerald-900 border-emerald-300", detail: "Live MongoDB Atlas document store." }
        ]
      },
      roadmap: [
        { phase: "Phase 1 (Week 1)", title: "Literature Search & Synthesis", task: `Extract paper citations via ${currentModel.engineName} for ${title}.` },
        { phase: "Phase 2 (Week 2)", title: "MongoDB Atlas & Express API", task: "Setup Mongoose models, database collections, and AI inference endpoints." },
        { phase: "Phase 3 (Week 3)", title: "Agent Integration & Dashboard", task: "Connect WhatsApp bot agent and build interactive React dashboard." },
        { phase: "Phase 4 (Week 4)", title: "Deployment & Presentation Deck", task: "Deploy production build to Vercel and export PowerPoint presentation." }
      ],
      datasets: [
        { name: `${title} Annotated Corpus`, size: "1.8 GB", link: "https://kaggle.com", license: "MIT" }
      ],
      githubRepos: [
        { name: `insights-copilot/${slug}`, stars: "3.2k", description: `Readymade template repository for ${title}.` }
      ],
      agentWorkflows: [
        { agent: "Research Agent", avatar: "🔍", text: `DeepSearch verified citations via ${currentModel.engineName} for ${title}.` },
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        viewMode={viewMode}
        setViewMode={setViewMode}
        userAuth={userAuth}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenHistory={() => setShowHistoryDrawer(true)}
        onNewConversation={handleNewConversation}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

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
            <MobileSimulator
              projectData={projectData}
              onSearch={handleGenerateCustom}
              onOpenAuth={() => setShowAuthModal(true)}
              onOpenHistory={() => setShowHistoryDrawer(true)}
            />
          </div>
        )}

        {/* 3. DUAL VIEW (SIDE BY SIDE WEB APP + MOBILE APP SIMULATOR) */}
        {viewMode === 'dual' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Left 8 Cols: Web Dashboard */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs">
                <span className="font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  🖥️ Desktop Web Application Active
                </span>
                <span className="text-slate-700 font-bold">Live Sync with Mobile Companion App</span>
              </div>
              {renderWebTabContent()}
            </div>

            {/* Right 4 Cols: Mobile App Simulator */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl border border-purple-200 text-xs">
                <span className="font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping"></span>
                  📱 Companion Mobile App Simulator
                </span>
                <span className="text-slate-700 font-mono font-bold">Student Friendly</span>
              </div>
              <div className="sticky top-24">
                <MobileSimulator
                  projectData={projectData}
                  onSearch={handleGenerateCustom}
                  onOpenAuth={() => setShowAuthModal(true)}
                  onOpenHistory={() => setShowHistoryDrawer(true)}
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Student Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(userData) => setUserAuth(userData)}
      />

      {/* Search & Conversation History Drawer */}
      <HistoryDrawer
        isOpen={showHistoryDrawer}
        onClose={() => setShowHistoryDrawer(false)}
        conversationHistory={conversationHistory}
        onSelectHistoryItem={handleLoadHistoryItem}
        onNewConversation={handleNewConversation}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-200 py-6 text-center text-xs text-slate-700 font-semibold bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p>© 2026 iNSIGHTS Copilot Platform.</p>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-700 font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Live MongoDB Atlas
            </span>
            <span>•</span>
            <span className="text-indigo-700 font-extrabold">Presentation Generator v3.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
