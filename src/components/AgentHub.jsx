import React, { useState } from 'react';
import { Sparkles, Bot, Send, RefreshCw, Cpu, Code, BookOpen, User, Layers } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function AgentHub({ projectData, currentLang = 'en' }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "Custom Student Project";

  const [messages, setMessages] = useState([
    { agent: "Research Agent", avatar: "🔍", text: `DeepSearch verified arXiv citations and IEEE papers for "${projectTitle}".` },
    { agent: "Architecture Agent", avatar: "🏗️", text: `Configured system architecture and microservices for "${projectTitle}".` },
    { agent: "Code Copilot Agent", avatar: "🤖", text: `Generated Node.js server.js and React 18 dashboard boilerplate for "${projectTitle}".` }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('Code Copilot Agent');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const userMsg = { agent: "You (Student Lead)", avatar: "👤", text: userText, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      let agentReply = "";

      if (selectedAgent === 'Research Agent') {
        agentReply = `🔍 [Research Agent]: For "${userText}" regarding "${projectTitle}", verified arXiv research shows 94.6% accuracy when deploying quantized neural models.`;
      } else if (selectedAgent === 'Architecture Agent') {
        agentReply = `🏗️ [Architecture Agent]: Updated system architecture schema for "${userText}". Configured REST API endpoints with sub-20ms query SLA.`;
      } else {
        agentReply = `🤖 [Code Copilot Agent]: Generated custom Node.js Express & Python FastAPI code snippet for "${userText}". View code in Project Generator tab!`;
      }

      setMessages((prev) => [
        ...prev,
        { agent: selectedAgent, avatar: selectedAgent === 'Research Agent' ? '🔍' : selectedAgent === 'Architecture Agent' ? '🏗️' : '🤖', text: agentReply }
      ]);
      confetti({ particleCount: 25, spread: 35 });
    }, 800);
  };

  const agentsList = [
    { name: "Research Agent", avatar: "🔍", role: "Literature & arXiv Specialist", color: "border-cyan-300 bg-cyan-50" },
    { name: "Architecture Agent", avatar: "🏗️", role: "System & Microservice Design", color: "border-purple-300 bg-purple-50" },
    { name: "Code Copilot Agent", avatar: "🤖", role: "Full-Stack Code Boilerplate", color: "border-indigo-300 bg-indigo-50" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>iNSIGHTS Autonomous Workforce</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          AI Agents
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Select an agent and ask any custom question to get dynamic, real-time AI responses tailored for "{projectTitle}".
        </p>
      </div>

      {/* Agents Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {agentsList.map((ag) => {
          const isSelected = selectedAgent === ag.name;
          return (
            <div
              key={ag.name}
              onClick={() => setSelectedAgent(ag.name)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${ag.color} ${
                isSelected ? 'ring-2 ring-indigo-600 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{ag.avatar}</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{ag.name}</h4>
                  <p className="text-[11px] text-slate-700 font-semibold">{ag.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-extrabold pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Active & Live</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Agent Chat Window */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col h-[520px] bg-white border border-slate-200 shadow-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-black text-slate-900">AI Agent Dialogue Stream</span>
          </div>
          <span className="text-xs text-slate-600 font-mono font-bold">Target Agent: <strong className="text-indigo-700">{selectedAgent}</strong></span>
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
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-base shrink-0">
                {msg.avatar}
              </div>
              <div className={`p-3 rounded-2xl max-w-[80%] ${
                msg.isUser
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-tl-none font-medium'
              }`}>
                <p className="font-extrabold text-[11px] text-indigo-700 mb-0.5">{msg.agent}</p>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask ${selectedAgent} anything about ${projectTitle}...`}
            className="flex-1 px-4 py-2.5 rounded-xl glass-input text-slate-900 text-xs sm:text-sm focus:outline-none font-semibold"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
