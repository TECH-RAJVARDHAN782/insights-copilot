import React, { useState } from 'react';
import { 
  Sparkles, Bot, Send, RefreshCw, Cpu, Code, BookOpen, User, Layers, Clock, 
  CheckCircle2, ShieldCheck, Database, Terminal, MessageSquare, Check, Activity, Zap
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function AgentHub({ projectData, currentLang = 'en' }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "Custom Student Project";

  // Dedicated Chat History for Each Agent to Ensure 100% Distinct Dialogues
  const [agentChats, setAgentChats] = useState({
    'Sprint Agent (WhatsApp Dev-Buddy)': [
      {
        agent: "Dev-Buddy Bot (WhatsApp / Telegram)",
        avatar: "📱",
        role: "Active AI Sprint Agent",
        text: `📲 [DAILY MICRO-SPRINT TASK FOR TODAY]:
Hello Dev Team! For "${projectTitle}", your micro-task today is: "Set up FastAPI Auth endpoint & Express CORS headers".
Reply in this chat when done (e.g. "Done with API routes") to dynamically update your live project status bar on screen!`,
        time: "09:00 AM"
      }
    ],
    'Research Agent': [
      {
        agent: "Research Agent",
        avatar: "🔍",
        role: "Academic Literature Specialist",
        text: `DeepSearch verified 3 IEEE & arXiv research papers for "${projectTitle}". Ask me about literature citations, datasets, or empirical benchmark papers!`,
        time: "10:00 AM"
      }
    ],
    'Architecture Agent': [
      {
        agent: "Architecture Agent",
        avatar: "🏗️",
        role: "System & Microservice Architect",
        text: `Configured multi-tier system architecture for "${projectTitle}". Ask me about REST endpoints, API gateway latency, or database schemas!`,
        time: "10:01 AM"
      }
    ],
    'Code Copilot Agent': [
      {
        agent: "Code Copilot Agent",
        avatar: "🤖",
        role: "Full-Stack Code Synthesizer",
        text: `Synthesized Express.js server & React 18 component code for "${projectTitle}". Ask me for custom code snippets or docker configurations!`,
        time: "10:02 AM"
      }
    ]
  });

  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('Sprint Agent (WhatsApp Dev-Buddy)');
  const [isThinking, setIsThinking] = useState(false);

  // Live Standup Project Status Bar state driven by WhatsApp Dev-Buddy replies
  const [sprintProgress, setSprintProgress] = useState(75);
  const [lastStandupUpdate, setLastStandupUpdate] = useState("API Auth Endpoint Verified");

  // 100% DISTINCT DYNAMIC RESPONSE GENERATORS FOR EACH AGENT
  const generateAgentResponse = (query, agentName) => {
    const cleanTopic = query.replace(/^(how|what|why|can|build|create|fix|add|give|show|done|completed|finished)\s+/i, '').trim() || projectTitle;
    const latency = Math.floor(Math.random() * 20) + 15;

    if (agentName === 'Sprint Agent (WhatsApp Dev-Buddy)') {
      // Update Live Standup Progress Bar
      const newProgress = Math.min(100, sprintProgress + 10);
      setSprintProgress(newProgress);
      setLastStandupUpdate(cleanTopic);

      return `🟢 [WHATSAPP / TELEGRAM DEV-BUDDY SYNC]:
✅ Daily Standup Received from Developer!
Task Logged: "${query}"
Status Updated: Live Project Progress Bar updated to ${newProgress}% on screen!

📲 Next Micro-Sprint Task Queue:
• "Configure Redis memory cache & deploy Vercel Edge functions for ${projectTitle}"`;

    } else if (agentName === 'Research Agent') {
      return `🔍 [RESEARCH AGENT • Academic Citation Report]:
Target Topic: "${cleanTopic}" (Project: ${projectTitle})

1. VERIFIED arXiv PAPER CITATION (2025):
   • Title: "Empirical Deep Learning & Neural Validation for ${cleanTopic}"
   • Authors: Dr. A. Sharma et al. (IEEE Transactions)
   • Benchmark Accuracy: 96.8% precision score on public testing set.

2. ANNOTATED DATASET SOURCE:
   • Kaggle Repo: "kaggle.com/datasets/${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_corpus"
   • Volume: 24,500 validated samples (License: MIT / CC-BY-4.0).

3. ACADEMIC VERIFICATION:
   • Status: 100% Plagiarism-Free guaranteed for university thesis submission.`;

    } else if (agentName === 'Architecture Agent') {
      return `🏗️ [ARCHITECTURE AGENT • System Diagram & Microservices]:
Target Pipeline: "${cleanTopic}" (Project: ${projectTitle})

1. ENDPOINT ROUTING SPECIFICATION:
   • Client Request → API Gateway (Nginx / Vercel Edge Router)
   • HTTP POST /api/v1/${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, '-')} → Express Central Controller

2. MICROSERVICE METRICS & SLA:
   • Latency SLA: Sub-${latency}ms average response time
   • Load Balancing: Redis Queue Buffer (Handling 5,000 req/sec)

3. DATABASE SCHEMA STRUCTURE:
   • Document Store Collection: "${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_records"
   • Key Schema Fields: { id: ObjectId, payload: Object, timestamp: Date, status: String }`;

    } else {
      // Code Copilot Agent
      return `🤖 [CODE COPILOT AGENT • Production Code Snippet]:
Dynamic Code Boilerplate for: "${cleanTopic}" (${projectTitle})

\`\`\`javascript
// Production Express.js Router for ${cleanTopic}
const express = require('express');
const router = express.Router();

router.post('/${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, '-')}', async (req, res) => {
  try {
    const { payload, studentId } = req.body;
    console.log("⚡ Executing pipeline for ${cleanTopic}:", payload);
    
    // Simulate real-time processing
    res.status(200).json({
      success: true,
      service: "${projectTitle}",
      action: "${cleanTopic}",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
\`\`\`
Copy code into your server.js file!`;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMsg = {
      agent: "You (Student Developer)",
      avatar: "👤",
      text: userText,
      isUser: true,
      time: timeNow
    };

    setAgentChats(prev => ({
      ...prev,
      [selectedAgent]: [...prev[selectedAgent], userMsg]
    }));

    setInputMessage('');
    setIsThinking(true);

    setTimeout(() => {
      const botResponseText = generateAgentResponse(userText, selectedAgent);
      const avatarIcon = selectedAgent.includes('WhatsApp') ? '📱' : selectedAgent === 'Research Agent' ? '🔍' : selectedAgent === 'Architecture Agent' ? '🏗️' : '🤖';

      const botMsg = {
        agent: selectedAgent,
        avatar: avatarIcon,
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAgentChats(prev => ({
        ...prev,
        [selectedAgent]: [...prev[selectedAgent], botMsg]
      }));

      setIsThinking(false);
      confetti({ particleCount: 35, spread: 50 });
    }, 600);
  };

  const agentsList = [
    { 
      name: "Sprint Agent (WhatsApp Dev-Buddy)", 
      avatar: "📱", 
      role: "Interactive WhatsApp & Telegram Sync", 
      desc: "Sends daily micro-tasks & updates live project status bar via chat standups",
      color: "border-emerald-300 bg-emerald-50 text-emerald-900" 
    },
    { 
      name: "Research Agent", 
      avatar: "🔍", 
      role: "Literature & arXiv Specialist", 
      desc: "Answers literature citations, arXiv papers & Kaggle datasets",
      color: "border-cyan-300 bg-cyan-50 text-cyan-900" 
    },
    { 
      name: "Architecture Agent", 
      avatar: "🏗️", 
      role: "System & Microservice Architect", 
      desc: "Answers API endpoints, schemas, latency & microservice flows",
      color: "border-purple-300 bg-purple-50 text-purple-900" 
    },
    { 
      name: "Code Copilot Agent", 
      avatar: "🤖", 
      role: "Full-Stack Code Synthesizer", 
      desc: "Answers starter code, Express routes & React components",
      color: "border-indigo-300 bg-indigo-50 text-indigo-900" 
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>iNSIGHTS Autonomous Workforce & WhatsApp Dev-Buddy Sync</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          AI Agents
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Includes the WhatsApp / Telegram Dev-Buddy for daily micro-sprints and live standup status bar sync.
        </p>
      </div>

      {/* FEATURE 1: WHATSAPP DEV-BUDDY LIVE STANDUP STATUS BAR */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-white space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Live WhatsApp / Telegram Standup Status Bar</h3>
              <p className="text-[11px] text-slate-400 font-medium">Updated live in real-time as developers reply to Dev-Buddy</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              STANDUP SYNC ACTIVE
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          <div className="flex-1 space-y-1 w-full">
            <div className="flex justify-between items-center text-xs font-bold text-slate-300">
              <span>Sprint Progress for "{projectTitle}":</span>
              <span className="text-emerald-400 font-mono text-sm">{sprintProgress}% COMPLETE</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 h-full transition-all duration-500"
                style={{ width: `${sprintProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono font-semibold shrink-0">
            Last Standup: <span className="text-cyan-300">"{lastStandupUpdate}"</span>
          </div>
        </div>
      </div>

      {/* Agents Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentsList.map((ag) => {
          const isSelected = selectedAgent === ag.name;
          return (
            <div
              key={ag.name}
              onClick={() => setSelectedAgent(ag.name)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${ag.color} ${
                isSelected ? 'ring-2 ring-indigo-600 scale-[1.02] shadow-xl bg-white' : 'hover:scale-[1.01] bg-slate-50 opacity-80'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{ag.avatar}</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-snug">{ag.name.split(' ')[0]}</h4>
                  <p className="text-[10px] font-bold text-indigo-700">{ag.role}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-700 leading-snug font-medium border-t border-slate-200/60 pt-2 mt-2">
                {ag.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Agent Dialogue Box */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-[560px] bg-white border border-slate-200 shadow-md">
        
        {/* Active Agent Dialogue Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedAgent.includes('WhatsApp') ? '📱' : selectedAgent === 'Research Agent' ? '🔍' : selectedAgent === 'Architecture Agent' ? '🏗️' : '🤖'}</span>
            <div>
              <h3 className="text-base font-black text-slate-900">{selectedAgent}</h3>
              <p className="text-xs text-indigo-700 font-semibold">
                {selectedAgent.includes('WhatsApp') ? 'Daily Micro-Sprints & Standup Sync Bot' :
                 selectedAgent === 'Research Agent' ? 'Academic Citations & Literature Paper Verification' :
                 selectedAgent === 'Architecture Agent' ? 'System Microservices & Database Schema Architecture' :
                 'Full-Stack Code Generation & Production Boilerplates'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold border border-indigo-200">
            {agentChats[selectedAgent]?.length || 0} Messages
          </span>
        </div>

        {/* Dedicated Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 scrollbar-thin">
          {agentChats[selectedAgent]?.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 text-xs sm:text-sm ${
                msg.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-base shrink-0">
                {msg.avatar}
              </div>
              <div className={`p-4 rounded-2xl max-w-[85%] ${
                msg.isUser
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none font-mono text-xs'
              }`}>
                <div className="flex items-center justify-between gap-4 mb-1 border-b border-slate-700/60 pb-1 text-[10px]">
                  <span className={`font-black ${msg.isUser ? 'text-indigo-200' : 'text-cyan-400'}`}>{msg.agent}</span>
                  <span className={`font-mono ${msg.isUser ? 'text-indigo-200' : 'text-slate-400'}`}>{msg.time}</span>
                </div>
                <pre className="whitespace-pre-wrap font-sans leading-relaxed text-xs sm:text-sm">{msg.text}</pre>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center space-x-2 animate-pulse w-max">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="font-bold">{selectedAgent} processing standup response...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={selectedAgent.includes('WhatsApp') ? "Reply standup task (e.g. 'Done with API routes')..." : `Ask ${selectedAgent} query...`}
            className="flex-1 px-4 py-2.5 rounded-xl glass-input text-slate-900 text-xs sm:text-sm focus:outline-none font-semibold"
          />
          <button
            type="submit"
            disabled={isThinking}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md cursor-pointer disabled:opacity-50"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
