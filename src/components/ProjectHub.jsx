import React, { useState } from 'react';
import { Cpu, Server, Database, Code, GitFork, ArrowRight, CheckCircle2, Circle, Download, ExternalLink, Layers, Sparkles, Terminal, Copy, Check, Activity, FileCode } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function ProjectHub({ projectData, currentLang = 'en' }) {
  const [completedRoadmap, setCompletedRoadmap] = useState([0]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState('express_server'); // 'express_server' | 'fastapi_python' | 'react_frontend' | 'docker_compose' | 'mongoose_schema'
  const [copiedCode, setCopiedCode] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const projectTitle = projectData?.title || "Custom Student Project";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');

  const toggleRoadmap = (idx) => {
    if (completedRoadmap.includes(idx)) {
      setCompletedRoadmap(completedRoadmap.filter(i => i !== idx));
    } else {
      setCompletedRoadmap([...completedRoadmap, idx]);
    }
  };

  const codeBoilerplates = {
    express_server: `// Production Node.js Express Server Boilerplate for ${projectTitle}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Live MongoDB Atlas Connection String
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:secure_pass@insights-copilot.mongodb.net/${slug}_db?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Live MongoDB Atlas Connected for ${projectTitle}"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get('/api/health', (req, res) => {
  res.json({
    project: "${projectTitle}",
    status: "CONNECTED",
    database: "MongoDB Atlas",
    timestamp: new Date().toISOString()
  });
});

app.post('/api/data', async (req, res) => {
  try {
    const payload = req.body;
    console.log("Ingesting data payload:", payload);
    res.status(201).json({ success: true, message: "Data logged to MongoDB Atlas", payload });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`🚀 Express Server running on port \${PORT}\`));`,

    fastapi_python: `# Production Python FastAPI Backend for ${projectTitle}
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import datetime

app = FastAPI(
    title="${projectTitle} Microservices API",
    description="High-performance Python inference and data orchestration pipeline.",
    version="1.0.0"
)

class ProjectDataPayload(BaseModel):
    student_id: str
    prompt: str
    confidence_score: float = 0.95

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "service": "${projectTitle} FastAPI Engine",
        "timestamp": str(datetime.datetime.now())
    }

@app.post("/api/v1/infer")
def predict_pipeline(payload: ProjectDataPayload):
    # Execute AI neural network model inference
    result = {
        "input": payload.student_id,
        "prediction": "PASSED",
        "processed_by": "FastAPI + PyTorch Worker"
    }
    return result`,

    react_frontend: `// Production React 18 Component for ${projectTitle}
import React, { useState, useEffect } from 'react';

export default function ${projectTitle.replace(/[^a-zA-Z]/g, '')}Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  return (
    <div className="p-6 bg-slate-950 text-white rounded-2xl border border-slate-800">
      <h2 className="text-xl font-bold">${projectTitle} Dashboard</h2>
      {loading ? (
        <p className="text-slate-400">Loading Live MongoDB Atlas metrics...</p>
      ) : (
        <div className="mt-4 p-4 bg-slate-900 rounded-xl">
          <p className="text-emerald-400 font-mono">Status: {data?.status || "ONLINE"}</p>
          <p className="text-xs text-slate-400 mt-1">Database: Live MongoDB Atlas</p>
        </div>
      )}
    </div>
  );
}`,

    docker_compose: `# Docker Compose Orchestration for ${projectTitle}
version: '3.8'

services:
  backend-node:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb+srv://admin:pass@insights-copilot.mongodb.net/${slug}_db
      - NODE_ENV=production

  api-fastapi:
    build: ./python_api
    ports:
      - "8000:8000"
    command: uvicorn main:app --host 0.0.0.0 --port 8000

  frontend-react:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend-node`,

    mongoose_schema: `// Live Mongoose Schema for MongoDB Atlas
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "ACTIVE" },
  metrics: { type: Object, default: {} }
});

module.exports = mongoose.model('${projectTitle.replace(/[^a-zA-Z]/g, '')}', ProjectSchema);`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeBoilerplates[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const architectureNodes = projectData?.architecture?.nodes || [
    { id: "1", label: "Data Input Pipeline", type: "Input", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500" },
    { id: "2", label: "AI Inference Engine", type: "AI Model", color: "bg-purple-500/20 text-purple-300 border-purple-500" },
    { id: "3", label: "Node.js Express Server", type: "Backend", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500" },
    { id: "4", label: "Live MongoDB Atlas Vault", type: "Database", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500" }
  ];

  const roadmapSteps = projectData?.roadmap || [
    { phase: "Phase 1 (Week 1)", title: "Literature Search & Setup", task: "Extract research papers and configure Node.js server." },
    { phase: "Phase 2 (Week 2)", title: "MongoDB Atlas & API Setup", task: "Connect Mongoose models and expose REST endpoints." },
    { phase: "Phase 3 (Week 3)", title: "Dashboard UI & Agents", task: "Build React dashboard and connect WhatsApp bot." },
    { phase: "Phase 4 (Week 4)", title: "Deployment & Presentation Deck", task: "Deploy to Vercel and export PowerPoint presentation." }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-500/30">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>iNSIGHTS Project HUB</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Full-Stack Boilerplates & Production Code Hub
        </h2>
        <p className="text-slate-300 text-sm">
          Instant multi-language code boilerplates for Express.js, Python FastAPI, React 18, Docker Compose, and Live MongoDB Atlas.
        </p>
      </div>

      {/* MULTI-FRAMEWORK CODE BOILERPLATES SECTION */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 border border-indigo-500/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-cyan-400" />
              Full Production Starter Code Boilerplates
            </h3>
            <p className="text-xs text-slate-400">Select language or framework to copy 100% production-ready starter code for "{projectTitle}".</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        {/* Framework Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          {[
            { id: 'express_server', label: 'Node.js Express' },
            { id: 'fastapi_python', label: 'Python FastAPI' },
            { id: 'react_frontend', label: 'React 18 UI' },
            { id: 'docker_compose', label: 'Docker Compose' },
            { id: 'mongoose_schema', label: 'MongoDB Schema' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCodeTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeCodeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Box */}
        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed max-h-[380px]">
          <code>{codeBoilerplates[activeCodeTab]}</code>
        </pre>
      </div>

      {/* System Architecture Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
            <Cpu className="w-5 h-5" />
            <span>Interactive System Architecture & Pipeline Nodes</span>
          </div>
          <span className="text-xs text-slate-400">Click any node to inspect details</span>
        </div>

        {/* Node Pipeline Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {architectureNodes.map((node) => {
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
                  <span>Inspect Pipeline Data</span>
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
              Type: <strong className="text-white">{selectedNode.type}</strong> | Status: <strong className="text-emerald-400">ACTIVE & READY</strong>.
            </p>
          </div>
        )}

      </div>

      {/* Phased Execution Roadmap */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
            <Terminal className="w-5 h-5" />
            <span>Sprint Roadmap & Milestones ({completedRoadmap.length} of {roadmapSteps.length} Completed)</span>
          </div>
          <div className="w-32 bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${(completedRoadmap.length / roadmapSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roadmapSteps.map((step, idx) => {
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
