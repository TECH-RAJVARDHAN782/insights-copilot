import React from 'react';
import { Sparkles, Compass, Globe, Zap, Smartphone, Monitor, Layout, UserCheck, Rocket, Bot, Share2, FileCode, FileText } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currentLang, 
  setCurrentLang, 
  viewMode,
  setViewMode
}) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const tabs = [
    { id: 'search', label: t.tabs.search, icon: Compass },
    { id: 'readymade', label: t.tabs.readymade, icon: Rocket },
    { id: 'graph', label: t.tabs.graph, icon: Share2 },
    { id: 'hub', label: t.tabs.hub, icon: FileCode },
    { id: 'agents', label: t.tabs.agents, icon: Bot },
    { id: 'docs', label: t.tabs.docs, icon: FileText },
    { id: 'talent', label: t.tabs.talent, icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-indigo-900/40 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - Clickable to Home */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setActiveTab('search')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  iNSIGHTS<span className="text-cyan-400">.copilot</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Live MongoDB
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          {/* VIEW MODE TOGGLE (WEB PLATFORM / MOBILE APP / DUAL VIEW) */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-indigo-900/50 shadow-inner">
            <button
              onClick={() => setViewMode('web')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'web'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Web Platform</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile App</span>
            </button>

            <button
              onClick={() => setViewMode('dual')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'dual'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dual View</span>
            </button>
          </div>

          {/* Right Action Tools - Language Selector */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs">
              <Globe className="w-4 h-4 text-cyan-400 mr-2" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer pr-1"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Tab Navigation Bar */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
