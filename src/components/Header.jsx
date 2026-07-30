import React, { useState } from 'react';
import { Sparkles, Compass, Globe, Zap, Smartphone, Monitor, Layout, UserCheck, Rocket, Bot, Share2, FileCode, FileText, ChevronDown, Plus, History, User } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currentLang, 
  setCurrentLang, 
  viewMode,
  setViewMode,
  userAuth,
  onOpenAuth,
  onOpenHistory,
  onNewConversation
}) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Primary essential tabs visible in top bar
  const primaryTabs = [
    { id: 'search', label: t.tabs.search, icon: Compass },
    { id: 'readymade', label: t.tabs.readymade, icon: Rocket },
    { id: 'graph', label: t.tabs.graph, icon: Share2 },
    { id: 'hub', label: t.tabs.hub, icon: FileCode },
  ];

  // Secondary non-essential tools in dropdown
  const secondaryTabs = [
    { id: 'agents', label: t.tabs.agents, icon: Bot },
    { id: 'docs', label: t.tabs.docs, icon: FileText },
    { id: 'talent', label: t.tabs.talent, icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-indigo-900/40 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row with Generous Breathing Room */}
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer select-none shrink-0" onClick={() => setActiveTab('search')}>
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
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block font-medium">{t.tagline}</p>
            </div>
          </div>

          {/* VIEW MODE TOGGLE (WEB PLATFORM / MOBILE APP / DUAL VIEW) */}
          <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-indigo-900/50 shadow-inner">
            <button
              onClick={() => setViewMode('web')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'web'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Web Platform</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App</span>
            </button>

            <button
              onClick={() => setViewMode('dual')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'dual'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Dual View</span>
            </button>
          </div>

          {/* Right Action Tools: + New Chat, History, Auth, Language */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* New Conversation Button */}
            <button
              onClick={onNewConversation}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-1 shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            {/* Conversation History Drawer Button */}
            <button
              onClick={onOpenHistory}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center space-x-1 border border-slate-800 cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">History</span>
            </button>

            {/* Student Auth Profile Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 text-xs font-semibold border border-slate-800 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline truncate max-w-[100px]">
                {userAuth ? userAuth.name : "Sign In"}
              </span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-cyan-400 mr-1" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer pr-1"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                    {lang.flag} {lang.name.split(' ')[0]}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Tab Navigation Bar with Breathing Room & Dropdown */}
        <div className="flex items-center justify-between py-2 border-t border-slate-800/60">
          <div className="flex space-x-2 overflow-x-auto scrollbar-none py-0.5">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md border border-indigo-400/40'
                      : 'text-slate-200 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SECONDARY TOOLS DROPDOWN ("More Tools ▾") */}
          <div className="relative shrink-0 ml-2">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 cursor-pointer"
            >
              <span>More Tools</span>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 rounded-2xl border border-indigo-900/50 shadow-2xl p-2 z-50 space-y-1 animate-scaleUp">
                {secondaryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMoreOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                        isActive
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
