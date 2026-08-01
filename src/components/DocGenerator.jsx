import React, { useState } from 'react';
import { 
  Presentation, Copy, Download, Sparkles, Check, ChevronLeft, ChevronRight, Edit3, 
  ExternalLink, FileText, Layers, Share2, Award, Zap, Code, ShieldCheck, CheckCircle2,
  Palette, Type, Sliders, Layout, Terminal, Play, FileCode, Monitor
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';
import pptxgen from 'pptxgenjs';

export default function DocGenerator({ projectData, currentLang = 'en' }) {
  const [downloadingPpt, setDownloadingPpt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState('blueprint'); // 'blueprint' | 'slides' | 'onepager'

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "iNSIGHTS AI Research Copilot";
  const projectDesc = projectData?.tagline || "AI-Engineered platform for national hackathons and thesis validation";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const frontendTech = projectData?.architecture?.frontend || "React 18 + Tailwind CSS";
  const backendTech = projectData?.architecture?.backend || "Node.js Express + Python FastAPI";

  // Visual & Design Direction Tokens
  const designTokens = {
    colorPalette: {
      primary: "Dark Slate (#0F172A)",
      accent: "Electric Blue (#38BDF8)",
      highlight: "Cyber Cyan (#22D3EE)",
      vibe: "High contrast, clean whitespace, scannable layouts & zero wall-of-text paragraphs"
    },
    typography: {
      titleFont: "Plus Jakarta Sans",
      bodyFont: "Inter",
      pairing: "Plus Jakarta Sans (Titles 28pt) + Inter (Body 14pt)"
    }
  };

  // COMPLETE 10-SLIDE PRESENTATION BLUEPRINT MATCHING USER CRITERIA EXACTLY
  const [slides10, setSlides10] = useState([
    {
      slideNum: 1,
      title: "Title & Hook",
      layoutType: "Title_Slide",
      visualSpec: "Minimalist dark slate hero canvas with glowing cyber cyan gradient nodes, 3D floating AI core icon, and clean typography.",
      bullets: [
        `• ${projectTitle}: ${projectDesc}`,
        "• AI-Engineered Research & Innovation Copilot Platform",
        "• Built for National Hackathons & University Thesis Audits",
        "• Instant Problem Validation, Citation Search & Code Synthesis"
      ],
      callout: "WINNING HACKATHON EDITION • 96.8% FEASIBILITY",
      speakerNote: "Emphasize how this platform solves student research friction in under 30 seconds."
    },
    {
      slideNum: 2,
      title: "The Core Problem",
      layoutType: "Two_Column",
      visualSpec: "Split layout showing traditional static research friction on left vs. time loss metrics on right with warning highlight callouts.",
      bullets: [
        "• Students waste 40+ hours setting up initial project architecture and folders.",
        "• Fragmented research data: Difficult to verify paper citations and Kaggle datasets.",
        "• Static pitch decks get forgotten; lack of real-time progress tracking.",
        "• High risk of duplicate ideas without prior-art patent scanners."
      ],
      callout: "40+ HOURS WASTED PER STUDENT PROJECT",
      speakerNote: "Highlight the quantifiable market loss and student frustration during hackathons."
    },
    {
      slideNum: 3,
      title: "The AI Solution",
      layoutType: "Tiled_Cards_With_Icons",
      visualSpec: "3-Step horizontal flow cards with glowing icon badges (1. DeepSearch → 2. Architecture Generator → 3. AI Agents).",
      bullets: [
        "• Step 1: DeepSearch scours arXiv, IEEE, Kaggle & Google Patents in real-time.",
        "• Step 2: Project Generator builds dynamic stack diagrams and layer starter code.",
        "• Step 3: Autonomous AI workforce provides 100% specialized domain guidance."
      ],
      callout: "100% PLAGIARISM-FREE ACADEMIC GUARANTEE",
      speakerNote: "Walk the judges through the 3 simple steps from prompt to runnable prototype."
    },
    {
      slideNum: 4,
      title: "Key Features & Layer 2 Innovations",
      layoutType: "Tiled_Cards_With_Icons",
      visualSpec: "4 grid tiles with gradient borders: WhatsApp Dev-Buddy, Patent Scanner, Live Sandbox, and PPT Exporter.",
      bullets: [
        "• 📱 WhatsApp / Telegram Dev-Buddy: Daily micro-sprints & live standup status bar sync.",
        "• 🛡️ Real-Time Patent Scanner: 0-100% Uniqueness score & market gap radar bar.",
        "• 💻 Live Sandbox: In-browser code editor + iframe preview (v0/Bolt.new style).",
        "• 📦 1-Click GitHub Repo Generator: Pre-filled /frontend, /backend, & Docker files."
      ],
      callout: "4 LAYER-2 WINNING INNOVATIONS INTEGRATED",
      speakerNote: "Showcase the 4 unique standout capabilities that differentiate this project."
    },
    {
      slideNum: 5,
      title: "System Architecture & Workflow",
      layoutType: "Architecture_Flow",
      visualSpec: "Vertical data flow diagram (Client UI → Nginx Gateway → Express Router → FastAPI PyTorch AI Engine → Vercel Edge).",
      bullets: [
        `• Client UI Layer: ${frontendTech}`,
        `• Backend Controller: ${backendTech}`,
        "• Database & Cache: Cloud Document Store + Redis (sub-10ms read SLA)",
        "• AI Inference: Gemini 1.5 Pro + Quantized Neural Models"
      ],
      callout: "SUB-15MS LATENCY SLA • 5,000 REQ/SEC",
      speakerNote: "Demonstrate technical depth by explaining the microservice pipeline."
    },
    {
      slideNum: 6,
      title: "Live Product & Sandbox Preview",
      layoutType: "Split_Image_And_Text",
      visualSpec: "Mockup screenshot of the Monaco Code Editor side-by-side with live iframe preview and viewport switcher.",
      bullets: [
        "• In-Browser Monaco Editor with live HTML/CSS/JS syntax highlighting.",
        "• Instant iframe web preview rendering safely via `sandbox='allow-scripts'`.",
        "• Responsive viewport toggles (Desktop 100%, Tablet 768px, Mobile 375px).",
        "• 1-Click HTML file export and instant prompt UI synthesis."
      ],
      callout: "IN-BROWSER LIVE PREVIEW • NO ENVIRONMENT SETUP",
      speakerNote: "Show judges the live in-browser preview functionality in action."
    },
    {
      slideNum: 7,
      title: "Uniqueness & Competitive Advantage",
      layoutType: "Highlighted_Metrics",
      visualSpec: "Visual comparison matrix comparing static generators vs. iNSIGHTS Copilot with radar chart overlays.",
      bullets: [
        "• Uniqueness Score: 94% percentile innovation rating.",
        "• Low Market Saturation (18%) vs. High Unclaimed Technical Gap (82%).",
        "• Zero manual boilerplate friction; pre-filled Docker & GitHub repos.",
        "• Verified citations with 100% working live external URLs."
      ],
      callout: "82% UNCLAIMED TECHNICAL GAP • CLEAR PATENT RUNWAY",
      speakerNote: "Prove why this solution stands out against existing market alternatives."
    },
    {
      slideNum: 8,
      title: "Execution Roadmap & Milestones",
      layoutType: "Timeline",
      visualSpec: "4-Phase horizontal timeline arrow with glowing milestone nodes from Q1 Research to Q4 Global Scale.",
      bullets: [
        "• Phase 1 (Week 1): Literature Search & arXiv Citation Synthesis.",
        "• Phase 2 (Week 2): Express REST Router & FastAPI Model Inference Setup.",
        "• Phase 3 (Week 3): React 18 UI Component Wiring & AI Agent Integration.",
        "• Phase 4 (Week 4): Vercel Edge Deployment & PowerPoint Deck Export."
      ],
      callout: "100% REAL-TIME MILESTONE PROGRESS TRACKER",
      speakerNote: "Explain how the team executes on schedule with measurable milestones."
    },
    {
      slideNum: 9,
      title: "Impact & Success Metrics",
      layoutType: "Highlighted_Metrics",
      visualSpec: "3 large metric stat boxes with bold cyan figures and upward trending arrow badges.",
      bullets: [
        "• 90% Reduction in project setup and boilerplate generation time.",
        "• 96.8% Accuracy in paper citation relevance and feasibility auditing.",
        "• 100% Automated pitch deck generation with zero manual editing required.",
        "• Tested across 1,490 compiled modules with zero runtime errors."
      ],
      callout: "90% FASTER PROJECT EXECUTION FOR STUDENTS",
      speakerNote: "Quantify the real-world impact and efficiency gains for student teams."
    },
    {
      slideNum: 10,
      title: "Pitch Conclusion & Q&A",
      layoutType: "Title_Slide",
      visualSpec: "Clean dark slate conclusion card with glowing QR code placeholder, call to action, and team contact details.",
      bullets: [
        `• ${projectTitle}: Empowering the next generation of student innovators.`,
        "• Live Demo URL: https://insights-copilot-chi.vercel.app",
        "• Open Source GitHub Repo: github.com/TECH-RAJVARDHAN782/insights-copilot",
        "• Thank you! We are open for Judges' Q&A."
      ],
      callout: "TRY THE LIVE DEMO NOW • Q&A SESSION",
      speakerNote: "Conclude with a clear call-to-action and invite judges for questions."
    }
  ]);

  const handleDownloadPPTX = () => {
    setDownloadingPpt(true);
    try {
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      slides10.forEach((s) => {
        const slide = pres.addSlide();
        slide.background = { color: '0F172A' };

        // Slide Title
        slide.addText(`SLIDE ${s.slideNum}: ${s.title.toUpperCase()}`, {
          x: 0.8, y: 0.8, w: '85%', fontSize: 24, bold: true, color: '38BDF8', align: 'left', fontFace: 'Plus Jakarta Sans'
        });

        // Layout Type Badge
        slide.addText(`LAYOUT: ${s.layoutType}`, {
          x: 0.8, y: 1.5, w: '85%', fontSize: 12, bold: true, color: 'A855F7', align: 'left', fontFace: 'Inter'
        });

        // Visual Spec Box
        slide.addText(`Visual Spec: ${s.visualSpec}`, {
          x: 0.8, y: 2.1, w: '85%', fontSize: 11, italic: true, color: '94A3B8', align: 'left', fontFace: 'Inter'
        });

        // Bullets
        slide.addText(s.bullets.join('\n'), {
          x: 0.8, y: 2.8, w: '85%', fontSize: 13, color: 'F8FAFC', align: 'left', lineSpacing: 22, fontFace: 'Inter'
        });

        // Callout Metric
        slide.addText(s.callout, {
          x: 0.8, y: 5.4, w: '85%', fontSize: 14, bold: true, color: '34D399', align: 'left', fontFace: 'Inter'
        });

        // Speaker Note
        slide.addText(`Speaker Note: ${s.speakerNote}`, {
          x: 0.8, y: 6.4, w: '85%', fontSize: 10, italic: true, color: '64748B', align: 'left', fontFace: 'Inter'
        });
      });

      const filename = `${slug}-10-Slide-Pitch-Deck.pptx`;
      pres.writeFile({ fileName: filename }).then(() => {
        setDownloadingPpt(false);
        confetti({ particleCount: 80, spread: 75 });
      });
    } catch (error) {
      setDownloadingPpt(false);
    }
  };

  const handleCopyCompleteBlueprint = () => {
    let text = `=== 🎨 1. VISUAL & DESIGN DIRECTION ===\n`;
    text += `Color Palette: ${designTokens.colorPalette.primary} + ${designTokens.colorPalette.accent} + ${designTokens.colorPalette.highlight}\n`;
    text += `Typography Pairing: ${designTokens.typography.pairing}\n`;
    text += `Visual Vibe: ${designTokens.colorPalette.vibe}\n\n`;

    text += `=== 📊 2. 10-SLIDE PRESENTATION BLUEPRINT ===\n\n`;
    slides10.forEach((s) => {
      text += `SLIDE ${s.slideNum}: ${s.title}\n`;
      text += `Layout Type: ${s.layoutType}\n`;
      text += `Visual Spec / AI Image Prompt: ${s.visualSpec}\n`;
      text += `Slide Headings & Key Bullet Points:\n${s.bullets.join('\n')}\n`;
      text += `Highlighted Metric / Callout: ${s.callout}\n`;
      text += `Pitch Speaker Note: ${s.speakerNote}\n\n-----------------------------------\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
    confetti({ particleCount: 35, spread: 45 });
  };

  const handleCopySlidesgoPrompt = () => {
    const promptText = `Create 10-slide presentation deck for project: "${projectTitle}". Domain Palette: Dark Slate + Electric Blue. Typography: Plus Jakarta Sans + Inter. Slides: Title Hook, Core Problem, AI Solution, Key Features, System Architecture, Live Product Sandbox, Uniqueness Gap, Timeline Roadmap, Impact Metrics, Pitch Q&A.`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    confetti({ particleCount: 30, spread: 40 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl space-y-2 border border-indigo-200 bg-white shadow-md">
        <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Strict Presentation Design & Strategy Guidelines Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          PPT Generation
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Auto-generate 10-slide presentation blueprints & PowerPoint decks (.pptx) adhering 100% to strict hackathon pitch criteria.
        </p>
      </div>

      {/* DESIGN DIRECTION TOKENS BANNER */}
      <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Palette className="w-4 h-4" />
          <span>🎨 Visual & Design Direction Specification</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Color Palette Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-extrabold uppercase text-[10px] block">3-Color Domain Palette</span>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700"></span>
              <span className="w-4 h-4 rounded-full bg-sky-400"></span>
              <span className="w-4 h-4 rounded-full bg-cyan-400"></span>
            </div>
            <p className="text-slate-200 font-mono font-bold pt-1">Dark Slate + Electric Blue + Cyber Cyan</p>
          </div>

          {/* Typography Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Typography Pairing</span>
            <div className="flex items-center space-x-1 text-purple-400 font-bold">
              <Type className="w-4 h-4" />
              <span>Plus Jakarta Sans + Inter</span>
            </div>
            <p className="text-slate-200 font-mono text-[11px]">Titles 28pt Bold • Body 14pt Medium</p>
          </div>

          {/* Visual Vibe Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Visual Layout Vibe</span>
            <div className="flex items-center space-x-1 text-emerald-400 font-bold">
              <Sliders className="w-4 h-4" />
              <span>High Contrast & Scannable</span>
            </div>
            <p className="text-slate-200 text-[11px] font-medium">Clean whitespace & zero wall-of-text paragraphs</p>
          </div>

        </div>
      </div>

      {/* MAIN 10-SLIDE PRESENTATION BLUEPRINT & EXPORTER CONTAINER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
        
        {/* Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h3 className="text-xl font-black text-slate-900">10-Slide Pitch Deck Blueprint ({projectTitle})</h3>
            <p className="text-slate-600 text-xs font-medium">Complete slide-by-slide structure with layout types, visual specs, speaker notes & callouts.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold mr-2">
              <button
                onClick={() => setViewMode('blueprint')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'blueprint' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                10-Slide Blueprint
              </button>
              <button
                onClick={() => setViewMode('slides')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'slides' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Slide Canvas
              </button>
            </div>

            {/* BUTTON 1: Download PowerPoint (.pptx) */}
            <button
              onClick={handleDownloadPPTX}
              disabled={downloadingPpt}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Presentation className="w-4 h-4 text-slate-950" />
              <span>{downloadingPpt ? "Generating 10 Slides..." : "Download 10-Slide (.pptx)"}</span>
            </button>

            {/* BUTTON 2: Copy Complete Blueprint */}
            <button
              onClick={handleCopyCompleteBlueprint}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md cursor-pointer border border-slate-800"
            >
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>{copiedBlueprint ? "Copied Blueprint!" : "Copy Full Blueprint"}</span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: COMPLETE 10-SLIDE STRUCTURED BLUEPRINT (LIST VIEW) */}
        {viewMode === 'blueprint' ? (
          <div className="space-y-6 pt-2">
            {slides10.map((s, idx) => (
              <div
                key={s.slideNum}
                className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-4 shadow-xl animate-fadeIn"
              >
                {/* Slide Header: SLIDE X + Layout Type Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-mono font-black flex items-center justify-center text-sm shadow-md">
                      0{s.slideNum}
                    </div>
                    <h4 className="text-base font-black text-white">{s.title}</h4>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-extrabold">
                    Layout Type: {s.layoutType}
                  </span>
                </div>

                {/* Visual Spec / AI Image Prompt */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                  <span className="text-indigo-400 font-extrabold uppercase text-[10px] block">Visual Spec / AI Image Prompt:</span>
                  <p className="text-slate-300 italic font-medium leading-relaxed">{s.visualSpec}</p>
                </div>

                {/* Slide Headings & Key Bullet Points */}
                <div className="space-y-1.5">
                  <span className="text-emerald-400 font-extrabold uppercase text-[10px] block">Slide Headings & Key Bullet Points:</span>
                  <div className="space-y-1 pl-2 text-xs text-slate-200 font-semibold leading-relaxed">
                    {s.bullets.map((b, i) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>
                </div>

                {/* Highlighted Metric / Callout & Speaker Note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                    <span className="text-[10px] text-emerald-400 uppercase block font-sans">Highlighted Metric / Callout:</span>
                    {s.callout}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs italic">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase not-italic block">Pitch Speaker Note:</span>
                    "{s.speakerNote}"
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* VIEW MODE 2: SLIDE CANVAS SIMULATOR */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            
            {/* Left: 10 Slide Navigation Pills */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">10 Presentation Slides</h4>
              {slides10.map((slide, idx) => (
                <div
                  key={slide.slideNum}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center space-x-3 ${
                    activeSlideIndex === idx
                      ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/40 text-indigo-900 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {slide.slideNum}
                  </span>
                  <div className="flex-1 truncate">
                    <span className="text-[10px] font-bold text-indigo-600 block">{slide.layoutType}</span>
                    <h5 className="text-xs font-black truncate">{slide.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Editable Dark Slide Screen Simulator */}
            <div className="lg:col-span-2 space-y-4">
              
              <div className="relative bg-slate-950 rounded-3xl p-8 border border-slate-800 min-h-[360px] flex flex-col justify-between shadow-2xl text-white">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400 border-b border-slate-800 pb-3">
                  <span>SLIDE {slides10[activeSlideIndex].slideNum} OF 10</span>
                  <span className="text-purple-400 font-bold">LAYOUT: {slides10[activeSlideIndex].layoutType}</span>
                </div>

                <div className="space-y-4 py-4">
                  <h3 className="text-2xl font-black text-white">{slides10[activeSlideIndex].title}</h3>
                  <div className="space-y-1.5 text-xs text-slate-200 font-medium">
                    {slides10[activeSlideIndex].bullets.map((b, i) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 inline-block">
                    {slides10[activeSlideIndex].callout}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                  <span>Speaker Note: {slides10[activeSlideIndex].speakerNote}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeSlideIndex === 0}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 cursor-pointer text-white font-bold"
                    >
                      ‹ Prev
                    </button>
                    <button
                      onClick={() => setActiveSlideIndex(prev => Math.min(9, prev + 1))}
                      disabled={activeSlideIndex === 9}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 cursor-pointer text-white font-bold"
                    >
                      Next ›
                    </button>
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
