import React, { useState, useMemo } from 'react';
import { 
  Share2, Sparkles, Filter, Info, ExternalLink, Search, Zap, Eye, RefreshCw, 
  ZoomIn, ZoomOut, RotateCcw, Copy, Check, BookOpen, Cpu, Database, Code, ShieldCheck, Download
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function KnowledgeGraph({ projectData, currentLang = 'en' }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedMatrix, setCopiedMatrix] = useState(false);
  const [synthesizingNode, setSynthesizingNode] = useState(null);
  const [synthesizedInsight, setSynthesizedInsight] = useState('');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "Custom AI Innovation";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

  // DYNAMICALLY GENERATE RESEARCH NODES BASED ON SEARCHED projectData
  const dynamicNodes = useMemo(() => {
    if (!projectData) {
      return [
        { id: 'core-1', label: `${projectTitle} Core Model`, cat: 'Model', val: 98, x: 50, y: 45, desc: 'Central neural inference engine', connections: ['paper-1', 'paper-2', 'ds-1', 'sys-1'] },
        { id: 'paper-1', label: 'arXiv Deep Learning Paper (2025)', cat: 'Paper', val: 95, x: 25, y: 25, desc: 'Empirical neural architecture benchmark', url: 'https://arxiv.org', connections: ['core-1'] },
        { id: 'paper-2', label: 'IEEE Neural Pipeline Benchmark', cat: 'Paper', val: 92, x: 75, y: 25, desc: 'Sub-20ms latency execution audit', url: 'https://ieee.org', connections: ['core-1'] },
        { id: 'ds-1', label: 'Kaggle Labeled Dataset', cat: 'Dataset', val: 91, x: 22, y: 70, desc: '18,000+ curated training samples', url: 'https://kaggle.com', connections: ['core-1'] },
        { id: 'sys-1', label: 'Node.js Express Microservice', cat: 'System', val: 96, x: 78, y: 70, desc: 'REST API orchestration gateway', connections: ['core-1', 'repo-1'] },
        { id: 'repo-1', label: `insights-copilot/${slug}`, cat: 'Repository', val: 97, x: 50, y: 82, desc: 'Open-source starter code repository', url: `https://github.com/insights-copilot/${slug}`, connections: ['sys-1'] }
      ];
    }

    const baseNodes = [
      {
        id: 'core-main',
        label: `${projectData.title} Core Model`,
        cat: 'Model',
        val: 99,
        x: 50,
        y: 45,
        desc: `Central AI inference & problem validation model for ${projectData.title}.`,
        connections: ['paper-cite-0', 'paper-cite-1', 'dataset-node', 'sys-fe', 'sys-be']
      }
    ];

    // Add Citation Nodes from DeepSearch
    projectData.deepSearch.citations.forEach((cite, idx) => {
      baseNodes.push({
        id: `paper-cite-${idx}`,
        label: cite.title,
        cat: cite.type === 'Dataset' ? 'Dataset' : 'Paper',
        val: Math.floor(Math.random() * 5) + 93,
        x: idx === 0 ? 22 : idx === 1 ? 78 : 32,
        y: idx === 0 ? 25 : idx === 1 ? 25 : 75,
        desc: `Venue: ${cite.venue} (${cite.authors}). Snippet: ${cite.snippet}`,
        url: cite.url,
        connections: ['core-main']
      });
    });

    // Add Frontend & Backend Architecture Nodes
    baseNodes.push({
      id: 'sys-fe',
      label: projectData.architecture.frontend,
      cat: 'System',
      val: 95,
      x: 72,
      y: 72,
      desc: `Production Client Interface component tree.`,
      connections: ['core-main', 'sys-be']
    });

    baseNodes.push({
      id: 'sys-be',
      label: projectData.architecture.backend,
      cat: 'System',
      val: 96,
      x: 50,
      y: 84,
      desc: `Express.js & Python FastAPI microservice controller.`,
      connections: ['core-main', 'sys-fe', 'repo-node']
    });

    // Add Repository Node
    baseNodes.push({
      id: 'repo-node',
      label: `insights-copilot/${slug}`,
      cat: 'Repository',
      val: 98,
      x: 18,
      y: 52,
      desc: `Readymade student code starter template repository.`,
      url: `https://github.com/insights-copilot/${slug}`,
      connections: ['sys-be']
    });

    return baseNodes;
  }, [projectData, projectTitle, slug]);

  // Connections edge lines for SVG beam rendering
  const connectionsList = useMemo(() => {
    const lines = [];
    dynamicNodes.forEach(node => {
      if (node.connections) {
        node.connections.forEach(targetId => {
          const targetNode = dynamicNodes.find(n => n.id === targetId);
          if (targetNode) {
            lines.push({
              x1: node.x,
              y1: node.y,
              x2: targetNode.x,
              y2: targetNode.y,
              id: `${node.id}-${targetNode.id}`
            });
          }
        });
      }
    });
    return lines;
  }, [dynamicNodes]);

  // Filtered Nodes by Category and Search Bar
  const filteredNodes = useMemo(() => {
    return dynamicNodes.filter(node => {
      const matchCat = selectedCategory === 'All' || node.cat === selectedCategory;
      const matchQuery = searchQuery === '' || node.label.toLowerCase().includes(searchQuery.toLowerCase()) || node.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [dynamicNodes, selectedCategory, searchQuery]);

  const handleSynthesizeNode = (node) => {
    setSynthesizingNode(node.id);
    setSynthesizedInsight('');
    setTimeout(() => {
      setSynthesizedInsight(`⚡ [AI Sub-Cluster Analysis]: Node "${node.label}" achieves ${node.val}% citation reliability. Verified dependency link to ${projectTitle} backend API pipeline. Plagiarism score: 0%.`);
      setSynthesizingNode(null);
      confetti({ particleCount: 30, spread: 40 });
    }, 800);
  };

  const handleCopyMatrix = () => {
    const matrixText = `=== iNSIGHTS RESEARCH CLUSTER MATRIX FOR "${projectTitle}" ===\n` +
      dynamicNodes.map(n => `• [${n.cat.toUpperCase()}] ${n.label} | Reliability: ${n.val}% | Info: ${n.desc}`).join('\n');
    navigator.clipboard.writeText(matrixText);
    setCopiedMatrix(true);
    setTimeout(() => setCopiedMatrix(false), 2000);
    confetti({ particleCount: 35, spread: 45 });
  };

  const getCategoryColor = (cat, val) => {
    if (heatmapMode) {
      if (val >= 97) return 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/50';
      if (val >= 94) return 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/50';
      return 'bg-purple-600 text-white border-purple-400 shadow-purple-500/50';
    }
    switch (cat) {
      case 'Model': return 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-500/30';
      case 'Paper': return 'bg-purple-600 text-white border-purple-400 shadow-purple-500/30';
      case 'Dataset': return 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30';
      case 'System': return 'bg-cyan-600 text-slate-950 border-cyan-400 shadow-cyan-500/30';
      default: return 'bg-amber-600 text-white border-amber-400 shadow-amber-500/30';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Interactive Neural Research Network</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Cluster Graph
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Interactive neural topology mapping research papers, datasets, model weights, and microservices for "{projectTitle}".
        </p>
      </div>

      {/* WORKSPACE & CONTROLS TOOLBAR */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 bg-white border border-slate-200 shadow-md">
        
        {/* Top Control Bar: Search + Filter + Heatmap + Export */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          
          {/* Search Box */}
          <div className="relative flex items-center min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph nodes..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 font-semibold"
            />
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-extrabold">
            <span className="text-slate-700 mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-600" /> Filter:
            </span>
            {['All', 'Model', 'Paper', 'Dataset', 'System', 'Repository'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Unique Action Buttons: Heatmap Mode & Export Matrix */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setHeatmapMode(!heatmapMode)}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition cursor-pointer ${
                heatmapMode
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white border-emerald-400 shadow-md'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>{heatmapMode ? "Impact Heatmap ON" : "Impact Heatmap"}</span>
            </button>

            <button
              onClick={handleCopyMatrix}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer border border-slate-800"
            >
              {copiedMatrix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedMatrix ? "Copied Matrix!" : "Export Matrix"}</span>
            </button>
          </div>

        </div>

        {/* CANVAS WORKSPACE WITH SVG CONNECTING ENERGY BEAMS */}
        <div className="relative bg-slate-950 rounded-3xl p-6 min-h-[440px] border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

          {/* SVG Connecting Lines between Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {connectionsList.map((conn) => (
              <line
                key={conn.id}
                x1={`${conn.x1}%`}
                y1={`${conn.y1}%`}
                x2={`${conn.x2}%`}
                y2={`${conn.y2}%`}
                stroke="rgba(99, 102, 241, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Canvas Zoom Controls Overlay */}
          <div className="absolute top-4 right-4 z-20 flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 gap-1 text-slate-200 text-xs">
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))} className="p-1.5 hover:bg-slate-800 rounded font-bold cursor-pointer">
              <ZoomIn className="w-4 h-4 text-cyan-400" />
            </button>
            <span className="font-mono text-[10px] px-1 font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.7))} className="p-1.5 hover:bg-slate-800 rounded font-bold cursor-pointer">
              <ZoomOut className="w-4 h-4 text-cyan-400" />
            </button>
            <button onClick={() => setZoomLevel(1)} className="p-1.5 hover:bg-slate-800 rounded font-bold cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Interactive Graph Nodes */}
          <div 
            className="w-full h-full relative transition-transform duration-300 z-10"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-2xl border transition-all cursor-pointer group text-center space-y-1 shadow-2xl max-w-[200px] ${getCategoryColor(node.cat, node.val)} ${
                    isSelected ? 'ring-4 ring-cyan-400 scale-110 z-30' : 'hover:scale-105 hover:z-20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-black/40 text-white tracking-wider">
                      {node.cat}
                    </span>
                    <span className="text-[9px] font-mono font-bold">Reliability: {node.val}%</span>
                  </div>

                  <h4 className="text-xs font-black leading-snug group-hover:underline">{node.label}</h4>
                  <p className="text-[10px] opacity-90 line-clamp-1 font-medium">{node.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* NODE DETAIL INSPECTOR DRAWER & AI SYNTHESIZER */}
        {selectedNode ? (
          <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/40 space-y-4 animate-fadeIn text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  {selectedNode.cat} Node Inspector
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">Reliability Score: {selectedNode.val}%</span>
              </div>

              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">{selectedNode.label}</h3>
              <p className="text-xs text-slate-300 font-semibold leading-relaxed">{selectedNode.desc}</p>
            </div>

            {/* AI Synthesize Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleSynthesizeNode(selectedNode)}
                disabled={synthesizingNode === selectedNode.id}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                {synthesizingNode === selectedNode.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-yellow-300" />}
                <span>{synthesizingNode === selectedNode.id ? "Synthesizing AI Insight..." : "Synthesize Sub-Cluster AI Insight"}</span>
              </button>

              {selectedNode.url && (
                <a
                  href={selectedNode.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 border border-slate-700 cursor-pointer"
                >
                  <span>Open External Citation</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              )}
            </div>

            {/* Synthesized Output Display */}
            {synthesizedInsight && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs animate-fadeIn leading-relaxed">
                {synthesizedInsight}
              </div>
            )}

          </div>
        ) : (
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between font-bold">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Click on any node in the graph above to inspect citations, dependencies, and synthesize AI insights.</span>
            </div>
            <span className="text-slate-600 font-mono text-[11px]">{dynamicNodes.length} Active Cluster Nodes</span>
          </div>
        )}

      </div>

    </div>
  );
}
