'use client';

import React, { useState } from 'react';
import { X, Users, Sparkles } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { setTeamName } from '@/store/slices/studentSlice';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [projectIdea, setProjectIdea] = useState('');
  const [track, setTrack] = useState('Artificial Intelligence');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(setTeamName(name));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Create a Team</h3>
              <p className="text-xs text-slate-500">You will be designated as the Team Leader</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Team Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. IntelliGrad Pioneers"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Project Track
            </label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
            >
              <option value="Artificial Intelligence">Artificial Intelligence & NLP</option>
              <option value="Software Engineering">Software Engineering & Web</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science & Analytics</option>
              <option value="Embedded Systems">Embedded Systems & IoT</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Initial Project Idea / Summary (Optional)
            </label>
            <textarea
              rows={3}
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="Brief description of what your team plans to build..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
