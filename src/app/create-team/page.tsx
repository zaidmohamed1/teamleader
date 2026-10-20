'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createTeam } from '@/store/slices/studentSlice';
import {
  Globe,
  Smartphone,
  Bot,
  Monitor,
  Plug,
  ClipboardList,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  Palette,
  Zap,
  Server,
  Database
} from 'lucide-react';

interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  defaultRoles: string[];
}

const projectTypes: ProjectTypeOption[] = [
  {
    id: 'web',
    title: 'Web Application',
    description: 'Browser-based app or website',
    icon: Globe,
    defaultRoles: ['UI/UX Designer', 'Frontend Developer', 'Backend Developer'],
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    description: 'iOS and / or Android app',
    icon: Smartphone,
    defaultRoles: ['UI/UX Designer', 'Mobile Developer', 'Backend Developer'],
  },
  {
    id: 'ai',
    title: 'AI / Machine Learning',
    description: 'ML models, NLP, data science',
    icon: Bot,
    defaultRoles: ['AI / ML Engineer', 'Data Scientist', 'Backend Developer'],
  },
  {
    id: 'desktop',
    title: 'Desktop Application',
    description: 'Native desktop software',
    icon: Monitor,
    defaultRoles: ['Desktop Software Engineer', 'UI/UX Designer', 'QA Tester'],
  },
  {
    id: 'iot',
    title: 'IoT',
    description: 'Connected devices & sensors',
    icon: Plug,
    defaultRoles: ['Embedded Engineer', 'Hardware Specialist', 'Cloud / Backend Dev'],
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Research, tool or mixed type',
    icon: ClipboardList,
    defaultRoles: ['Researcher', 'Software Developer', 'System Architect'],
  },
];

const availableRoles = [
  { name: 'UI/UX Designer', icon: Palette, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900' },
  { name: 'Frontend Developer', icon: Zap, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900' },
  { name: 'Backend Developer', icon: Server, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900' },
  { name: 'AI / ML Engineer', icon: Bot, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900' },
  { name: 'Mobile Developer', icon: Smartphone, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900' },
  { name: 'QA / Tester', icon: Database, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900' },
];

export default function CreateTeamPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.student);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType] = useState<ProjectTypeOption>(projectTypes[0]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    'UI/UX Designer',
    'Frontend Developer',
    'Backend Developer',
  ]);
  const [projectName, setProjectName] = useState('');
  // Generate a unique team ID once per page mount
  const [teamId] = useState(() => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `IG-${year}-${rand}`;
  });
  const [copied, setCopied] = useState(false);

  const handleSelectType = (type: ProjectTypeOption) => {
    setSelectedType(type);
    setSelectedRoles(type.defaultRoles);
    setStep(2);
  };

  const toggleRole = (roleName: string) => {
    if (selectedRoles.includes(roleName)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== roleName));
      }
    } else {
      setSelectedRoles([...selectedRoles, roleName]);
    }
  };

  const handleFinishCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    // Persist team creation across the single session
    dispatch(
      createTeam({
        teamName: projectName.trim(),
        projectType: selectedType.title,
        teamId,
      })
    );
    setStep(4);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(teamId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-4xl w-full mx-auto space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Create Your Team
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Set up your graduation project team. You'll become the Team Leader.
            </p>
          </div>

          {step <= 3 && (
            <div className="flex items-center gap-6 text-xs font-semibold py-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= 1 ? 'bg-[#2563EB] text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  1
                </span>
                <span className={step >= 1 ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-400'}>
                  Project Type
                </span>
              </div>

              <div className="w-8 h-px bg-slate-200 dark:bg-slate-800"></div>

              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= 2 ? 'bg-[#2563EB] text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  2
                </span>
                <span className={step >= 2 ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-400'}>
                  Project Roles
                </span>
              </div>

              <div className="w-8 h-px bg-slate-200 dark:bg-slate-800"></div>

              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= 3 ? 'bg-[#2563EB] text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  3
                </span>
                <span className={step >= 3 ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-400'}>
                  Team Info
                </span>
              </div>
            </div>
          )}

          {/* STEP 1: Project Type Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  What type of project are you building?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your selection suggests the right project roles for your team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {projectTypes.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedType.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectType(item)}
                      role="button"
                      tabIndex={0}
                      className={`bg-white dark:bg-[#111827] rounded-2xl p-6 transition-all duration-200 cursor-pointer text-left shadow-xs flex flex-col justify-between h-44 hover:-translate-y-0.5 ${
                        isSelected
                          ? 'border-2 border-[#2563EB] shadow-md shadow-blue-500/10'
                          : 'border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[#2563EB] dark:text-blue-400">
                        <Icon className="w-5 h-5 stroke-[1.8]" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>

                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  Continue to Roles
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Project Roles */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Select Required Roles for "{selectedType.title}"
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Choose the specialized roles teammates can apply for in your team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableRoles.map((role) => {
                  const Icon = role.icon;
                  const isChecked = selectedRoles.includes(role.name);

                  return (
                    <div
                      key={role.name}
                      onClick={() => toggleRole(role.name)}
                      className={`bg-white dark:bg-[#111827] border rounded-2xl p-5 cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 shadow-xs hover:-translate-y-0.5 ${
                        isChecked
                          ? 'border-[#2563EB] bg-blue-50/20 dark:bg-blue-950/20'
                          : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${role.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{role.name}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? 'bg-[#2563EB] border-[#2563EB] text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  Continue to Team Info
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Team Info */}
          {step === 3 && (
            <form onSubmit={handleFinishCreation} className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Team Information
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Name your project and confirm your team configuration.
                </p>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. SmartGrad AI / IntelliGrad"
                    className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      DEPARTMENT
                    </label>
                    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
                      {profile.department}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      YOUR ROLE
                    </label>
                    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                      Team Leader
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    SELECTED ROLES
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-xs font-semibold"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  Create Team
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Summary Screen */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <button
                  onClick={handleCopyId}
                  className="px-6 py-2.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 dark:text-emerald-400">Team ID Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copy Team ID</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      PROJECT NAME
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{projectName}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      PROJECT TYPE
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{selectedType.title}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      DEPARTMENT
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{profile.department}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      YOUR ROLE
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Team Leader</p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">
                    PROJECT ROLES
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedRoles.map((role) => {
                      const isUI = role.includes('UI');
                      const isFront = role.includes('Frontend');
                      return (
                        <span
                          key={role}
                          className="px-3.5 py-1.5 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-xs font-semibold flex items-center gap-1.5"
                        >
                          {isUI && <Palette className="w-3.5 h-3.5 text-amber-500" />}
                          {isFront && <Zap className="w-3.5 h-3.5 text-blue-500" />}
                          {!isUI && !isFront && <Server className="w-3.5 h-3.5 text-indigo-500" />}
                          {role}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xs">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  NEXT STEPS
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                      Browse supervisors and send requests to a Doctor and TA
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                      Share your Team ID with students you want to invite
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                      Accept join requests and assign roles on the Team page
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] font-bold flex items-center justify-center shrink-0">
                      4
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                      Submit your Project Idea for AI validation
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/team"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 active:scale-95 duration-150"
              >
                Go to Team Workspace
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </main>
      </div>

      <button
        title="Open IntelliGrad AI Advisor"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#1E3A8A] hover:bg-[#172554] text-white flex items-center justify-center shadow-lg shadow-blue-900/30 hover:scale-105 transition-all"
      >
        <Bot className="w-7 h-7 stroke-[1.8]" />
      </button>
    </div>
  );
}
