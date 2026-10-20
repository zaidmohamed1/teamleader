'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { requestSupervisor, cancelSupervisorRequest } from '@/store/slices/studentSlice';
import { ChevronRight, Bot, UserPlus, Check, X, Clock, Loader2 } from 'lucide-react';

interface Supervisor {
  id: string;
  initials: string;
  name: string;
  role: string;
  type: 'Doctor' | 'TA';
  status: 'Available' | 'Full';
  department: string;
  projectCount: string;
  bio: string;
  tags: string[];
  extraTagsCount?: number;
}

const supervisorsData: Supervisor[] = [
  {
    id: 's-1',
    initials: 'DK',
    name: 'Dr. Khaled Nasser',
    role: 'Assistant Professor',
    type: 'Doctor',
    status: 'Full',
    department: 'Software Engineering',
    projectCount: '4/4 projects',
    bio: 'Specializes in software architecture and modern web technologies. Previously worked at top tech companies.',
    tags: ['Software Engineering', 'Web Development', 'Agile'],
    extraTagsCount: 1,
  },
  {
    id: 's-2',
    initials: 'DR',
    name: 'Dr. Rania Farouk',
    role: 'Associate Professor',
    type: 'Doctor',
    status: 'Available',
    department: 'Information Systems',
    projectCount: '1/4 projects',
    bio: 'Expert in data analytics and business intelligence systems with industry consulting experience.',
    tags: ['Data Science', 'Business Intelligence', 'Databases'],
    extraTagsCount: 1,
  },
  {
    id: 's-3',
    initials: 'DA',
    name: 'Dr. Ahmed Hassan',
    role: 'Associate Professor',
    type: 'Doctor',
    status: 'Available',
    department: 'Artificial Intelligence',
    projectCount: '2/4 projects',
    bio: 'Research focus on machine learning, computer vision, and NLP systems. Numerous published papers.',
    tags: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
    extraTagsCount: 1,
  },
  {
    id: 's-4',
    initials: 'EM',
    name: 'Eng. Mohamed Ali',
    role: 'Senior Teaching Assistant',
    type: 'TA',
    status: 'Available',
    department: 'Computer Science',
    projectCount: '1/2 projects',
    bio: 'Passionate about algorithms. Finalist in ICPC 2023. 3 years mentoring students in backend development.',
    tags: ['Algorithms', 'Data Structures', 'Competitive Programming'],
    extraTagsCount: 1,
  },
  {
    id: 's-5',
    initials: 'EF',
    name: 'Eng. Fatima Zahra',
    role: 'Teaching Assistant',
    type: 'TA',
    status: 'Available',
    department: 'Information Systems',
    projectCount: '2/3 projects',
    bio: 'Specializes in database design and business intelligence. Currently pursuing her Masters.',
    tags: ['Databases', 'Business Intelligence', 'Data Science'],
    extraTagsCount: 1,
  },
  {
    id: 's-6',
    initials: 'ES',
    name: 'Eng. Sara Khalid',
    role: 'Teaching Assistant',
    type: 'TA',
    status: 'Available',
    department: 'Artificial Intelligence',
    projectCount: '1/3 projects',
    bio: 'Web & ML developer. Enjoys working with students on building real-world AI-powered apps.',
    tags: ['Web Development', 'Machine Learning', 'Databases'],
    extraTagsCount: 0,
  },
  {
    id: 's-7',
    initials: 'EB',
    name: 'Eng. Bassem Wael',
    role: 'Research Assistant',
    type: 'TA',
    status: 'Available',
    department: 'Software Engineering',
    projectCount: '2/3 projects',
    bio: 'Mobile development specialist with published apps on both iOS and Android stores.',
    tags: ['Mobile Development', 'React Native', 'Flutter'],
    extraTagsCount: 1,
  },
];

