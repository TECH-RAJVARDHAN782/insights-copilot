import React, { useState } from 'react';
import { Search, Sparkles, ExternalLink, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers, Target, ShieldCheck, Database, FileText, Cpu, Code, Download, Copy, Check } from 'lucide-react';
import { SAMPLE_IDEAS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function DeepSearch({ projectData, onSelectSample, onGenerateCustom, isSearching, activeIdeaId, currentLang = 'en' }) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    onGenerateCustom(inputPrompt);
  };

  const handlePresetClick = (sample) => {
    setInputPrompt(sample.prompt);
    onSelectSample(sample.id);
  };

  const handleCopyAiResponse = () => {
    if (!projectData) return;
    const textToCopy = `# ${projectData.title}\n\n${projectData.tagline}\n\n## Market Gap\n${projectData.problemValidation.marketGap}\n\n## Tech Stack\nFrontend: ${projectData.architecture.frontend}\nBackend: ${projectData.architecture.backend}\nDatabase: Live MongoDB Atlas`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Section & Multilingual Search Bar */}
      <div className="relative rounded-2xl glass-panel-glow p-6 sm:p-8 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>iNSIGHTS DeepSearch Layer 2</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.heroHeader}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.heroDesc}
          </p>

          {/* Search Bar Input */}
          <form onSubmit={handleSubmit} className="relative pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-36 py-4 rounded-xl glass-input text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none transition-all shadow-xl"
              />
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-md shadow-indigo-500/30 disabled:opacity-50 flex items-center space-x-2 cursor-pointer"
              >
                {isSearching ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>{t.searching}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.searchBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Presets */}
          <div className="pt-2">
            <p className="text-xs text-slate-400 mb-2.5 font-medium">{t.presetTitle}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SAMPLE_IDEAS.map((sample) => {
                const isActive = activeIdeaId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handlePresetClick(sample)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white border border-indigo-400 shadow-md shadow-indigo-500/30'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800'
                    }`}
                  >
                    💡 {sample.title}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* DeepSearch Scanning Radar Bar */}
      {isSearching && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 animate-pulse space-y-2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
              <Cpu className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-cyan-300">
                <span>{t.searching}</span>
                <span>arXiv • IEEE • GitHub • Kaggle • MongoDB Atlas</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-cyan-900">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full animate-pulse w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHATGPT / GEMINI / CLAUDE STYLE COMPREHENSIVE AI RESPONSE */}
      {projectData && (
        <div className="space-y-6">

          {/* Response Title & Action Header */}
          <div className="glass-panel p-6 rounded-2xl border border-indigo-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Layer 2 Verified
                </span>
                <span className="text-xs text-slate-400">Live MongoDB Atlas Ready</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{projectData.title}</h2>
              <p className="text-slate-300 text-sm mt-1">{projectData.tagline}</p>
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button
                onClick={handleCopyAiResponse}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? t.copied : t.copyResponse}</span>
              </button>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.feasibility}</p>
              <p className="text-2xl font-black text-cyan-400">{projectData.problemValidation.feasibilityScore}/100</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.innovation}</p>
              <p className="text-2xl font-black text-purple-400">{projectData.problemValidation.innovationScore}/100</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.impact}</p>
              <p className="text-2xl font-black text-emerald-400">{projectData.problemValidation.impactScore}/100</p>
            </div>
          </div>

          {/* Comprehensive AI Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Market Gap & Target Users */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>{t.marketGap}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                {projectData.problemValidation.marketGap}
              </p>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Target Users:</p>
                <div className="flex flex-wrap gap-2">
                  {projectData.problemValidation.targetUsers.map((user, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950/60 text-indigo-200 border border-indigo-800/50">
                      👥 {user}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pain Points Solved */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.painPoints}</span>
              </div>
              <ul className="space-y-2.5">
                {projectData.problemValidation.keyPainPoints.map((pain, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* DeepSearch Citation Summary */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
                <BookOpen className="w-5 h-5" />
                <span>{t.citations} ({projectData.deepSearch.citations.length} Verified Sources)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectData.deepSearch.citations.map((cite, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCitation(cite)}
                  className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group hover:bg-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      cite.type === 'Paper' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      cite.type === 'Dataset' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {cite.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{cite.venue}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                    <span>{cite.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </h4>
                  
                  <p className="text-xs text-slate-400 line-clamp-2">{cite.snippet}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Citation Detail Modal */}
      {selectedCitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-2xl max-w-lg w-full border border-cyan-500/40 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedCitation.type} Citation
              </span>
              <button onClick={() => setSelectedCitation(null)} className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>
            
            <h3 className="text-lg font-bold text-white">{selectedCitation.title}</h3>
            <p className="text-xs text-indigo-300">Authors: {selectedCitation.authors} ({selectedCitation.venue})</p>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2">
              <p className="font-semibold text-slate-200">Abstract Snippet:</p>
              <p>"{selectedCitation.snippet}"</p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <a
                href={selectedCitation.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <span>View Full Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedCitation(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
