import React from 'react';
import { Link } from 'react-router-dom';
import { useResumeStore, TemplateType } from '../store/resumeStore';
import { ArrowRight } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with subtle accents',
    features: ['Clean layout', 'Professional typography', 'Subtle color accents', 'Good for most industries'],
    image: 'https://images.pexels.com/photos/7821478/pexels-photo-7821478.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional layout ideal for corporate environments',
    features: ['Traditional format', 'Formal structure', 'ATS-optimized', 'Ideal for corporate roles'],
    image: 'https://images.pexels.com/photos/7821711/pexels-photo-7821711.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Elegant simplicity with focus on content',
    features: ['Minimalist design', 'Content-focused', 'Typographic hierarchy', 'Works for any position'],
    image: 'https://images.pexels.com/photos/7821498/pexels-photo-7821498.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative industries',
    features: ['Two-column layout', 'Visual emphasis', 'Colorful accents', 'Perfect for creative roles'],
    image: 'https://images.pexels.com/photos/7821506/pexels-photo-7821506.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const Templates: React.FC = () => {
  const { setTemplate, setCurrentStep } = useResumeStore();
  
  const handleSelectTemplate = (template: TemplateType) => {
    setTemplate(template);
    setCurrentStep(0); // Reset to first step
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Resume Templates</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Choose from our professionally designed templates to create a standout resume that gets noticed.
          </p>
        </div>
      </div>
      
      {/* Templates Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-64 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{template.name}</h2>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Features:</h3>
                <ul className="mb-6 space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/builder"
                  className="btn-primary py-2 px-6 rounded-md inline-flex items-center"
                  onClick={() => handleSelectTemplate(template.id as TemplateType)}
                >
                  Use this template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-3">Ready to Create Your Resume?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Pick a template and start building your professional resume in minutes.
            All templates are designed to be ATS-friendly and customizable.
          </p>
          <Link
            to="/builder"
            className="btn-primary py-3 px-8 rounded-md inline-flex items-center"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Templates;