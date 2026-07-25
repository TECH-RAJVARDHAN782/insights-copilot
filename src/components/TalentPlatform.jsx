import React, { useState } from 'react';
import { 
  UserCheck, 
  Briefcase, 
  Award, 
  Search, 
  ShieldCheck, 
  FileCheck, 
  MessageSquare, 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ExternalLink,
  Code,
  Github,
  Play,
  Upload,
  Cpu,
  Zap,
  Star,
  Users
} from 'lucide-react';

export default function TalentPlatform({ projectData }) {
  const [activeRole, setActiveRole] = useState('candidate'); // 'candidate' | 'recruiter'
  const [activeSubTab, setActiveSubTab] = useState('profile'); // candidate: 'profile', 'verifications', 'interviews', 'ppt' | recruiter: 'search', 'matching', 'pipeline', 'fraud'
  const [searchQuery, setSearchQuery] = useState('Find React developers with hackathon experience');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Full-Stack GenAI Architect",
      college: "IIT Bombay / Computer Science",
      talentScore: 96,
      badges: ["GenAI Pioneer", "Hackathon #1 Winner", "React Master", "FastAPI Expert"],
      authenticityScore: "99.2%",
      githubCommits: "840+ past year",
      projects: ["EcoMeal AI", "DeFi Vulnerability Patching"],
      matchRate: 98
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      role: "ML & Computer Vision Specialist",
      college: "BITS Pilani / AI & Data Science",
      talentScore: 93,
      badges: ["PyTorch Core", "Kaggle Expert", "OpenSource Contributor"],
      authenticityScore: "98.5%",
      githubCommits: "620+ past year",
      projects: ["Rural Tele-triage AI", "FoodLoss-Vision Dataset"],
      matchRate: 94
    },
    {
      id: 3,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "Backend & Systems Engineer",
      college: "Stanford University / CS",
      talentScore: 91,
      badges: ["Rust Specialist", "Distributed Systems", "Hackathon Top 3"],
      authenticityScore: "97.8%",
      githubCommits: "510+ past year",
      projects: ["Smart Contract Auto-Healer"],
      matchRate: 89
    }
  ]);

  // AI Interview Simulator State
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);
  const [interviewTranscript, setInterviewTranscript] = useState([
    { sender: 'AI Evaluator', text: "Hello! Welcome to the AI Technical Assessment for the GenAI Lead role. Let's analyze your project: EcoMeal AI. How did you optimize the YOLOv8 model inference latency for real-time plate segmentation?" }
  ]);
  const [userResponseInput, setUserResponseInput] = useState('');

  // PPT Analyzer State
  const [analyzingPPT, setAnalyzingPPT] = useState(false);
  const [pptScoreReport, setPptScoreReport] = useState({
    innovationScore: 95,
    technicalFeasibility: 92,
    presentationQuality: 90,
    businessPotential: 88,
    overallPitchScore: 92,
    plagiarismCheck: "Clean (0% AI duplication / 100% Original Technical Pitch)",
    summary: "The presentation clearly articulates the pain point in hostel mess food management and provides a solid deep-search backed architectural design using PyTorch and FastAPI.",
    recommendations: [
      "Add a cost breakdown slide for IoT camera deployment across 5 hostel blocks.",
      "Highlight latency benchmarks for low-bandwidth rural clinis / offline sync."
    ]
  });

  const handleRecruiterSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };

  const handleSendAnswer = () => {
    if (!userResponseInput.trim()) return;
    const newTranscript = [
      ...interviewTranscript,
      { sender: 'Candidate', text: userResponseInput }
    ];
    setUserResponseInput('');
    setInterviewTranscript(newTranscript);

    setTimeout(() => {
      let nextQuestion = "Impressive explanation. How do you manage vector search indexing and fallback caching when the rate limit of external LLM APIs is hit?";
      if (interviewStep === 1) {
        nextQuestion = "Thank you! The AI Interview Agent has generated your report. Technical Rating: 9.4/10, Communication Score: 9.2/10. Status: Strongly Recommended for Recruiter Shortlist.";
      }
      setInterviewTranscript(prev => [
        ...prev,
        { sender: 'AI Evaluator', text: nextQuestion }
      ]);
      setInterviewStep(prev => prev + 1);
    }, 1200);
  };

  const triggerAnalyzePPT = () => {
    setAnalyzingPPT(true);
    setTimeout(() => {
      setAnalyzingPPT(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Dual View Persona Switcher */}
      <div className="glass-panel p-4 rounded-2xl border border-indigo-900/50 bg-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                AI Talent Intelligence & Recruitment Ecosystem
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  Verified Skill Graph
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Transform technical achievements, hackathon code, and presentations into a trusted hiring platform.
              </p>
            </div>
          </div>
        </div>

        {/* Persona Segment Control */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 space-x-1">
          <button
            onClick={() => { setActiveRole('candidate'); setActiveSubTab('profile'); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeRole === 'candidate'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Candidate Portal (Student)</span>
          </button>

          <button
            onClick={() => { setActiveRole('recruiter'); setActiveSubTab('search'); }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeRole === 'recruiter'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Recruiter AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar based on active role */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {activeRole === 'candidate' ? (
          <>
            <button
              onClick={() => setActiveSubTab('profile')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeSubTab === 'profile' ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>AI Talent Profile & Score™</span>
            </button>
            <button
              onClick={() => setActiveSubTab('interviews')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeSubTab === 'interviews' ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Interview Agent</span>
            </button>
            <button
              onClick={() => setActiveSubTab('ppt')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeSubTab === 'ppt' ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>AI PPT Deck Analyzer</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveSubTab('search')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeSubTab === 'search' ? 'bg-slate-800 text-purple-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Natural Language Search</span>
            </button>
            <button
              onClick={() => setActiveSubTab('pipeline')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeSubTab === 'pipeline' ? 'bg-slate-800 text-purple-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Hackathon-to-Hiring Pipeline</span>
            </button>
            <button
              onClick={() => setActiveSubTab('fraud')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeSubTab === 'fraud' ? 'bg-slate-800 text-purple-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust & Fraud Detector</span>
            </button>
          </>
        )}
      </div>

      {/* CANDIDATE PROFILE VIEW */}
      {activeRole === 'candidate' && activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Card: Verified Identity & Score */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6 lg:col-span-1">
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Alex Rivera"
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/20 mx-auto"
                />
                <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-slate-950 border-2 border-slate-900">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Alex Rivera</h3>
                <p className="text-xs text-indigo-400 font-semibold">IIT Bombay • CS Senior</p>
                <p className="text-xs text-slate-400 mt-1">Full-Stack GenAI Architect & Hackathon Lead</p>
              </div>

              {/* AI Talent Score Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/30">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest">AI Talent Score™</div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 my-1">
                  96<span className="text-base text-slate-400 font-normal">/100</span>
                </div>
                <div className="flex justify-center space-x-1 text-[11px] text-emerald-400 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Top 1.2% Nationwide Developer</span>
                </div>
              </div>
            </div>

            {/* Verified Skill Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Skill Badges</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> GenAI Orchestration
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" /> Hackathon #1 Winner
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-emerald-400" /> 840+ Verified Commits
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" /> PyTorch / YOLOv8
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Analytics & Projects */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Talent Score Breakdown Analytics
              </h3>
              <p className="text-xs text-slate-400">Automated evaluation derived from GitHub commits, project submissions, and code reviews.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400">Coding Ability</span>
                <div className="text-xl font-bold text-cyan-400 mt-1">98 / 100</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[98%] h-full bg-cyan-400"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400">Project Quality</span>
                <div className="text-xl font-bold text-indigo-400 mt-1">95 / 100</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[95%] h-full bg-indigo-400"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400">Problem Solving</span>
                <div className="text-xl font-bold text-purple-400 mt-1">94 / 100</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[94%] h-full bg-purple-400"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400">Technical Consistency</span>
                <div className="text-xl font-bold text-emerald-400 mt-1">96 / 100</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[96%] h-full bg-emerald-400"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400">Innovation Index</span>
                <div className="text-xl font-bold text-amber-400 mt-1">97 / 100</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[97%] h-full bg-amber-400"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400">Leadership & Teamwork</span>
                <div className="text-xl font-bold text-pink-400 mt-1">92 / 100</div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="w-[92%] h-full bg-pink-400"></div>
                </div>
              </div>
            </div>

            {/* Active Linked Projects */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Linked Hackathon Projects & Code Contributions</h4>
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{projectData?.title || "EcoMeal AI"}</span>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-semibold">Verified Architecture</span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-lg">{projectData?.tagline}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1">
                  <span>View Project</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* AI INTERVIEW AGENT SUB-TAB */}
      {activeRole === 'candidate' && activeSubTab === 'interviews' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                AI Interview Agent Simulator
              </h3>
              <p className="text-xs text-slate-400">Conducts automated technical, behavioral & architecture evaluation using multi-agent LLMs.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Live Evaluator Ready
            </span>
          </div>

          {/* Transcript Box */}
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
            {interviewTranscript.map((msg, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl text-xs space-y-1 ${
                  msg.sender === 'AI Evaluator'
                    ? 'bg-slate-950 border border-indigo-900/50 text-slate-200 ml-0 mr-8'
                    : 'bg-indigo-950/70 border border-indigo-500/40 text-cyan-200 ml-8 mr-0'
                }`}
              >
                <div className="flex items-center justify-between font-semibold text-[11px] text-slate-400 mb-1">
                  <span>{msg.sender}</span>
                  <span>Just now</span>
                </div>
                <p className="leading-relaxed text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* User Input controls */}
          <div className="flex gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={userResponseInput}
              onChange={(e) => setUserResponseInput(e.target.value)}
              placeholder="Type your technical answer or explanation here..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendAnswer()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSendAnswer}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-xs hover:brightness-110 transition flex items-center gap-1"
            >
              <span>Submit Response</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      )}

      {/* AI PPT ANALYZER SUB-TAB */}
      {activeRole === 'candidate' && activeSubTab === 'ppt' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                AI PPT Deck & Presentation Intelligence
              </h3>
              <p className="text-xs text-slate-400">Upload hackathon pitch decks (PDF/PPT) for automated technical scoring and plagiarism detection.</p>
            </div>
            <button
              onClick={triggerAnalyzePPT}
              disabled={analyzingPPT}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Upload className="w-4 h-4" />
              <span>{analyzingPPT ? "Analyzing Slides..." : "Analyze Pitch Deck"}</span>
            </button>
          </div>

          {/* Scores Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Innovation Score</span>
              <div className="text-2xl font-extrabold text-amber-400 mt-1">{pptScoreReport.innovationScore}/100</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Technical Feasibility</span>
              <div className="text-2xl font-extrabold text-cyan-400 mt-1">{pptScoreReport.technicalFeasibility}/100</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Presentation Quality</span>
              <div className="text-2xl font-extrabold text-purple-400 mt-1">{pptScoreReport.presentationQuality}/100</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Overall Pitch Score</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">{pptScoreReport.overallPitchScore}/100</div>
            </div>
          </div>

          {/* Summary & Plagiarism Audit */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">Plagiarism & Fraud Audit:</span>
              <span className="text-emerald-400 font-mono">{pptScoreReport.plagiarismCheck}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
              {pptScoreReport.summary}
            </p>
          </div>
        </div>
      )}

      {/* RECRUITER NATURAL LANGUAGE SEARCH & COPILOT */}
      {activeRole === 'recruiter' && activeSubTab === 'search' && (
        <div className="space-y-6">
          
          {/* Natural Language Search Bar */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-900/40 bg-slate-900/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" />
                Recruiter AI Copilot Search
              </h3>
              <span className="text-xs text-slate-400">Natural language search across GitHub commits, hackathons, and verified skills.</span>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., 'Find top AI developers from IITs with PyTorch hackathon experience'"
                  className="w-full bg-slate-950 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                />
              </div>
              <button
                onClick={handleRecruiterSearch}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:brightness-110 transition shadow-lg shadow-purple-600/20 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Search</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <span className="text-slate-400">Preset Prompt Ideas:</span>
              <button onClick={() => setSearchQuery("Find top AI developers from Delhi")} className="text-purple-300 underline hover:text-white">"Find top AI developers from Delhi"</button>
              <button onClick={() => setSearchQuery("Find React developers with hackathon experience")} className="text-purple-300 underline hover:text-white">"Find React developers with hackathon experience"</button>
              <button onClick={() => setSearchQuery("Find candidates skilled in GenAI and Open Source")} className="text-purple-300 underline hover:text-white">"Find candidates skilled in GenAI and Open Source"</button>
            </div>
          </div>

          {/* Search Candidate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchResults.map((candidate) => (
              <div key={candidate.id} className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 hover:border-purple-500/40 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-xl object-cover border border-purple-500/30" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{candidate.name}</h4>
                      <p className="text-[11px] text-purple-300">{candidate.role}</p>
                      <p className="text-[10px] text-slate-400">{candidate.college}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {candidate.matchRate}% Match
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">AI Talent Score™</span>
                  <span className="font-bold text-cyan-400">{candidate.talentScore} / 100</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {candidate.badges.map((b, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                      {b}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 font-semibold text-xs transition">
                  Shortlist & Request Interview
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* HACKATHON TO HIRING PIPELINE & FRAUD DETECTION */}
      {activeRole === 'recruiter' && activeSubTab === 'pipeline' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Hackathon-to-Hiring Pipeline
              </h3>
              <p className="text-xs text-slate-400">Directly evaluate and hire top performers from university hackathons based on code contributions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-amber-400 font-bold uppercase">Hackathon #1 Rank</span>
              <h4 className="font-bold text-white text-base">EcoMeal AI Team</h4>
              <p className="text-xs text-slate-400">1st Place • Smart Automation & Sustainability</p>
              <div className="pt-2 flex justify-between text-xs text-slate-300">
                <span>Code Commits: 142</span>
                <span className="text-emerald-400">Innovation: 95/100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-cyan-400 font-bold uppercase">Hackathon #2 Rank</span>
              <h4 className="font-bold text-white text-base">Rural Tele-triage AI</h4>
              <p className="text-xs text-slate-400">2nd Place • Healthcare & GenAI</p>
              <div className="pt-2 flex justify-between text-xs text-slate-300">
                <span>Code Commits: 98</span>
                <span className="text-cyan-400">Innovation: 94/100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs text-purple-400 font-bold uppercase">Hackathon #3 Rank</span>
              <h4 className="font-bold text-white text-base">DeFi Auto-Patcher</h4>
              <p className="text-xs text-slate-400">3rd Place • Cybersecurity & Web3</p>
              <div className="pt-2 flex justify-between text-xs text-slate-300">
                <span>Code Commits: 84</span>
                <span className="text-purple-400">Innovation: 91/100</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRUST & FRAUD DETECTION */}
      {activeRole === 'recruiter' && activeSubTab === 'fraud' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Trust & Fraud Prevention System
              </h3>
              <p className="text-xs text-slate-400">Automated verification of certificates, GitHub commit authenticity, and plagiarism detection.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              Active Fraud Guard v3.1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Certificate Verification API</span>
                <span className="text-emerald-400 text-xs font-mono font-bold">100% Cryptographic Match</span>
              </div>
              <p className="text-xs text-slate-400">Verifies university certificates and hackathon winning credentials against tamper-proof ledger hashes.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Plagiarism & Code Clone Audit</span>
                <span className="text-emerald-400 text-xs font-mono font-bold">0% Copied Repositories</span>
              </div>
              <p className="text-xs text-slate-400">Analyzes abstract syntax trees (AST) to distinguish original algorithmic contributions from copied boilerplate.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
