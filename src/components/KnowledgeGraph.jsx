import React, { useState } from 'react';
import { Share2, Sparkles, Layers, Search, Filter, BookOpen, Database, Code, Cpu, ExternalLink } from 'lucide-react';

export default function KnowledgeGraph({ projectData }) {
  const [filterType, setFilterType] = useState('All');
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 1, label: "EcoMeal Core Concept", category: "Core", x: 50, y: 50, size: "lg", color: "#6366f1", details: "Central AI engine combining plate waste computer vision with demand forecasting." },
    { id: 2, label: "YOLOv8 Segmentation", category: "AI Models", x: 25, y: 30, size: "md", color: "#a855f7", details: "Instance segmentation model trained on 15,000 dining plate images." },
    { id: 3, label: "Prophet Attendance Model", category: "AI Models", x: 75, y: 30, size: "md", color: "#a855f7", details: "Time-series forecasting based on academic calendar & historical gate biometric data." },
    { id: 4, label: "IEEE Food Waste Paper", category: "Papers", x: 20, y: 70, size: "sm", color: "#00f2fe", details: "Zhang et al. (2025) - Plate waste volume estimation accuracy at 94.2%." },
    { id: 5, label: "FoodLoss-Vision 15K", category: "Datasets", x: 80, y: 70, size: "sm", color: "#10b981", details: "Kaggle dataset with 15k annotated plate waste images." },
    { id: 6, label: "FastAPI Backend API", category: "Tech Stack", x: 35, y: 80, size: "md", color: "#3b82f6", details: "Asynchronous Python API server with Redis pub/sub queue." },
    { id: 7, label: "WhatsApp Student Bot", category: "Tech Stack", x: 65, y: 80, size: "sm", color: "#f59e0b", details: "Interactive WhatsApp bot for meal opt-outs & hostel notifications." },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 1, to: 6 },
    { from: 6, to: 7 },
  ];

  const filteredNodes = filterType === 'All' ? nodes : nodes.filter(n => n.category === filterType);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-purple-500/30">
        <div className="flex items-center space-x-2 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>iNSIGHTS Knowledge Clustering Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Visual Research & Component Knowledge Graph
        </h2>
        <p className="text-slate-300 text-sm">
          Explore semantic clusters connecting research literature, datasets, machine learning models, and system components.
        </p>
      </div>

      {/* Control Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-300 font-semibold">Cluster Filter:</span>
          {['All', 'Core', 'AI Models', 'Papers', 'Datasets', 'Tech Stack'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="text-cyan-300 font-bold">{filteredNodes.length}</span> active cluster nodes
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative glass-panel p-6 rounded-2xl border border-purple-900/40 h-[480px] overflow-hidden">
        
        {/* SVG Connections Line Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Nodes Positioning */}
        {filteredNodes.map((node) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNode(node)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
              }`}
            >
              <div className="relative group">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md"
                  style={{ backgroundColor: `${node.color}33`, borderColor: node.color }}
                >
                  {node.category === 'Core' && <Sparkles className="w-5 h-5" style={{ color: node.color }} />}
                  {node.category === 'AI Models' && <Cpu className="w-5 h-5" style={{ color: node.color }} />}
                  {node.category === 'Papers' && <BookOpen className="w-5 h-5" style={{ color: node.color }} />}
                  {node.category === 'Datasets' && <Database className="w-5 h-5" style={{ color: node.color }} />}
                  {node.category === 'Tech Stack' && <Code className="w-5 h-5" style={{ color: node.color }} />}
                </div>

                {/* Node Label Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap bg-slate-950/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-800 shadow-md">
                  {node.label}
                </div>
              </div>
            </div>
          );
        })}

        {/* Active Node Detail Popup Card */}
        {activeNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 glass-panel-glow p-4 rounded-xl border border-cyan-500/40 z-40 space-y-2 animate-scaleUp">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {activeNode.category} Node
              </span>
              <button onClick={() => setActiveNode(null)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            <h4 className="text-sm font-bold text-white">{activeNode.label}</h4>
            <p className="text-xs text-slate-300">{activeNode.details}</p>
          </div>
        )}

      </div>

    </div>
  );
}
