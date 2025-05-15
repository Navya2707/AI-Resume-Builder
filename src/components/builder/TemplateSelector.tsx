import React from 'react';
import { useResumeStore, TemplateType } from '../../store/resumeStore';
import { CheckCircle2 } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with subtle accents',
    image: 'https://images.pexels.com/photos/7821478/pexels-photo-7821478.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional layout ideal for corporate environments',
    image: 'https://images.pexels.com/photos/7821711/pexels-photo-7821711.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Elegant simplicity with focus on content',
    image: 'https://images.pexels.com/photos/7821498/pexels-photo-7821498.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative industries',
    image: 'https://images.pexels.com/photos/7821506/pexels-photo-7821506.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const TemplateSelector: React.FC = () => {
  const { selectedTemplate, setTemplate, nextStep, prevStep } = useResumeStore();

  const handleSelectTemplate = (template: TemplateType) => {
    setTemplate(template);
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {templates.map((template) => (
          <div 
            key={template.id}
            onClick={() => handleSelectTemplate(template.id as TemplateType)}
            className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedTemplate === template.id 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="relative">
              <img 
                src={template.image} 
                alt={template.name} 
                className="w-full h-48 object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="btn-secondary py-2 px-6 rounded-md"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="btn-primary py-2 px-6 rounded-md"
        >
          Preview Resume
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;