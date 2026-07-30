import React, { useState } from 'react';
import { User, Lock, Mail, GraduationCap, X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@iit.ac.in',
    password: '••••••••',
    university: 'IIT Bombay (Hostel Block B)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: formData.name || "Student User",
      email: formData.email || "student@iit.ac.in",
      university: formData.university || "IIT Bombay"
    });
    confetti({ particleCount: 40, spread: 50 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl max-w-md w-full border border-indigo-500/40 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {isRegister ? "Student Registration" : "Student Login Portal"}
          </h3>
          <p className="text-xs text-slate-200">
            {isRegister
              ? "Create your student account to save search history & projects."
              : "Sign in with your university credentials to access saved conversations."}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Full Student Name</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                <User className="absolute left-3 w-4 h-4 text-slate-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">University Email</label>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@university.ac.in"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
              <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">Password</label>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <Lock className="absolute left-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">University / Institute</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="e.g. IIT Bombay"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                <GraduationCap className="absolute left-3 w-4 h-4 text-slate-400" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isRegister ? "Register Account" : "Sign In to Portal"}</span>
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-300">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-cyan-400 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New student?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-cyan-400 font-bold hover:underline cursor-pointer"
              >
                Register Here
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
