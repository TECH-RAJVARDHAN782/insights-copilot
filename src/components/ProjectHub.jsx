import React, { useState } from 'react';
import { Cpu, Server, Database, Code, GitFork, ArrowRight, CheckCircle2, Circle, Download, ExternalLink, Layers, Sparkles, Terminal, Copy, Check, Activity } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function ProjectHub({ projectData, currentLang = 'en' }) {
  const [completedRoadmap, setCompletedRoadmap] = useState([0]); // Phase 1 checked by default
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState('express_mongo'); // 'express_mongo' | 'mongoose_schema' | 'seed_script'
  const [copiedCode, setCopiedCode] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  if (!projectData) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl space-y-4">
        <Cpu className="w-12 h-12 text-indigo-400 mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-white">No Project Active</h3>
        <p className="text-slate-400 text-sm">Please run DeepSearch on the home tab to generate your Project HUB architecture.</p>
      </div>
    );
  }

  const toggleRoadmap = (idx) => {
    if (completedRoadmap.includes(idx)) {
      setCompletedRoadmap(completedRoadmap.filter(i => i !== idx));
    } else {
      setCompletedRoadmap([...completedRoadmap, idx]);
    }
  };

  const { architecture, roadmap } = projectData;

  const codeBoilerplates = {
    express_mongo: `// Express.js + MongoDB Atlas Live Connection Server for ${projectData.title}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Live MongoDB Atlas Connection String
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:secure_pass@insights-copilot.mongodb.net/ecomeal_db?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Live MongoDB Atlas Cluster Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get('/api/health', (req, res) => {
  res.json({
    database: "MongoDB Atlas",
    status: "CONNECTED",
    cluster: "aws-iad1-shard-0",
    activeProject: "${projectData.title}"
  });
});

app.listen(5000, () => console.log("🚀 Express MongoDB Server running on port 5000"));`,

    mongoose_schema: `// Mongoose Data Schema for MongoDB Atlas
const mongoose = require('mongoose');

const ProjectDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hostelBlock: { type: String, default: "Block B" },
  timestamp: { type: Date, default: Date.now },
  plateWasteKg: { type: Number, required: true },
  detectedFoodItems: [{ name: String, volumePercentage: Number }],
  rsvpOptOutCount: { type: Number, default: 0 },
  headcountForecast: { type: Number }
});

module.exports = mongoose.model('ProjectData', ProjectDataSchema);`,

    seed_script: `// MongoDB Seeder Script
const mongoose = require('mongoose');
const ProjectData = require('./models/ProjectData');

async function seedDatabase() {
  await mongoose.connect(process.env.MONGO_URI);
  await ProjectData.create({
    title: "${projectData.title}",
    hostelBlock: "Main Mess",
    plateWasteKg: 14.5,
    detectedFoodItems: [{ name: "Rice", volumePercentage: 45 }, { name: "Dal", volumePercentage: 20 }],
    rsvpOptOutCount: 42,
    headcountForecast: 380
  });
  console.log("🌱 MongoDB Sample Data Seeded Successfully!");
  process.exit(0);
}

seedDatabase();`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeBoilerplates[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-500/30">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>iNSIGHTS Project HUB</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t.mongoHeader}
        </h2>
        <p className="text-slate-300 text-sm">
          {t.mongoDesc}
        </p>
      </div>

      {/* LIVE MONGODB ATLAS DASHBOARD CARD */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-slate-900/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {t.mongoStatus}
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  {t.mongoLive}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Cluster: aws-iad1-shard-0 • DB: ecomeal_db • Storage Engine: WiredTiger</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/60">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>{t.ping} 18ms</span>
          </div>
        </div>

        {/* Live Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">Collection: daily_waste_logs</span>
            <div className="text-xl font-bold text-emerald-400">14,280 docs</div>
            <p className="text-[10px] text-slate-400">Size: 12.4 MB • Indexed on timestamp</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">Collection: student_rsvp_records</span>
            <div className="text-xl font-bold text-cyan-400">8,520 docs</div>
            <p className="text-[10px] text-slate-400">Size: 6.8 MB • Indexed on studentId</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono">Collection: kitchen_batches</span>
            <div className="text-xl font-bold text-purple-400">1,240 docs</div>
            <p className="text-[10px] text-slate-400">Size: 3.2 MB • Indexed on batchId</p>
          </div>
        </div>
      </div>

      {/* Code Boilerplate Exporter for MongoDB */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-400" />
              {t.expressBoilerplate}
            </h3>
            <p className="text-xs text-slate-400">Copy pre-configured Express server code, Mongoose data schemas, and database seeder scripts.</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCodeTab('express_mongo')}
                className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${activeCodeTab === 'express_mongo' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                server.js
              </button>
              <button
                onClick={() => setActiveCodeTab('mongoose_schema')}
                className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${activeCodeTab === 'mongoose_schema' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                schema.js
              </button>
              <button
                onClick={() => setActiveCodeTab('seed_script')}
                className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${activeCodeTab === 'seed_script' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                seed_mongo.js
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? t.copied : t.copyCode}</span>
            </button>
          </div>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
          <code>{codeBoilerplates[activeCodeTab]}</code>
        </pre>
      </div>

      {/* System Architecture Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
            <Cpu className="w-5 h-5" />
            <span>{t.interactiveNodes}</span>
          </div>
          <span className="text-xs text-slate-400">{t.nodeInspectHint}</span>
        </div>

        {/* Node Pipeline Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {architecture.nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${node.color} ${
                  isSelected ? 'ring-2 ring-cyan-400 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/80">
                    {node.type}
                  </span>
                  <span className="text-xs font-mono font-bold">Node #{node.id}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{node.label}</h4>
                <p className="text-[11px] text-slate-300 flex items-center space-x-1">
                  <span>{t.inspectPipeline}</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Node Inspector Drawer */}
        {selectedNode && (
          <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/40 text-xs space-y-2 animate-fadeIn">
            <div className="flex justify-between items-center text-cyan-300 font-bold">
              <span>Node Inspector: {selectedNode.label}</span>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>
            <p className="text-slate-300">
              Type: <strong className="text-white">{selectedNode.type}</strong> | Latency SLA: <strong className="text-emerald-400">&lt; 45ms</strong> | Database: MongoDB Atlas.
            </p>
            {selectedNode.detail && (
              <p className="text-slate-400 italic bg-slate-950 p-2.5 rounded border border-slate-800">
                "{selectedNode.detail}"
              </p>
            )}
          </div>
        )}

      </div>

      {/* Phased Execution Roadmap */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
            <Terminal className="w-5 h-5" />
            <span>{t.sprintRoadmap} ({completedRoadmap.length} of {roadmap.length} {t.completed})</span>
          </div>
          <div className="w-32 bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${(completedRoadmap.length / roadmap.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roadmap.map((step, idx) => {
            const isDone = completedRoadmap.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleRoadmap(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                  )}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">{step.phase}</span>
                    <h4 className={`text-sm font-bold ${isDone ? 'text-white line-through opacity-80' : 'text-slate-100'}`}>{step.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-400 pl-8">{step.task}</p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
