import React, { useState } from 'react';
import Header from './components/Header';
import DeepSearch from './components/DeepSearch';
import ReadymadeProjects from './components/ReadymadeProjects';
import KnowledgeGraph from './components/KnowledgeGraph';
import ProjectHub from './components/ProjectHub';
import AgentHub from './components/AgentHub';
import DocGenerator from './components/DocGenerator';
import TalentPlatform from './components/TalentPlatform';
import LiveSandbox from './components/LiveSandbox';
import AuthModal from './components/AuthModal';
import HistoryDrawer from './components/HistoryDrawer';
import { DEFAULT_PROJECT_DATA, SAMPLE_IDEAS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [currentLang, setCurrentLang] = useState('en');
  
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

  const handleSelectSample = (id) => {
    setIsSearching(true);
    setActiveIdeaId(id);
    
    setTimeout(() => {
      let dataToSet = null;
      if (DEFAULT_PROJECT_DATA[id]) {
        dataToSet = DEFAULT_PROJECT_DATA[id];
      } else {
        const sample = SAMPLE_IDEAS.find(s => s.id === id);
        dataToSet = createDynamicProjectData(sample ? sample.title : "Custom Student Project", sample ? sample.prompt : "");
      }
      setProjectData(dataToSet);
      saveToHistory(dataToSet);
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
      saveToHistory(generatedData);
      setIsSearching(false);
    }, 1100);
  };

  // Interconnect Topic Dynamically across all tabs
  const handleUpdateTopic = (newTopic) => {
    if (!newTopic || newTopic.trim() === '') return;
    const formattedTitle = extractTitleFromPrompt(newTopic);
    const updatedData = createDynamicProjectData(formattedTitle, newTopic);
    setProjectData(updatedData);
    saveToHistory(updatedData);
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

  const createDynamicProjectData = (title, prompt) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    return {
      title: title,
      tagline: `AI-Engineered framework for: "${prompt || title}"`,
      problemValidation: {
        marketGap: `Existing systems lack real-time automated computer vision audits, predictive ML forecasting, and live cloud synchronization for ${title}.`,
        feasibilityScore: Math.min(99, Math.floor(Math.random() * 6) + 94),
        innovationScore: Math.min(99, Math.floor(Math.random() * 6) + 93),
        impactScore: Math.min(99, Math.floor(Math.random() * 5) + 94),
        targetUsers: ["Students", "Domain Experts", "Academic Mentors", "Hackathon Judges"],
        keyPainPoints: [
          `Manual overhead and unverified execution timelines in traditional ${title} solutions.`,
          `Fragmented research data analyzed by DeepSearch.`,
          "Lack of automated system architecture diagrams and starter code."
        ]
      },
      deepSearch: {
        summary: `Scoured literature focusing on research paper citations and open-source models for ${title}.`,
        sourcesCount: 42,
        citations: [
          {
            title: `Deep Learning Neural Pipeline for ${title}`,
            authors: "Zhang et al. (2025)",
            venue: "arXiv Computer Vision & Pattern Recognition",
            url: "https://arxiv.org/abs/2303.08774",
            type: "Paper",
            snippet: `Empirical benchmarking demonstrates 95.8% accuracy when deploying quantized models for ${title}.`
          },
          {
            title: `${title} Reference Open-Source Annotated Corpus`,
            authors: "Kaggle Community AI Lab",
            venue: "Kaggle Datasets",
            url: "https://www.kaggle.com/datasets/ahmedshahriar/student-performance-dataset",
            type: "Dataset",
            snippet: `18,000+ curated datapoints formatted for model training and verification for ${title}.`
          },
          {
            title: `${title} Microservices Engine`,
            authors: "OpenSource Tech Lab",
            venue: "GitHub Repositories",
            url: "https://github.com/TECH-RAJVARDHAN782/insights-copilot",
            type: "GitHub",
            snippet: `Production-ready Node.js Express & Python FastAPI code synthesized for ${title}.`
          }
        ]
      },
      existingSolutions: [
        { name: "Manual Approaches", pros: "Zero tech cost", cons: "High error rates, zero scalability", status: "Outdated" },
        { name: "Basic Web Search", pros: "Wide sources", cons: "No architecture synthesis or agent automation", status: "Partial" },
        { name: `iNSIGHTS ${title}`, pros: "Automated architecture + AI workforce", cons: "Requires API configuration", status: "Optimal" }
      ],
      architecture: {
        frontend: "React 18 + Tailwind CSS",
        backend: "Node.js Express + Python FastAPI Microservices",
        database: "Cloud Document Store / Redis Cache",
        aiModels: ["Gemini 1.5 Pro", "Prophet Time-Series", "YOLOv8 Vision"],
        apis: ["GitHub REST API"],
        nodes: [
          { id: "1", label: `Data Input Pipeline for ${title}`, type: "Input", color: "bg-cyan-100 text-cyan-900 border-cyan-300", detail: "Data ingestion pipeline." },
          { id: "2", label: "AI Synthesizer Engine", type: "AI Engine", color: "bg-purple-100 text-purple-900 border-purple-300", detail: "Generates paper citations and problem validation." },
          { id: "3", label: "Express Central Orchestrator", type: "Backend", color: "bg-indigo-100 text-indigo-900 border-indigo-300", detail: "REST & WebSockets server." }
        ]
      },
      roadmap: [
        { phase: "Phase 1 (Week 1)", title: "Literature Search & Synthesis", task: `Extract paper citations for ${title}.` },
        { phase: "Phase 2 (Week 2)", title: "Backend & Express API", task: "Setup Express models, database collections, and AI inference endpoints." },
        { phase: "Phase 3 (Week 3)", title: "Agent Integration & Dashboard", task: "Connect AI agents and build interactive React dashboard." },
        { phase: "Phase 4 (Week 4)", title: "Deployment & Presentation Deck", task: "Deploy production build to Vercel and export PowerPoint presentation." }
      ],
      datasets: [
        { name: `${title} Annotated Corpus`, size: "1.8 GB", link: "https://www.kaggle.com/datasets", license: "MIT" }
      ],
      githubRepos: [
        { name: `insights-copilot/${slug}`, stars: "3.2k", description: `Readymade template repository for ${title}.` }
      ],
      agentWorkflows: [
        { agent: "Research Agent", avatar: "🔍", text: `DeepSearch verified citations for ${title}.` },
        { agent: "Architecture Agent", avatar: "🏗️", text: "Generated system architecture with sub-20ms latency SLA." },
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
      case 'sandbox':
        return <LiveSandbox projectData={projectData} onUpdateTopic={handleUpdateTopic} currentLang={currentLang} />;
      case 'graph':
        return (
          <KnowledgeGraph
            projectData={projectData}
            currentLang={currentLang}
          />
        );
      case 'hub':
        return <ProjectHub projectData={projectData} onUpdateTopic={handleUpdateTopic} currentLang={currentLang} />;
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
        userAuth={userAuth}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenHistory={() => setShowHistoryDrawer(true)}
        onNewConversation={handleNewConversation}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="animate-fadeIn">
          {renderWebTabContent()}
        </div>
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
            <span className="text-indigo-700 font-extrabold">Presentation Generator v3.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
