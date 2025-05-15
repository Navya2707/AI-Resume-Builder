import React from 'react';
import { useResumeStore, TemplateType } from '../../store/resumeStore';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';

const ResumeTemplate: React.FC = () => {
  const { selectedTemplate } = useResumeStore();
  
  const renderTemplate = (template: TemplateType) => {
    switch (template) {
      case 'modern':
        return <ModernTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  };
  
  return renderTemplate(selectedTemplate);
};

export default ResumeTemplate;