'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TeamRequiredGuard from '@/components/common/TeamRequiredGuard';
import { useAppSelector } from '@/store/hooks';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink,
  X,
  Bot
} from 'lucide-react';

interface Meeting {
  id: string;
  day: number;
  dateStr: string;
  title: string;
  timeInfo: string;
  description: string;
  hostName: string;
  hostRole: string;
  status: 'Upcoming' | 'Completed';
  meetLink: string;
}

const mockMeetings: Meeting[] = [
  {
    id: 'm-1',
    day: 14,
    dateStr: 'November 14',
    title: 'Weekly Progress Review',
    timeInfo: 'Thu, Nov 14 • 2:00 PM • 1 hour',
    description: 'Review sprint progress and discuss blockers with the full team.',
    hostName: 'Dr. Ahmed Hassan',
    hostRole: 'Doctor',
    status: 'Upcoming',
    meetLink: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 'm-2',
    day: 16,
    dateStr: 'November 16',
    title: 'TA Office Hours & Code Review',
    timeInfo: 'Sat, Nov 16 • 11:00 AM • 45 min',
    description: 'Code review on authentication module and API endpoints schema.',
    hostName: 'Eng. Sara Khalid',
    hostRole: 'Teaching Assistant',
    status: 'Upcoming',
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
  },
  {
    id: 'm-3',
    day: 20,
    dateStr: 'November 20',
    title: 'NLP Model Architecture Sync',
    timeInfo: 'Wed, Nov 20 • 4:00 PM • 1 hour',
    description: 'Evaluate TF-IDF vs Transformer models for project duplicate detection.',
    hostName: 'Dr. Ahmed Hassan',
    hostRole: 'Doctor',
    status: 'Upcoming',
    meetLink: 'https://meet.google.com/nlp-sync-meet',
  },
];

export default function CalendarPage() {
  const { profile } = useAppSelector((state) => state.student);
  const [selectedDay, setSelectedDay] = useState<number | null>(14);
  const [currentMonth] = useState('November 2024');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingsList, setMeetingsList] = useState<Meeting[]>(mockMeetings);

  // New Meeting form states
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2024-11-14');
  const [newTime, setNewTime] = useState('14:00');
  const [newDesc, setNewDesc] = useState('');
  const [newHost, setNewHost] = useState('Dr. Ahmed Hassan');

  const daysWithMeetings = [11, 14, 16, 20];
  const blankDays = [null, null, null, null, null];
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const filteredMeetings = selectedDay
    ? meetingsList.filter((m) => m.day === selectedDay)
    : meetingsList;

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const dayNum = parseInt(newDate.split('-')[2], 10) || 14;
    const created: Meeting = {
      id: `m-${Date.now()}`,
      day: dayNum,
      dateStr: `November ${dayNum}`,
      title: newTitle.trim(),
      timeInfo: `Nov ${dayNum} • ${newTime} • 1 hour`,
      description: newDesc.trim() || 'General progress review.',
      hostName: newHost,
      hostRole: newHost.includes('Dr.') ? 'Doctor' : 'Teaching Assistant',
      status: 'Upcoming',
      meetLink: 'https://meet.google.com/new-meeting',
    };

    setMeetingsList([...meetingsList, created]);
    setSelectedDay(dayNum);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-6xl w-full mx-auto space-y-6 animate-fade-in">
          {!profile.hasTeam ? (
            <TeamRequiredGuard
              title="Team Calendar Locked"
              description="Team meetings, supervisor office hours, and milestones will be synced here once you establish your project team."
            />
          ) : (
            <>
              {/* Page Heading & + New Meeting Button */}
              <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Calendar
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {meetingsList.length} upcoming meetings
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition flex items-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 duration-150"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New Meeting
            </button>
          </div>

          {/* Main 2-Column Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Date Picker Widget */}
            <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4 transition-colors duration-200">
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <button className="p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{currentMonth}</span>
                <button className="p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 py-1">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
                {blankDays.map((_, i) => (
                  <span key={`blank-${i}`} className="py-2"></span>
                ))}

                {monthDays.map((day) => {
                  const isSelected = selectedDay === day;
                  const isToday = day === 13;
                  const hasMeeting = daysWithMeetings.includes(day);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`relative py-2 rounded-xl flex flex-col items-center justify-center font-semibold transition active:scale-95 duration-150 ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : isToday
                          ? 'border border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{day}</span>
                      {hasMeeting && !isSelected && (
                        <span className="w-1 h-1 rounded-full bg-[#2563EB] dark:bg-blue-400 mt-0.5"></span>
                      )}
                      {isSelected && (
                        <span className="w-1 h-1 rounded-full bg-white mt-0.5"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Calendar Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-medium">
                  {selectedDay ? `November ${selectedDay}` : 'All dates'}
                </span>
                {selectedDay && (
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-[#2563EB] dark:text-blue-400 font-semibold hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Meetings on Selected Date */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {selectedDay
                  ? `Meetings on November ${selectedDay} (${filteredMeetings.length})`
                  : `All Upcoming Meetings (${filteredMeetings.length})`}
              </h2>

              {filteredMeetings.length === 0 ? (
                <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-10 text-center text-slate-400 space-y-1">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No meetings scheduled</p>
                  <p className="text-xs">Select another date or click "Clear" to see all meetings.</p>
                </div>
              ) : (
                filteredMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="relative bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs overflow-hidden flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md animate-fade-in"
                  >
                    {/* Blue Accent Bar on the Left Edge matching Figma */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2563EB]"></div>

                    <div className="space-y-2 pl-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {meeting.title}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-[11px] font-semibold shrink-0">
                          {meeting.status}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        {meeting.timeInfo}
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        {meeting.description}
                      </p>
                    </div>

                    <div className="pl-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <p className="text-slate-500 dark:text-slate-400">
                        By <strong className="text-slate-700 dark:text-slate-200">{meeting.hostName}</strong> • {meeting.hostRole}
                      </p>

                      <a
                        href={meeting.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Join
                      </a>
                    </div>
                  </div>
                ))
              )}
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

      {/* Schedule Meeting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Schedule New Meeting</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sprint Review & Architecture Q&A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Host / Attendees
                </label>
                <select
                  value={newHost}
                  onChange={(e) => setNewHost(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Dr. Ahmed Hassan">Dr. Ahmed Hassan (Doctor)</option>
                  <option value="Eng. Sara Khalid">Eng. Sara Khalid (TA)</option>
                  <option value="Whole Team">Whole Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Agenda / Description
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Notes or questions to cover..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
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
                  className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold active:scale-95 transition"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
