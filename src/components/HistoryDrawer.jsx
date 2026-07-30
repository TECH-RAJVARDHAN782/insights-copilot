import React from 'react';
import { History, Plus, X, Trash2, Clock, Sparkles, MessageSquare } from 'lucide-react';

export default function HistoryDrawer({
  isOpen,
  onClose,
  conversationHistory,
  onSelectHistoryItem,
  onNewConversation,
  onClearHistory
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-slate-950 border-r border-indigo-900/40 h-full p-6 flex flex-col justify-between shadow-2xl space-y-4">
        
        {/* Drawer Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-base">
              <History className="w-5 h-5" />
              <span>Search & Chat History</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Conversation Button */}
          <button
            onClick={() => {
              onNewConversation();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Conversation</span>
          </button>
        </div>

        {/* History Item List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-2 pr-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Saved Sessions ({conversationHistory.length})</p>

          {conversationHistory.length === 0 ? (
            <div className="p-6 text-center text-slate-400 space-y-2">
              <Clock className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs">No search history yet.</p>
              <p className="text-[11px] text-slate-400">Search for any topic to save sessions here automatically.</p>
            </div>
          ) : (
            conversationHistory.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectHistoryItem(item);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 cursor-pointer transition space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white group-hover:text-cyan-300 transition truncate pr-2">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{item.time}</span>
                </div>
                <p className="text-[11px] text-slate-300 truncate">{item.tagline}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {conversationHistory.length > 0 && (
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={onClearHistory}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center justify-center space-x-1.5 border border-slate-800 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
