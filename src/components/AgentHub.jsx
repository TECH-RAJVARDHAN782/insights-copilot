import React, { useState } from 'react';
import { Sparkles, Bot, Send, MessageSquare, Smartphone, Terminal, CheckCircle2, Cpu, UserCheck } from 'lucide-react';

export default function AgentHub({ projectData }) {
  const [messages, setMessages] = useState(
    projectData?.agentWorkflows || [
      { agent: "Research Agent", avatar: "🔍", text: "DeepSearch completed. Initialized knowledge graph with 46 research sources." },
      { agent: "Architecture Agent", avatar: "🏗️", text: "Designed PostgreSQL schema and Redis pub/sub queue for food consumption logging." },
      { agent: "Code Copilot Agent", avatar: "🤖", text: "Generated FastAPI inference script for YOLOv8 model serving." },
      { agent: "WhatsApp Bot Agent", avatar: "📱", text: "Configured student meal opt-out workflow via WhatsApp bot API." }
    ]
  );

  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('Code Copilot Agent');
  const [simulatedMobileAlert, setSimulatedMobileAlert] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { agent: "You (Student Lead)", avatar: "👤", text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Simulate Agent Response
    setTimeout(() => {
      let agentReply = "";
      if (selectedAgent === 'Research Agent') {
        agentReply = "Found 2 recent IEEE publications on low-latency YOLO edge deployment. Updating project references!";
      } else if (selectedAgent === 'Architecture Agent') {
        agentReply = "Updated microservice schema: added Kafka stream buffer for peak mess dining hours (12:00-14:00).";
      } else if (selectedAgent === 'Code Copilot Agent') {
        agentReply = "Generated PyTorch inference script with 30fps batching. Ready to copy from docs generator tab!";
      } else {
        agentReply = "Simulated WhatsApp push broadcast: 'Reminder: Opt-out of dinner by 5 PM to earn 50 Eco-Points!'";
        setSimulatedMobileAlert(true);
      }

      setMessages((prev) => [
        ...prev,
        { agent: selectedAgent, avatar: selectedAgent === 'Research Agent' ? '🔍' : selectedAgent === 'Architecture Agent' ? '🏗️' : selectedAgent === 'Code Copilot Agent' ? '🤖' : '📱', text: agentReply }
      ]);
    }, 800);
  };

  const agentsList = [
    { name: "Research Agent", avatar: "🔍", role: "Literature & arXiv Specialist", color: "border-cyan-500/40 bg-cyan-950/30" },
    { name: "Architecture Agent", avatar: "🏗️", role: "DB & System Design Specialist", color: "border-purple-500/40 bg-purple-950/30" },
    { name: "Code Copilot Agent", avatar: "🤖", role: "Full-Stack Code Boilerplate", color: "border-indigo-500/40 bg-indigo-950/30" },
    { name: "WhatsApp Bot Agent", avatar: "📱", role: "Telegram/WhatsApp Notifier", color: "border-emerald-500/40 bg-emerald-950/30" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-cyan-500/30">
        <div className="flex items-center space-x-2 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>iNSIGHTS Agentic Collaboration Center</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Autonomous AI Agent Workforce
        </h2>
        <p className="text-slate-300 text-sm">
          Collaborate with specialized AI agents to automate research, schema design, code boilerplates, and student push notifications.
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
                <span>Active & Ready</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Chat & Notification Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Agent Chat Window */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-white">Agent Dialogue Stream</span>
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
              placeholder={`Ask ${selectedAgent} to update architecture, code, or research...`}
              className="flex-1 px-4 py-2.5 rounded-xl glass-input text-white text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-cyan-500/20"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Mobile Bot Notification Simulator */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-3">
              <Smartphone className="w-4 h-4" />
              <span>WhatsApp / Telegram Bot Live Simulator</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              iNSIGHTS agents send automated student reminders, meal RSVP surveys, and mess warden notifications directly to messaging channels.
            </p>

            {/* Simulated Phone Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-3 shadow-2xl relative">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-bold text-emerald-300">WhatsApp iNSIGHTS Bot</span>
                </span>
                <span>Just Now</span>
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40 text-xs text-emerald-100 space-y-1">
                <p className="font-bold text-emerald-300">🍽️ Mess Attendance Reminder</p>
                <p className="text-[11px]">"Will you be dining at Hostel Mess Block B tonight? Reply 1 for YES, 0 to OPT OUT and save food!"</p>
              </div>

              {simulatedMobileAlert && (
                <div className="bg-cyan-950/40 p-3 rounded-xl border border-cyan-800/40 text-xs text-cyan-100 space-y-1 animate-bounce">
                  <p className="font-bold text-cyan-300">✨ Opt-Out Confirmation</p>
                  <p className="text-[11px]">"Opt-out recorded! Kitchen portion updated. You earned +50 Hostel Sustainability Points!"</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setSimulatedMobileAlert(true)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
          >
            <Smartphone className="w-4 h-4" />
            <span>Simulate WhatsApp Notification Push</span>
          </button>
        </div>

      </div>

    </div>
  );
}
