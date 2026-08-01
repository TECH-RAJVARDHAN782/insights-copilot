import React, { useState } from 'react';
import { Rocket, ExternalLink, Download, Copy, Check, Star, GitFork, ShieldCheck, Sparkles, Database, Code, Github, Search } from 'lucide-react';
import { READYMADE_PROJECTS_CATALOG } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function ReadymadeProjects({ projectData, activeIdeaId, onSelectProject, currentLang = 'en' }) {
  const [copiedClone, setCopiedClone] = useState(null);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleCopyClone = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopiedClone(id);
    setTimeout(() => setCopiedClone(null), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const projectTitle = projectData?.title || "Hospital Management";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const liveGithubSearchUrl = `https://github.com/search?q=${encodeURIComponent(projectTitle)}&type=repositories`;

  const activeProjects = projectData
    ? [
        {
          id: 'dynamic-search-project',
          title: `${projectTitle} Starter Repository`,
          tagline: projectData.tagline || `Production-ready codebase template for ${projectTitle}.`,
          category: 'Software / Artificial Intelligence',
          stars: 1480,
          forks: 420,
          repoUrl: `https://github.com/TECH-RAJVARDHAN782/insights-copilot`,
          searchUrl: liveGithubSearchUrl,
          cloneCmd: `git clone https://github.com/TECH-RAJVARDHAN782/insights-copilot.git`,
          demoUrl: 'https://insights-copilot-chi.vercel.app',
          techStack: [projectData.architecture?.frontend || 'React 18', 'Node.js Express', 'Python FastAPI']
        },
        ...READYMADE_PROJECTS_CATALOG
      ]
    : READYMADE_PROJECTS_CATALOG;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Student Repository Catalog & Live GitHub Integrations</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Project Hub
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Explore query-matched GitHub repositories, clone commands, and ready-to-run student codebases.
        </p>
      </div>

      {/* DYNAMIC SEARCHED QUERY REPOSITORY BANNER */}
      {projectData && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-indigo-500/40 text-white space-y-3 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <Github className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                  SEARCHED QUERY MATCH: {projectTitle.toUpperCase()}
                </span>
                <h3 className="text-base font-black text-white mt-1">Live GitHub Repository & Codebase</h3>
              </div>
            </div>

            <a
              href={liveGithubSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Explore Live GitHub Repos for "{projectTitle}" ↗</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 truncate">
              <Code className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-bold truncate">git clone https://github.com/TECH-RAJVARDHAN782/insights-copilot.git</span>
            </div>
            <button
              onClick={() => handleCopyClone(`git clone https://github.com/TECH-RAJVARDHAN782/insights-copilot.git`, 'searched-banner')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center space-x-1 border border-slate-700 cursor-pointer shrink-0"
            >
              {copiedClone === 'searched-banner' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedClone === 'searched-banner' ? "Copied!" : "Copy Clone Command"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map((proj) => {
          const cloneUrl = proj.cloneCmd || `git clone ${proj.repoUrl || 'https://github.com/TECH-RAJVARDHAN782/insights-copilot'}.git`;
          const targetRepo = proj.repoUrl || 'https://github.com/TECH-RAJVARDHAN782/insights-copilot';
          const searchLink = proj.searchUrl || liveGithubSearchUrl;

          return (
            <div
              key={proj.id}
              className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 transition-all space-y-4 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {proj.category}
                  </span>
                  <div className="flex items-center space-x-3 text-xs text-slate-600 font-bold">
                    <span className="flex items-center space-x-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /><span>{proj.stars}</span></span>
                    <span className="flex items-center space-x-1"><GitFork className="w-3.5 h-3.5 text-indigo-600" /><span>{proj.forks}</span></span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900">{proj.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">{proj.tagline || proj.description}</p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-mono font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Clone Box */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800">
                  <span className="truncate mr-2 font-bold">{cloneUrl}</span>
                  <button
                    onClick={() => handleCopyClone(cloneUrl, proj.id)}
                    className="p-1 rounded hover:bg-slate-200 text-indigo-600 font-bold cursor-pointer shrink-0"
                  >
                    {copiedClone === proj.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <a
                    href={targetRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <span>View GitHub Repo ↗</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={searchLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1 shadow-sm cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Live Search</span>
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
