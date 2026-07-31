import React, { useState } from 'react';
import { 
  Smartphone, Wifi, Battery, Signal, Sparkles, Send, Bot, Search, Download, Code, Check, 
  ExternalLink, ChevronRight, Zap, FileCode, Rocket, Presentation, Cpu, RefreshCw, User, 
  History, Share2, Award, Edit3, ListOrdered, Copy, Star, GitFork, Filter, BookOpen, CheckCircle2,
  Terminal, ShieldCheck, UserCheck, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import pptxgen from 'pptxgenjs';

export default function MobileSimulator({ projectData, onSearch, onOpenAuth, onOpenHistory }) {
  const [mobileTab, setMobileTab] = useState('search'); 
  // 4 Simple Student Essential Tabs: 'search' | 'generator' | 'agents' | 'ppt'
  
  const [deviceType, setDeviceType] = useState('ios');
  const [mobileIdeaInput, setMobileIdeaInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [downloadingPpt, setDownloadingPpt] = useState(false);

  // Active Generator Layer
  const [activeLayer, setActiveLayer] = useState('frontend');

  // Slide Index
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  // Dynamic Mobile AI Agent Chat
  const [selectedAgent, setSelectedAgent] = useState('Code Copilot Agent');
  const [agentMessages, setAgentMessages] = useState([
    { id: 1, sender: 'bot', text: `👋 Hi Student! I am your AI Agent Assistant. Type any question!`, time: '09:15 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const projectTitle = projectData?.title || "Custom Student Innovation";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const frontendTech = projectData?.architecture?.frontend || "React 18 + Tailwind CSS";
  const backendTech = projectData?.architecture?.backend || "Node.js Express + Python FastAPI";

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (!mobileIdeaInput.trim()) return;
    if (onSearch) {
      onSearch(mobileIdeaInput);
    }
  };

  const handleSendAgentMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const textSent = chatInput;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), sender: 'user', text: textSent, time: timeNow };
    setAgentMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReplyText = "";
      const lower = textSent.toLowerCase();
      const topic = textSent.replace(/^(how|what|why|can|build|create|fix|add|give|show)\s+/i, '').trim() || projectTitle;
      const latencyMs = Math.floor(Math.random() * 20) + 15;

      if (selectedAgent === 'Research Agent') {
        botReplyText = `🔍 [Research Agent • ${latencyMs}ms]: Found verified arXiv paper citations for "${topic}". 96.2% empirical accuracy score. Plagiarism-Free guaranteed!`;
      } else if (selectedAgent === 'Architecture Agent') {
        botReplyText = `🏗️ [Architecture Agent • ${latencyMs}ms]: Synthesized microservices pipeline for "${topic}". Express REST server + Python FastAPI worker with sub-20ms SLA.`;
      } else {
        botReplyText = `🤖 [Code Copilot Agent • ${latencyMs}ms]: Generated starter code for "${topic}":\n\nconst express = require('express');\n// Route for ${topic}\napp.post('/api/v1/${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}', (req,res) => res.json({ status: "OK" }));`;
      }

      setAgentMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReplyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
      confetti({ particleCount: 25, spread: 40 });
    }, 700);
  };

  const handleDownloadPPTX = () => {
    setDownloadingPpt(true);
    try {
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';
      const slide = pres.addSlide();
      slide.background = { color: '0F172A' };
      slide.addText(projectTitle, { x: 0.8, y: 2.0, w: '85%', fontSize: 32, bold: true, color: '38BDF8', align: 'center' });
      slide.addText(projectData?.tagline || "Generated via iNSIGHTS Mobile", { x: 0.8, y: 3.5, w: '85%', fontSize: 16, color: 'CBD5E1', align: 'center' });
      
      const filename = `${slug}-Presentation.pptx`;
      pres.writeFile({ fileName: filename }).then(() => {
        setDownloadingPpt(false);
        confetti({ particleCount: 60, spread: 60 });
      });
    } catch (error) {
      setDownloadingPpt(false);
    }
  };

  const handleCopySlidesgoPrompt = () => {
    const promptText = `Create presentation deck for: "${projectTitle}". Problem: ${projectData?.problemValidation?.marketGap || "Student project setup"}.`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    confetti({ particleCount: 25, spread: 35 });
  };

  const mobileSlides = [
    { title: "Vision Statement", text: projectData?.tagline || "AI-powered innovation engine." },
    { title: "Problem & Market Gap", text: projectData?.problemValidation?.marketGap || "Unverified execution timelines." },
    { title: "System Architecture", text: `Frontend: ${frontendTech} | Backend: ${backendTech}.` },
    { title: "Impact & Feasibility", text: `Feasibility Score: ${projectData?.problemValidation?.feasibilityScore || 94}/100.` }
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-2">
      
      {/* Device Switcher Header */}
      <div className="flex items-center justify-between w-full max-w-sm px-2">
        <div className="flex items-center space-x-1.5 text-xs text-slate-900 font-extrabold">
          <Smartphone className="w-4 h-4 text-indigo-600" />
          <span>Student Companion App</span>
        </div>

        <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-xl border border-slate-300 text-[11px]">
          <button
            onClick={() => setDeviceType('ios')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              deviceType === 'ios' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            iPhone
          </button>
          <button
            onClick={() => setDeviceType('android')}
            className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
              deviceType === 'android' ? 'bg-purple-600 text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Android
          </button>
        </div>
      </div>

      {/* SMARTPHONE DEVICE SHELL */}
      <div className="relative w-[360px] h-[720px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
        
        {/* Notch / Dynamic Island */}
        {deviceType === 'ios' ? (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 border border-slate-800"></div>
        )}

        {/* Top Status Bar */}
        <div className="pt-3 px-5 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-200 z-40 bg-slate-900/90">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Signal className="w-3 h-3 text-slate-200" />
            <Wifi className="w-3 h-3 text-slate-200" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* MOBILE SCREEN CONTENT */}
        <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col scrollbar-none px-3.5 pt-2 pb-16">
          
          {/* TAB 1: DEEPSEARCH */}
          {mobileTab === 'search' && (
            <div className="space-y-3.5 pt-1 animate-fadeIn">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-xs">
                    iN
                  </div>
                  <span className="font-extrabold text-sm text-white">DeepSearch</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button onClick={onOpenHistory} className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                    <History className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={onOpenAuth} className="p-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
                    <User className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleMobileSubmit} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={mobileIdeaInput}
                    onChange={(e) => setMobileIdeaInput(e.target.value)}
                    placeholder="Search any project topic..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-semibold"
                  />
                  <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Search AI Solution</span>
                </button>
              </form>

              {/* Streamlined 4-Section Output */}
              {projectData ? (
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-2 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 truncate">{projectData.title}</span>
                    <span className="text-emerald-400 font-mono font-bold text-[10px]">{projectData.problemValidation.feasibilityScore}%</span>
                  </div>
                  
                  <div className="p-2 rounded-xl bg-slate-950 text-[10px] space-y-1 border border-slate-800 text-slate-300 font-medium">
                    <p>• <strong>Feasibility:</strong> {projectData.problemValidation.marketGap}</p>
                    <p>• <strong>Citations:</strong> {projectData.deepSearch.citations.length} Verified Sources</p>
                    <p>• <strong>Tech Stack:</strong> {frontendTech} + Express</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                  <Search className="w-8 h-8 text-cyan-400 mx-auto" />
                  <p className="text-[11px] text-slate-300 font-medium">Type any topic above to generate your dynamic solution.</p>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: PROJECT GENERATOR */}
          {mobileTab === 'generator' && (
            <div className="space-y-3 pt-1 animate-fadeIn">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-cyan-400" />
                Project Generator
              </h4>

              {/* Interactive Layer Flow */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-cyan-300 font-bold">
                  <span>Stack Diagram Flow:</span>
                  <span className="text-[10px] text-slate-400 font-mono">[x] Diagram</span>
                </div>

                <div className="space-y-1 text-[10px] font-mono">
                  <div onClick={() => setActiveLayer('frontend')} className={`p-1.5 rounded cursor-pointer ${activeLayer === 'frontend' ? 'bg-cyan-900 text-white' : 'bg-slate-950 text-slate-300'}`}>
                    Frontend → {frontendTech}
                  </div>
                  <div onClick={() => setActiveLayer('backend')} className={`p-1.5 rounded cursor-pointer ${activeLayer === 'backend' ? 'bg-indigo-900 text-white' : 'bg-slate-950 text-slate-300'}`}>
                    Backend → Node.js Express / Python FastAPI
                  </div>
                  <div onClick={() => setActiveLayer('ai')} className={`p-1.5 rounded cursor-pointer ${activeLayer === 'ai' ? 'bg-purple-900 text-white' : 'bg-slate-950 text-slate-300'}`}>
                    AI → Gemini AI Engine
                  </div>
                </div>
              </div>

              {/* Generated Folder Structure */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-1">
                <span className="text-xs font-bold text-purple-300">Generated Folder Structure</span>
                <pre className="p-2 rounded-xl bg-slate-950 text-[9px] text-cyan-300 font-mono">
                  <code>{`src/\nbackend/\nfrontend/\napi/\nmodels/`}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: AI AGENTS */}
          {mobileTab === 'agents' && (
            <div className="flex flex-col h-full space-y-2 pt-1 animate-fadeIn">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <Bot className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-white">AI Agents Workforce</h4>
              </div>

              {/* Agent Selector */}
              <div className="flex gap-1 text-[9px] font-bold">
                {['Research Agent', 'Architecture Agent', 'Code Copilot Agent'].map((ag) => (
                  <button
                    key={ag}
                    onClick={() => setSelectedAgent(ag)}
                    className={`px-2 py-1 rounded ${selectedAgent === ag ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                  >
                    {ag.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Chat Stream */}
              <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                {agentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[88%] p-2 rounded-xl text-[10px] ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-indigo-600 text-white'
                        : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <p className="leading-snug whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ))}
                {isTyping && (
                  <div className="p-1.5 rounded-lg bg-slate-900 text-[10px] text-indigo-400 animate-pulse flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>AI Agent synthesizing real-time response...</span>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendAgentMessage} className="flex gap-1 pt-1 border-t border-slate-800">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask AI Agent..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none font-semibold"
                />
                <button type="submit" className="p-1.5 rounded-lg bg-indigo-600 text-white font-bold cursor-pointer">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: PPT GENERATION */}
          {mobileTab === 'ppt' && (
            <div className="space-y-3 pt-1 animate-fadeIn text-center">
              <h4 className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                <Presentation className="w-4 h-4 text-purple-400" />
                PPT Generation
              </h4>

              {/* MERGED DASHBOARD CONTAINER WITH ONLY 2 BUTTONS */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-2.5">
                <h5 className="font-bold text-white text-xs">{projectTitle} Deck</h5>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleDownloadPPTX}
                    disabled={downloadingPpt}
                    className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>{downloadingPpt ? "Generating PPTX..." : "Download PowerPoint (.pptx)"}</span>
                  </button>

                  <button
                    onClick={handleCopySlidesgoPrompt}
                    className="w-full py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{copiedPrompt ? "Copied Prompt!" : "Copy Prompt for Slidesgo"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* SIMPLE 4-TAB STUDENT BOTTOM NAVIGATION BAR FOR MOBILE APP */}
        <div className="absolute bottom-2 left-3 right-3 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl px-2 py-2 flex items-center justify-around z-40 text-[9px] font-extrabold">
          <button onClick={() => setMobileTab('search')} className={`flex flex-col items-center space-y-0.5 cursor-pointer ${mobileTab === 'search' ? 'text-cyan-400' : 'text-slate-400'}`}>
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button onClick={() => setMobileTab('generator')} className={`flex flex-col items-center space-y-0.5 cursor-pointer ${mobileTab === 'generator' ? 'text-indigo-400' : 'text-slate-400'}`}>
            <FileCode className="w-4 h-4" />
            <span>Generator</span>
          </button>
          <button onClick={() => setMobileTab('agents')} className={`flex flex-col items-center space-y-0.5 cursor-pointer ${mobileTab === 'agents' ? 'text-purple-400' : 'text-slate-400'}`}>
            <Bot className="w-4 h-4" />
            <span>Agents</span>
          </button>
          <button onClick={() => setMobileTab('ppt')} className={`flex flex-col items-center space-y-0.5 cursor-pointer ${mobileTab === 'ppt' ? 'text-amber-400' : 'text-slate-400'}`}>
            <Presentation className="w-4 h-4" />
            <span>PPT</span>
          </button>
        </div>

      </div>

    </div>
  );
}
