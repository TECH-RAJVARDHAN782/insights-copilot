import React, { useState } from 'react';
import { Sparkles, Compass, Globe, Zap, Layout, UserCheck, Rocket, Bot, Share2, FileCode, FileText, ChevronDown, Plus, History, User, Play } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currentLang, 
  setCurrentLang, 
  userAuth,
  onOpenAuth,
  onOpenHistory,
  onNewConversation
}) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Primary tabs visible in top navigation bar
  const primaryTabs = [
    { id: 'search', label: t.tabs.search, icon: Compass },
    { id: 'readymade', label: t.tabs.readymade, icon: Rocket },
    { id: 'sandbox', label: t.tabs.sandbox || 'Live Sandbox', icon: Play },
    { id: 'graph', label: t.tabs.graph, icon: Share2 },
    { id: 'hub', label: t.tabs.hub, icon: FileCode },
  ];

  // Secondary tools in clean dropdown
  const secondaryTabs = [
    { id: 'agents', label: t.tabs.agents, icon: Bot },
    { id: 'docs', label: t.tabs.docs, icon: FileText },
    { id: 'talent', label: t.tabs.talent, icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer select-none shrink-0" onClick={() => setActiveTab('search')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  iNSIGHTS<span className="text-indigo-600">.copilot</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-600 hidden sm:block font-medium">{t.tagline}</p>
            </div>
          </div>

          {/* Right Action Tools: + New Chat, History, Auth, Language */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* New Conversation Button */}
            <button
              onClick={onNewConversation}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-1 shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-1 border border-slate-200 cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">History</span>
            </button>

            {/* Student Auth Profile Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-200 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline truncate max-w-[100px]">
                {userAuth ? userAuth.name : "Sign In"}
              </span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-100 border border-slate-200 rounded-xl px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-indigo-600 mr-1" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-slate-900">
                    {lang.flag} {lang.name.split(' ')[0]}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center justify-between py-2 border-t border-slate-200">
          <div className="flex space-x-2 overflow-x-auto scrollbar-none py-0.5">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SECONDARY TOOLS DROPDOWN ("More Tools ▾") */}
          <div className="relative shrink-0 ml-2">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 cursor-pointer"
            >
              <span>More Tools</span>
              <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 space-y-1">
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
                      className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${
                        isActive
                          ? 'bg-indigo-600 text-white font-extrabold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-indigo-600" />
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
