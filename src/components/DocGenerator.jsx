import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Presentation, Code, Printer, Sparkles, ArrowRight, ArrowLeft, ExternalLink, Wand2, Cpu } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';
import pptxgen from 'pptxgenjs';

export default function DocGenerator({ projectData, currentLang = 'en' }) {
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [downloadingPpt, setDownloadingPpt] = useState(false);

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

  const slides = [
    {
      slideNum: 1,
      title: "Title & Vision Overview",
      subtitle: projectData.title,
      content: projectData.tagline,
      badge: "Slide 1: Vision Statement",
      details: ["Theme: Smart Automation & AI Copilot", "PS Category: Software", "Powered by Live MongoDB Atlas & Gemini API"]
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
      content: "Unified intake, DeepSearch paper citations, MongoDB document storage, and WhatsApp agent reminders.",
      badge: "Slide 3: Proposed Solution",
      details: ["Layer 2 Feasibility Check", "Citation-backed research summaries", "Automated MongoDB Mongoose schema"]
    },
    {
      slideNum: 4,
      title: "System Architecture & MongoDB Stack",
      subtitle: "AI-Based Research-to-Execution Microservice Pipeline",
      content: `Frontend: ${projectData.architecture.frontend} | Backend: Node.js Express + Python FastAPI | DB: Live MongoDB Atlas.`,
      badge: "Slide 4: System Architecture",
      details: ["WiredTiger MongoDB storage engine", "Sub-45ms latency REST API", "Redis queue buffer"]
    },
    {
      slideNum: 5,
      title: "Key Capabilities & Features",
      subtitle: "Six Core Pillars Transforming Research into Code",
      content: "1. DeepSearch  2. Knowledge Clustering  3. Project HUB  4. AI Agents  5. MongoDB Vault  6. Talent Score",
      badge: "Slide 5: Key Features",
      details: ["Citation reliability scoring", "Automated code starter boilerplates", "WhatsApp RSVP bot"]
    },
    {
      slideNum: 6,
      title: "Impact & Feasibility Metrics",
      subtitle: `Feasibility: ${projectData.problemValidation.feasibilityScore}/100 | Innovation: ${projectData.problemValidation.innovationScore}/100`,
      content: "Measures project success by cutting idea-to-execution time from weeks to minutes while enforcing zero plagiarism.",
      badge: "Slide 6: Impact & Feasibility",
      details: ["Cuts idea-to-plan time by 90%", "0% AI plagiarism audit", "Scalable to 10,000+ university hostels"]
    },
    {
      slideNum: 7,
      title: "Demo Walkthrough & Conclusion",
      subtitle: "iNSIGHTS Copilot turns scattered searching into structured action.",
      content: `Sample Input: "${projectData.title}". Output: Full architecture, live MongoDB schema, pitch deck, and WhatsApp bot.`,
      badge: "Slide 7: Conclusion",
      details: ["Feasible today on existing APIs", "Measurably speeds up hackathon builds", "Ready for student deployment"]
    }
  ];

  // REAL BINARY POWERPOINT (.pptx) GENERATION USING PPTXGENJS + GEMINI METADATA
  const handleDownloadPPTX = () => {
    setDownloadingPpt(true);

    try {
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      // Define Theme Colors
      const primaryColor = '4F46E5'; // Indigo
      const darkBg = '0F172A'; // Slate 900
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

      // Content Slides (Slides 2 to 7)
      slides.slice(1).forEach((s) => {
        const slide = pres.addSlide();
        slide.background = { color: lightBg };

        // Top Badge & Slide Title
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

        // Main Paragraph Box
        slide.addText(s.content, {
          x: 0.8, y: 2.3, w: '85%', h: 1.0,
          fontSize: 14, color: '334155', fontFace: 'Calibri'
        });

        // Key Points Bullet List
        const bullets = s.details.map(d => ({ text: d, options: { bullet: true, fontSize: 13, color: '1E293B' } }));
        slide.addText(bullets, {
          x: 0.8, y: 3.5, w: '85%', h: 1.8
        });

        // Footer
        slide.addText("iNSIGHTS Copilot Presentation Deck | Live MongoDB Atlas & Gemini API", {
          x: 0.8, y: 6.6, w: '85%', h: 0.4,
          fontSize: 10, color: '94A3B8'
        });
      });

      // Export File
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

  const generateMarkdownReadme = () => {
    return `# ${projectData.title}

> **${projectData.tagline}**

[![iNSIGHTS Layer 2](https://img.shields.io/badge/iNSIGHTS-Layer%202%20Verified-indigo)](#) [![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-emerald)](#) [![Feasibility Score](https://img.shields.io/badge/Feasibility-${projectData.problemValidation.feasibilityScore}%2F100-emerald)](#)

## 📌 Problem Overview
${projectData.problemValidation.marketGap}

### Key Pain Points Solved
${projectData.problemValidation.keyPainPoints.map(p => `- ${p}`).join('\n')}

---

## 🛠️ System Architecture & Tech Stack
- **Frontend**: ${projectData.architecture.frontend}
- **Backend API**: ${projectData.architecture.backend}
- **Database & Cache**: Live MongoDB Atlas + Redis Cache
- **AI Models**: ${projectData.architecture.aiModels.join(', ')}

---

## 🔬 Literature & Research References
${projectData.deepSearch.citations.map(c => `- **${c.title}** (${c.authors}): *${c.snippet}*`).join('\n')}

---

## 🚀 Sprint Roadmap
${projectData.roadmap.map(r => `### ${r.phase}: ${r.title}\n- ${r.task}`).join('\n\n')}

---

*Generated automatically via [iNSIGHTS Copilot](https://insights-copilot-chi.vercel.app).*
`;
  };

  const readmeContent = generateMarkdownReadme();

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const handleCopySlidesgoPrompt = () => {
    const slidesgoPrompt = `Create an attractive, professional presentation deck with AI flowcharts and graphics for: "${projectData.title}". Tagline: ${projectData.tagline}. Problem: ${projectData.problemValidation.marketGap}. Tech Stack: ${projectData.architecture.frontend}, Node.js Express, Python FastAPI, Live MongoDB Atlas.`;
    navigator.clipboard.writeText(slidesgoPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  const handleDownloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([readmeContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${projectData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-README.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-lg">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>iNSIGHTS Export Engine • Gemini API + pptxgenjs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.pitchHeader}
            </h2>
            <p className="text-slate-700 text-sm font-semibold">
              {t.pitchDesc}
            </p>
          </div>

          {/* Download Action Buttons */}
          <div className="flex flex-wrap space-x-2 gap-y-2">
            <button
              onClick={handleDownloadPPTX}
              disabled={downloadingPpt}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {downloadingPpt ? <Cpu className="w-4 h-4 animate-spin" /> : <Presentation className="w-4 h-4" />}
              <span>{downloadingPpt ? "Generating PPTX..." : "Download PowerPoint (.pptx)"}</span>
            </button>

            <a
              href="https://slidesgo.com/ai/presentation-maker"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>Slidesgo AI Presentation Maker ↗</span>
            </a>

            <button
              onClick={handleDownloadReadme}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadReadme}</span>
            </button>

            <button
              onClick={handlePrintPDF}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-2 border border-slate-300 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-indigo-600" />
              <span>{t.printPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SLIDESGO AI PRESENTATION MAKER INTEGRATION BANNER */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-white to-pink-50 space-y-4 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Wand2 className="w-3.5 h-3.5 text-pink-600" />
                AI Slides & Flowcharts Integration
              </span>
              <span className="text-xs text-slate-600 font-mono font-bold">Gemini API + Slidesgo Engine</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Generate Designed AI Presentations, Flowcharts & Graphics
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
              Create presentation decks with AI flowcharts, diagrams, and graphic templates directly on <strong>Slidesgo AI Presentation Maker</strong> for <strong className="text-indigo-700">"{projectData.title}"</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopySlidesgoPrompt}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-1.5 border border-slate-300 cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-indigo-600" />}
              <span>{copiedPrompt ? "Copied Prompt!" : "Copy Prompt for Slidesgo"}</span>
            </button>

            <a
              href="https://slidesgo.com/ai/presentation-maker"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <span>Launch Slidesgo AI Maker</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Pitch Deck Presentation Slide Viewer */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-slate-200 bg-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-purple-700 font-bold text-base">
            <Presentation className="w-5 h-5" />
            <span>{t.pitchViewer}</span>
          </div>
          <span className="text-xs text-slate-700 font-mono font-bold">{t.slide} {activeSlideIndex + 1} of {slides.length}</span>
        </div>

        {/* Active Slide Display Box */}
        <div className="relative bg-slate-900 p-8 sm:p-10 rounded-2xl border border-purple-500/40 text-center space-y-4 shadow-2xl min-h-[280px] flex flex-col justify-center text-white">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 inline-block mx-auto uppercase tracking-wider">
            {slides[activeSlideIndex].badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{slides[activeSlideIndex].subtitle}</h3>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed italic font-semibold">
            "{slides[activeSlideIndex].content}"
          </p>

          {/* Details Bullet List */}
          <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {slides[activeSlideIndex].details.map((item, idx) => (
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
            {slides.map((s, idx) => (
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
            onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30 text-xs font-bold flex items-center space-x-1.5 border border-slate-300 cursor-pointer"
          >
            <span>{t.nextSlide}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GitHub README Markdown Code Viewer */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 bg-white border border-slate-200 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-700 font-bold text-base">
            <Code className="w-5 h-5" />
            <span>Auto-Generated GitHub README.md</span>
          </div>

          <button
            onClick={handleCopyReadme}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-1.5 border border-slate-300 cursor-pointer"
          >
            {copiedReadme ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedReadme ? t.copied : t.copyRawReadme}</span>
          </button>
        </div>

        {/* Markdown Textarea Preview */}
        <pre className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed select-all">
          {readmeContent}
        </pre>
      </div>

    </div>
  );
}
