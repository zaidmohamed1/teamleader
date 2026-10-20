'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TeamRequiredGuard from '@/components/common/TeamRequiredGuard';
import { useAppSelector } from '@/store/hooks';
import {
  Search,
  Paperclip,
  Send,
  FileText,
  Download,
  Bot
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

const channelsList: Channel[] = [
  { id: 'general', name: 'general', description: 'Whole team' },
  { id: 'ui-ux', name: 'ui-ux', description: 'Design team', icon: '🎨' },
  { id: 'frontend', name: 'frontend', description: 'Frontend team', icon: '⚡' },
  { id: 'backend', name: 'backend', description: 'Backend team', icon: '🔧' },
  { id: 'ai', name: 'ai', description: 'AI team', icon: '🤖' },
];

export default function ChannelsPage() {
  const { profile } = useAppSelector((state) => state.student);
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [inputText, setInputText] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      initials: 'OH',
      author: 'Omar Hassan',
      time: '10:45 AM',
      text: 'Great work Youssef! The color palette is really polished. The API endpoints for auth module are also ready — Sara, you can start integration.',
    },
    {
      id: 'm-2',
      initials: 'SA',
      author: 'Sara Adel',
      time: '11:02 AM',
      text: "Started integrating the auth. Should be done by EOD. Found one CORS issue but it's fixed.",
      attachment: {
        name: 'auth-integration-notes.md',
        size: '2.3 KB',
      },
    },
    {
      id: 'm-3',
      initials: 'KS',
      author: 'Kareem Sayed',
      time: '11:30 AM',
      text: 'The recommendation model is showing 78% accuracy on the test set 📈 Still optimizing. Will share the full evaluation report later this week.',
    },
    {
      id: 'm-4',
      initials: 'NE',
      author: 'Nour El-Din',
      time: '12:15 PM',
      text: 'Dashboard components are almost done. Just need the API hooks from Omar. Can we sync this afternoon?',
    },
    {
      id: 'm-5',
      initials: 'OH',
      author: 'Omar Hassan',
      time: '12:22 PM',
      text: "Sure! Let's do 3 PM. I'll send the Meets link in the calendar.",
    },
    {
      id: 'm-6',
      initials: 'YM',
      author: 'Youssef Mahmoud',
      time: '2:00 PM',
      text: 'Dr. Ahmed scheduled a progress review for Thursday at 2 PM. Make sure everyone is available 🙏',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        initials: 'YM',
        author: 'Youssef Mahmoud',
        time: 'Just now',
        text: inputText.trim(),
      },
    ]);
    setInputText('');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 flex overflow-hidden animate-fade-in">
          {!profile.hasTeam ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <TeamRequiredGuard
                title="Team Channels Locked"
                description="Team discussions, role channels, and shared files are available after forming or joining your project team."
              />
            </div>
          ) : (
            <>
              {/* Channel Left Sub-Sidebar */}
              <div className="w-64 bg-white dark:bg-[#0E1526] border-r border-slate-200/80 dark:border-slate-800 p-4 space-y-4 shrink-0 flex flex-col transition-colors duration-200">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase px-2">
              CHANNELS
            </span>

            <div className="space-y-1">
              {channelsList.map((ch) => {
                const isActive = activeChannel === ch.id;

                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-150 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#EFF6FF] dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-sm">#</span>
                      <div>
                        <p className="text-xs font-bold leading-none">{ch.name}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{ch.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Chat Stream Container */}
          <div className="flex-1 flex flex-col bg-white dark:bg-[#111827] transition-colors duration-200">
            {/* Chat Room Top Bar */}
            <div className="h-14 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono text-base">#</span>
                <h2 className="font-bold text-slate-900 dark:text-white text-sm">{activeChannel}</h2>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold">
                  Whole team
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Assigned TA pill */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                  <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white text-[9px] font-bold flex items-center justify-center">
                    SK
                  </div>
                  <div className="text-[11px]">
                    <span className="text-slate-400">Assigned TA: </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Eng. Sara Khalid</span>
                  </div>
                </div>

                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              <p className="text-xs text-slate-400 text-center py-1">
                Hey team! I've just uploaded the new design mockups to the files section. Check them out and let me know your thoughts ✨
              </p>

              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3.5 group animate-fade-in">
                  <div className="w-9 h-9 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800 select-none">
                    {msg.initials}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {msg.author}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {msg.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                      {msg.text}
                    </p>

                    {/* File Attachment Card */}
                    {msg.attachment && (
                      <div className="mt-2.5 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 max-w-sm flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-blue-100/60 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {msg.attachment.name}
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {msg.attachment.size}
                            </span>
                          </div>
                        </div>

                        <button className="text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:underline shrink-0 flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <form
                onSubmit={handleSendMessage}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2.5 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message #${activeChannel}...`}
                    className="flex-1 bg-transparent text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition shrink-0 active:scale-95 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-2 pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                  <span>Enter to send • Shift+Enter for new line</span>
                </div>
              </form>
            </div>
          </div>
          </>
        )}
        </main>
      </div>

      {/* Floating Bot button */}
      <button
        title="Open IntelliGrad AI Advisor"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#1E3A8A] hover:bg-[#172554] text-white flex items-center justify-center shadow-lg shadow-blue-900/30 hover:scale-105 transition-all"
      >
        <Bot className="w-7 h-7 stroke-[1.8]" />
      </button>
    </div>
  );
}
