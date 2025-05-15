import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define types for education
export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

// Define types for work experience
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Define types for skills
export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

// Define types for projects
export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  technologies: string;
}

// Define template types
export type TemplateType = 'modern' | 'professional' | 'minimal' | 'creative';

// Define personal info
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  title: string;
  summary: string;
  website: string;
  linkedin: string;
  github: string;
}

// Define resume state
export interface ResumeState {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  selectedTemplate: TemplateType;
  currentStep: number;
  // Actions
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setTemplate: (template: TemplateType) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

// Create initial state
const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    title: '',
    summary: '',
    website: '',
    linkedin: '',
    github: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  selectedTemplate: 'modern' as TemplateType,
  currentStep: 0,
};

// Create store
export const useResumeStore = create<ResumeState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        // Personal info actions
        setPersonalInfo: (info) => 
          set((state) => ({ 
            personalInfo: { ...state.personalInfo, ...info } 
          }), false, 'setPersonalInfo'),
        
        // Education actions
        addEducation: (education) =>
          set((state) => ({ 
            education: [...state.education, education] 
          }), false, 'addEducation'),
        
        updateEducation: (id, education) =>
          set((state) => ({
            education: state.education.map((item) =>
              item.id === id ? { ...item, ...education } : item
            ),
          }), false, 'updateEducation'),
        
        removeEducation: (id) =>
          set((state) => ({
            education: state.education.filter((item) => item.id !== id),
          }), false, 'removeEducation'),
        
        // Experience actions
        addExperience: (experience) =>
          set((state) => ({ 
            experience: [...state.experience, experience] 
          }), false, 'addExperience'),
        
        updateExperience: (id, experience) =>
          set((state) => ({
            experience: state.experience.map((item) =>
              item.id === id ? { ...item, ...experience } : item
            ),
          }), false, 'updateExperience'),
        
        removeExperience: (id) =>
          set((state) => ({
            experience: state.experience.filter((item) => item.id !== id),
          }), false, 'removeExperience'),
        
        // Skills actions
        addSkill: (skill) =>
          set((state) => ({ 
            skills: [...state.skills, skill] 
          }), false, 'addSkill'),
        
        updateSkill: (id, skill) =>
          set((state) => ({
            skills: state.skills.map((item) =>
              item.id === id ? { ...item, ...skill } : item
            ),
          }), false, 'updateSkill'),
        
        removeSkill: (id) =>
          set((state) => ({
            skills: state.skills.filter((item) => item.id !== id),
          }), false, 'removeSkill'),
        
        // Projects actions
        addProject: (project) =>
          set((state) => ({ 
            projects: [...state.projects, project] 
          }), false, 'addProject'),
        
        updateProject: (id, project) =>
          set((state) => ({
            projects: state.projects.map((item) =>
              item.id === id ? { ...item, ...project } : item
            ),
          }), false, 'updateProject'),
        
        removeProject: (id) =>
          set((state) => ({
            projects: state.projects.filter((item) => item.id !== id),
          }), false, 'removeProject'),
        
        // Template actions
        setTemplate: (template) => 
          set({ selectedTemplate: template }, false, 'setTemplate'),
        
        // Step navigation
        setCurrentStep: (step) => 
          set({ currentStep: step }, false, 'setCurrentStep'),
        
        nextStep: () => 
          set((state) => ({ 
            currentStep: state.currentStep + 1 
          }), false, 'nextStep'),
        
        prevStep: () => 
          set((state) => ({ 
            currentStep: Math.max(0, state.currentStep - 1) 
          }), false, 'prevStep'),
        
        // Reset
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'resume-storage',
      }
    )
  )
);