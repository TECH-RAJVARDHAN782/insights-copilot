import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Presentation, Code, Printer, Sparkles, ArrowRight, ArrowLeft, ExternalLink, Wand2, Cpu, Edit3, Save } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';
import pptxgen from 'pptxgenjs';

export default function DocGenerator({ projectData, currentLang = 'en' }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [downloadingPpt, setDownloadingPpt] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  if (!projectData) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl space-y-4 bg-white border border-slate-200 shadow-md">
        <FileText className="w-12 h-12 text-indigo-600 mx-auto" />
        <h3 className="text-xl font-bold text-slate-900">No Active Project Data</h3>
        <p className="text-slate-700 text-sm font-medium">Please generate a project via DeepSearch first.</p>
      </div>
    );
  }

  // Editable Slide State initialized dynamically from searched projectData
  const [editableSlides, setEditableSlides] = useState([
    {
      slideNum: 1,
      title: "Title & Vision Overview",
      subtitle: projectData.title,
      content: projectData.tagline,
      badge: "Slide 1: Vision Statement",
      details: ["Theme: Smart Automation & AI Copilot", "PS Category: Software", "Powered by Gemini API"]
    },
    {
      slideNum: 2,
      title: "The Problem & Market Gap",
      subtitle: "Turning an Idea into a Working Project is Slow & Unreliable",
      content: projectData.problemValidation.marketGap,
      badge: "Slide 2: Problem Statement",
      details: projectData.problemValidation.keyPainPoints
    },
    {
      slideNum: 3,
      title: "Proposed Solution Modules",
      subtitle: "iNSIGHTS Copilot — Idea In, Execution Plan Out",
      content: "Unified intake, DeepSearch paper citations, and automated multi-framework code export.",
      badge: "Slide 3: Proposed Solution",
      details: ["Layer 2 Feasibility Check", "Citation-backed research summaries", "Automated system architecture"]
    },
    {
      slideNum: 4,
      title: "System Architecture & Tech Stack",
      subtitle: "AI-Based Research-to-Execution Microservice Pipeline",
      content: `Frontend: ${projectData.architecture.frontend} | Backend: Node.js Express + Python FastAPI.`,
      badge: "Slide 4: System Architecture",
      details: ["High-throughput microservices", "Sub-45ms latency REST API", "Redis queue buffer"]
    },
    {
      slideNum: 5,
      title: "Key Capabilities & Features",
      subtitle: "Core Pillars Transforming Research into Code",
      content: "1. DeepSearch  2. Knowledge Clustering  3. Project Hub  4. AI Agents  5. Talent Score",
      badge: "Slide 5: Key Features",
      details: ["Citation reliability scoring", "Automated code starter boilerplates", "Autonomous AI workforce"]
    },
    {
      slideNum: 6,
      title: "Impact & Feasibility Metrics",
      subtitle: `Feasibility: ${projectData.problemValidation.feasibilityScore}/100 | Innovation: ${projectData.problemValidation.innovationScore}/100`,
      content: "Measures project success by cutting idea-to-execution time from weeks to minutes while enforcing zero plagiarism.",
      badge: "Slide 6: Impact & Feasibility",
      details: ["Cuts idea-to-plan time by 90%", "0% AI plagiarism audit", "Scalable deployment"]
    },
    {
      slideNum: 7,
      title: "Demo Walkthrough & Conclusion",
      subtitle: "iNSIGHTS Copilot turns scattered searching into structured action.",
      content: `Sample Input: "${projectData.title}". Output: Full architecture, Mongoose schemas, and presentation deck.`,
      badge: "Slide 7: Conclusion",
      details: ["Feasible today on existing APIs", "Measurably speeds up hackathon builds", "Ready for student deployment"]
    }
  ]);

  // REAL BINARY POWERPOINT (.pptx) GENERATION USING PPTXGENJS + GEMINI METADATA
  const handleDownloadPPTX = () => {
    setDownloadingPpt(true);

    try {
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      const primaryColor = '4F46E5';
      const darkBg = '0F172A';
      const lightBg = 'FFFFFF';
      const textColor = '0F172A';

      // Title Slide
      const slide1 = pres.addSlide();
      slide1.background = { color: darkBg };
      slide1.addText(projectData.title, {
        x: 0.8, y: 1.8, w: '85%', h: 1.2,
        fontSize: 32, bold: true, color: '38BDF8', align: 'center'
      });
      slide1.addText(projectData.tagline, {
        x: 0.8, y: 3.2, w: '85%', h: 0.8,
        fontSize: 18, color: 'CBD5E1', align: 'center', italic: true
      });
      slide1.addText("Generated via iNSIGHTS Copilot • Gemini API + pptxgenjs Engine", {
        x: 0.8, y: 4.8, w: '85%', h: 0.5,
        fontSize: 12, color: '818CF8', align: 'center'
      });

      // Content Slides
      editableSlides.slice(1).forEach((s) => {
        const slide = pres.addSlide();
        slide.background = { color: lightBg };

        slide.addText(s.badge.toUpperCase(), {
          x: 0.8, y: 0.5, w: '85%', h: 0.4,
          fontSize: 11, bold: true, color: primaryColor
        });

        slide.addText(s.title, {
          x: 0.8, y: 0.9, w: '85%', h: 0.6,
          fontSize: 24, bold: true, color: textColor
        });

        slide.addText(s.subtitle, {
          x: 0.8, y: 1.6, w: '85%', h: 0.5,
          fontSize: 16, bold: true, color: '475569'
        });

        slide.addText(s.content, {
          x: 0.8, y: 2.3, w: '85%', h: 1.0,
          fontSize: 14, color: '334155', fontFace: 'Calibri'
        });

        const bullets = s.details.map(d => ({ text: d, options: { bullet: true, fontSize: 13, color: '1E293B' } }));
        slide.addText(bullets, {
          x: 0.8, y: 3.5, w: '85%', h: 1.8
        });

        slide.addText("iNSIGHTS Copilot Presentation Deck | Gemini API", {
          x: 0.8, y: 6.6, w: '85%', h: 0.4,
          fontSize: 10, color: '94A3B8'
        });
      });

      const filename = `${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-Presentation.pptx`;
      pres.writeFile({ fileName: filename }).then(() => {
        setDownloadingPpt(false);
        confetti({ particleCount: 70, spread: 70 });
      });

    } catch (error) {
      console.error("PPT Generation Error:", error);
      setDownloadingPpt(false);
    }
  };

  const handleCopySlidesgoPrompt = () => {
    const slidesgoPrompt = `Create an attractive, professional presentation deck with AI flowcharts and graphics for: "${projectData.title}". Tagline: ${projectData.tagline}. Problem: ${projectData.problemValidation.marketGap}. Tech Stack: ${projectData.architecture.frontend}, Node.js Express, Python FastAPI.`;
    navigator.clipboard.writeText(slidesgoPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const handleSlideChange = (field, value) => {
    const updated = [...editableSlides];
    updated[activeSlideIndex][field] = value;
    setEditableSlides(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SINGLE UNIFIED DASHBOARD CARD (MERGING THE TWO DASHBOARD CARDS SHOWN IN IMAGE) */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl border border-indigo-200 bg-white shadow-lg space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>iNSIGHTS Export Engine • Gemini API + pptxgenjs</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Presentation Generator
          </h2>
          <p className="text-slate-700 text-sm font-semibold mt-1">
            Generate PowerPoint presentation files and copy AI prompts for slide decks for "{projectData.title}".
          </p>
        </div>

        {/* SINGLE UNIFIED DASHBOARD ACTIONS: KEEPING ONLY 2 BUTTONS AS REQUESTED */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
          
          {/* BUTTON 1: Download PowerPoint (.pptx) */}
          <button
            onClick={handleDownloadPPTX}
            disabled={downloadingPpt}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            {downloadingPpt ? <Cpu className="w-4 h-4 animate-spin" /> : <Presentation className="w-4 h-4" />}
            <span>{downloadingPpt ? "Generating PPTX..." : "Download PowerPoint (.pptx)"}</span>
          </button>

          {/* BUTTON 2: Copy Prompt for Slidesgo */}
          <button
            onClick={handleCopySlidesgoPrompt}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs flex items-center space-x-2 border border-slate-300 shadow-sm cursor-pointer"
          >
            {copiedPrompt ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-indigo-600" />}
            <span>{copiedPrompt ? "Copied Prompt!" : "Copy Prompt for Slidesgo"}</span>
          </button>

        </div>
      </div>

      {/* EDITABLE AI SLIDE PRESENTATION EDITOR & INTEGRATION PORTAL */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-slate-200 bg-white shadow-md">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2 text-purple-700 font-bold text-base">
            <Edit3 className="w-5 h-5" />
            <span>Editable AI Slide Presentation Editor & AI Integration</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1 cursor-pointer transition ${
                isEditing ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
              }`}
            >
              {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? "Save Edits" : "Edit Slide Content"}</span>
            </button>
            <span className="text-xs text-slate-700 font-mono font-bold">{t.slide} {activeSlideIndex + 1} of {editableSlides.length}</span>
          </div>
        </div>

        {/* Active Editable Slide Display Box */}
        <div className="relative bg-slate-900 p-8 sm:p-10 rounded-2xl border border-purple-500/40 text-center space-y-4 shadow-2xl min-h-[300px] flex flex-col justify-center text-white">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 inline-block mx-auto uppercase tracking-wider">
            {editableSlides[activeSlideIndex].badge}
          </span>

          {isEditing ? (
            <div className="space-y-3 max-w-xl mx-auto text-left w-full">
              <div>
                <label className="block text-[10px] text-purple-300 font-mono uppercase mb-1">Slide Subtitle:</label>
                <input
                  type="text"
                  value={editableSlides[activeSlideIndex].subtitle}
                  onChange={(e) => handleSlideChange('subtitle', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-purple-300 font-mono uppercase mb-1">Slide Content:</label>
                <textarea
                  value={editableSlides[activeSlideIndex].content}
                  onChange={(e) => handleSlideChange('content', e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{editableSlides[activeSlideIndex].subtitle}</h3>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed italic font-semibold">
                "{editableSlides[activeSlideIndex].content}"
              </p>
            </>
          )}

          {/* Details Bullet List */}
          <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {editableSlides[activeSlideIndex].details.map((item, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium">
                • {item}
              </span>
            ))}
          </div>
        </div>

        {/* Slide Controls & Indicators */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={activeSlideIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30 text-xs font-bold flex items-center space-x-1.5 border border-slate-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.prevSlide}</span>
          </button>

          <div className="flex flex-wrap justify-center gap-1.5">
            {editableSlides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeSlideIndex === idx
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900'
                }`}
              >
                {t.slide} {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveSlideIndex(prev => Math.min(editableSlides.length - 1, prev + 1))}
            disabled={activeSlideIndex === editableSlides.length - 1}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30 text-xs font-bold flex items-center space-x-1.5 border border-slate-300 cursor-pointer"
          >
            <span>{t.nextSlide}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
