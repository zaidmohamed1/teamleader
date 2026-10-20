'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIdeaValidation } from '@/store/slices/studentSlice';
import {
  Save,
  CheckCircle2,
  Circle,
  Loader2,
  X,
  Palette,
  Zap,
  Server,
  Bot,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  ArrowRight,
  Check
} from 'lucide-react';

export default function ProjectIdeaPage() {
  const dispatch = useAppDispatch();
  const { ideaValidation } = useAppSelector((state) => state.student);

  // If already validated from a previous run, jump straight to result
  const [phase, setPhase] = useState<'form' | 'confirm' | 'analyzing' | 'result'>(
    ideaValidation.isValidated ? 'result' : 'form'
  );

  // Form Fields
  const [projectTitle, setProjectTitle] = useState('SmartGrad AI — Graduation Project Management Platform');
  const [projectDescription, setProjectDescription] = useState(
    'An AI-powered graduation project management system that leverages machine learning to connect students with suitable supervisors and suggest relevant project ideas based on interests and department.'
  );
  const [problemStatement, setProblemStatement] = useState(
    'What specific problem does your project solve? Who is affected and how? Be precise.'
  );
  const [proposedSolution, setProposedSolution] = useState(
    'How does your project solve the problem? Describe the core approach, key features, and mechanism.'
  );

  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'Python',
    'NLP'
  ]);
  const [department, setDepartment] = useState('Computer Science');

  const [selectedSections, setSelectedSections] = useState<string[]>([
    'UI/UX',
    'Frontend',
    'Backend',
    'AI'
  ]);

  const [draftSaved, setDraftSaved] = useState(false);

  // Analysis Animation Steps matching Figma Image 1 & 2
  const analysisSteps = [
    'Reading project description...',
    'Evaluating problem statement...',
    'Assessing technical feasibility...',
    'Reviewing technology stack...',
    'Scoring innovation and scope...',
    'Generating feedback...',
  ];
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0);

  // Handle tech input keydown
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = techInput.trim().replace(/^,|,$/g, '');
      if (val && !technologies.includes(val)) {
        setTechnologies([...technologies, val]);
      }
      setTechInput('');
    }
  };

  const removeTech = (item: string) => {
    setTechnologies(technologies.filter((t) => t !== item));
  };

  const toggleSection = (sec: string) => {
    if (selectedSections.includes(sec)) {
      if (selectedSections.length > 1) {
        setSelectedSections(selectedSections.filter((s) => s !== sec));
      }
    } else {
      setSelectedSections([...selectedSections, sec]);
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  // Trigger analysis sequence
  const startAnalysis = () => {
    setPhase('analyzing');
    setCurrentAnalysisIndex(0);
  };

  useEffect(() => {
    if (phase === 'analyzing') {
      const interval = setInterval(() => {
        setCurrentAnalysisIndex((prev) => {
          if (prev < analysisSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              // ✅ Persist the validated idea to Redux / sessionStorage
              dispatch(
                setIdeaValidation({
                  isValidated: true,
                  score: 87,
                  title: projectTitle,
                  feedback:
                    'Strong project proposal with clear scope, well-defined problem statement, and appropriate technology choices for the selected department.',
                  tag: 'Approved',
                  status: 'Approved',
                })
              );
              setPhase('result');
            }, 900);
            return prev;
          }
        });
      }, 650);

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Evaluation criteria data matching Figma Images 4 & 5
  const evaluationCriteria = [
    {
      title: 'Problem Clarity',
      score: 92,
      description: 'Problem is well-articulated and contextualized.',
    },
    {
      title: 'Solution Feasibility',
      score: 85,
      description: 'Solution is technically achievable within a graduation project timeframe.',
    },
    {
      title: 'Technical Depth',
      score: 88,
      description: 'Good use of relevant technologies for the chosen domain.',
    },
    {
      title: 'Scope Definition',
      score: 80,
      description: 'Scope is reasonable; a phased approach would strengthen this further.',
    },
    {
      title: 'Innovation',
      score: 84,
      description: 'Addresses a genuine gap with a meaningful approach.',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-4xl w-full mx-auto space-y-6 animate-fade-in">
          {/* Main Title & Subtitle */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Project Idea
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Define your graduation project idea for AI validation.
            </p>
          </div>

          {/* ========================================================= */}
          {/* PHASE 1: SUBMISSION FORM */}
          {/* ========================================================= */}
          {phase === 'form' && (
            <div className="space-y-6">
              {draftSaved && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Draft saved successfully!
                </div>
              )}

              {/* Card 1: PROJECT DETAILS */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-5 shadow-xs transition-colors duration-200">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  PROJECT DETAILS
                </span>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. SmartGrad AI — Graduation Project Management Platform"
                    className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="A brief overview of your project — what it is and what it aims to accomplish."
                    className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed resize-none transition"
                  />
                </div>
              </div>

              {/* Card 2: PROBLEM & SOLUTION */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-5 shadow-xs transition-colors duration-200">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  PROBLEM & SOLUTION
                </span>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Problem Statement <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={problemStatement}
                    onChange={(e) => setProblemStatement(e.target.value)}
                    placeholder="What specific problem does your project solve? Who is affected and how? Be precise."
                    className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed resize-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Proposed Solution <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={proposedSolution}
                    onChange={(e) => setProposedSolution(e.target.value)}
                    placeholder="How does your project solve the problem? Describe the core approach, key features, and mechanism."
                    className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed resize-none transition"
                  />
                </div>
              </div>

              {/* Card 3: TECHNICAL SCOPE */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-5 shadow-xs transition-colors duration-200">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  TECHNICAL SCOPE
                </span>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Technologies / Tech Stack
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={handleTechKeyDown}
                      placeholder="Type a technology and press Enter (e.g. React, Python, TensorFlow)"
                      className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    />
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      Press Enter or comma to add each technology.
                    </p>

                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-xs font-semibold"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="hover:text-blue-800 dark:hover:text-blue-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Department <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Systems">Information Systems</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Project Sections <span className="text-rose-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'UI/UX', icon: Palette, color: 'text-amber-500' },
                      { name: 'Frontend', icon: Zap, color: 'text-blue-500' },
                      { name: 'Backend', icon: Server, color: 'text-indigo-500' },
                      { name: 'AI', icon: Bot, color: 'text-purple-500' },
                    ].map((sec) => {
                      const Icon = sec.icon;
                      const isSelected = selectedSections.includes(sec.name);

                      return (
                        <div
                          key={sec.name}
                          onClick={() => toggleSection(sec.name)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 flex items-center gap-3 ${
                            isSelected
                              ? 'bg-[#EFF6FF] dark:bg-blue-950/40 border-[#2563EB] text-[#2563EB] dark:text-blue-400 font-bold shadow-xs'
                              : 'bg-slate-50/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${sec.color}`} />
                          <span className="text-xs font-bold">{sec.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs active:scale-95 duration-150"
                >
                  <Save className="w-4 h-4 text-slate-500" />
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => setPhase('confirm')}
                  className="flex-1 w-full py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 duration-150"
                >
                  <span>Submit for AI Validation</span>
                  <span className="text-blue-200 font-serif">⟡</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PHASE 2: CONFIRMATION VIEW */}
          {/* ========================================================= */}
          {phase === 'confirm' && (
            <div className="flex justify-center pt-4 animate-fade-in">
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 max-w-lg w-full shadow-lg space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-900/60 shadow-xs">
                  <Bot className="w-8 h-8 stroke-[1.8]" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    Submit for AI Validation?
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    The AI will analyze your project idea and provide a structured evaluation with feedback.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 rounded-xl p-4 text-left space-y-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {projectTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {projectDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedSections.map((sec) => (
                      <span
                        key={sec}
                        className="px-2 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-[10px] font-bold"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setPhase('form')}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    &lt; Back
                  </button>

                  <button
                    onClick={startAnalysis}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    Submit for AI Validation &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PHASE 3: LIVE AI ANALYZING SCREEN (Figma Images 1 & 2) */}
          {/* ========================================================= */}
          {phase === 'analyzing' && (
            <div className="flex justify-center pt-8 animate-fade-in">
              <div className="max-w-md w-full space-y-6 text-center">
                {/* Orbiting Dots Animation around Robot Head */}
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-blue-200 dark:border-blue-900 animate-spin-slow">
                    <span className="absolute top-1 left-3 w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-[#3B82F6]/20 dark:bg-blue-900/30 flex items-center justify-center p-2">
                    <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                      <Bot className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    AI is analyzing your project...
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    This usually takes a few seconds.
                  </p>
                </div>

                {/* Checklist Container matching Figma Images 1 & 2 */}
                <div className="bg-[#EFF6FF]/70 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800 rounded-2xl p-6 text-left space-y-3.5 shadow-xs">
                  {analysisSteps.map((step, idx) => {
                    const isCompleted = idx < currentAnalysisIndex;
                    const isCurrent = idx === currentAnalysisIndex;

                    return (
                      <div
                        key={step}
                        className={`flex items-center gap-3 text-xs font-medium transition-all duration-300 ${
                          isCompleted
                            ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                            : isCurrent
                            ? 'text-[#2563EB] dark:text-blue-400 font-bold'
                            : 'text-slate-400 dark:text-slate-600'
                        }`}
                      >
                        {isCompleted && (
                          <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                        {isCurrent && (
                          <div className="w-4 h-4 rounded-full border-2 border-[#2563EB] flex items-center justify-center shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                          </div>
                        )}
                        {!isCompleted && !isCurrent && (
                          <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" />
                        )}
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PHASE 4: EXACT FIGMA RESULTS SCREEN (Images 3, 4, 5) */}
          {/* ========================================================= */}
          {phase === 'result' && (
            <div className="space-y-6 animate-fade-in">
              {/* Card 1: Top Hero Box with Green Accent, Score 87/100, and Project Approved */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 border-t-4 border-t-emerald-500 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Score Box: 87 / 100 */}
                  <div className="w-20 h-20 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                      87
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1">
                      / 100
                    </span>
                  </div>

                  {/* Approved Title, Date & Description */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Approved
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Analyzed Nov 13, 02:32 PM
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>🎉</span> Project Approved!
                    </h2>

                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Strong project proposal with clear scope, well-defined problem statement, and appropriate technology choices for the selected department.
                    </p>
                  </div>
                </div>

                {/* Top Action Buttons matching Figma */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/team"
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition flex items-center gap-2 shadow-xs active:scale-95 duration-150"
                  >
                    <span>&gt;</span> Go to Project Workspace
                  </Link>

                  <button
                    onClick={() => setPhase('form')}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs md:text-sm font-semibold transition"
                  >
                    View History
                  </button>
                </div>
              </div>

              {/* 2-Column Grid: STRENGTHS & CONCERNS matching Figma Image 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* STRENGTHS */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    STRENGTHS
                  </h3>

                  <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>Problem statement is specific and addresses a real faculty need</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>Technology stack is appropriate for the project scope</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>Clear separation of concerns across the selected sections</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>Proposed solution demonstrates sound technical understanding</span>
                    </li>
                  </ul>
                </div>

                {/* CONCERNS */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                    CONCERNS
                  </h3>

                  <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-rose-500 font-bold mt-0.5">!</span>
                    <span>Consider adding a more detailed timeline breakdown</span>
                  </div>
                </div>
              </div>

              {/* Card 3: SUGGESTIONS matching Figma Image 4 */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
                  SUGGESTIONS
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F0F5FF] dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-slate-700 dark:text-slate-300">
                    1. Add measurable success metrics to the proposed solution
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F0F5FF] dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-slate-700 dark:text-slate-300">
                    2. Mention how you will handle data privacy and security
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F0F5FF] dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-slate-700 dark:text-slate-300">
                    3. Consider defining an MVP scope for the first milestone
                  </div>
                </div>
              </div>

              {/* Card 4: EVALUATION CRITERIA matching Figma Images 4 & 5 */}
              <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  EVALUATION CRITERIA
                </h3>

                <div className="space-y-5">
                  {evaluationCriteria.map((item) => (
                    <div key={item.title} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-800 dark:text-slate-100">{item.title}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{item.score}/100</span>
                      </div>

                      {/* Green Progress Track matching Figma */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
