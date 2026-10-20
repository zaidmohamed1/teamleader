'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TeamRequiredGuard from '@/components/common/TeamRequiredGuard';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  acceptJoinRequest,
  declineJoinRequest,
  cancelSupervisorRequest,
} from '@/store/slices/studentSlice';
import {
  MessageSquare,
  CheckSquare,
  Calendar,
  Search,
  Bot,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  Users,
  ChevronRight,
  X,
} from 'lucide-react';

export default function TeamOverviewPage() {
  const dispatch = useAppDispatch();
  const { profile, ideaValidation, supervisorRequests, joinRequests, teamMembers } = useAppSelector(
    (state) => state.student
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'sections' | 'requests'>(
    'overview'
  );

  const acceptedDoctor = supervisorRequests.find(
    (r) => r.type === 'Doctor' && r.status === 'Accepted'
  );
  const acceptedTA = supervisorRequests.find(
    (r) => r.type === 'TA' && r.status === 'Accepted'
  );
  const pendingDoctors = supervisorRequests.filter(
    (r) => r.type === 'Doctor' && r.status === 'Pending'
  );
  const pendingTAs = supervisorRequests.filter(
    (r) => r.type === 'TA' && r.status === 'Pending'
  );

  const pendingJoins = joinRequests.filter((r) => r.status === 'Pending');
  const pendingCount = pendingJoins.length;

  const sectionColors: Record<string, string> = {
    Leadership: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400',
    Frontend: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
    Backend: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400',
    AI: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400',
    'UI/UX': 'bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400',
  };

  // Simulate supervisor acceptance after some time (toggle manually for demo)
  const handleSimulateAccept = (id: string) => {
    // In real app this would be a backend callback; here we simulate for demo
    dispatch({ type: 'student/acceptSupervisorRequest', payload: id });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-5xl w-full mx-auto space-y-6 animate-fade-in">
          {!profile.hasTeam ? (
            <TeamRequiredGuard
              title="Team Overview Locked"
              description="You have not created or joined a graduation project team yet. Create your team to view team details, members, progress, and supervisor approvals."
            />
          ) : (
            <>
              {/* Top Title & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {profile.teamName || 'My Team'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono font-medium">
                      {profile.teamId || 'IG-2024-7821'}
                    </span>
                    {profile.projectType && (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                        {profile.projectType}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                      TEAM LEADER
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/channels"
                    className="px-4 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition flex items-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 duration-150"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    Channels
                  </Link>
                  <Link
                    href="/tasks"
                    className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 duration-150"
                  >
                    <CheckSquare className="w-4 h-4" />
                    Tasks
                  </Link>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Team Setup Progress</span>
                  <span className="text-sm font-bold text-[#2563EB] dark:text-blue-400">
                    {Math.round(
                      ((acceptedDoctor ? 1 : 0) +
                        (acceptedTA ? 1 : 0) +
                        (teamMembers.length > 1 ? 1 : 0) +
                        (ideaValidation.isValidated ? 1 : 0)) *
                        25
                    )}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2563EB] h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        ((acceptedDoctor ? 1 : 0) +
                          (acceptedTA ? 1 : 0) +
                          (teamMembers.length > 1 ? 1 : 0) +
                          (ideaValidation.isValidated ? 1 : 0)) *
                        25
                      }%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { label: 'Doctor Selected', done: !!acceptedDoctor },
                    { label: 'TA Selected', done: !!acceptedTA },
                    { label: 'Members Joined', done: teamMembers.length > 1 },
                    { label: 'Idea Validated', done: ideaValidation.isValidated },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${
                        item.done
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span className="font-medium leading-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 text-xs font-semibold">
                {(
                  [
                    { key: 'overview', label: 'Overview' },
                    { key: 'members', label: `Members (${teamMembers.length})` },
                    { key: 'sections', label: 'Sections' },
                    {
                      key: 'requests',
                      label: `Requests${pendingCount > 0 ? ` (${pendingCount})` : ''}`,
                      badge: pendingCount,
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 transition relative flex items-center gap-1.5 ${
                      activeTab === tab.key
                        ? 'text-[#2563EB] dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {'badge' in tab && tab.badge > 0 && (
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                    {activeTab === tab.key && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] dark:bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* ─── TAB 1: OVERVIEW ─── */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Project Idea Validation */}
                  <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Project Idea Validation
                      </h3>
                      <Link
                        href="/project-idea"
                        className="text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:underline"
                      >
                        {ideaValidation.isValidated ? 'View Results →' : 'Submit Idea →'}
                      </Link>
                    </div>

                    {ideaValidation.isValidated ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {ideaValidation.title}
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                            Approved ✓
                          </span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3.5 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm flex items-center justify-center shrink-0">
                            {ideaValidation.score}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              AI Score: {ideaValidation.score}/100
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                              {ideaValidation.feedback}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                            No project idea submitted yet
                          </p>
                          <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5">
                            Submit your project idea for AI validation — takes less than 2 minutes.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Supervisors Card */}
                  <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Supervisors</h3>
                      <Link
                        href="/supervisors"
                        className="text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        {!acceptedDoctor || !acceptedTA ? 'Choose Supervisors →' : 'Browse →'}
                      </Link>
                    </div>

                    {supervisorRequests.length === 0 ? (
                      // Empty state
                      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Users className="w-7 h-7 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            No supervisors selected yet
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            Go to the Supervisors page to request a Doctor and a Teaching Assistant.
                          </p>
                        </div>
                        <Link
                          href="/supervisors"
                          className="mt-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition"
                        >
                          Browse Supervisors
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {supervisorRequests.map((req) => (
                          <div
                            key={req.id}
                            className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800">
                                {req.initials}
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                  {req.name}
                                </h4>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                  {req.role} • {req.department}
                                </p>
                                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                                  <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 text-[10px] font-bold">
                                    {req.type}
                                  </span>
                                  {req.tags.slice(0, 2).map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px]"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {req.status === 'Pending' && (
                                <>
                                  {/* Demo: simulate accept */}
                                  <button
                                    onClick={() => handleSimulateAccept(req.id)}
                                    title="Simulate: Supervisor Accepted"
                                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold transition"
                                  >
                                    Simulate Accept
                                  </button>
                                  <button
                                    onClick={() => dispatch(cancelSupervisorRequest(req.id))}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-700 transition"
                                    title="Cancel Request"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                                    Pending…
                                  </span>
                                </>
                              )}
                              {req.status === 'Accepted' && (
                                <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                                  Accepted ✓
                                </span>
                              )}
                              {req.status === 'Declined' && (
                                <span className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-semibold">
                                  Declined
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Show "add doctor / TA" hints if not yet sent */}
                        {!pendingDoctors.length && !acceptedDoctor && (
                          <Link
                            href="/supervisors"
                            className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-semibold hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400 dark:hover:border-blue-600 transition"
                          >
                            <UserPlus className="w-4 h-4" />
                            Request a Doctor supervisor
                          </Link>
                        )}
                        {!pendingTAs.length && !acceptedTA && (
                          <Link
                            href="/supervisors"
                            className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-semibold hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400 dark:hover:border-blue-600 transition"
                          >
                            <UserPlus className="w-4 h-4" />
                            Request a Teaching Assistant
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { href: '/channels', label: 'Open Channels', icon: MessageSquare, color: 'text-purple-600 dark:text-purple-400' },
                        { href: '/tasks', label: 'View Tasks', icon: CheckSquare, color: 'text-emerald-600 dark:text-emerald-400' },
                        { href: '/calendar', label: 'Calendar', icon: Calendar, color: 'text-blue-600 dark:text-blue-400' },
                        { href: '/supervisors', label: 'Supervisors', icon: Search, color: 'text-indigo-600 dark:text-indigo-400' },
                      ].map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          className="bg-[#EFF6FF] dark:bg-blue-950/20 hover:bg-blue-100/70 dark:hover:bg-blue-900/30 rounded-2xl p-4 text-center transition-all duration-150 flex flex-col items-center justify-center gap-2 shadow-xs hover:-translate-y-1 hover:shadow-md group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-2xs group-hover:scale-110 transition">
                            <action.icon className={`w-4 h-4 ${action.color}`} />
                          </div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{action.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB 2: MEMBERS ─── */}
              {activeTab === 'members' && (
                <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Team Members ({teamMembers.length})
                    </h3>
                    {pendingCount > 0 && (
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {pendingCount} pending request{pendingCount > 1 ? 's' : ''}
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-100 dark:border-blue-800">
                            {member.initials}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{member.name}</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">{member.role}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                            sectionColors[member.section] ||
                            'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {member.section}
                        </span>
                      </div>
                    ))}
                  </div>

                  {teamMembers.length === 1 && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-200 dark:border-slate-700 text-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        You're the only member so far. Accept join requests from the{' '}
                        <button
                          onClick={() => setActiveTab('requests')}
                          className="text-[#2563EB] dark:text-blue-400 font-semibold hover:underline"
                        >
                          Requests tab
                        </button>{' '}
                        to grow your team.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 3: SECTIONS ─── */}
              {activeTab === 'sections' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                  {['UI/UX Section', 'Frontend Section', 'Backend Section', 'AI & NLP Section'].map(
                    (sec) => (
                      <div
                        key={sec}
                        className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs"
                      >
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{sec}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Dedicated channel and task board for this module.
                        </p>
                        <Link
                          href="/channels"
                          className="text-xs text-[#2563EB] dark:text-blue-400 font-semibold mt-3 block hover:underline"
                        >
                          Go to channel →
                        </Link>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* ─── TAB 4: REQUESTS ─── */}
              {activeTab === 'requests' && (
                <div className="space-y-4 animate-fade-in">
                  {/* Pending */}
                  {pendingJoins.length > 0 && (
                    <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Pending Join Requests ({pendingJoins.length})
                      </h3>

                      {pendingJoins.map((req) => (
                        <div
                          key={req.id}
                          className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-100 dark:border-blue-800 shrink-0">
                              {req.initials}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-white">
                                {req.name}
                              </p>
                              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                Applied for:{' '}
                                <span className="font-semibold text-slate-600 dark:text-slate-300">
                                  {req.appliedFor}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => dispatch(acceptJoinRequest(req.id))}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition active:scale-95"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Accept
                            </button>
                            <button
                              onClick={() => dispatch(declineJoinRequest(req.id))}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-800 text-xs font-semibold transition active:scale-95"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Accepted / Declined history */}
                  {joinRequests.some((r) => r.status !== 'Pending') && (
                    <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">History</h3>
                      {joinRequests
                        .filter((r) => r.status !== 'Pending')
                        .map((req) => (
                          <div
                            key={req.id}
                            className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                                {req.initials}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                  {req.name}
                                </p>
                                <p className="text-[11px] text-slate-400">{req.appliedFor}</p>
                              </div>
                            </div>
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                req.status === 'Accepted'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
                              }`}
                            >
                              {req.status}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* All-clear state */}
                  {pendingJoins.length === 0 && joinRequests.every((r) => r.status === 'Pending') && (
                    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                      <CheckCircle2 className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        No pending join requests
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Share your team code{' '}
                        <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
                          {profile.teamId}
                        </span>{' '}
                        so others can request to join.
                      </p>
                    </div>
                  )}
                </div>
              )}
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
