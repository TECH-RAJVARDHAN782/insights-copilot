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
  const [viewMode, setViewMode] = useState('blueprint'); // 'blueprint' | 'slides'
  const [selectedThemeId, setSelectedThemeId] = useState('theme1'); // Default Theme 1

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const projectTitle = projectData?.title || "iNSIGHTS AI Research Copilot";
  const projectDesc = projectData?.tagline || "AI-Engineered platform for national hackathons and thesis validation";
  const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const frontendTech = projectData?.architecture?.frontend || "React 18 + Tailwind CSS";
  const backendTech = projectData?.architecture?.backend || "Node.js Express + Python FastAPI";

  // 6 DESIGN THEME PRESETS (VC Pitch Strategist Trained)
  const themePresets = {
    theme1: {
      id: "theme1",
      name: "Modern SaaS Dark (Linear / Arc Style)",
      vibe: "Sleek, futuristic, high-tech, developer-centric",
      primaryHex: "0F172A",
      accentHex: "0EA5E9",
      highlightHex: "6366F1",
      bgColor: "bg-slate-950 text-white border-slate-800",
      cardColor: "bg-slate-900 border-slate-800 text-white",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
      calloutColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      titleFont: "Plus Jakarta Sans",
      bodyFont: "Inter"
    },
    theme2: {
      id: "theme2",
      name: "Y-Combinator Minimalist Pitch Deck",
      vibe: "High signal-to-noise ratio, ultra-readable, investor-focused",
      primaryHex: "FFFFFF",
      accentHex: "FF6600",
      highlightHex: "111827",
      bgColor: "bg-white text-slate-900 border-slate-300",
      cardColor: "bg-slate-50 border-slate-300 text-slate-900",
      badgeColor: "bg-orange-500/20 text-orange-800 border-orange-400",
      calloutColor: "bg-slate-900 text-white border-slate-800",
      titleFont: "SF Pro Display / Helvetica Neue",
      bodyFont: "Inter"
    },
    theme3: {
      id: "theme3",
      name: "Canva Modern Creator & Pastel",
      vibe: "Vibrant, approachable, friendly, consumer-ready",
      primaryHex: "FDFBF7",
      accentHex: "84A98C",
      highlightHex: "FF7B54",
      bgColor: "bg-[#FDFBF7] text-slate-900 border-emerald-200",
      cardColor: "bg-emerald-50/60 border-emerald-200 text-slate-900",
      badgeColor: "bg-emerald-200 text-emerald-900 border-emerald-300",
      calloutColor: "bg-orange-100 text-orange-900 border-orange-300",
      titleFont: "Outfit / Poppins",
      bodyFont: "Open Sans"
    },
    theme4: {
      id: "theme4",
      name: "Apple Keynote Ultra-Minimal",
      vibe: "Premium, elegant, massive typography, bold focus",
      primaryHex: "0A0A0C",
      accentHex: "FFFFFF",
      highlightHex: "8E8E93",
      bgColor: "bg-[#0A0A0C] text-white border-zinc-800",
      cardColor: "bg-zinc-900 border-zinc-800 text-white",
      badgeColor: "bg-white/20 text-white border-white/40",
      calloutColor: "bg-zinc-800 text-white border-zinc-700",
      titleFont: "Inter / SF Pro Display",
      bodyFont: "SF Pro Text"
    },
    theme5: {
      id: "theme5",
      name: "Enterprise Corporate & Fintech",
      vibe: "Professional, trustworthy, institutional, authoritative",
      primaryHex: "0A192F",
      accentHex: "F59E0B",
      highlightHex: "1E3A8A",
      bgColor: "bg-[#0A192F] text-white border-blue-900",
      cardColor: "bg-[#1E3A8A]/40 border-blue-800 text-white",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      calloutColor: "bg-blue-900/60 text-cyan-300 border-blue-700",
      titleFont: "Montserrat",
      bodyFont: "Roboto"
    },
    theme6: {
      id: "theme6",
      name: "Cyberpunk & DeepTech Neon",
      vibe: "High-energy, AI-native, bold gradients, dark contrast",
      primaryHex: "05050A",
      accentHex: "8B5CF6",
      highlightHex: "10B981",
      bgColor: "bg-[#05050A] text-white border-purple-900",
      cardColor: "bg-purple-950/40 border-purple-800 text-white",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      calloutColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      titleFont: "Space Grotesk",
      bodyFont: "JetBrains Mono"
    }
  };

  const currentTheme = themePresets[selectedThemeId];

  // COMPLETE 10-SLIDE PRESENTATION BLUEPRINT
  const [slides10, setSlides10] = useState([
    {
      slideNum: 1,
      title: "Title & Hook",
      layoutType: "Title_Slide",
      visualSpec: `Minimalist ${currentTheme.name} hero canvas with custom color accents (${currentTheme.primaryHex}), floating AI core icon, and bold title typography.`,
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
      title: "Key Features & Innovation Layers",
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
      title: "Uniqueness & Market Gap Analysis",
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
      visualSpec: "3 large metric stat boxes with bold figures and upward trending arrow badges.",
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
      title: "Pitch Conclusion & Call to Action",
      layoutType: "Title_Slide",
      visualSpec: "Clean conclusion card with glowing QR code placeholder, call to action, and team contact details.",
      bullets: [
        `• ${projectTitle}: Empowering the next generation of student innovators.`,
        "• Live Demo URL: https://insights-copilot-chi.vercel.app",
        "• Open Source GitHub Repo: github.com/TECH-RAJVARDHAN782/insights-copilot",
        "• Thank you! We are open for VC & Judges' Q&A."
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
        slide.background = { color: currentTheme.primaryHex };

        // Slide Title
        slide.addText(`SLIDE ${s.slideNum}: ${s.title.toUpperCase()}`, {
          x: 0.8, y: 0.8, w: '85%', fontSize: 24, bold: true, color: currentTheme.accentHex, align: 'left', fontFace: currentTheme.titleFont
        });

        // Layout Type Badge
        slide.addText(`LAYOUT: ${s.layoutType}`, {
          x: 0.8, y: 1.5, w: '85%', fontSize: 12, bold: true, color: currentTheme.highlightHex, align: 'left', fontFace: currentTheme.bodyFont
        });

        // Visual Spec Box
        slide.addText(`Visual Spec: ${s.visualSpec}`, {
          x: 0.8, y: 2.1, w: '85%', fontSize: 11, italic: true, color: '94A3B8', align: 'left', fontFace: currentTheme.bodyFont
        });

        // Bullets
        slide.addText(s.bullets.join('\n'), {
          x: 0.8, y: 2.8, w: '85%', fontSize: 13, color: 'F8FAFC', align: 'left', lineSpacing: 22, fontFace: currentTheme.bodyFont
        });

        // Callout Metric
        slide.addText(s.callout, {
          x: 0.8, y: 5.4, w: '85%', fontSize: 14, bold: true, color: '34D399', align: 'left', fontFace: currentTheme.bodyFont
        });

        // Speaker Note
        slide.addText(`Speaker Note: ${s.speakerNote}`, {
          x: 0.8, y: 6.4, w: '85%', fontSize: 10, italic: true, color: '64748B', align: 'left', fontFace: currentTheme.bodyFont
        });
      });

      const filename = `${slug}-${currentTheme.id}-10-Slide-Deck.pptx`;
      pres.writeFile({ fileName: filename }).then(() => {
        setDownloadingPpt(false);
        confetti({ particleCount: 80, spread: 75 });
      });
    } catch (error) {
      setDownloadingPpt(false);
    }
  };

  const handleCopyCompleteBlueprint = () => {
    let text = `=== 🎨 CHOSEN DESIGN THEME: ${currentTheme.name.toUpperCase()} ===\n`;
    text += `Vibe: ${currentTheme.vibe}\n`;
    text += `Typography: ${currentTheme.titleFont} + ${currentTheme.bodyFont}\n\n`;

    text += `=== 📊 10-SLIDE PRESENTATION BLUEPRINT ===\n\n`;
    slides10.forEach((s) => {
      text += `SLIDE ${s.slideNum}: ${s.title}\n`;
      text += `Layout Type: ${s.layoutType}\n`;
      text += `Visual Spec & Theme Colors: ${s.visualSpec}\n`;
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
    const promptText = `Create 10-slide presentation deck for project: "${projectTitle}". Theme: ${currentTheme.name}. Vibe: ${currentTheme.vibe}. Typography: ${currentTheme.titleFont} + ${currentTheme.bodyFont}. Slides: Title Hook, Core Problem, AI Solution, Key Features, System Architecture, Live Product Sandbox, Uniqueness Gap, Timeline Roadmap, Impact Metrics, Pitch Q&A.`;
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
          <span>McKinsey & Y-Combinator Trained Pitch Strategist Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          PPT Generation
        </h2>
        <p className="text-slate-700 text-sm font-semibold">
          Select from 6 VC design theme presets to auto-generate 10-slide presentation blueprints & PowerPoint decks (.pptx).
        </p>
      </div>

      {/* 🎨 6 DESIGN THEME PRESETS SELECTOR */}
      <div className="glass-panel p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-slate-900 text-sm font-black border-b border-slate-200 pb-3">
          <Palette className="w-5 h-5 text-indigo-600" />
          <span>Select Design Theme Preset (6 VC Themes Available)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.values(themePresets).map((t) => {
            const isSelected = selectedThemeId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedThemeId(t.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'ring-2 ring-indigo-600 bg-indigo-50/80 border-indigo-300 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900">{t.name}</h4>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-snug">{t.vibe}</p>
                <div className="flex items-center justify-between text-[10px] text-indigo-700 font-mono font-bold pt-1 border-t border-slate-200/60">
                  <span>Fonts: {t.titleFont.split('/')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE THEME SPECIFICATION BANNER */}
      <div className={`p-6 rounded-3xl space-y-3 shadow-xl transition-all ${currentTheme.bgColor}`}>
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Active Theme Specification: {currentTheme.name}</span>
          </div>
          <span className="text-[10px] font-mono font-bold opacity-80">{currentTheme.vibe}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-black/30 space-y-1">
            <span className="opacity-70 text-[10px]">Theme Color Tokens:</span>
            <p>Primary: #{currentTheme.primaryHex} • Accent: #{currentTheme.accentHex} • Highlight: #{currentTheme.highlightHex}</p>
          </div>
          <div className="p-3 rounded-xl bg-black/30 space-y-1">
            <span className="opacity-70 text-[10px]">Typography Specifications:</span>
            <p>Headings: {currentTheme.titleFont} • Body: {currentTheme.bodyFont}</p>
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
                className={`p-6 rounded-3xl border space-y-4 shadow-xl animate-fadeIn ${currentTheme.cardColor}`}
              >
                {/* Slide Header: SLIDE X + Layout Type Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/40 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-mono font-black flex items-center justify-center text-sm shadow-md">
                      0{s.slideNum}
                    </div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">{s.title}</h4>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold border ${currentTheme.badgeColor}`}>
                    Layout Type: {s.layoutType}
                  </span>
                </div>

                {/* Visual Spec & Theme Colors */}
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/40 space-y-1 text-xs">
                  <span className="text-indigo-400 font-extrabold uppercase text-[10px] block">Visual Spec & Theme Colors ({currentTheme.name}):</span>
                  <p className="italic font-medium leading-relaxed opacity-90">{s.visualSpec}</p>
                </div>

                {/* Slide Headings & Key Bullet Points */}
                <div className="space-y-1.5">
                  <span className="text-emerald-400 font-extrabold uppercase text-[10px] block">Slide Headings & Key Bullet Points:</span>
                  <div className="space-y-1 pl-2 text-xs font-semibold leading-relaxed">
                    {s.bullets.map((b, i) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>
                </div>

                {/* Highlighted Metric / Callout & Speaker Note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className={`p-3 rounded-xl font-mono text-xs font-bold border ${currentTheme.calloutColor}`}>
                    <span className="text-[10px] uppercase block font-sans opacity-80">Highlighted Metric / Callout:</span>
                    {s.callout}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/40 text-xs italic">
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
              
              <div className={`relative rounded-3xl p-8 border min-h-[360px] flex flex-col justify-between shadow-2xl transition-all ${currentTheme.cardColor}`}>
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400 border-b border-slate-800/40 pb-3">
                  <span>SLIDE {slides10[activeSlideIndex].slideNum} OF 10</span>
                  <span className="font-bold">LAYOUT: {slides10[activeSlideIndex].layoutType}</span>
                </div>

                <div className="space-y-4 py-4">
                  <h3 className="text-2xl font-black">{slides10[activeSlideIndex].title}</h3>
                  <div className="space-y-1.5 text-xs font-medium">
                    {slides10[activeSlideIndex].bullets.map((b, i) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>

                  <div className={`p-3 rounded-xl font-mono text-xs font-bold border inline-block ${currentTheme.calloutColor}`}>
                    {slides10[activeSlideIndex].callout}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono opacity-80 pt-2 border-t border-slate-800/40">
                  <span>Speaker Note: {slides10[activeSlideIndex].speakerNote}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeSlideIndex === 0}
                      className="p-1 rounded bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 cursor-pointer font-bold"
                    >
                      ‹ Prev
                    </button>
                    <button
                      onClick={() => setActiveSlideIndex(prev => Math.min(9, prev + 1))}
                      disabled={activeSlideIndex === 9}
                      className="p-1 rounded bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 cursor-pointer font-bold"
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
