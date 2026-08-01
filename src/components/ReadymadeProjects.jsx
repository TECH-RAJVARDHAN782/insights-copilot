import React, { useState } from 'react';
import { Rocket, ExternalLink, Download, Copy, Check, Star, GitFork, ShieldCheck, Sparkles, Database, Code } from 'lucide-react';
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

  const activeProjects = projectData
    ? [
        {
          id: 'dynamic-search-project',
          title: projectData.title,
          tagline: projectData.tagline,
          category: 'Software / Artificial Intelligence',
          stars: 1240,
          forks: 380,
          repoUrl: `https://github.com/TECH-RAJVARDHAN782/insights-copilot`,
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
          <span>Student Repository Catalog</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Project Hub
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Explore readymade student repositories, open-source codebases, and hackathon project templates.
        </p>
      </div>

      {/* Recommended Banner if Custom Project Searched */}
      {projectData && (
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-indigo-600" />
            <span className="font-extrabold text-slate-900">Recommended for your search:</span>
            <span className="text-indigo-700 font-bold">{projectData.title}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            100% Ready To Use
          </span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map((proj) => {
          const cloneUrl = proj.cloneCmd || `git clone ${proj.repoUrl || proj.githubUrl}.git`;
          const targetDemo = proj.demoUrl || proj.repoUrl || 'https://insights-copilot-chi.vercel.app';
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
                    href={targetDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <span>Launch Repository / Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopyClone(cloneUrl, proj.id)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-1 border border-slate-300 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
