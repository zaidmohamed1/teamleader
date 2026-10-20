'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAppSelector } from '@/store/hooks';
import {
  Plus,
  ChevronRight,
  Target,
  MessageSquare,
  CheckSquare,
  Calendar,
  User,
  Bot,
  Sparkles,
  X,
  Send
} from 'lucide-react';

export default function StudentDashboard() {
  const { profile } = useAppSelector((state) => state.student);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${profile.name}! 👋 I am your IntelliGrad AI Advisor. I can help you brainstorm graduation project ideas, check for topic novelty, or guide you on finding suitable supervisors. How can I help you today?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Great question regarding "${userMsg}"! In Computer Science, focusing on scalable AI integration and clean software architecture will make your project stand out. Would you like me to analyze potential duplicate projects in this area?`,
        },
      ]);
    }, 700);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-5xl w-full mx-auto space-y-6 animate-fade-in">
          {/* Welcome Greeting */}
          <div className="transition-all duration-200">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Welcome , {profile.name} <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Get started by creating your graduation project team.
            </p>
          </div>

          {/* Hero Action Card: Create a Team (Links to /create-team wizard) */}
          <Link
            href="/create-team"
            className="group relative bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 text-white rounded-2xl p-6 md:p-7 flex items-center justify-between shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 cursor-pointer block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight">
                  Create a Team
                </h2>
                <p className="text-blue-100 text-xs md:text-sm mt-0.5 leading-relaxed">
                  Start a project, invite members, and request supervisors. You become the Team Leader.
                </p>
              </div>
            </div>

            <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-4" />
          </Link>

          {/* WHAT YOU CAN DO WITH A TEAM */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xs transition-colors duration-200">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-6">
              WHAT YOU CAN DO WITH A TEAM
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-10">
              {/* Feature 1: Request Supervisors */}
              <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-150">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Target className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Request Supervisors</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Browse and send supervision requests to Doctors and TAs based on your project.
                  </p>
                </div>
              </div>

              {/* Feature 2: Collaborate in Channels */}
              <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-150">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Collaborate in Channels</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Slack-like workspace with section channels for UI/UX, Frontend, Backend, and AI.
                  </p>
                </div>
              </div>

              {/* Feature 3: Manage Tasks */}
              <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-150">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Manage Tasks</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Team Leader creates and assigns tasks. Track progress with deadlines and priorities.
                  </p>
                </div>
              </div>

              {/* Feature 4: Schedule Meetings */}
              <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-150">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Schedule Meetings</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Coordinate with supervisors and teammates. Get reminders and manage reschedules.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile complete banner */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-colors duration-200">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  Profile complete <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {profile.department} • {profile.interests.length} interests selected
                </p>
              </div>
            </div>

            <Link
              href="/supervisors"
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition text-center shadow-xs shrink-0 hover:shadow-md hover:-translate-y-0.5 duration-150"
            >
              Browse Supervisors
            </Link>
          </div>
        </main>
      </div>

      {/* Floating AI Advisor Button (Bottom Right) */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        title="Open IntelliGrad AI Advisor"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#1E3A8A] hover:bg-[#172554] text-white flex items-center justify-center shadow-lg shadow-blue-900/30 hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <div className="relative">
          <Bot className="w-7 h-7 stroke-[1.8]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1E3A8A] animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1E3A8A]"></span>
        </div>
      </button>

      {/* Interactive AI Advisor Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-200" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">IntelliGrad AI Advisor</p>
                <p className="text-[10px] text-blue-200 mt-0.5">NLP Idea & Project Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#111827] border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask AI about topics, ideas, supervisors..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
