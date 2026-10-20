'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearNotifications } from '@/store/slices/studentSlice';
import {
  CheckSquare,
  Calendar,
  MessageSquare,
  Users,
  GraduationCap,
  Bot
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'Tasks' | 'Meetings' | 'Messages' | 'Team' | 'Supervisors' | 'Project';
  isUnread: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'New task assigned',
    description: 'Youssef assigned you "Build student dashboard UI" — due Nov 28',
    time: '2h ago',
    type: 'Tasks',
    isUnread: true,
  },
  {
    id: 'n-2',
    title: 'Meeting scheduled',
    description: 'Dr. Ahmed Hassan scheduled a progress review for Nov 14 at 2:00 PM',
    time: '4h ago',
    type: 'Meetings',
    isUnread: true,
  },
  {
    id: 'n-3',
    title: 'New message in #general',
    description: 'Youssef: Dr. Ahmed scheduled a review for Thursday at 2 PM...',
    time: '3h ago',
    type: 'Messages',
    isUnread: true,
  },
  {
    id: 'n-4',
    title: 'Join request accepted',
    description: 'Your request to join SmartGrad AI was accepted by the Team Leader',
    time: '1d ago',
    type: 'Team',
    isUnread: false,
  },
  {
    id: 'n-5',
    title: 'Supervision request accepted',
    description: 'Dr. Ahmed Hassan accepted to supervise your project. Great news!',
    time: '2d ago',
    type: 'Supervisors',
    isUnread: false,
  },
  {
    id: 'n-6',
    title: 'Task overdue',
    description: '"Database schema design" (Layla Ibrahim) passed its deadline on Nov 10',
    time: '1d ago',
    type: 'Tasks',
    isUnread: false,
  },
];

const filterCategories = [
  'All',
  'Tasks',
  'Meetings',
  'Supervisors',
  'Messages',
  'Team',
  'Project',
] as const;

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { unreadNotifications } = useAppSelector((state) => state.student);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [items, setItems] = useState<NotificationItem[]>(mockNotifications);

  const handleMarkAllRead = () => {
    dispatch(clearNotifications());
    setItems((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const toggleItemRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: !item.isUnread } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === 'All') return true;
    return item.type === activeTab;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'Tasks':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'Meetings':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'Messages':
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'Team':
        return (
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'Supervisors':
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 stroke-[2]" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5 stroke-[2]" />
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-4xl w-full mx-auto space-y-6 animate-fade-in">
          {/* Header Title & Mark All Read */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Notifications
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {unreadNotifications} unread notifications
              </p>
            </div>

            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-95 shadow-xs"
            >
              Mark all read
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filterCategories.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 duration-150 ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItemRead(item.id)}
                className={`bg-white dark:bg-[#111827] border rounded-2xl p-5 transition-all duration-200 flex items-center justify-between gap-4 shadow-xs cursor-pointer hover:-translate-y-0.5 ${
                  item.isUnread
                    ? 'border-blue-200/90 dark:border-blue-900/60 bg-[#F8FAFC] dark:bg-blue-950/20'
                    : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  {getIcon(item.type)}

                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timestamp and unread indicator dot */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {item.time}
                  </span>
                  {item.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                  )}
                </div>
              </div>
            ))}
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
