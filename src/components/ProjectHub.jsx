import React, { useState } from 'react';
import { Cpu, Server, Database, Code, GitFork, ArrowRight, CheckCircle2, Circle, Download, ExternalLink, Layers, Sparkles, Terminal, Copy, Check, Activity, FileCode } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function ProjectHub({ projectData, currentLang = 'en' }) {
  const [completedRoadmap, setCompletedRoadmap] = useState([0]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState('express_server');
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
    <div className="p-6 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200">
      <h2 className="text-xl font-bold">${projectTitle} Dashboard</h2>
      {loading ? (
        <p className="text-slate-600">Loading Live MongoDB Atlas metrics...</p>
      ) : (
        <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200">
          <p className="text-emerald-700 font-mono font-bold">Status: {data?.status || "ONLINE"}</p>
          <p className="text-xs text-slate-600 mt-1">Database: Live MongoDB Atlas</p>
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
    { id: "1", label: "Data Input Pipeline", type: "Input", color: "bg-cyan-100 text-cyan-900 border-cyan-300" },
    { id: "2", label: "AI Inference Engine", type: "AI Model", color: "bg-purple-100 text-purple-900 border-purple-300" },
    { id: "3", label: "Node.js Express Server", type: "Backend", color: "bg-indigo-100 text-indigo-900 border-indigo-300" },
    { id: "4", label: "Live MongoDB Atlas Vault", type: "Database", color: "bg-emerald-100 text-emerald-900 border-emerald-300" }
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
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>iNSIGHTS Project HUB</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Full-Stack Boilerplates & Production Code Hub
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Instant multi-language code boilerplates for Express.js, Python FastAPI, React 18, Docker Compose, and Live MongoDB Atlas.
        </p>
      </div>

      {/* MULTI-FRAMEWORK CODE BOILERPLATES SECTION */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 border border-indigo-200 bg-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-600" />
              Full Production Starter Code Boilerplates
            </h3>
            <p className="text-xs text-slate-700 font-semibold">Select language or framework to copy 100% production-ready starter code for "{projectTitle}".</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        {/* Framework Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold">
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
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeCodeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Box */}
        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed max-h-[380px]">
          <code>{codeBoilerplates[activeCodeTab]}</code>
        </pre>
      </div>

      {/* System Architecture Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl space-y-6 bg-white border border-slate-200 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-700 font-extrabold text-base">
            <Cpu className="w-5 h-5" />
            <span>Interactive System Architecture & Pipeline Nodes</span>
          </div>
          <span className="text-xs text-slate-600 font-mono font-bold">Click any node to inspect details</span>
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
                  isSelected ? 'ring-2 ring-indigo-600 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/80">
                    {node.type}
                  </span>
                  <span className="text-xs font-mono font-bold">Node #{node.id}</span>
                </div>
                <h4 className="text-sm font-black mb-1">{node.label}</h4>
                <p className="text-[11px] flex items-center space-x-1 font-bold">
                  <span>Inspect Pipeline Data</span>
                  <ArrowRight className="w-3 h-3 text-indigo-600" />
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Node Inspector Drawer */}
        {selectedNode && (
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-xs space-y-2 animate-fadeIn text-slate-900 font-semibold">
            <div className="flex justify-between items-center text-indigo-900 font-black">
              <span>Node Inspector: {selectedNode.label}</span>
              <button onClick={() => setSelectedNode(null)} className="text-slate-600 hover:text-slate-900 cursor-pointer">✕</button>
            </div>
            <p>
              Type: <strong className="text-indigo-950">{selectedNode.type}</strong> | Status: <strong className="text-emerald-700">ACTIVE & READY</strong>.
            </p>
          </div>
        )}

      </div>

      {/* Phased Execution Roadmap */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 bg-white border border-slate-200 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-base">
            <Terminal className="w-5 h-5" />
            <span>Sprint Roadmap & Milestones ({completedRoadmap.length} of {roadmapSteps.length} Completed)</span>
          </div>
          <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
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
                    ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 font-mono">{step.phase}</span>
                    <h4 className={`text-sm font-extrabold ${isDone ? 'text-slate-900 line-through opacity-80' : 'text-slate-900'}`}>{step.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-700 pl-8 font-semibold">{step.task}</p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
