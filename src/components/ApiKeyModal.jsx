import React, { useState, useEffect } from 'react';
import { Key, Sparkles, Check, ShieldCheck, ExternalLink, Zap } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/geminiService';
import confetti from 'canvas-confetti';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(getGeminiApiKey());
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput);
    setIsSaved(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-indigo-200 bg-white space-y-5 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white p-2 shadow-md">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">AI API Key Integration Settings</h3>
              <p className="text-[11px] text-slate-600 font-semibold">Powers Search, AI Agents, Dev-Buddy Bot & PPT Generator</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
              <span>Google Gemini API Key:</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Get Free Gemini Key ↗</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>

            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Paste your Gemini API Key (e.g. AIzaSy...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 font-mono font-bold"
            />
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-1 font-semibold">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-950">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Live Integration Across All Modules:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-indigo-900 font-bold">
              <li>DeepSearch & Patent Scanner (Real-time AI research data)</li>
              <li>AI Agents & WhatsApp / Telegram Dev-Buddy Bot</li>
              <li>PPT Deck Generator & Judge One-Pager</li>
              <li>Project Generator & Live Code Preview Sandbox</li>
            </ul>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-300 stroke-[3]" /> : <Sparkles className="w-4 h-4" />}
              <span>{isSaved ? "API Key Connected!" : "Save & Activate Key"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
