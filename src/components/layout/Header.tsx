'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleDarkMode } from '@/store/slices/studentSlice';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { profile, isDarkMode, unreadNotifications } = useAppSelector((state) => state.student);

  // Dynamic header title matching Figma screens
  const getPageTitle = () => {
    switch (pathname) {
      case '/profile':
        return 'My Profile';
      case '/supervisors':
        return 'Find Supervisors';
      case '/notifications':
        return 'Notifications';
      case '/create-team':
        return 'Create Team';
      case '/team':
        return 'My Team';
      case '/channels':
        return 'Channels';
      case '/tasks':
        return 'Task Board';
      case '/calendar':
        return 'Calendar';
      case '/project-idea':
        return 'Project Idea';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-slate-800/80 px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
        {getPageTitle()}
      </h1>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-150 relative active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          )}
        </Link>

        {/* Dark Mode Toggle Pill */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/70 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 active:scale-95 shadow-2xs"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span>Dark</span>
            </>
          )}
        </button>

        {/* User Initial Avatar */}
        <Link
          href="/profile"
          className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/60 flex items-center justify-center font-bold text-xs select-none hover:ring-2 hover:ring-blue-400/40 hover:scale-105 transition-all duration-150"
        >
          {profile.name.charAt(0)}
        </Link>
      </div>
    </header>
  );
}
