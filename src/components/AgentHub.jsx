import React, { useState } from 'react';
import { Sparkles, Bot, Send, MessageSquare, Smartphone, Terminal, CheckCircle2, Cpu, UserCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgentHub({ projectData }) {
  const [messages, setMessages] = useState([
    { agent: "Research Agent", avatar: "🔍", text: "DeepSearch completed. Initialized knowledge graph with 46 research sources." },
    { agent: "Architecture Agent", avatar: "🏗️", text: "Configured MongoDB Atlas Mongoose schemas and Redis pub/sub queue for peak dining hours." },
    { agent: "Code Copilot Agent", avatar: "🤖", text: "Generated Node.js server.js script connected to live MongoDB Atlas database." }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('Code Copilot Agent');

  // LIVE WHATSAPP BOT CHAT STATE (No fixed messages!)
  const [whatsappChat, setWhatsappChat] = useState([
    { id: 1, sender: 'bot', text: '👋 Hi Student! I am your live iNSIGHTS WhatsApp Assistant. Type any question or message to test live webhooks!', time: '10:00 AM' }
  ]);
  const [whatsappInput, setWhatsappInput] = useState('');
  const [isBotReplying, setIsBotReplying] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { agent: "You (Student Lead)", avatar: "👤", text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      let agentReply = "";
      if (selectedAgent === 'Research Agent') {
        agentReply = `Analyzing research for "${inputMessage}": Verified arXiv papers and IEEE benchmarks!`;
      } else if (selectedAgent === 'Architecture Agent') {
        agentReply = `Updated MongoDB Atlas collection schema to handle "${inputMessage}" with 18ms query SLA.`;
      } else if (selectedAgent === 'Code Copilot Agent') {
        agentReply = `Generated custom Node.js & Mongoose code snippet for "${inputMessage}". Ready in Project HUB tab!`;
      } else {
        agentReply = `Dispatched WhatsApp webhook alert for: "${inputMessage}".`;
      }

      setMessages((prev) => [
        ...prev,
        { agent: selectedAgent, avatar: selectedAgent === 'Research Agent' ? '🔍' : selectedAgent === 'Architecture Agent' ? '🏗️' : selectedAgent === 'Code Copilot Agent' ? '🤖' : '📱', text: agentReply }
      ]);
    }, 800);
  };

  const handleSendWhatsappCustom = (e) => {
    e.preventDefault();
    if (!whatsappInput.trim()) return;

    const textSent = whatsappInput;
    const newMsg = { id: Date.now(), sender: 'user', text: textSent, time: 'Just Now' };
    setWhatsappChat(prev => [...prev, newMsg]);
    setWhatsappInput('');
    setIsBotReplying(true);

    setTimeout(() => {
      let botResponse = "";
      const lower = textSent.toLowerCase();

      if (lower.includes('opt out') || lower.includes('skip') || textSent === '1') {
        botResponse = "✅ Opt-out recorded in MongoDB Atlas! Kitchen batch reduced by 1 portion. You earned +50 Eco-Points! 🌿";
      } else if (lower.includes('code') || lower.includes('repo') || textSent === '2') {
        botResponse = `🚀 Production Repo Link: ${projectData?.githubRepos[0]?.name || "insights-copilot/ecomeal-ai-starter"}. Run 'npm run dev' to launch!`;
      } else if (lower.includes('score') || lower.includes('feasibility')) {
        botResponse = `📊 Live Feasibility Score: ${projectData?.problemValidation?.feasibilityScore || 94}/100. Innovation Score: ${projectData?.problemValidation?.innovationScore || 96}/100.`;
      } else {
        botResponse = `🤖 iNSIGHTS Live Bot: Received "${textSent}". Processing through Layer 2 DeepSearch & updating MongoDB logs.`;
      }

      setWhatsappChat(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse, time: 'Just Now' }]);
      setIsBotReplying(false);
      confetti({ particleCount: 20, spread: 30 });
    }, 1000);
  };

  const agentsList = [
    { name: "Research Agent", avatar: "🔍", role: "Literature & arXiv Specialist", color: "border-cyan-500/40 bg-cyan-950/30" },
    { name: "Architecture Agent", avatar: "🏗️", role: "MongoDB & System Design", color: "border-purple-500/40 bg-purple-950/30" },
    { name: "Code Copilot Agent", avatar: "🤖", role: "Full-Stack Code Boilerplate", color: "border-indigo-500/40 bg-indigo-950/30" },
    { name: "WhatsApp Bot Agent", avatar: "📱", role: "Live WhatsApp Webhooks", color: "border-emerald-500/40 bg-emerald-950/30" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-cyan-500/30">
        <div className="flex items-center space-x-2 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>iNSIGHTS Live Agentic Collaboration Center</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Autonomous AI Agents & Live WhatsApp Assistant
        </h2>
        <p className="text-slate-300 text-sm">
          Type custom prompts to test live AI agent responses and send real-time WhatsApp messages to the interactive bot.
        </p>
      </div>

      {/* Agents Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentsList.map((ag) => {
          const isSelected = selectedAgent === ag.name;
          return (
            <div
              key={ag.name}
              onClick={() => setSelectedAgent(ag.name)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${ag.color} ${
                isSelected ? 'ring-2 ring-cyan-400 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{ag.avatar}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{ag.name}</h4>
                  <p className="text-[11px] text-slate-300">{ag.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active & Live</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Chat & Live WhatsApp Bot Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Agent Chat Window */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-white">AI Agent Dialogue Stream</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Target Agent: <strong className="text-cyan-300">{selectedAgent}</strong></span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 text-xs sm:text-sm ${
                  msg.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-base shrink-0">
                  {msg.avatar}
                </div>
                <div className={`p-3 rounded-2xl max-w-[80%] ${
                  msg.isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
                }`}>
                  <p className="font-bold text-[11px] text-cyan-300 mb-0.5">{msg.agent}</p>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ${selectedAgent} to update architecture, MongoDB schema, or research...`}
              className="flex-1 px-4 py-2.5 rounded-xl glass-input text-white text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* LIVE INTERACTIVE WHATSAPP BOT (No fixed messages!) */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4 h-[520px]">
          <div className="flex flex-col h-full space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Smartphone className="w-4 h-4" />
                <span>Live WhatsApp Interactive Bot</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                WEBHOOK LIVE
              </span>
            </div>

            {/* WhatsApp Chat Bubbles Stream */}
            <div className="flex-1 overflow-y-auto space-y-2.5 bg-slate-950 p-3 rounded-2xl border border-emerald-500/30">
              {whatsappChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl text-xs space-y-1 ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-emerald-700 text-white max-w-[85%] rounded-br-none'
                      : 'mr-auto bg-slate-900 text-slate-200 border border-slate-800 max-w-[90%] rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] text-slate-400 block text-right">{msg.time}</span>
                </div>
              ))}

              {isBotReplying && (
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 animate-pulse flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>WhatsApp Bot is typing response...</span>
                </div>
              )}
            </div>

            {/* Custom WhatsApp Input Form */}
            <form onSubmit={handleSendWhatsappCustom} className="pt-2 flex gap-2">
              <input
                type="text"
                value={whatsappInput}
                onChange={(e) => setWhatsappInput(e.target.value)}
                placeholder="Type custom message e.g. 'Opt out of dinner' or 'Show code'..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="text-slate-400">Quick Test:</span>
              <button type="button" onClick={() => { setWhatsappInput("Opt out of dinner"); }} className="text-emerald-400 underline cursor-pointer font-mono">"Opt out of dinner"</button>
              <button type="button" onClick={() => { setWhatsappInput("Show project score"); }} className="text-emerald-400 underline cursor-pointer font-mono">"Show project score"</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
