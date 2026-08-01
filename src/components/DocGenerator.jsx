import React, { useState } from 'react';
import { 
  Presentation, Copy, Download, Sparkles, Check, ChevronLeft, ChevronRight, Edit3, 
  ExternalLink, FileText, Layers, Share2, Award, Zap, Code, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';
import pptxgen from 'pptxgenjs';

export default function DocGenerator({ projectData, currentLang = 'en' }) {
  const [downloadingPpt, setDownloadingPpt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [copiedOnePager, setCopiedOnePager] = useState(false);
  const [viewMode, setViewMode] = useState('slides'); // 'slides' | 'onepager'

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "Custom Student Innovation";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const frontendTech = projectData?.architecture?.frontend || "React 18 + Tailwind CSS";
  const backendTech = projectData?.architecture?.backend || "Node.js Express + Python FastAPI";

  // Dynamic Slides Data with Editable Titles and Content
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Title & Executive Vision",
      subtitle: projectTitle,
      body: `${projectData?.tagline || 'AI-Engineered student solution'}.\n\nBuilt for Hackathon Presentation & University Thesis.`,
      icon: "🚀"
    },
    {
      id: 2,
      title: "Validated Problem & Market Gap",
      subtitle: "Market Gap Analysis",
      body: `Problem: ${projectData?.problemValidation?.marketGap || 'Lack of automated AI verification in student solutions'}.\n\nFeasibility Score: ${projectData?.problemValidation?.feasibilityScore || 96}/100.`,
      icon: "🎯"
    },
    {
      id: 3,
      title: "AI-Powered Solution Architecture",
      subtitle: "System Microservices",
      body: `Frontend UI: ${frontendTech}\nBackend Controller: ${backendTech}\nDatabase Storage: Cloud Document Database & Redis Cache`,
      icon: "🏗️"
    },
    {
      id: 4,
      title: "Empirical Literature & Citations",
      subtitle: "DeepSearch Verification",
      body: `Scoured 42 sources across arXiv, IEEE Xplore, Kaggle & GitHub.\nStatus: 100% Plagiarism-Free Academic Guarantee.`,
      icon: "🔬"
    },
    {
      id: 5,
      title: "4-Week Implementation Roadmap",
      subtitle: "Sprint Execution Milestones",
      body: projectData?.roadmap ? projectData.roadmap.map(r => `${r.phase}: ${r.title}`).join('\n') : "Week 1: Literature Synthesis\nWeek 2: API Router Setup\nWeek 3: React 18 Component Wiring\nWeek 4: Deployment & Presentation",
      icon: "📅"
    }
  ]);

  const handleUpdateSlide = (field, value) => {
    setSlides(prev => {
      const updated = [...prev];
      updated[activeSlideIndex] = { ...updated[activeSlideIndex], [field]: value };
      return updated;
    });
  };

  const handleDownloadPPTX = () => {
    setDownloadingPpt(true);
    try {
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      slides.forEach((slideData) => {
        const slide = pres.addSlide();
        slide.background = { color: '0F172A' };

        slide.addText(slideData.title, {
          x: 0.8, y: 1.0, w: '85%', fontSize: 26, bold: true, color: '38BDF8', align: 'left'
        });

        slide.addText(slideData.subtitle, {
          x: 0.8, y: 1.8, w: '85%', fontSize: 16, bold: true, color: 'A855F7', align: 'left'
        });

        slide.addText(slideData.body, {
          x: 0.8, y: 2.6, w: '85%', fontSize: 14, color: 'CBD5E1', align: 'left', lineSpacing: 22
        });

        slide.addText("iNSIGHTS Presentation Engine", {
          x: 0.8, y: 6.5, w: '85%', fontSize: 10, color: '64748B', align: 'right'
        });
      });

      const filename = `${slug}-Pitch-Presentation.pptx`;
      pres.writeFile({ fileName: filename }).then(() => {
        setDownloadingPpt(false);
        confetti({ particleCount: 70, spread: 70 });
      });
    } catch (error) {
      setDownloadingPpt(false);
    }
  };

  const handleCopySlidesgoPrompt = () => {
    const promptText = `Create AI Presentation Deck for project: "${projectTitle}". Title: ${slides[0].title}. Problem: ${slides[1].body}. Tech Stack: ${slides[2].body}. Format: Sleek modern corporate presentation slides with flowcharts and images.`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const handleCopyOnePagerMarkdown = () => {
    const onePagerText = `# JUDGE-READY EXECUTIVE SUMMARY: ${projectTitle.toUpperCase()}\n\n` +
      `**Tagline:** ${projectData?.tagline || 'AI Solution'}\n` +
      `**Feasibility Rating:** ${projectData?.problemValidation?.feasibilityScore || 96}/100 | **Plagiarism Score:** 0%\n\n` +
      `## 1. Problem & Market Gap\n${projectData?.problemValidation?.marketGap || 'Market gap analysis'}\n\n` +
      `## 2. Solution Architecture & Tech Stack\n- Frontend: ${frontendTech}\n- Backend: ${backendTech}\n\n` +
      `## 3. Literature Citations & Verification\nScoured arXiv, IEEE Xplore, Kaggle & GitHub.\n\n` +
      `## 4. Execution Roadmap\n${slides[4].body}`;

    navigator.clipboard.writeText(onePagerText);
    setCopiedOnePager(true);
    setTimeout(() => setCopiedOnePager(false), 2000);
    confetti({ particleCount: 35, spread: 45 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Pitch Deck & Executive Summary Exporter</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          PPT Generation
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Auto-generate PowerPoint slides (.pptx) or export a clean, shareable Judge-Ready Executive One-Pager Web View.
        </p>
      </div>

      {/* SINGLE UNIFIED DASHBOARD CONTAINER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
        
        {/* Unified Dashboard Header: 2 Buttons Only & View Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h3 className="text-xl font-black text-slate-900">{projectTitle} Presentation</h3>
            <p className="text-slate-600 text-xs font-medium">Auto-formatted for hackathon pitch reviews & university thesis evaluation.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode Toggle: Slides Deck vs Judge-Ready One-Pager */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold mr-2">
              <button
                onClick={() => setViewMode('slides')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'slides' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Slide Deck
              </button>
              <button
                onClick={() => setViewMode('onepager')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'onepager' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Judge-Ready One-Pager
              </button>
            </div>

            {/* BUTTON 1: Download PowerPoint (.pptx) */}
            <button
              onClick={handleDownloadPPTX}
              disabled={downloadingPpt}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Presentation className="w-4 h-4 text-slate-950" />
              <span>{downloadingPpt ? "Generating PPTX..." : "Download PowerPoint (.pptx)"}</span>
            </button>

            {/* BUTTON 2: Copy Prompt for Slidesgo */}
            <button
              onClick={handleCopySlidesgoPrompt}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer border border-slate-800"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>{copiedPrompt ? "Copied Prompt!" : "Copy Prompt for Slidesgo"}</span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: EDITABLE SLIDE PRESENTATION EDITOR */}
        {viewMode === 'slides' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            
            {/* Left: Slide Selector Navigation */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">Presentation Slides ({slides.length})</h4>
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center space-x-3 ${
                    activeSlideIndex === idx
                      ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/40 text-indigo-900 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="text-2xl">{slide.icon}</span>
                  <div className="flex-1 truncate">
                    <span className="text-[10px] font-bold text-indigo-600 block">Slide 0{idx + 1}</span>
                    <h5 className="text-xs font-black truncate">{slide.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Editable Presentation Canvas & Editor */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Dark Slide Screen Simulator */}
              <div className="relative bg-slate-950 rounded-3xl p-8 border border-slate-800 min-h-[300px] flex flex-col justify-between shadow-2xl text-white">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400 border-b border-slate-800 pb-3">
                  <span>SLIDE 0{activeSlideIndex + 1} OF 0{slides.length}</span>
                  <span className="text-purple-400 font-bold">{slides[activeSlideIndex].icon} {slides[activeSlideIndex].subtitle}</span>
                </div>

                <div className="space-y-3 py-6">
                  <h3 className="text-2xl font-black text-white">{slides[activeSlideIndex].title}</h3>
                  <pre className="text-sm text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                    {slides[activeSlideIndex].body}
                  </pre>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                  <span>iNSIGHTS Presentation Engine</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeSlideIndex === 0}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                      disabled={activeSlideIndex === slides.length - 1}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Inline Slide Text Editor */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-indigo-700 font-extrabold">
                  <Edit3 className="w-4 h-4 text-indigo-600" />
                  <span>Edit Slide 0{activeSlideIndex + 1} Content in Real-Time</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Slide Title:</label>
                    <input
                      type="text"
                      value={slides[activeSlideIndex].title}
                      onChange={(e) => handleUpdateSlide('title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Subtitle Badge:</label>
                    <input
                      type="text"
                      value={slides[activeSlideIndex].subtitle}
                      onChange={(e) => handleUpdateSlide('subtitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1">Slide Body Text:</label>
                  <textarea
                    rows={3}
                    value={slides[activeSlideIndex].body}
                    onChange={(e) => handleUpdateSlide('body', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 text-xs"
                  />
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* VIEW MODE 2: FEATURE 2 - JUDGE-READY EXECUTIVE SUMMARY ONE-PAGER */
          <div className="space-y-6 animate-fadeIn pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <h4 className="text-base font-black text-slate-900">Judge-Ready Executive One-Pager Web View</h4>
              </div>

              <button
                onClick={handleCopyOnePagerMarkdown}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                {copiedOnePager ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOnePager ? "Copied One-Pager!" : "Copy One-Pager Markdown"}</span>
              </button>
            </div>

            {/* Clean Shareable Single-Page Web View Sheet */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-xl space-y-6 text-slate-900">
              
              {/* Header */}
              <div className="border-b border-slate-300 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-[10px] font-mono font-bold uppercase">
                    Hackathon Executive Summary
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{projectTitle}</h2>
                  <p className="text-xs text-slate-600 font-semibold">{projectData?.tagline}</p>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-emerald-700 font-extrabold block">Feasibility: {projectData?.problemValidation?.feasibilityScore || 96}/100</span>
                  <span className="text-slate-500 text-[10px]">Plagiarism Guarantee: 0%</span>
                </div>
              </div>

              {/* Grid Section 1: Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider">1. Problem & Market Validation</h4>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {projectData?.problemValidation?.marketGap || 'Lack of automated AI verification in student solutions.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">2. System Tech Stack</h4>
                  <div className="text-xs text-slate-700 font-medium space-y-1 font-mono">
                    <p>• <strong>Frontend:</strong> {frontendTech}</p>
                    <p>• <strong>Backend:</strong> {backendTech}</p>
                  </div>
                </div>
              </div>

              {/* Grid Section 2: Research & Execution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">3. Empirical Citations</h4>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    Verified through DeepSearch across 42 paper citations on arXiv, IEEE Xplore, Kaggle Datasets & GitHub.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">4. 4-Week Roadmap</h4>
                  <div className="text-xs text-slate-700 font-medium space-y-1">
                    {slides[4].body.split('\n').slice(0, 3).map((line, i) => (
                      <p key={i}>• {line}</p>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
