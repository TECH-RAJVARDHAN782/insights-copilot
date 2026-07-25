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
  Award, 
  CheckCircle2, 
  UserCheck, 
  QrCode, 
  Mic, 
  ChevronRight, 
  Clock, 
  RefreshCw, 
  Zap, 
  ArrowLeft,
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function MobileSimulator({ projectData }) {
  const [mobileTab, setMobileTab] = useState('home'); // 'home' | 'search' | 'bot' | 'pass' | 'interview'
  const [deviceType, setDeviceType] = useState('ios'); // 'ios' | 'android'
  
  // Mobile Search state
  const [mobileIdeaInput, setMobileIdeaInput] = useState('');
  const [mobileSearchResult, setMobileSearchResult] = useState(null);
  const [isMobileSearching, setIsMobileSearching] = useState(false);

  // Mobile Agent Chat state
  const [botMessages, setBotMessages] = useState([
    { id: 1, sender: 'bot', text: '👋 Hi Alex! I am your iNSIGHTS WhatsApp Agent. Today\'s EcoMeal AI headcount forecast is 420 meals.', time: '09:15 AM' },
    { id: 2, sender: 'bot', text: '🔔 Reminder: Phase 2 FastAPI endpoints setup is due in 2 days. Reply 1 to review code or 2 to request mentor check.', time: '11:30 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Mobile Voice Interview state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState(false);

  const handleMobileSearch = (queryText) => {
    const textToSearch = queryText || mobileIdeaInput;
    if (!textToSearch.trim()) return;
    setIsMobileSearching(true);
    setTimeout(() => {
      setMobileSearchResult({
        title: textToSearch,
        feasibility: 94,
        citations: 28,
        recommendedStack: ["FastAPI", "YOLOv8", "React", "PostgreSQL"],
        keyGap: "Lack of automated real-time plate segmentation on low-power IoT edge devices."
      });
      setIsMobileSearching(false);
    }, 1000);
  };

  const handleSendBotMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: chatInput, time: 'Just now' };
    setBotMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Got it! I've updated your Project HUB roadmap and notified your mentor. iNSIGHTS Layer 2 DeepSearch is running in background.`,
        time: 'Just now'
      };
      setBotMessages(prev => [...prev, botReply]);
    }, 900);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSuccess(false);
      setTimeout(() => {
        setIsRecording(false);
        setRecordingSuccess(true);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-4">
      
      {/* Device Frame Switcher & Description */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl px-4 gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            iNSIGHTS Companion Mobile App Simulator
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
              iOS & Android Native UI
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Full-blown native mobile app preview with real-time state synchronization, WhatsApp/Telegram agent nudges, and mobile talent identity.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceType('ios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              deviceType === 'ios' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            iPhone 16 Pro
          </button>
          <button
            onClick={() => setDeviceType('android')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              deviceType === 'android' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pixel 9 Pro
          </button>
        </div>
      </div>

      {/* SMARTPHONE DEVICE SHELL */}
      <div className="relative w-[375px] h-[750px] bg-slate-950 rounded-[50px] p-3 shadow-2xl shadow-indigo-500/10 border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
        
        {/* Phone Speaker & Dynamic Island / Notch */}
        {deviceType === 'ios' ? (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-950 border border-indigo-900 animate-pulse"></div>
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-slate-800"></div>
        )}

        {/* Status Bar */}
        <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-40 bg-slate-950/90 backdrop-blur">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Signal className="w-3 h-3 text-slate-200" />
            <Wifi className="w-3 h-3 text-slate-200" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* MOBILE SCREEN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col scrollbar-none px-4 pt-2 pb-16">
          
          {/* SCREEN 1: HOME */}
          {mobileTab === 'home' && (
            <div className="space-y-4">
              
              {/* App Top Header */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h4 className="text-xs text-slate-400">Good Morning,</h4>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-1">
                    Alex Rivera <span className="text-sm">👋</span>
                  </h3>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover border border-cyan-400/50"
                  />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950"></span>
                </div>
              </div>

              {/* Talent Score Widget */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-slate-900 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-200 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Talent Score™
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">VERIFIED</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-white">96</span>
                  <span className="text-xs text-slate-300">/ 100 • Top 1.2%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950/60 rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-gradient-to-r from-cyan-400 to-indigo-400"></div>
                </div>
              </div>

              {/* Active Project Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider">Active Copilot Session</span>
                  <span className="text-slate-400">Phase 2 / 4</span>
                </div>
                <h5 className="font-bold text-white text-sm">{projectData?.title || "EcoMeal AI Hostel Engine"}</h5>
                <p className="text-[11px] text-slate-400 line-clamp-2">{projectData?.tagline}</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-300">
                  <span>Feasibility: <strong className="text-emerald-400">92%</strong></span>
                  <span>Sources: <strong className="text-cyan-400">46 papers</strong></span>
                </div>
              </div>

              {/* Today's WhatsApp Agent Nudge */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Agent Alert
                  </span>
                  <span className="text-[10px] text-slate-400">10m ago</span>
                </div>
                <p className="text-xs text-slate-200">
                  "Daily meal attendance forecast generated: 420 portions. Kitchen batching alert sent to chef."
                </p>
                <button
                  onClick={() => setMobileTab('bot')}
                  className="text-[11px] text-emerald-400 font-semibold underline pt-1 flex items-center gap-1"
                >
                  <span>Open WhatsApp Chat</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          )}

          {/* SCREEN 2: SEARCH */}
          {mobileTab === 'search' && (
            <div className="space-y-4 pt-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                Mobile DeepSearch Intake
              </h4>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={mobileIdeaInput}
                    onChange={(e) => setMobileIdeaInput(e.target.value)}
                    placeholder="Describe student project idea..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  onClick={() => handleMobileSearch()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {isMobileSearching ? "Analyzing arXiv & GitHub..." : "Run Layer 2 DeepSearch"}
                </button>
              </div>

              {/* Sample Quick Tap suggestions */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Quick Suggestions:</span>
                <button
                  onClick={() => { setMobileIdeaInput("AI Food Waste Reduction in Hostels"); handleMobileSearch("AI Food Waste Reduction in Hostels"); }}
                  className="w-full text-left p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-white"
                >
                  🍲 AI Food Waste Reduction in Hostels
                </button>
                <button
                  onClick={() => { setMobileIdeaInput("Rural Tele-triage AI Assistant"); handleMobileSearch("Rural Tele-triage AI Assistant"); }}
                  className="w-full text-left p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-white"
                >
                  🩺 Rural Tele-triage AI Assistant
                </button>
              </div>

              {/* Search Result Output Card */}
              {mobileSearchResult && (
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-cyan-400">DeepSearch Result</span>
                    <span className="text-emerald-400 font-bold">{mobileSearchResult.feasibility}% Feasibility</span>
                  </div>
                  <h5 className="font-bold text-white text-xs">{mobileSearchResult.title}</h5>
                  <p className="text-[11px] text-slate-400">Key Gap: {mobileSearchResult.keyGap}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {mobileSearchResult.recommendedStack.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[9px] bg-indigo-500/20 text-indigo-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCREEN 3: WHATSAPP BOT CHAT */}
          {mobileTab === 'bot' && (
            <div className="flex flex-col h-full space-y-3 pt-1">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">iNSIGHTS WhatsApp Bot</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">Online • Automated Agent</span>
                </div>
              </div>

              {/* Chat Bubble List */}
              <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
                {botMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[85%] p-2.5 rounded-xl text-xs ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-indigo-600 text-white rounded-br-none'
                        : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Message Input Bar */}
              <div className="flex gap-1.5 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendBotMessage()}
                  placeholder="Reply to WhatsApp Agent..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                />
                <button
                  onClick={handleSendBotMessage}
                  className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4: TALENT PASS */}
          {mobileTab === 'pass' && (
            <div className="space-y-4 pt-1 text-center">
              <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Digital Talent Pass & QR
              </h4>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 border border-indigo-500/40 space-y-4">
                <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto shadow-lg flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-950" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-base">Alex Rivera</h5>
                  <p className="text-xs text-cyan-400">ID: IITB-2026-AI-8492</p>
                  <p className="text-[11px] text-slate-400 mt-1">Verified Hackathon Winner Pass</p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-semibold border border-indigo-500/30">
                    Talent Score: 96/100
                  </span>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-semibold border border-emerald-500/30">
                    GitHub: 840+ Commits
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5: AUDIO INTERVIEW */}
          {mobileTab === 'interview' && (
            <div className="space-y-4 pt-1 text-center">
              <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                <Mic className="w-4 h-4 text-purple-400" />
                Mobile AI Audio Assessment
              </h4>

              <div className="p-5 rounded-2xl bg-slate-900 border border-purple-900/50 space-y-4">
                <p className="text-xs text-slate-300">
                  "Explain how your EcoMeal AI model handles real-time plate segmentation under variable hostel cafeteria lighting."
                </p>

                {/* Animated Record Button */}
                <div className="py-4">
                  <button
                    onClick={toggleRecording}
                    className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
                      isRecording
                        ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50 scale-110'
                        : 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30'
                    }`}
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                  <span className="text-[11px] text-slate-400 block mt-2">
                    {isRecording ? "Listening... Speak now" : "Tap Microphone to Speak"}
                  </span>
                </div>

                {recordingSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
                    ✅ Speech Analyzed! Technical Score: 9.6/10. Audio evaluation uploaded to Recruiter Dashboard.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* MOBILE BOTTOM NAVIGATION BAR */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl px-3 py-2 flex items-center justify-around z-40">
          <button
            onClick={() => setMobileTab('home')}
            className={`flex flex-col items-center space-y-0.5 text-[10px] font-semibold transition ${
              mobileTab === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setMobileTab('search')}
            className={`flex flex-col items-center space-y-0.5 text-[10px] font-semibold transition ${
              mobileTab === 'search' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setMobileTab('bot')}
            className={`flex flex-col items-center space-y-0.5 text-[10px] font-semibold transition ${
              mobileTab === 'bot' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setMobileTab('pass')}
            className={`flex flex-col items-center space-y-0.5 text-[10px] font-semibold transition ${
              mobileTab === 'pass' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Talent Pass</span>
          </button>

          <button
            onClick={() => setMobileTab('interview')}
            className={`flex flex-col items-center space-y-0.5 text-[10px] font-semibold transition ${
              mobileTab === 'interview' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Interview</span>
          </button>
        </div>

      </div>

    </div>
  );
}
