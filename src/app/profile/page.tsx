'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProfile } from '@/store/slices/studentSlice';
import {
  Pencil,
  Bot,
  X,
  Check,
  Plus
} from 'lucide-react';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.student);

  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(
    '4th year Computer Science student passionate about building intelligent systems for real-world problems. Currently leading the SmartGrad AI team.'
  );
  const [studentId, setStudentId] = useState('2300414');
  const [department, setDepartment] = useState('Computer Science');
  const [email, setEmail] = useState(`${profile.name}@student.fci.edu`);
  const [skills, setSkills] = useState(['TypeScript']);
  const [interests, setInterests] = useState(['Web Development']);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setProfile({
        department,
        email,
        interests,
      })
    );
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 md:p-10 max-w-4xl w-full mx-auto space-y-5 animate-fade-in">
          {/* Page Title & Edit Profile Button */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                My Profile
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage your academic profile and how others see you.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition flex items-center gap-2 shadow-xs active:scale-95 duration-150"
            >
              <Pencil className="w-3.5 h-3.5 stroke-[2.2]" />
              {isEditing ? 'Close Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Completeness Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-3 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Profile completeness
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">83%</span>
            </div>

            {/* Progress track */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: '83%' }}
              ></div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              • Join a team
            </p>
          </div>

          {/* User Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs flex items-center gap-5 transition-colors duration-200">
            <div className="w-16 h-16 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 font-bold text-xl flex items-center justify-center border border-blue-100 dark:border-blue-800 shrink-0 select-none">
              {profile.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-[10px] font-bold tracking-wider uppercase">
                TEAM LEADER
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {profile.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{department}</p>
            </div>
          </div>

          {/* About Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-2.5 transition-colors duration-200">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">About</h3>
            {isEditing ? (
              <textarea
                rows={3}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            ) : (
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {aboutText}
              </p>
            )}
          </div>

          {/* Academic Information Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4 transition-colors duration-200">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Academic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  STUDENT ID
                </label>
                <div className="w-full bg-[#F0F5FF] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl px-4 py-3 border border-blue-50 dark:border-slate-700">
                  {studentId}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  DEPARTMENT
                </label>
                <div className="w-full bg-[#F0F5FF] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl px-4 py-3 border border-blue-50 dark:border-slate-700">
                  {department}
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                  EMAIL
                </label>
                <div className="w-full bg-[#F0F5FF] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl px-4 py-3 border border-blue-50 dark:border-slate-700 truncate">
                  {email}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-3 transition-colors duration-200">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Skills</h3>
            <div className="flex flex-wrap items-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-xs font-semibold flex items-center gap-1.5"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => setSkills(skills.filter((s) => s !== skill))}
                      className="hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}

              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="New skill..."
                    className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs w-28 focus:outline-none"
                  />
                  <button
                    onClick={addSkill}
                    className="p-1 rounded-full bg-blue-600 text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-3 transition-colors duration-200">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Interests</h3>
            <div className="flex flex-wrap items-center gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3.5 py-1 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 text-xs font-semibold flex items-center gap-1.5"
                >
                  {interest}
                  {isEditing && (
                    <button
                      onClick={() => setInterests(interests.filter((i) => i !== interest))}
                      className="hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}

              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="New interest..."
                    className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs w-28 focus:outline-none"
                  />
                  <button
                    onClick={addInterest}
                    className="p-1 rounded-full bg-blue-600 text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-2 active:scale-95"
              >
                <Check className="w-4 h-4" />
                Save Profile
              </button>
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
