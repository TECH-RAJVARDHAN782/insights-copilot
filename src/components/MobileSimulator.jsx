import React, { useState } from 'react';
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles, 
  Send, 
  Bot, 
  Search, 
  Download, 
  Code, 
  Check, 
  ExternalLink,
  ChevronRight, 
  Zap, 
  Database,
  Rocket,
  Presentation,
  Cpu,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MobileSimulator({ projectData, onSearch }) {
  const [mobileTab, setMobileTab] = useState('search'); // 'search' | 'code' | 'bot' | 'arch' | 'pitch'
  const [deviceType, setDeviceType] = useState('ios'); // 'ios' | 'android'
  
  // Mobile Search state
  const [mobileIdeaInput, setMobileIdeaInput] = useState('');
  const [copiedMobileCode, setCopiedMobileCode] = useState(false);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  // Dynamic Mobile WhatsApp Chat
  const [botMessages, setBotMessages] = useState([
    { id: 1, sender: 'bot', text: `👋 Hi Student! I am your mobile iNSIGHTS WhatsApp Assistant. Type any question to get dynamic AI answers!`, time: '09:15 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const projectTitle = projectData?.title || "Custom Student Innovation";

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (!mobileIdeaInput.trim()) return;
    if (onSearch) {
      onSearch(mobileIdeaInput);
    }
  };

  const handleSendBotMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const textSent = chatInput;
    const userMsg = { id: Date.now(), sender: 'user', text: textSent, time: 'Just now' };
    setBotMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReplyText = "";
      const lower = textSent.toLowerCase();

      if (lower.includes('code') || lower.includes('repo') || lower.includes('download')) {
        botReplyText = `🚀 Code Repo for "${projectTitle}": insights-copilot/${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-starter. Connected to Live MongoDB Atlas!`;
      } else if (lower.includes('score') || lower.includes('feasibility') || lower.includes('impact')) {
        botReplyText = `📊 Feasibility Score: ${projectData?.problemValidation?.feasibilityScore || 94}/100. Innovation Score: ${projectData?.problemValidation?.innovationScore || 96}/100.`;
      } else if (lower.includes('mongodb') || lower.includes('db') || lower.includes('database')) {
        botReplyText = `🍃 MongoDB Atlas Status: CONNECTED (aws-iad1-shard-0). Collections: daily_logs, rsvp_records, kitchen_batches.`;
      } else {
        botReplyText = `🤖 Received "${textSent}" for "${projectTitle}". DeepSearch processed request with 94.6% accuracy SLA!`;
      }

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText,
        time: 'Just now'
      };
      setBotMessages(prev => [...prev, botReply]);
      setIsTyping(false);
      confetti({ particleCount: 25, spread: 40 });
    }, 800);
  };

  const handleDownloadMobileZip = () => {
    const sampleCode = `// Readymade Mobile Starter File for ${projectTitle}\n// Connected to Live MongoDB Atlas Cluster\n\nconst mongoose = require('mongoose');\nconsole.log("Ready-to-use project loaded!");`;
    const element = document.createElement("a");
    const file = new Blob([sampleCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_starter.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setCopiedMobileCode(true);
    setTimeout(() => setCopiedMobileCode(false), 2000);
    confetti({ particleCount: 35, spread: 50 });
  };

  const mobileSlides = [
    { title: "Vision Statement", text: projectData?.tagline || "AI-powered innovation engine." },
    { title: "Problem Gap", text: projectData?.problemValidation?.marketGap || "Unverified execution timelines." },
    { title: "Tech Stack", text: `React 18 + Node.js + Live MongoDB Atlas + Python FastAPI.` },
    { title: "Feasibility Score", text: `Feasibility: ${projectData?.problemValidation?.feasibilityScore || 94}/100 | Impact: 98/100.` }
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-2">
      
      {/* Device Switcher Header */}
      <div className="flex items-center justify-between w-full max-w-sm px-2">
        <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-bold">
          <Smartphone className="w-4 h-4 text-cyan-400" />
          <span>Student Companion Mobile App</span>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setDeviceType('ios')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
              deviceType === 'ios' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            iPhone
          </button>
          <button
            onClick={() => setDeviceType('android')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
              deviceType === 'android' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Android
          </button>
        </div>
      </div>

      {/* SMARTPHONE DEVICE SHELL */}
      <div className="relative w-[360px] h-[720px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
        
        {/* Notch / Dynamic Island */}
        {deviceType === 'ios' ? (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
            <div className="w-2 h-2 rounded-full bg-slate-900"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-950 animate-pulse"></div>
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 border border-slate-800"></div>
        )}

        {/* Top Status Bar */}
        <div className="pt-3 px-5 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-40 bg-slate-950/90">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Signal className="w-3 h-3 text-slate-200" />
            <Wifi className="w-3 h-3 text-slate-200" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* MOBILE SCREEN CONTENT */}
        <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col scrollbar-none px-3.5 pt-2 pb-16">
          
          {/* TAB 1: MOBILE SEARCH AI */}
          {mobileTab === 'search' && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              
              {/* App Brand Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-xs">
                    iN
                  </div>
                  <span className="font-extrabold text-sm text-white">iNSIGHTS<span className="text-cyan-400">.mobile</span></span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 font-mono">
                  LIVE MONGODB
                </span>
              </div>

              {/* Mobile Search Bar */}
              <form onSubmit={handleMobileSubmit} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={mobileIdeaInput}
                    onChange={(e) => setMobileIdeaInput(e.target.value)}
                    placeholder="Search any project topic..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Search AI Project Solution</span>
                </button>
              </form>

              {/* Display Result if Project Data Active */}
              {projectData ? (
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-cyan-300">Active Search Result</span>
                    <span className="text-emerald-400 font-bold">{projectData.problemValidation.feasibilityScore}% Feasibility</span>
                  </div>
                  
                  <h5 className="font-bold text-white text-xs leading-snug">{projectData.title}</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{projectData.tagline}</p>

                  <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-300 font-mono">
                    <span>DB: Live MongoDB Atlas</span>
                    <span>Citations: {projectData.deepSearch.citations.length} sources</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                  <Search className="w-8 h-8 text-cyan-400 mx-auto" />
                  <h5 className="text-xs font-bold text-white">No Search Performed Yet</h5>
                  <p className="text-[11px] text-slate-400">Type any project topic above or select a preset on the main dashboard to generate your AI solution.</p>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: READYMADE CODE */}
          {mobileTab === 'code' && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  Readymade Starter Code
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono">100% Ready</span>
              </div>

              {projectData ? (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h5 className="font-bold text-white text-xs">{projectData.title} Code Package</h5>
                  <p className="text-[11px] text-slate-300">{projectData.tagline}</p>
                  
                  <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[10px] text-emerald-300 border border-slate-800">
                    <code>git clone {projectData.githubRepos[0]?.name || "insights-copilot/starter"}.git</code>
                  </div>

                  <button
                    onClick={handleDownloadMobileZip}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {copiedMobileCode ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copiedMobileCode ? "Downloaded Starter Zip!" : "Download Mobile Starter Code"}</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                  <Code className="w-8 h-8 text-indigo-400 mx-auto" />
                  <p className="text-[11px] text-slate-400">Search for a project to view and download readymade code repositories.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WHATSAPP BOT */}
          {mobileTab === 'bot' && (
            <div className="flex flex-col h-full space-y-3 pt-1 animate-fadeIn">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">iNSIGHTS WhatsApp Assistant</h4>
                  <span className="text-[9px] text-emerald-400 font-semibold">Online • Live Webhook</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                {botMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[88%] p-2.5 rounded-xl text-[11px] ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-emerald-700 text-white rounded-br-none'
                        : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-0.5">{msg.time}</span>
                  </div>
                ))}
                {isTyping && (
                  <div className="p-2 rounded-xl bg-slate-900 text-[10px] text-emerald-400 animate-pulse flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>WhatsApp Bot is typing response...</span>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendBotMessage} className="flex gap-1.5 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message to WhatsApp Bot..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: ARCHITECTURE & MONGO */}
          {mobileTab === 'arch' && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                Mobile Architecture & Live MongoDB
              </h4>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-bold">MongoDB Atlas Live Vault</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">CONNECTED</span>
                </div>
                <p className="text-[11px] text-slate-300">Cluster: aws-iad1-shard-0 | Query Latency: 18ms</p>
                <div className="p-2 rounded-lg bg-slate-950 text-[10px] text-cyan-300 font-mono">
                  Collections: daily_logs, rsvp_records, kitchen_batches
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">System Pipeline Nodes:</span>
                {(projectData?.architecture?.nodes || [
                  { label: "Data Sensor Intake", type: "Input" },
                  { label: "DeepSearch AI Synthesizer", type: "AI Engine" },
                  { label: "Live MongoDB Atlas Vault", type: "Database" }
                ]).map((node, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between items-center">
                    <span className="font-bold text-white">{node.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">{node.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PITCH DECK SLIDES */}
          {mobileTab === 'pitch' && (
            <div className="space-y-4 pt-1 animate-fadeIn text-center">
              <h4 className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                <Presentation className="w-4 h-4 text-purple-400" />
                Mobile Pitch Deck Viewer
              </h4>

              <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-3">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300">
                  Slide {mobileSlideIndex + 1} of {mobileSlides.length}
                </span>
                <h5 className="font-bold text-white text-xs">{mobileSlides[mobileSlideIndex].title}</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed italic">"{mobileSlides[mobileSlideIndex].text}"</p>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setMobileSlideIndex(prev => Math.max(0, prev - 1))}
                    disabled={mobileSlideIndex === 0}
                    className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300 disabled:opacity-40"
                  >
                    Prev Slide
                  </button>
                  <button
                    onClick={() => setMobileSlideIndex(prev => Math.min(mobileSlides.length - 1, prev + 1))}
                    disabled={mobileSlideIndex === mobileSlides.length - 1}
                    className="px-3 py-1 rounded bg-purple-600 text-xs text-white disabled:opacity-40"
                  >
                    Next Slide
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* CLEAN 5-BUTTON DYNAMIC MOBILE BOTTOM NAVIGATION BAR */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl px-2 py-2 flex items-center justify-around z-40">
          <button
            onClick={() => setMobileTab('search')}
            className={`flex flex-col items-center space-y-0.5 text-[9px] font-bold transition cursor-pointer ${
              mobileTab === 'search' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setMobileTab('code')}
            className={`flex flex-col items-center space-y-0.5 text-[9px] font-bold transition cursor-pointer ${
              mobileTab === 'code' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>

          <button
            onClick={() => setMobileTab('bot')}
            className={`flex flex-col items-center space-y-0.5 text-[9px] font-bold transition cursor-pointer ${
              mobileTab === 'bot' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setMobileTab('arch')}
            className={`flex flex-col items-center space-y-0.5 text-[9px] font-bold transition cursor-pointer ${
              mobileTab === 'arch' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MongoDB</span>
          </button>

          <button
            onClick={() => setMobileTab('pitch')}
            className={`flex flex-col items-center space-y-0.5 text-[9px] font-bold transition cursor-pointer ${
              mobileTab === 'pitch' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Pitch</span>
          </button>
        </div>

      </div>

    </div>
  );
}
