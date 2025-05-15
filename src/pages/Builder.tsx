import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { FileCheck, FileEdit, GraduationCap, Briefcase, Lightbulb, FolderKanban, LayoutTemplate } from 'lucide-react';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import EducationForm from '../components/builder/EducationForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import SkillsForm from '../components/builder/SkillsForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import TemplateSelector from '../components/builder/TemplateSelector';
import ResumePreview from '../components/resume/ResumeTemplate';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 0, name: 'Personal Info', icon: <FileEdit className="h-5 w-5" /> },
  { id: 1, name: 'Experience', icon: <Briefcase className="h-5 w-5" /> },
  { id: 2, name: 'Education', icon: <GraduationCap className="h-5 w-5" /> },
  { id: 3, name: 'Skills', icon: <Lightbulb className="h-5 w-5" /> },
  { id: 4, name: 'Projects', icon: <FolderKanban className="h-5 w-5" /> },
  { id: 5, name: 'Template', icon: <LayoutTemplate className="h-5 w-5" /> },
  { id: 6, name: 'Preview', icon: <FileCheck className="h-5 w-5" /> },
];

const Builder: React.FC = () => {
  const { currentStep, setCurrentStep } = useResumeStore();
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <ExperienceForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <SkillsForm />;
      case 4:
        return <ProjectsForm />;
      case 5:
        return <TemplateSelector />;
      case 6:
        return navigate('/preview');
      default:
        return <PersonalInfoForm />;
    }
  };

  useEffect(() => {
    if (currentStep > 5) {
      navigate('/preview');
    }
  }, [currentStep, navigate]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="hidden md:flex items-center justify-between">
            {steps.slice(0, 6).map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex flex-col items-center space-y-1 ${
                  currentStep === step.id
                    ? 'text-primary-600'
                    : currentStep > step.id
                    ? 'text-primary-400'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep === step.id
                      ? 'bg-primary-600 text-white'
                      : currentStep > step.id
                      ? 'bg-primary-200 text-primary-700'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-medium">{step.name}</span>
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-500">
                Step {currentStep + 1} of {steps.length - 1}: {steps[currentStep].name}
              </p>
              <div className="text-sm font-medium text-primary-600">
                {Math.round(((currentStep + 1) / (steps.length - 1)) * 100)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="progress-bar"
                style={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Container */}
          <div className="lg:w-1/2">
            {renderStepContent(currentStep)}
          </div>

          {/* Preview Container */}
          <div className="lg:w-1/2 hidden lg:block">
            <div className="sticky top-20">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Resume Preview</h2>
                <button onClick={togglePreview} className="text-sm text-primary-600 font-medium">
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
              
              {showPreview && (
                <div className="transform scale-[0.65] origin-top-left -ml-[17%] -mt-[17%]">
                  <ResumePreview />
                </div>
              )}
              
              {!showPreview && (
                <div className="bg-gray-100 rounded-lg p-8 text-center flex flex-col items-center justify-center h-[600px]">
                  <FileCheck className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Resume Preview Hidden</h3>
                  <p className="text-gray-500 mb-4">
                    Click "Show Preview" to see your resume as you build it
                  </p>
                  <button
                    onClick={togglePreview}
                    className="btn-primary py-2 px-4 rounded-md"
                  >
                    Show Preview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;