export default function SupervisorsPage() {
  const dispatch = useAppDispatch();
  const { supervisorRequests, profile } = useAppSelector((state) => state.student);
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('s-3');
  const [filterType, setFilterType] = useState<'All' | 'Doctor' | 'TA'>('All');

  const getRequestStatus = (id: string) => {
    return supervisorRequests.find((r) => r.id === id)?.status ?? null;
  };

  const acceptedDoctor = supervisorRequests.find(
    (r) => r.type === 'Doctor' && r.status === 'Accepted'
  );
  const acceptedTA = supervisorRequests.find(
    (r) => r.type === 'TA' && r.status === 'Accepted'
  );

  const handleRequest = (sup: Supervisor) => {
    const existing = getRequestStatus(sup.id);
    if (existing === 'Pending') {
      dispatch(cancelSupervisorRequest(sup.id));
      return;
    }
    if (existing === 'Accepted') return;

    // Only one Doctor and one TA allowed
    if (sup.type === 'Doctor' && acceptedDoctor && acceptedDoctor.id !== sup.id) return;
    if (sup.type === 'TA' && acceptedTA && acceptedTA.id !== sup.id) return;

    dispatch(
      requestSupervisor({
        id: sup.id,
        initials: sup.initials,
        name: sup.name,
        role: sup.role,
        type: sup.type,
        department: sup.department,
        tags: sup.tags,
        status: 'Pending',
      })
    );
  };

  const filtered = filterType === 'All' ? supervisorsData : supervisorsData.filter((s) => s.type === filterType);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">

          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Supervisors
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select one Doctor and one Teaching Assistant for your team.
              </p>
            </div>

            {/* Selection summary pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  acceptedDoctor
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {acceptedDoctor ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                Doctor: {acceptedDoctor ? acceptedDoctor.name : 'Not selected'}
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  acceptedTA
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {acceptedTA ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                TA: {acceptedTA ? acceptedTA.name : 'Not selected'}
              </div>
            </div>
          </div>

          {/* Filter pills */}
          {profile.hasTeam && (
            <div className="flex items-center gap-2">
              {(['All', 'Doctor', 'TA'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    filterType === f
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* Supervisors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((sup) => {
              const isSelected = selectedSupervisor === sup.id;
              const reqStatus = getRequestStatus(sup.id);
              const isRequested = reqStatus === 'Pending';
              const isAccepted = reqStatus === 'Accepted';
              const isDeclined = reqStatus === 'Declined';

              // Disable button if: full slot, or already have accepted in that type from someone else
              const doctorSlotTaken = sup.type === 'Doctor' && !!acceptedDoctor && acceptedDoctor.id !== sup.id;
              const taSlotTaken = sup.type === 'TA' && !!acceptedTA && acceptedTA.id !== sup.id;
              const slotTaken = doctorSlotTaken || taSlotTaken;

              return (
                <div
                  key={sup.id}
                  onClick={() => setSelectedSupervisor(sup.id)}
                  className={`bg-white dark:bg-[#111827] rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-xs hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-2 border-[#2563EB] shadow-md shadow-blue-500/10'
                      : isAccepted
                      ? 'border-2 border-emerald-400 dark:border-emerald-600 shadow-sm shadow-emerald-200/30'
                      : 'border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800 select-none">
                        {sup.initials}
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                          {sup.name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{sup.role}</p>
                        <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300 text-[10px] font-bold">
                            {sup.type}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              sup.status === 'Available'
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                                : 'bg-red-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
                            }`}
                          >
                            {sup.status}
                          </span>
                          {isAccepted && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Accepted
                            </span>
                          )}
                          {isRequested && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[10px] font-bold flex items-center gap-0.5">
                              <Loader2 className="w-2.5 h-2.5 animate-spin" /> Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dept & count */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {sup.department} • {sup.projectCount}
                    </p>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {sup.bio}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {sup.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {sup.extraTagsCount && sup.extraTagsCount > 0 ? (
                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                          +{sup.extraTagsCount}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* CTA Button */}
                  {profile.hasTeam && (
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {isAccepted ? (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          Supervising your team
                        </div>
                      ) : isDeclined ? (
                        <p className="text-xs text-rose-500 font-semibold">Request Declined</p>
                      ) : isRequested ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(cancelSupervisorRequest(sup.id));
                          }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel Request
                        </button>
                      ) : slotTaken ? (
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                          {sup.type} slot already filled
                        </p>
                      ) : sup.status === 'Full' ? (
                        <p className="text-xs text-rose-500 font-semibold flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5" /> No available slots
                        </p>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequest(sup);
                          }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition group"
                        >
                          <UserPlus className="w-3.5 h-3.5 group-hover:scale-110 transition" />
                          Send Request
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {!profile.hasTeam && (
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Create a team first to send requests
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
