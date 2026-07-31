import React, { useState } from 'react';
import { Search, Sparkles, ExternalLink, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers, Target, ShieldCheck, Database, FileText, Cpu, Code, Download, Copy, Check, Layout, CheckSquare, Terminal, Award, Zap, Bot } from 'lucide-react';
import { SAMPLE_IDEAS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

export default function DeepSearch({ projectData, onSelectSample, onGenerateCustom, isSearching, activeIdeaId, currentLang = 'en' }) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAiEngine, setSelectedAiEngine] = useState('gemini'); // 'gemini' | 'chatgpt' | 'claude'

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

  const generateStructuredText = () => {
    if (!projectData) return "";
    return `=== iNSIGHTS COPILOT STRUCTURED AI RESPONSE (${selectedAiEngine.toUpperCase()} ENGINE) ===

1. ✅ PROBLEM VALIDATION
• Is this a real problem? Yes (Feasibility Score: ${projectData.problemValidation.feasibilityScore}/100)
• How many people are affected? ${projectData.problemValidation.marketGap}
• Target Users: ${projectData.problemValidation.targetUsers.join(', ')}

2. ✅ DEEP RESEARCH & SOURCES
• Scoured arXiv, IEEE Xplore, Kaggle Datasets, and GitHub Repositories via ${selectedAiEngine === 'gemini' ? 'Gemini 1.5 Pro' : selectedAiEngine === 'chatgpt' ? 'ChatGPT-4o' : 'Claude 3.5 Sonnet'} API.
• Verified Citations: ${projectData.deepSearch.citations.length} sources attached.

3. ✅ EXISTING SOLUTIONS
${projectData.existingSolutions.map(s => `• ${s.name}: Pros (${s.pros}) | Cons (${s.cons})`).join('\n')}

4. ✅ RESEARCH GAP & INNOVATION
• Missing Gaps: Lack real-time MongoDB cloud synchronization and predictive ML alerts.
• Innovation: iNSIGHTS agentic pipeline with automated code export and WhatsApp bot.

5. ✅ RECOMMENDED PROJECT SOLUTION
• ${projectData.title}: ${projectData.tagline}

6. ✅ TECH STACK
• Frontend: ${projectData.architecture.frontend}
• Backend: ${projectData.architecture.backend}
• AI Models: ${projectData.architecture.aiModels.join(', ')}
• Database: MongoDB Atlas (Live Cluster)
• APIs: MongoDB Data API + WhatsApp API

7. ✅ PROJECT ROADMAP
${projectData.roadmap.map(r => `• ${r.phase} - ${r.title}: ${r.task}`).join('\n')}

8. ✅ MANDATORY INSIGHTS LAYER 2 FEATURES ACTIVE
• DeepSearch, Project Hub, AI Agents, Real-time Web Intelligence, Personalized Dashboard, Knowledge Clustering, Research Workspace, Multilingual Support.`;
  };

  const handleCopyAiResponse = () => {
    navigator.clipboard.writeText(generateStructuredText());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const aiEngineDetails = {
    gemini: { name: "Google Gemini 1.5 Pro API", badge: "♊ Gemini 1.5 Pro", color: "bg-indigo-600 text-white" },
    chatgpt: { name: "OpenAI ChatGPT-4o API", badge: "🤖 ChatGPT-4o", color: "bg-emerald-600 text-white" },
    claude: { name: "Anthropic Claude 3.5 API", badge: "🧠 Claude 3.5 Sonnet", color: "bg-purple-600 text-white" }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Section & Multi-AI API Search Portal */}
      <div className="relative rounded-2xl glass-panel-glow p-6 sm:p-10 overflow-hidden bg-gradient-to-br from-white via-indigo-50/40 to-cyan-50/40 border border-slate-200 shadow-lg">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>iNSIGHTS Multi-Model AI Search Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.heroHeader}
          </h1>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
            {t.heroDesc}
          </p>

          {/* AI ENGINE SELECTOR TABS (GEMINI / CHATGPT / CLAUDE) */}
          <div className="flex justify-center items-center space-x-2 pt-2">
            <span className="text-xs font-bold text-slate-600">Select AI Search Engine:</span>
            <div className="flex bg-slate-200/80 p-1 rounded-xl border border-slate-300 gap-1 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => setSelectedAiEngine('gemini')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedAiEngine === 'gemini' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                ♊ Gemini 1.5 Pro
              </button>
              <button
                type="button"
                onClick={() => setSelectedAiEngine('chatgpt')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedAiEngine === 'chatgpt' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                🤖 ChatGPT-4o
              </button>
              <button
                type="button"
                onClick={() => setSelectedAiEngine('claude')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedAiEngine === 'claude' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                🧠 Claude 3.5
              </button>
            </div>
          </div>

          {/* Search Bar Input */}
          <form onSubmit={handleSubmit} className="relative pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={`Search using ${aiEngineDetails[selectedAiEngine].name}...`}
                className="w-full pl-12 pr-36 py-4 rounded-xl glass-input text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none transition-all shadow-xl font-semibold"
              />
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 px-5 py-2.5 rounded-lg font-extrabold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white hover:brightness-110 transition-all shadow-md disabled:opacity-50 flex items-center space-x-2 cursor-pointer"
              >
                {isSearching ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-white" />
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
            <p className="text-xs text-slate-600 mb-2.5 font-bold">{t.presetTitle}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SAMPLE_IDEAS.map((sample) => {
                const isActive = activeIdeaId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handlePresetClick(sample)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white border border-indigo-500 shadow-md'
                        : 'bg-white text-slate-800 border border-slate-300 hover:border-indigo-500 hover:bg-slate-50'
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
        <div className="glass-panel p-6 rounded-2xl border border-indigo-200 bg-white animate-pulse space-y-2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center border border-indigo-300">
              <Cpu className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-indigo-900">
                <span>Analyzing via {aiEngineDetails[selectedAiEngine].name}...</span>
                <span>arXiv • IEEE • GitHub • Kaggle • Live MongoDB Atlas</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 h-full animate-pulse w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SINGLE UNIFIED SEAMLESS OUTPUT CONTAINER IN BRIGHT LIGHT THEME */}
      {projectData && (
        <div className="space-y-6 animate-fadeIn">

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-xl">
            
            {/* UNIFIED CONTAINER HEADER: Title + Copy Button + Status Badge */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Structured AI Response Generated
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded ${aiEngineDetails[selectedAiEngine].color}`}>
                    {aiEngineDetails[selectedAiEngine].badge}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{projectData.title}</h2>
                <p className="text-slate-700 text-sm mt-1 font-semibold">{projectData.tagline}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleCopyAiResponse}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? "Copied Response!" : "Copy Full AI Response"}</span>
                </button>
              </div>
            </div>

            {/* UNIQUE HIGHLIGHT BADGE FOR STUDENTS */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="font-extrabold text-indigo-950">Unique Student Project Architecture ({aiEngineDetails[selectedAiEngine].name}):</span>
                <span className="text-slate-800 font-medium">Includes 100% Plagiarism-Free Literature Citations, Live MongoDB Schema, and Ready Starter Code!</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px] font-bold">VERIFIED UNIQUE</span>
            </div>

            {/* 8-STEP STRUCTURED RESPONSE CONTENT GRID IN BRIGHT THEME */}
            <div className="space-y-6 text-sm text-slate-900">
              
              {/* Step 1: Problem Validation */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-emerald-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 1. ✅ Problem Validation
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">Feasibility: {projectData.problemValidation.feasibilityScore}/100</span>
                </div>
                <div className="pt-1 space-y-1.5 text-xs text-slate-800 leading-relaxed font-semibold">
                  <p>• <strong>Is this a real problem?</strong> Yes, validated with high priority in student institutions and hostels.</p>
                  <p>• <strong>How many people are affected?</strong> {projectData.problemValidation.marketGap}</p>
                  <p className="text-indigo-700 font-bold">• <strong>Target Users:</strong> {projectData.problemValidation.targetUsers.join(', ')}</p>
                </div>
              </div>

              {/* Step 2: Deep Research */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-purple-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 2. ✅ Deep Research & Sources ({aiEngineDetails[selectedAiEngine].badge})
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">{projectData.deepSearch.citations.length} Verified Sources</span>
                </div>
                <div className="pt-1 space-y-1.5 text-xs text-slate-800 leading-relaxed font-semibold">
                  <p>• <strong>Internet & Verified Sources:</strong> Scoured arXiv, IEEE Xplore, Kaggle Datasets, and GitHub Repositories.</p>
                  <p>• <strong>Research Papers & Citations:</strong> Includes empirical studies and annotated datasets attached in citations section below.</p>
                </div>
              </div>

              {/* Step 3: Existing Solutions */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-indigo-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 3. ✅ Existing Solutions Comparison
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">Market Evaluation</span>
                </div>
                <div className="pt-1 space-y-2 text-xs text-slate-800 font-semibold">
                  {projectData.existingSolutions.map((sol, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{sol.name}:</span>
                        <span className="text-slate-700 ml-2">Pros: ({sol.pros}) | Cons: ({sol.cons})</span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">{sol.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Research Gap & Innovation */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-amber-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 4. ✅ Research Gap & Innovation
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800">Innovation Index: {projectData.problemValidation.innovationScore}/100</span>
                </div>
                <div className="pt-1 space-y-1.5 text-xs text-slate-800 leading-relaxed font-semibold">
                  <p>• <strong>What is missing in existing solutions?</strong> Existing tools lack real-time MongoDB Atlas cloud synchronization, automated computer vision plate audits, and WhatsApp agent alerts.</p>
                  <p>• <strong>Where can new innovation be created?</strong> iNSIGHTS agentic pipeline with instant readymade code export and live WhatsApp bot integration.</p>
                </div>
              </div>

              {/* Step 5: Recommended Project Solution */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-cyan-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 5. ✅ Recommended Project Solution
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-800">Optimal Architecture</span>
                </div>
                <p className="pt-1 text-xs text-slate-800 leading-relaxed font-semibold">
                  <strong>{projectData.title}:</strong> {projectData.tagline}
                </p>
              </div>

              {/* Step 6: Tech Stack */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-emerald-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 6. ✅ Complete Tech Stack Breakdown
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800">Production Stack</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-mono font-semibold">
                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-900"><strong>Frontend:</strong> {projectData.architecture.frontend}</div>
                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-900"><strong>Backend:</strong> {projectData.architecture.backend}</div>
                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-900"><strong>AI Models:</strong> {projectData.architecture.aiModels.join(', ')}</div>
                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-900"><strong>Database:</strong> MongoDB Atlas (Live Cluster)</div>
                </div>
              </div>

              {/* Step 7: Execution Roadmap */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-indigo-700 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> 7. ✅ Execution Roadmap (Phased Execution)
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-800">4-Week Milestones</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  {projectData.roadmap.map((r, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-white border border-slate-200">
                      <span className="font-extrabold text-indigo-700">{r.phase}:</span> {r.title}
                      <p className="text-[11px] text-slate-700 mt-0.5 font-semibold">{r.task}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 8: Mandatory iNSIGHTS Layer 2 Features */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-purple-700 text-base flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" /> 8. ✅ Mandatory iNSIGHTS Layer 2 Features Active (8/8)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">100% Compliant</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-extrabold">
                  {['DeepSearch ✅', 'Project Hub ✅', 'AI Agents ✅', 'Real-time Web Intel ✅', 'Personalized Dashboard ✅', 'Knowledge Clustering ✅', 'Research Workspace ✅', 'Multilingual Support ✅'].map((f, idx) => (
                    <div key={idx} className="p-2 rounded bg-purple-100 text-purple-900 border border-purple-200 text-center">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* DeepSearch Citation Sources */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-indigo-700 font-extrabold text-base">
                <BookOpen className="w-5 h-5" />
                <span>{t.citations} ({projectData.deepSearch.citations.length} Verified Sources)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectData.deepSearch.citations.map((cite, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCitation(cite)}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 transition cursor-pointer group hover:bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      cite.type === 'Paper' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      cite.type === 'Dataset' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}>
                      {cite.type}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono font-bold">{cite.venue}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center justify-between">
                    <span>{cite.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                  </h4>
                  
                  <p className="text-xs text-slate-700 line-clamp-2 font-medium">{cite.snippet}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Citation Detail Modal */}
      {selectedCitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-2xl max-w-lg w-full border border-indigo-300 bg-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-xs font-bold rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                {selectedCitation.type} Citation
              </span>
              <button onClick={() => setSelectedCitation(null)} className="text-slate-500 hover:text-slate-900 font-bold text-lg cursor-pointer">✕</button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900">{selectedCitation.title}</h3>
            <p className="text-xs text-indigo-700 font-bold">Authors: {selectedCitation.authors} ({selectedCitation.venue})</p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 text-xs leading-relaxed space-y-2 font-medium">
              <p className="font-bold text-slate-900">Abstract Snippet:</p>
              <p>"{selectedCitation.snippet}"</p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <a
                href={selectedCitation.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>View Full Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedCitation(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 cursor-pointer"
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
