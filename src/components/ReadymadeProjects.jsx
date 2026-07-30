import React, { useState } from 'react';
import { Rocket, Github, ExternalLink, Download, Code, Check, Star, GitFork, Sparkles } from 'lucide-react';
import { READYMADE_PROJECTS_CATALOG } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function ReadymadeProjects({ projectData, activeIdeaId, onSelectProject, currentLang = 'en' }) {
  const [copiedId, setCopiedId] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const categories = ['All', 'AI & Sustainability', 'Healthcare & Mobile AI', 'Cybersecurity & Web3', 'EdTech & NLP'];

  // Dynamically generate projects array based on whether user has searched for a topic or is using default
  const isCustomSearch = activeIdeaId && activeIdeaId !== 'food-waste' && projectData;

  const displayProjects = isCustomSearch ? [
    {
      id: `searched-1`,
      title: `${projectData.title} — Production Starter Repository`,
      category: "Searched Project",
      description: `Complete readymade production repo tailored for ${projectData.title}. Features automated pipeline, Live MongoDB Atlas connection, and pre-trained AI models.`,
      techStack: [projectData.architecture.frontend, projectData.architecture.backend, "MongoDB Atlas", projectData.architecture.aiModels[0] || "AI Model"],
      githubUrl: `https://github.com/insights-copilot/${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-starter`,
      demoUrl: `https://${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.vercel.app`,
      stars: "2.8k",
      forks: 520,
      downloadFiles: ["server.js", "model_pipeline.py", "docker-compose.yml", "seed_mongo.js"]
    },
    {
      id: `searched-2`,
      title: `${projectData.title} — Mobile Companion App & PWA`,
      category: "Mobile & Edge AI",
      description: `Offline-first mobile PWA & React Native template with SQLite/Realm sync to MongoDB Atlas and on-device TFLite inference for ${projectData.title}.`,
      techStack: ["React Native", "MongoDB Atlas Sync", "TFLite Edge AI", "PWA Worker"],
      githubUrl: `https://github.com/insights-copilot/${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-mobile`,
      demoUrl: `https://${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-mobile.vercel.app`,
      stars: "2.1k",
      forks: 340,
      downloadFiles: ["App.tsx", "tflite_runtime.tflite", "realm_sync.js"]
    },
    {
      id: `searched-3`,
      title: `${projectData.title} — Microservices API & Agent Bot`,
      category: "Backend & Webhooks",
      description: `Asynchronous FastAPI microservices and WhatsApp/Telegram webhook bot for real-time alerts and automated student notifications.`,
      techStack: ["Node.js Express", "FastAPI Python", "MongoDB Atlas", "WhatsApp Business API"],
      githubUrl: `https://github.com/insights-copilot/${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-api`,
      demoUrl: `https://${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-api.vercel.app`,
      stars: "1.9k",
      forks: 290,
      downloadFiles: ["main_server.js", "whatsapp_webhook.js", "mongo_collections.json"]
    },
    {
      id: `searched-4`,
      title: `${projectData.title} — Analytics & Admin Dashboard`,
      category: "Dashboard & Analytics",
      description: `React 18 admin & student dashboard with interactive Recharts, live MongoDB Atlas data feeds, and pitch deck exporter.`,
      techStack: ["React 18", "Tailwind CSS", "Recharts", "MongoDB Atlas Data API"],
      githubUrl: `https://github.com/insights-copilot/${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-dashboard`,
      demoUrl: `https://${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-dash.vercel.app`,
      stars: "1.6k",
      forks: 210,
      downloadFiles: ["Dashboard.jsx", "RechartsFeed.jsx", "mongo_query.js"]
    }
  ] : READYMADE_PROJECTS_CATALOG;

  const filteredProjects = selectedFilter === 'All'
    ? displayProjects
    : displayProjects.filter(p => p.category === selectedFilter || isCustomSearch);

  const handleCopyClone = (repoUrl, id) => {
    const cloneCmd = `git clone ${repoUrl}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadCodeZip = (projectTitle, fileName) => {
    setDownloadingFile(`${projectTitle}-${fileName}`);
    setTimeout(() => {
      const sampleCode = `// Readymade Starter File for ${projectTitle}\n// Connected to Live MongoDB Atlas Cluster\n\nconst mongoose = require('mongoose');\nconsole.log("Ready-to-use project loaded!");`;
      const element = document.createElement("a");
      const file = new Blob([sampleCode], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = fileName || "readymade-project.js";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingFile(null);
      confetti({ particleCount: 40, spread: 50 });
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-3 border border-indigo-500/30">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold">
          <Rocket className="w-4 h-4 text-cyan-400" />
          <span>iNSIGHTS Readymade Projects Library</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {isCustomSearch ? `Readymade Projects for "${projectData.title}"` : t.readymadeHeader}
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl">
          {isCustomSearch
            ? `Displaying 4 readymade production repositories, mobile templates, APIs, and dashboards dynamically generated for your search topic "${projectData.title}".`
            : t.readymadeDesc}
        </p>

        {/* Category Filters */}
        {!isCustomSearch && (
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DYNAMIC SEARCH RECOMMENDATION BANNER */}
      {isCustomSearch && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 bg-slate-900/90 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Searched Topic Recommended Readymade Repo
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold">100% Ready-to-Clone & Run</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-base">{projectData.title} Complete Readymade Repo</h4>
              <p className="text-xs text-slate-400 mt-0.5">{projectData.tagline}</p>
              <div className="flex gap-2 pt-2 text-[11px] text-cyan-300 font-mono">
                <span>Frontend: React 18</span> • <span>Backend: Node/Express</span> • <span>DB: MongoDB Atlas</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleDownloadCodeZip(projectData.title, "starter_project.js")}
                className="py-2 px-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-cyan-600/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadCode}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4 hover:border-indigo-500/40 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {project.category}
                </span>
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-amber-300"><Star className="w-3.5 h-3.5 fill-current" /> {project.stars}</span>
                  <span className="flex items-center gap-1 text-slate-300"><GitFork className="w-3.5 h-3.5" /> {project.forks}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">{project.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 font-mono border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              
              {/* Clone Command Bar */}
              <div className="flex items-center bg-slate-950 p-2 rounded-xl border border-slate-800 justify-between text-xs font-mono text-slate-300">
                <span className="truncate pr-2 text-cyan-400">git clone {project.githubUrl}.git</span>
                <button
                  onClick={() => handleCopyClone(project.githubUrl, project.id)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-sans text-[11px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedId === project.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3" />}
                  <span>{copiedId === project.id ? t.copied : t.copyClone}</span>
                </button>
              </div>

              {/* Quick Downloads & Links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-cyan-600/20"
                >
                  <span>{t.launchDemo}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleDownloadCodeZip(project.title, project.downloadFiles[0])}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{downloadingFile ? "Preparing Zip..." : t.downloadCode}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
