import React, { useState } from 'react';
import { Cpu, Server, Database, Code, GitFork, ArrowRight, CheckCircle2, Circle, Download, ExternalLink, Layers, Sparkles, Terminal, Copy, Check, Activity, FileCode, CheckSquare, Folder, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function ProjectHub({ projectData, currentLang = 'en' }) {
  const [copiedFolder, setCopiedFolder] = useState(false);
  const [archChecked, setArchChecked] = useState(true);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const projectTitle = projectData?.title || "Custom Student Project";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');

  const frontendTech = projectData?.architecture?.frontend || "React 18 + Tailwind CSS";
  const backendTech = projectData?.architecture?.backend || "Node.js Express + Python FastAPI";
  const databaseTech = "Cloud Document Store / Cache";
  const aiTech = projectData?.architecture?.aiModels?.[0] || "Gemini 1.5 Pro AI Engine";
  const deployTech = "Vercel Edge Network / Docker Container";

  const dynamicFolderStructure = projectData ? `// Dynamic Folder Structure for ${projectTitle}
${slug}/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── AnalyticsPanel.jsx
│   │   └── ${projectTitle.replace(/[^a-zA-Z]/g, '')}View.jsx
│   ├── services/
│   │   └── apiService.js
│   └── App.jsx
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── apiRoutes.js
│   └── config/
│       └── dbConfig.js
├── frontend/
│   ├── public/
│   └── index.html
├── api/
│   └── v1/
│       └── infer.py
└── models/
    ├── schema.json
    └── ${slug}_model.pkl` : `src/
backend/
frontend/
api/
models/`;

  const handleCopyFolder = () => {
    navigator.clipboard.writeText(dynamicFolderStructure);
    setCopiedFolder(true);
    setTimeout(() => setCopiedFolder(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>iNSIGHTS Generator Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Phase 3 (Project Generator)
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Automatically generate full architecture diagrams and production folder structures tailored for "{projectTitle}".
        </p>
      </div>

      {/* PROJECT GENERATOR CONTAINER (MATCHING USER SCREENSHOT LAYOUT) */}
      <div className="bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 text-white space-y-8 shadow-2xl">
        
        {/* Phase 3 Title & Automatically Generate Header */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white tracking-tight">Phase 3 (Project Generator)</h3>
          <p className="text-sm text-slate-300 font-medium">Automatically generate</p>

          {/* Architecture Diagram Checklist Option */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => setArchChecked(!archChecked)}
              className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-400 cursor-pointer"
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                archChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
              }`}>
                {archChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-white">Architecture Diagram</span>
            </button>
          </div>
        </div>

        {/* Dynamic Vertical Flow Stack (Frontend -> Backend -> Database -> AI -> Deployment) */}
        {archChecked && (
          <div className="space-y-3 pt-2 max-w-lg">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Frontend</span>
              <span className="text-xs text-slate-200 font-mono font-semibold">{frontendTech}</span>
            </div>

            <div className="text-center text-slate-500 font-bold text-base">↓</div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Backend</span>
              <span className="text-xs text-slate-200 font-mono font-semibold">{backendTech}</span>
            </div>

            <div className="text-center text-slate-500 font-bold text-base">↓</div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Database</span>
              <span className="text-xs text-slate-200 font-mono font-semibold">{databaseTech}</span>
            </div>

            <div className="text-center text-slate-500 font-bold text-base">↓</div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">AI</span>
              <span className="text-xs text-slate-200 font-mono font-semibold">{aiTech}</span>
            </div>

            <div className="text-center text-slate-500 font-bold text-base">↓</div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Deployment</span>
              <span className="text-xs text-slate-200 font-mono font-semibold">{deployTech}</span>
            </div>
          </div>
        )}

        <hr className="border-slate-800" />

        {/* Generate Folder Structure Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300 font-medium">Generate</p>
              <h4 className="text-lg font-bold text-white mt-1">Folder Structure</h4>
            </div>

            <button
              onClick={handleCopyFolder}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 border border-slate-700 cursor-pointer"
            >
              {copiedFolder ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedFolder ? "Copied Structure!" : "Copy Structure"}</span>
            </button>
          </div>

          {/* Folder Structure Display Box matching dark terminal mockup in screenshot */}
          <div className="relative bg-slate-900 p-6 rounded-2xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed select-all">
            <pre className="text-cyan-300">
              <code>{dynamicFolderStructure}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
