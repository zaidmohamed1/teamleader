import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectIdeaValidation {
  isValidated: boolean;
  score: number;
  title: string;
  feedback: string;
  tag: string;
  status: 'Approved' | 'Pending' | 'None';
}

export interface SupervisorRequest {
  id: string;
  initials: string;
  name: string;
  role: string;
  type: 'Doctor' | 'TA';
  department: string;
  tags: string[];
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface JoinRequest {
  id: string;
  name: string;
  initials: string;
  appliedFor: string;
  section: string;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  section: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  academicYear: string;
  interests: string[];
  isProfileComplete: boolean;
  hasTeam: boolean;
  teamId?: string;
  teamName?: string;
  projectType?: string;
}

export interface StudentState {
  profile: StudentProfile;
  isDarkMode: boolean;
  unreadNotifications: number;
  ideaValidation: ProjectIdeaValidation;
  supervisorRequests: SupervisorRequest[];
  joinRequests: JoinRequest[];
  teamMembers: TeamMember[];
}

export const initialStudentState: StudentState = {
  profile: {
    id: 'std-101',
    name: 'شششش',
    email: 'شششش@student.fci.edu',
    department: 'Computer Science',
    academicYear: 'Senior Year',
    interests: ['Web Development', 'AI & Machine Learning'],
    isProfileComplete: true,
    hasTeam: false,
    teamId: '',
    teamName: '',
    projectType: '',
  },
  isDarkMode: false,
  unreadNotifications: 5,
  ideaValidation: {
    isValidated: false,
    score: 87,
    title: 'SmartGrad AI',
    feedback: 'Strong project proposal with clear scope, well-defined problem statement, and appropriate technology choices for the selected department.',
    tag: 'aaa',
    status: 'None',
  },
  supervisorRequests: [],
  joinRequests: [
    {
      id: 'jr-1',
      name: 'Mariam Taha',
      initials: 'MT',
      appliedFor: 'QA & Testing Engineer',
      section: 'Backend',
      status: 'Pending',
    },
    {
      id: 'jr-2',
      name: 'Ahmed Farid',
      initials: 'AF',
      appliedFor: 'Frontend Developer',
      section: 'Frontend',
      status: 'Pending',
    },
    {
      id: 'jr-3',
      name: 'Nadia Samir',
      initials: 'NS',
      appliedFor: 'AI / ML Engineer',
      section: 'AI',
      status: 'Pending',
    },
  ],
  teamMembers: [
    {
      id: 'tm-0',
      name: 'Youssef Mahmoud',
      initials: 'YM',
      role: 'Team Leader',
      section: 'Leadership',
    },
  ],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState: initialStudentState,
  reducers: {
    hydrateSession: (state, action: PayloadAction<StudentState>) => {
      return action.payload;
    },
    resetSession: () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('intelligrad_session_v1');
      }
      return initialStudentState;
    },
    setProfile: (state, action: PayloadAction<Partial<StudentProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    createTeam: (
      state,
      action: PayloadAction<{ teamName: string; projectType: string; teamId?: string }>
    ) => {
      state.profile.hasTeam = true;
      state.profile.teamName = action.payload.teamName;
      state.profile.projectType = action.payload.projectType;
      state.profile.teamId = action.payload.teamId || 'IG-2024-7821';
    },
    setTeamName: (state, action: PayloadAction<string>) => {
      state.profile.hasTeam = true;
      state.profile.teamName = action.payload;
      if (!state.profile.teamId) {
        state.profile.teamId = 'IG-2024-7821';
      }
    },
    clearNotifications: (state) => {
      state.unreadNotifications = 0;
    },
    decrementNotification: (state) => {
      if (state.unreadNotifications > 0) {
        state.unreadNotifications -= 1;
      }
    },
    setIdeaValidation: (state, action: PayloadAction<Partial<ProjectIdeaValidation>>) => {
      state.ideaValidation = { ...state.ideaValidation, ...action.payload };
    },
    // Supervisor actions
    requestSupervisor: (state, action: PayloadAction<SupervisorRequest>) => {
      const exists = state.supervisorRequests.find((r) => r.id === action.payload.id);
      if (!exists) {
        state.supervisorRequests.push(action.payload);
      }
    },
    cancelSupervisorRequest: (state, action: PayloadAction<string>) => {
      state.supervisorRequests = state.supervisorRequests.filter((r) => r.id !== action.payload);
    },
    acceptSupervisorRequest: (state, action: PayloadAction<string>) => {
      const req = state.supervisorRequests.find((r) => r.id === action.payload);
      if (req) req.status = 'Accepted';
    },
    // Join request actions
    acceptJoinRequest: (state, action: PayloadAction<string>) => {
      const req = state.joinRequests.find((r) => r.id === action.payload);
      if (req && req.status === 'Pending') {
        req.status = 'Accepted';
        // Add the person to team members
        state.teamMembers.push({
          id: req.id,
          name: req.name,
          initials: req.initials,
          role: req.appliedFor,
          section: req.section,
        });
      }
    },
    declineJoinRequest: (state, action: PayloadAction<string>) => {
      const req = state.joinRequests.find((r) => r.id === action.payload);
      if (req) req.status = 'Declined';
    },
  },
});

export const {
  hydrateSession,
  resetSession,
  setProfile,
  toggleDarkMode,
  createTeam,
  setTeamName,
  clearNotifications,
  decrementNotification,
  setIdeaValidation,
  requestSupervisor,
  cancelSupervisorRequest,
  acceptSupervisorRequest,
  acceptJoinRequest,
  declineJoinRequest,
} = studentSlice.actions;

export default studentSlice.reducer;
