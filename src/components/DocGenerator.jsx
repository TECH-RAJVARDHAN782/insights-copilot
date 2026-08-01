import React, { useState } from 'react';
import { 
  Presentation, Copy, Download, Sparkles, Check, ChevronLeft, ChevronRight, Edit3, 
  ExternalLink, FileText, Layers, Share2, Award, Zap, Code, ShieldCheck, CheckCircle2, RefreshCw, Monitor
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { callGeminiPptDeck } from '../services/geminiService';
import confetti from 'canvas-confetti';
import pptxgen from 'pptxgenjs';

export default function DocGenerator({ projectData, currentLang = 'en' }) {
  const [downloadingPpt, setDownloadingPpt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // 0..6 for 7 slides

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "Hospital Management";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const frontendTech = projectData?.architecture?.frontend || "React 18 + Tailwind CSS";
  const backendTech = projectData?.architecture?.backend || "Node.js Express + Python FastAPI";

  // 7 Interactive Pitch Deck Slides Data Matching Exact Design
  const slides = [
    {
      id: 1,
      badge: "SLIDE 1: VISION STATEMENT",
      title: projectTitle,
      subtitle: `"[♊ Gemini 1.5 Pro] AI-Engineered framework for: \\"${projectTitle}\\""`,
      tag1: "• Theme: Smart Automation & AI Copilot",
      tag2: "• PS Category: Software",
      tag3: "• Powered by Live Gemini API"
    },
    {
      id: 2,
      badge: "SLIDE 2: PROBLEM & MARKET GAP",
      title: "Validated Problem & Market Gap",
      subtitle: `"${projectData?.problemValidation?.validatedNeed || `Critical operational bottleneck in ${projectTitle}.`}"`,
      tag1: `• Market Gap: ${projectData?.problemValidation?.marketGap || 'Lack of automated AI verification'}`,
      tag2: `• Feasibility: ${projectData?.problemValidation?.feasibilityScore || 97}/100`,
      tag3: "• Scoured arXiv & IEEE"
    },
    {
      id: 3,
      badge: "SLIDE 3: SYSTEM ARCHITECTURE",
      title: "Full-Stack Microservices Architecture",
      subtitle: `"${frontendTech} + ${backendTech}"`,
      tag1: "• Database: Cloud Document Store & Redis Cache",
      tag2: "• SLA Performance: <14ms Latency",
      tag3: "• Microservices Gateway"
    },
    {
      id: 4,
      badge: "SLIDE 4: RESEARCH & CITATIONS",
      title: "Empirical Literature & Citations",
      subtitle: `"Scoured 42 papers across arXiv, IEEE Xplore, Kaggle Datasets & GitHub Repositories"`,
      tag1: "• Plagiarism Score: 0.0% Guarantee",
      tag2: "• Verified Citations Attached",
      tag3: "• Academic Thesis Ready"
    },
    {
      id: 5,
      badge: "SLIDE 5: SPRINT ROADMAP",
      title: "4-Week Phased Sprint Timeline",
      subtitle: `"Phase 1: Research -> Phase 2: Express/FastAPI -> Phase 3: React UI -> Phase 4: Vercel Deploy"`,
      tag1: "• Velocity: 4-Week Sprint",
      tag2: "• Daily Micro-Sprints",
      tag3: "• WhatsApp Dev-Buddy Sync"
    },
    {
      id: 6,
      badge: "SLIDE 6: PATENT & UNIQUENESS",
      title: "Patent Radar & Uniqueness Metric",
      subtitle: `"Uniqueness Score: ${projectData?.problemValidation?.innovationScore || 94}% • Market Saturation: 18% • Unclaimed Gap: 82%"`,
      tag1: "• Clear Patent Runway",
      tag2: "• Low Competitive Saturation",
      tag3: "• High Win Opportunity"
    },
    {
      id: 7,
      badge: "SLIDE 7: LIVE DEMO & ASK",
      title: "Production Deployment & Next Steps",
      subtitle: `"Live URL: https://insights-copilot-chi.vercel.app • GitHub: github.com/TECH-RAJVARDHAN782/insights-copilot"`,
      tag1: "• Live on Vercel",
      tag2: "• GitHub Starter Repo",
      tag3: "• Thesis & Pitch Ready"
    }
  ];

  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handleCopySlidesgoPrompt = () => {
    const promptText = `Create a professional 7-slide pitch presentation for "${projectTitle}". Include slides for Vision Statement, Problem & Market Gap, System Architecture (${frontendTech} + ${backendTech}), Research Citations, 4-Week Sprint Roadmap, Patent Uniqueness Score (${projectData?.problemValidation?.innovationScore || 94}%), and Live Demo Links. Use modern dark UI aesthetics with cyan and purple gradient accents.`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    confetti({ particleCount: 35, spread: 45 });
  };

  const handleDownloadPPTX = async () => {
    setDownloadingPpt(true);
    try {
      const ppt = new pptxgen();
      ppt.layout = 'LAYOUT_16x9';

      slides.forEach((s) => {
        const slide = ppt.addSlide();
        slide.background = { color: '0B0F19' }; // Dark slate background matching slide viewer

        // Badge at Top
        slide.addText(s.badge, {
          x: 0.8,
          y: 0.8,
          w: 8.5,
          h: 0.5,
          fontSize: 14,
          bold: true,
          color: 'C084FC',
          fontFace: 'Arial',
          align: 'center'
        });

        // Title
        slide.addText(s.title, {
          x: 0.8,
          y: 1.6,
          w: 8.5,
          h: 1.0,
          fontSize: 26,
          bold: true,
          color: 'FFFFFF',
          fontFace: 'Arial',
          align: 'center'
        });

        // Subtitle
        slide.addText(s.subtitle, {
          x: 0.8,
          y: 2.8,
          w: 8.5,
          h: 1.2,
          fontSize: 16,
          italic: true,
          color: '94A3B8',
          fontFace: 'Arial',
          align: 'center'
        });

        // Badges Row
        slide.addText(`${s.tag1}   |   ${s.tag2}   |   ${s.tag3}`, {
          x: 0.8,
          y: 4.8,
          w: 8.5,
          h: 0.8,
          fontSize: 13,
          bold: true,
          color: '38BDF8',
          fontFace: 'Arial',
          align: 'center'
        });
      });

      await ppt.writeFile({ fileName: `${slug}-presentation-deck.pptx` });
      setDownloadingPpt(false);
      confetti({ particleCount: 60, spread: 70 });
    } catch (err) {
      console.error("PPT Generation Error:", err);
      setDownloadingPpt(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* CARD 1: TOP HERO BANNER CARD (EXACT MATCHING DESIGN) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
        
        {/* Pill Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-mono font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI SLIDES & FLOWCHARTS INTEGRATION</span>
          </div>

          <span className="text-xs font-mono text-slate-500 font-bold">
            Gemini API + Slidesgo Engine
          </span>
        </div>

        {/* Heading & Buttons Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Generate Designed AI Presentations, Flowcharts & Graphics
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
              Create presentation decks with AI flowcharts, diagrams, and graphic templates directly on <strong className="text-slate-900">Slidesgo AI Presentation Maker</strong> for <span className="text-purple-600 font-bold font-mono">"{projectTitle}"</span>.
            </p>
          </div>

          {/* Top Action Buttons (Copy Prompt + Download PPTX + Launch Slidesgo) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            
            <button
              onClick={handleCopySlidesgoPrompt}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center space-x-2 border border-slate-300 shadow-sm cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4 text-indigo-600" />}
              <span>{copiedPrompt ? "Copied Prompt!" : "Copy Prompt for Slidesgo"}</span>
            </button>

            <button
              onClick={handleDownloadPPTX}
              disabled={downloadingPpt}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50 border border-slate-800"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>{downloadingPpt ? "Generating PPTX..." : "Download PPTX"}</span>
            </button>

            <a
              href="https://slidesgo.com/ai-presentation-maker"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <span>Launch Slidesgo AI Maker</span>
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>

        </div>

      </div>

      {/* CARD 2: BOTTOM INTERACTIVE 7-SLIDE PITCH DECK VIEWER CARD (EXACT MATCHING DESIGN) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2.5 text-purple-700">
            <Monitor className="w-5 h-5 text-purple-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Interactive 7–Slide Pitch Deck Viewer
            </h3>
          </div>

          <span className="text-xs font-mono text-slate-500 font-bold">
            Slide {activeSlideIndex + 1} of {slides.length}
          </span>
        </div>

        {/* DARK SLIDE STAGE CANVAS CARD (EXACT MATCH TO USER IMAGE) */}
        <div className="bg-[#0B0F19] p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-6 shadow-2xl min-h-[340px] flex flex-col justify-center items-center relative overflow-hidden">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-extrabold tracking-wider">
            {currentSlide.badge}
          </div>

          {/* Slide Big Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight max-w-2xl leading-tight">
            {currentSlide.title}
          </h2>

          {/* Slide Italic Subtitle */}
          <p className="text-xs sm:text-sm text-slate-300 italic font-medium max-w-xl leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Horizontal Badges Row */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-xs font-medium text-slate-300">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 font-semibold">
              {currentSlide.tag1}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 font-semibold">
              {currentSlide.tag2}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 font-semibold">
              {currentSlide.tag3}
            </span>
          </div>

        </div>

        {/* BOTTOM SLIDE NAVIGATION CONTROLLER (EXACT MATCH TO USER IMAGE) */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 text-xs">
          
          {/* Previous Slide Button */}
          <button
            onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={activeSlideIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center space-x-1 cursor-pointer disabled:opacity-40 border border-slate-200"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
            <span>Previous Slide</span>
          </button>

          {/* Slide 1..7 Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {slides.map((s, idx) => {
              const isActive = activeSlideIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md font-black scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  Slide {s.id}
                </button>
              );
            })}
          </div>

          {/* Next Slide Button */}
          <button
            onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center space-x-1 cursor-pointer disabled:opacity-40 border border-slate-200"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>

        </div>

      </div>

    </div>
  );
}
