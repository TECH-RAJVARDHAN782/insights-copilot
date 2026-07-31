import React, { useState } from 'react';
import { Share2, Sparkles, Filter, Info, ExternalLink } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function KnowledgeGraph({ projectData, currentLang = 'en' }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const projectTitle = projectData?.title || "AI Research Innovation";

  const nodes = [
    { id: 1, label: `${projectTitle} Core Model`, cat: 'Model', val: 98, x: 50, y: 40, color: 'bg-indigo-600' },
    { id: 2, label: 'arXiv Empirical Paper (2025)', cat: 'Paper', val: 94, x: 25, y: 25, color: 'bg-purple-600' },
    { id: 3, label: 'IEEE Neural Pipeline Benchmark', cat: 'Paper', val: 91, x: 75, y: 30, color: 'bg-purple-600' },
    { id: 4, label: 'Kaggle Annotated Dataset', cat: 'Dataset', val: 88, x: 30, y: 70, color: 'bg-emerald-600' },
    { id: 5, label: 'MongoDB Atlas Schema Vault', cat: 'Database', val: 95, x: 70, y: 65, color: 'bg-cyan-600' }
  ];

  const filteredNodes = selectedCategory === 'All' ? nodes : nodes.filter(n => n.cat === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Knowledge Cluster Visualizer</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {t.knowledgeHeader}
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          {t.knowledgeDesc}
        </p>
      </div>

      {/* Interactive Cluster Workspace */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 bg-white border border-slate-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>{t.clusterFilter}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-extrabold">
            {['All', 'Model', 'Paper', 'Dataset', 'Database'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Nodes Canvas Grid */}
        <div className="relative bg-slate-900 rounded-2xl p-8 min-h-[380px] border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl">
          {filteredNodes.map(node => (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-700 hover:border-cyan-400 transition cursor-pointer group text-center space-y-1 shadow-xl max-w-[180px]"
            >
              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase text-white ${node.color}`}>
                {node.cat}
              </span>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition leading-snug">{node.label}</h4>
              <span className="text-[10px] text-emerald-400 font-mono block">Reliability: {node.val}%</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
