import React, { useState } from 'react';
import { Cpu, Server, Database, Code, GitFork, ArrowRight, CheckCircle2, Circle, Download, ExternalLink, Layers, Sparkles, Terminal, Copy, Check } from 'lucide-react';

export default function ProjectHub({ projectData }) {
  const [completedRoadmap, setCompletedRoadmap] = useState([0]); // Phase 1 checked by default
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState('fastapi'); // 'fastapi' | 'docker' | 'schema'
  const [copiedCode, setCopiedCode] = useState(false);

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

  const { architecture, roadmap, datasets, githubRepos } = projectData;

  const codeBoilerplates = {
    fastapi: `# FastAPI Central Orchestrator for ${projectData.title}
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="${projectData.title} API", version="1.0.0")

class InferenceRequest(BaseModel):
    sensor_id: str
    payload: dict

@app.get("/health")
def health_check():
    return {"status": "online", "model_version": "v2.4", "feasibility": ${projectData.problemValidation.feasibilityScore}}

@app.post("/api/v1/inference")
async def run_inference(request: InferenceRequest, bg_tasks: BackgroundTasks):
    # Triggers YOLOv8 segmentation or forecasting pipeline
    return {
        "status": "success",
        "processed_id": request.sensor_id,
        "recommendation": "Batch meal prep reduced by 18%",
        "latency_ms": 32
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`,

    docker: `# Multi-stage Dockerfile for ${projectData.title}
FROM python:3.11-slim as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,

    schema: `-- PostgreSQL Database Schema for ${projectData.title}
CREATE TABLE IF NOT EXISTS daily_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sensor_id VARCHAR(50) NOT NULL,
    waste_weight_kg NUMERIC(6,2),
    attendance_headcount INT,
    ai_confidence NUMERIC(4,2)
);

CREATE INDEX idx_logs_timestamp ON daily_logs(timestamp);`
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
          <span>iNSIGHTS Project HUB Layer 2 Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          System Architecture & Execution Roadmap
        </h2>
        <p className="text-slate-300 text-sm">
          Auto-generated technology blueprint, data flow diagrams, API specifications, and ready-to-run code starter boilerplates.
        </p>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
            <Cpu className="w-5 h-5" />
            <span>Interactive System Architecture & Pipeline Nodes</span>
          </div>
          <span className="text-xs text-slate-400">Click any node to inspect data specs</span>
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
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-slate-300">
              Type: <strong className="text-white">{selectedNode.type}</strong> | Latency SLA: <strong className="text-emerald-400">&lt; 45ms</strong> | Protocols: REST / gRPC / PubSub.
            </p>
            {selectedNode.detail && (
              <p className="text-slate-400 italic bg-slate-950 p-2.5 rounded border border-slate-800">
                "{selectedNode.detail}"
              </p>
            )}
          </div>
        )}

      </div>

      {/* Code Boilerplate Exporter */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-400" />
              Auto-Generated Code Starter Boilerplate
            </h3>
            <p className="text-xs text-slate-400">Copy or download production-ready code to kickstart your hackathon repository.</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCodeTab('fastapi')}
                className={`px-3 py-1 rounded font-semibold transition ${activeCodeTab === 'fastapi' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                main.py
              </button>
              <button
                onClick={() => setActiveCodeTab('docker')}
                className={`px-3 py-1 rounded font-semibold transition ${activeCodeTab === 'docker' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                Dockerfile
              </button>
              <button
                onClick={() => setActiveCodeTab('schema')}
                className={`px-3 py-1 rounded font-semibold transition ${activeCodeTab === 'schema' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                schema.sql
              </button>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed">
          <code>{codeBoilerplates[activeCodeTab]}</code>
        </pre>
      </div>

      {/* Tech Stack Matrix & API Dependencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recommended Tech Stack Matrix */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
            <Code className="w-5 h-5" />
            <span>Recommended Technology Stack</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Frontend Layer</span>
              </div>
              <span className="font-mono text-cyan-300 text-right">{architecture.frontend}</span>
            </div>

            <div className="flex items-start justify-between bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400">
                <Server className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-slate-200">Backend API</span>
              </div>
              <span className="font-mono text-indigo-300 text-right">{architecture.backend}</span>
            </div>

            <div className="flex items-start justify-between bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Database & Cache</span>
              </div>
              <span className="font-mono text-emerald-300 text-right">{architecture.database}</span>
            </div>

            <div className="flex items-start justify-between bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-slate-200">AI / ML Models</span>
              </div>
              <div className="text-right">
                {architecture.aiModels.map((m, idx) => (
                  <span key={idx} className="inline-block bg-purple-950/60 text-purple-200 px-2 py-0.5 rounded text-[11px] font-mono ml-1 mb-1 border border-purple-800/40">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* API & External Integrations */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
            <Layers className="w-5 h-5" />
            <span>Third-Party APIs & Datasets</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-400">Integrated Microservices & External Gateways:</p>
            <div className="flex flex-wrap gap-2">
              {architecture.apis.map((api, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-300 border border-slate-800 text-xs font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{api}</span>
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <p className="text-xs font-bold text-slate-300">Recommended GitHub Repositories:</p>
              {githubRepos.map((repo, idx) => (
                <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-cyan-300 font-semibold">{repo.name}</span>
                    <p className="text-[11px] text-slate-400">{repo.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-slate-800 rounded text-amber-300 font-mono text-[11px]">★ {repo.stars}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Phased Execution Roadmap */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
            <Terminal className="w-5 h-5" />
            <span>Sprint Roadmap & Milestones ({completedRoadmap.length} of {roadmap.length} Completed)</span>
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
