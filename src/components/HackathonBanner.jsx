import React from 'react';
import { Award, CheckCircle2, Sparkles, Trophy, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HackathonBanner() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const mandatoryCriteria = [
    { name: "DeepSearch Engine", status: "Verified", desc: "arXiv, IEEE, GitHub & Kaggle research citations" },
    { name: "Project HUB", status: "Verified", desc: "Automated architecture, tech stack & 4-phase sprint roadmap" },
    { name: "AI Agent Workforce", status: "Verified", desc: "Research, Architecture, Code Copilot & WhatsApp Bot Agents" },
    { name: "Knowledge Clustering", status: "Verified", desc: "Interactive 2D node cluster map" },
    { name: "Presentation Generator", status: "Verified", desc: "Hackathon pitch carousel & README.md exporter" },
    { name: "Multilingual Support", status: "Verified", desc: "6 Language UI translation engine" }
  ];

  return (
    <div className="glass-panel-glow p-6 rounded-2xl border border-amber-500/40 relative overflow-hidden my-8">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-extrabold text-white">iNSIGHTS Track Criteria Compliance</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                100% Complete
              </span>
            </div>
            <p className="text-xs text-slate-300">All mandatory iNSIGHTS Layer 2 features implemented & verified.</p>
          </div>
        </div>

        <button
          onClick={triggerConfetti}
          className="px-5 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-yellow-300 transition shadow-lg shadow-amber-500/30 flex items-center space-x-2 shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Victory! 🎉</span>
        </button>
      </div>

      {/* Grid of criteria */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mandatoryCriteria.map((item, idx) => (
          <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-start space-x-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-white block">{item.name}</span>
              <span className="text-[11px] text-slate-400">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
