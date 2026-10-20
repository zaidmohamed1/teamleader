'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Plus, ArrowRight, Home } from 'lucide-react';

interface TeamRequiredGuardProps {
  title?: string;
  description?: string;
}

export default function TeamRequiredGuard({
  title = 'Team Workspace Locked',
  description = 'You need to create a project team first to access this section. Once your team is created, your team dashboard, task board, channels, and team calendar will be activated.',
}: TeamRequiredGuardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 max-w-xl mx-auto text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Users className="w-10 h-10" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 border-2 border-white dark:border-[#0B0F19] text-white flex items-center justify-center shadow-sm">
          <Plus className="w-4 h-4" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Link
          href="/create-team"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Create a Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium transition"
        >
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="mt-12 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs text-blue-800 dark:text-blue-300 text-left max-w-md w-full">
        <span className="font-semibold block mb-1">💡 Quick tip:</span>
        Creating a team takes less than 2 minutes. You can select your project type, choose default member roles, and generate your team code.
      </div>
    </div>
  );
}
