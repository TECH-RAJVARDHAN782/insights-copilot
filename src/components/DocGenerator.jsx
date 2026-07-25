import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Presentation, Code, Video, Sparkles, Printer, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DocGenerator({ projectData }) {
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  if (!projectData) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl space-y-4">
        <FileText className="w-12 h-12 text-indigo-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">No Active Project Data</h3>
        <p className="text-slate-400 text-sm">Please generate a project via DeepSearch first.</p>
      </div>
    );
  }

  const generateMarkdownReadme = () => {
    return `# ${projectData.title}

> **${projectData.tagline}**

[![iNSIGHTS Layer 2](https://img.shields.io/badge/iNSIGHTS-Layer%202%20Verified-indigo)](#) [![Feasibility Score](https://img.shields.io/badge/Feasibility-${projectData.problemValidation.feasibilityScore}%2F100-emerald)](#) [![Hackathon Ready](https://img.shields.io/badge/Hackathon-Winner--Ready-gold)](#)

## 📌 Problem Overview
${projectData.problemValidation.marketGap}

### Key Pain Points Solved
${projectData.problemValidation.keyPainPoints.map(p => `- ${p}`).join('\n')}

---

## 🛠️ System Architecture & Tech Stack
- **Frontend**: ${projectData.architecture.frontend}
- **Backend API**: ${projectData.architecture.backend}
- **Database & Cache**: ${projectData.architecture.database}
- **AI Models**: ${projectData.architecture.aiModels.join(', ')}

---

## 🔬 Literature & Research References
${projectData.deepSearch.citations.map(c => `- **${c.title}** (${c.authors}): *${c.snippet}*`).join('\n')}

---

## 🚀 Sprint Roadmap
${projectData.roadmap.map(r => `### ${r.phase}: ${r.title}\n- ${r.task}`).join('\n\n')}

---

*Generated automatically via [iNSIGHTS Copilot](https://insights-copilot.app).*
`;
  };

  const readmeContent = generateMarkdownReadme();

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleDownloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([readmeContent], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const slides = [
    {
      title: "Slide 1: Title & Vision",
      subtitle: projectData.title,
      content: projectData.tagline,
      badge: "Vision Statement"
    },
    {
      title: "Slide 2: Problem & Market Gap",
      subtitle: "The Challenge in Educational Institutions",
      content: projectData.problemValidation.marketGap,
      badge: "Validated Pain Point"
    },
    {
      title: "Slide 3: iNSIGHTS Solution & AI Engine",
      subtitle: "YOLOv8 CV + Prophet Forecasting",
      content: `Combining real-time computer vision plate segmentation with attendance time-series prediction to cut food waste by 40%+.`,
      badge: "Core Innovation"
    },
    {
      title: "Slide 4: System Architecture & Data Pipeline",
      subtitle: "FastAPI + Redis + PostgreSQL + WhatsApp Bot",
      content: `Sub-50ms latency pipeline for hostel mess kitchens, warden dashboard, and student WhatsApp bot opt-outs.`,
      badge: "Technical Feasibility"
    },
    {
      title: "Slide 5: Expected Impact & Scale",
      subtitle: "Feasibility Score: 92/100 | Innovation Score: 95/100",
      content: `Scalable across 10,000+ university hostels worldwide, saving millions in food procurement costs annually.`,
      badge: "Hackathon Impact"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-500/30">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>iNSIGHTS Presentation & Export Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pitch Deck & GitHub README Generator
            </h2>
            <p className="text-slate-300 text-sm">
              Generate presentation-ready slides, production markdown documentation, and printable project briefs.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handlePrintPDF}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 border border-slate-700 shadow-md"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Export PDF Brief</span>
            </button>
            <button
              onClick={handleDownloadReadme}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-500/30"
            >
              <Download className="w-4 h-4" />
              <span>Download README.md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pitch Deck Presentation Slide Viewer */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
            <Presentation className="w-5 h-5" />
            <span>Hackathon Presentation Pitch Deck Carousel</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Slide {activeSlideIndex + 1} of {slides.length}</span>
        </div>

        {/* Active Slide Display Box */}
        <div className="relative bg-slate-950 p-8 sm:p-12 rounded-2xl border border-purple-500/40 text-center space-y-4 shadow-2xl min-h-[260px] flex flex-col justify-center">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 inline-block mx-auto uppercase tracking-wider">
            {slides[activeSlideIndex].badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{slides[activeSlideIndex].subtitle}</h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            "{slides[activeSlideIndex].content}"
          </p>
        </div>

        {/* Slide Selector Indicators */}
        <div className="flex justify-center space-x-2">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlideIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSlideIndex === idx
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Slide #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* GitHub README Markdown Code Viewer */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
            <Code className="w-5 h-5" />
            <span>Auto-Generated GitHub README.md</span>
          </div>

          <button
            onClick={handleCopyReadme}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700"
          >
            {copiedReadme ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedReadme ? 'Copied Markdown!' : 'Copy Raw README'}</span>
          </button>
        </div>

        {/* Markdown Textarea Preview */}
        <pre className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed select-all">
          {readmeContent}
        </pre>
      </div>

    </div>
  );
}
