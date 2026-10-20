'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  Search,
  Bell,
  LogOut,
  Hexagon,
  GraduationCap,
  Users,
  MessageSquare,
  CheckSquare,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetSession } from '@/store/slices/studentSlice';

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { profile, unreadNotifications } = useAppSelector((state) => state.student);

  const mainNavItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Supervisors', href: '/supervisors', icon: Search },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: Bell,
      badge: unreadNotifications,
    },
  ];

  const teamNavItems = [
    { name: 'Team Overview', href: '/team', icon: Users },
    { name: 'Channels', href: '/channels', icon: MessageSquare },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
  ];

  const leaderNavItems = [
    { name: 'Project Idea', href: '/project-idea', icon: Lightbulb },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#0B1120] border-r border-slate-200/80 dark:border-slate-800 min-h-screen flex flex-col shrink-0 justify-between transition-colors duration-200">
      <div>
        {/* Brand Header */}
        <Link href="/" className="p-6 flex items-center gap-3 block group">
          <div className="relative w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:scale-105 transition-transform duration-200">
            <Hexagon className="w-10 h-10 stroke-[1.5]" />
            <GraduationCap className="w-5 h-5 absolute stroke-[1.8]" />
          </div>
          <div>
            <div className="font-extrabold text-xl text-blue-600 dark:text-blue-500 tracking-tight leading-none">
              IntelliGrad
            </div>
            <div className="text-[9px] font-bold tracking-wider text-blue-600/90 dark:text-blue-400 uppercase mt-1 leading-tight">
              FACULTY OF COMPUTERS &<br />INFORMATION
            </div>
          </div>
        </Link>

        {/* Main Navigation Items */}
        <nav className="px-4 space-y-1 mt-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* TEAM Section (ONLY visible if user has a team!) */}
          {profile.hasTeam && (
            <>
              <div className="pt-4 pb-1 animate-fade-in">
                <span className="px-3.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                  TEAM
                </span>
              </div>

              {teamNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 animate-fade-in ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}

              {/* LEADER Section (ONLY visible if user has a team!) */}
              <div className="pt-4 pb-1 animate-fade-in">
                <span className="px-3.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                  LEADER
                </span>
              </div>

              {leaderNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 animate-fade-in ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </div>

      <div className="p-4 space-y-3">
        {/* If NO team yet: show "No team yet" box with button to /create-team (Figma Screenshot 1) */}
        {!profile.hasTeam ? (
          <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-4 text-center animate-fade-in">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">No team yet</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
              Create your graduation project team.
            </p>
            <Link
              href="/create-team"
              className="w-full py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition block text-center active:scale-95 duration-150"
            >
              + Create Team
            </Link>
          </div>
        ) : (
          <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/50 rounded-2xl p-3.5 text-center animate-fade-in">
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
              Active Team
            </span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
              {profile.teamName || 'SmartGrad AI'}
            </p>
            <Link
              href="/team"
              className="text-[11px] text-[#2563EB] dark:text-blue-400 font-semibold hover:underline mt-1 block"
            >
              Open Team Workspace →
            </Link>
          </div>
        )}

        {/* User Mini Profile Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 group-hover:scale-105 transition-transform duration-150">
              {profile.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate leading-none">
                {profile.name}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">
                {profile.department}
              </p>
            </div>
          </Link>
          <button
            onClick={() => dispatch(resetSession())}
            title="Reset to New Run (Clean State)"
            className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
