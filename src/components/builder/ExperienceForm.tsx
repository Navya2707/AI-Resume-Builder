import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResumeStore, Experience } from '../../store/resumeStore';
import { Plus, Briefcase, Trash2, Calendar, MapPin, Edit } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const { experience, addExperience, updateExperience, removeExperience, nextStep, prevStep } = useResumeStore();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    watch
  } = useForm<Experience & { id: string }>({
    defaultValues: {
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  });

  const currentJob = watch('current');

  const handleAddExperience = (data: Experience & { id: string }) => {
    if (editMode) {
      updateExperience(editMode, data);
      setEditMode(null);
    } else {
      addExperience({
        ...data,
        id: crypto.randomUUID()
      });
    }
    
    reset({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleEditExperience = (exp: Experience) => {
    setEditMode(exp.id);
    reset(exp);
  };

  const handleDeleteExperience = (id: string) => {
    removeExperience(id);
  };

  const handleCancel = () => {
    setEditMode(null);
    reset({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      
      {/* Experience Form */}
      <form onSubmit={handleSubmit(handleAddExperience)} className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <input
                id="company"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Company Name"
                {...register('company', { required: 'Company name is required' })}
              />
            </div>
            {errors.company && (
              <p className="mt-1 text-sm text-error-500">{errors.company.message}</p>
            )}
          </div>
          
          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              id="position"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="Job Title"
              {...register('position', { required: 'Position is required' })}
            />
            {errors.position && (
              <p className="mt-1 text-sm text-error-500">{errors.position.message}</p>
            )}
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                id="location"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="City, State"
                {...register('location')}
              />
            </div>
          </div>
          
          {/* Current Position Checkbox */}
          <div className="flex items-center h-full pt-4">
            <input
              id="current"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              {...register('current')}
            />
            <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
              I currently work here
            </label>
          </div>
          
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                id="startDate"
                type="month"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                {...register('startDate', { required: 'Start date is required' })}
              />
            </div>
            {errors.startDate && (
              <p className="mt-1 text-sm text-error-500">{errors.startDate.message}</p>
            )}
          </div>
          
          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                id="endDate"
                type="month"
                disabled={currentJob}
                className={`pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${currentJob ? 'bg-gray-100' : ''}`}
                {...register('endDate', { required: !currentJob ? 'End date is required' : false })}
              />
            </div>
            {errors.endDate && (
              <p className="mt-1 text-sm text-error-500">{errors.endDate.message}</p>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Describe your responsibilities and achievements"
            {...register('description', { required: 'Description is required' })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-error-500">{errors.description.message}</p>
          )}
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          {editMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-primary py-2 px-6 rounded-md flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            {editMode ? 'Update Experience' : 'Add Experience'}
          </button>
        </div>
      </form>
      
      {/* Experience List */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Your Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div 
                key={exp.id} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between"
              >
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.location && <p className="text-sm text-gray-500 mt-1">{exp.location}</p>}
                  <p className="text-sm mt-2 text-gray-700">{exp.description}</p>
                </div>
                <div className="flex space-x-2 mt-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    onClick={() => handleEditExperience(exp)}
                    className="text-primary-600 hover:text-primary-800 p-1"
                    aria-label="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-error-500 hover:text-error-700 p-1"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
          Next
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;