'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TeamRequiredGuard from '@/components/common/TeamRequiredGuard';
import { useAppSelector } from '@/store/hooks';
import {
  Plus,
  ChevronRight,
  X,
  Bot,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Task {
  id: string;
  initials: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed' | 'Overdue';
  section: 'UI/UX' | 'Frontend' | 'Backend' | 'AI';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  assignee: string;
  addedBy: string;
  isMyTask?: boolean;
}

const initialTasks: Task[] = [
  {
    id: 't-1',
    initials: 'HM',
    title: 'User research & wireframes',
    description: 'Conduct user interviews with 5+ students. Create low-fi wireframes for the team ...',
    status: 'To Do',
    section: 'UI/UX',
    priority: 'Low',
    dueDate: '2024-12-01',
    assignee: 'Hana Mostafa',
    addedBy: 'Team Leader',
  },
  {
    id: 't-2',
    initials: 'HM',
    title: 'NLP project idea generator',
    description: 'Implement the project idea suggestion module using NLP to match student interest...',
    status: 'To Do',
    section: 'AI',
    priority: 'Medium',
    dueDate: '2024-12-05',
    assignee: 'Hana Mostafa',
    addedBy: 'Team Leader',
  },
  {
    id: 't-3',
    initials: 'NE',
    title: 'Build student dashboard UI',
    description: 'Implement the full student dashboard with team overview, upcoming tasks, meeting...',
    status: 'In Progress',
    section: 'Frontend',
    priority: 'Medium',
    dueDate: '2024-11-28',
    assignee: 'Nour El-Din',
    addedBy: 'Team Leader',
    isMyTask: true,
  },
  {
    id: 't-4',
    initials: 'SA',
    title: 'REST API documentation',
    description: 'Document all API endpoints using OpenAPI spec. Include request/response examples...',
    status: 'To Do',
    section: 'Backend',
    priority: 'Medium',
    dueDate: '2024-12-10',
    assignee: 'Sara Adel',
    addedBy: 'Team Leader',
  },
  {
    id: 't-5',
    initials: 'OH',
    title: 'Auth & JWT implementation',
    description: 'Complete JWT authentication tokens for students, supervisors, and admins.',
    status: 'In Progress',
    section: 'Backend',
    priority: 'High',
    dueDate: '2024-11-25',
    assignee: 'Omar Hassan',
    addedBy: 'Team Leader',
  },
  {
    id: 't-6',
    initials: 'KS',
    title: 'Dataset collection & cleaning',
    description: 'Scrape and format 5 years of past graduation projects for duplicate analysis.',
    status: 'Completed',
    section: 'AI',
    priority: 'High',
    dueDate: '2024-11-15',
    assignee: 'Kareem Sayed',
    addedBy: 'Team Leader',
  },
  {
    id: 't-7',
    initials: 'LI',
    title: 'Database schema design',
    description: 'ERD schema for graduation project milestones and evaluation scoring.',
    status: 'Overdue',
    section: 'Backend',
    priority: 'High',
    dueDate: '2024-11-10',
    assignee: 'Layla Ibrahim',
    addedBy: 'Team Leader',
  },
];

export default function TaskBoardPage() {
  const { profile } = useAppSelector((state) => state.student);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('t-2');
  const [statusFilter, setStatusFilter] = useState<string>('All Tasks');
  const [sectionFilter, setSectionFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskSection, setNewTaskSection] = useState<Task['section']>('Frontend');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('Medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Nour El-Din');

  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const overdueCount = tasks.filter((t) => t.status === 'Overdue').length;
  const todoCount = tasks.filter((t) => t.status === 'To Do').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  const statusPills = [
    { label: `All Tasks (${tasks.length})`, key: 'All Tasks' },
    { label: 'My Tasks', key: 'My Tasks' },
    { label: `To Do (${todoCount})`, key: 'To Do' },
    { label: `In Progress (${inProgressCount})`, key: 'In Progress' },
    { label: `Completed (${completedCount})`, key: 'Completed' },
    { label: `Overdue (${overdueCount})`, key: 'Overdue' },
  ];

  const sectionPills = ['All', 'UI/UX', 'Frontend', 'Backend', 'AI'];

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'My Tasks' && !task.isMyTask) return false;
    if (statusFilter === 'To Do' && task.status !== 'To Do') return false;
    if (statusFilter === 'In Progress' && task.status !== 'In Progress') return false;
    if (statusFilter === 'Completed' && task.status !== 'Completed') return false;
    if (statusFilter === 'Overdue' && task.status !== 'Overdue') return false;

    if (sectionFilter !== 'All' && task.section !== sectionFilter) return false;
    return true;
  });

  // Real-world interaction: Cycle task status
  const cycleTaskStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatusMap: Record<Task['status'], Task['status']> = {
            'To Do': 'In Progress',
            'In Progress': 'Completed',
            'Completed': 'To Do',
            'Overdue': 'In Progress',
          };
          return { ...t, status: nextStatusMap[t.status] };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: Task = {
      id: `t-${Date.now()}`,
      initials: newTaskAssignee.split(' ').map((n) => n[0]).join('').slice(0, 2),
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'No description provided.',
      status: 'To Do',
      section: newTaskSection,
      priority: newTaskPriority,
      dueDate: '2024-12-15',
      assignee: newTaskAssignee,
      addedBy: 'Team Leader',
    };

    setTasks([created, ...tasks]);
    setSelectedTaskId(created.id);
    setIsModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const getPriorityDot = (p: Task['priority']) => {
    switch (p) {
      case 'High':
        return 'text-rose-500';
      case 'Medium':
        return 'text-amber-500';
      default:
        return 'text-slate-400';
    }
  };

  const getSectionBadgeClass = (s: Task['section']) => {
    switch (s) {
      case 'UI/UX':
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'AI':
        return 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'Backend':
        return 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'In Progress':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'Overdue':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-5xl w-full mx-auto space-y-6 animate-fade-in">
          {!profile.hasTeam ? (
            <TeamRequiredGuard
              title="Task Board Locked"
              description="Team tasks, section sprints, and deadlines are activated once you create your project team."
            />
          ) : (
            <>
              {/* Header Title & + New Task button */}
              <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Task Board
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {tasks.length} total • {inProgressCount} in progress • {overdueCount} overdue
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition flex items-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 duration-150"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New Task
            </button>
          </div>

          {/* Row 1: Status Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {statusPills.map((pill) => {
              const isActive = statusFilter === pill.key;

              return (
                <button
                  key={pill.key}
                  onClick={() => setStatusFilter(pill.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 duration-150 ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: Section Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {sectionPills.map((pill) => {
              const isActive = sectionFilter === pill;

              return (
                <button
                  key={pill}
                  onClick={() => setSectionFilter(pill)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition active:scale-95 duration-150 ${
                    isActive
                      ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Tasks List with interactive card selection & status toggling */}
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const isSelected = selectedTaskId === task.id;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`bg-white dark:bg-[#111827] rounded-2xl p-5 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 shadow-xs hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-2 border-[#2563EB] shadow-md shadow-blue-500/10'
                      : 'border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800 select-none mt-0.5">
                      {task.initials}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {task.title}
                        </h3>
                        {task.status === 'Completed' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl line-clamp-1">
                        {task.description}
                      </p>

                      {/* Badges / Metadata row */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        {/* Interactive Status Pill */}
                        <button
                          onClick={(e) => cycleTaskStatus(task.id, e)}
                          title="Click to toggle status"
                          className={`px-2.5 py-0.5 rounded-md font-semibold transition active:scale-95 ${getStatusBadge(
                            task.status
                          )}`}
                        >
                          {task.status} ↻
                        </button>

                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold ${getSectionBadgeClass(
                            task.section
                          )}`}
                        >
                          {task.section}
                        </span>

                        <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-400">
                          <span
                            className={`text-base leading-none ${getPriorityDot(
                              task.priority
                            )}`}
                          >
                            ●
                          </span>
                          {task.priority}
                        </span>

                        <span className="text-slate-400 dark:text-slate-500">
                          Due {task.dueDate} — {task.assignee}
                        </span>

                        <span className="text-slate-400 dark:text-slate-500 font-medium">
                          Added by {task.addedBy}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              );
            })}
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

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Create New Task</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Implement duplicate detection test suite"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Details and expected acceptance criteria..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <select
                    value={newTaskSection}
                    onChange={(e) => setNewTaskSection(e.target.value as Task['section'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="UI/UX">UI/UX</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI">AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assign To
                </label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Hana Mostafa">Hana Mostafa (UI/UX)</option>
                  <option value="Nour El-Din">Nour El-Din (Frontend)</option>
                  <option value="Sara Adel">Sara Adel (Frontend)</option>
                  <option value="Omar Hassan">Omar Hassan (Backend)</option>
                  <option value="Kareem Sayed">Kareem Sayed (AI)</option>
                  <option value="Layla Ibrahim">Layla Ibrahim (Backend)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition active:scale-95"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
