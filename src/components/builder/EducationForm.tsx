import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResumeStore, Education } from '../../store/resumeStore';
import { Plus, GraduationCap, Trash2, Calendar, Edit } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation, nextStep, prevStep } = useResumeStore();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<Education & { id: string }>({
    defaultValues: {
      id: '',
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  });

  const handleAddEducation = (data: Education & { id: string }) => {
    if (editMode) {
      updateEducation(editMode, data);
      setEditMode(null);
    } else {
      addEducation({
        ...data,
        id: crypto.randomUUID()
      });
    }
    
    reset({
      id: '',
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleEditEducation = (edu: Education) => {
    setEditMode(edu.id);
    reset(edu);
  };

  const handleDeleteEducation = (id: string) => {
    removeEducation(id);
  };

  const handleCancel = () => {
    setEditMode(null);
    reset({
      id: '',
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Education</h2>
      
      {/* Education Form */}
      <form onSubmit={handleSubmit(handleAddEducation)} className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* School */}
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
              School
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <input
                id="school"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="University name"
                {...register('school', { required: 'School name is required' })}
              />
            </div>
            {errors.school && (
              <p className="mt-1 text-sm text-error-500">{errors.school.message}</p>
            )}
          </div>
          
          {/* Degree */}
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </label>
            <input
              id="degree"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="Bachelor's, Master's, etc."
              {...register('degree', { required: 'Degree is required' })}
            />
            {errors.degree && (
              <p className="mt-1 text-sm text-error-500">{errors.degree.message}</p>
            )}
          </div>
          
          {/* Field of Study */}
          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <input
              id="fieldOfStudy"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="Computer Science, Business, etc."
              {...register('fieldOfStudy', { required: 'Field of study is required' })}
            />
            {errors.fieldOfStudy && (
              <p className="mt-1 text-sm text-error-500">{errors.fieldOfStudy.message}</p>
            )}
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
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                {...register('endDate', { required: 'End date is required' })}
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
            placeholder="Describe your course, achievements, etc."
            {...register('description')}
          ></textarea>
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
            {editMode ? 'Update Education' : 'Add Education'}
          </button>
        </div>
      </form>
      
      {/* Education List */}
      {education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Your Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div 
                key={edu.id} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between"
              >
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{edu.school}</h4>
                      <p className="text-gray-700">{edu.degree} in {edu.fieldOfStudy}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.description && <p className="text-sm mt-2 text-gray-700">{edu.description}</p>}
                </div>
                <div className="flex space-x-2 mt-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    onClick={() => handleEditEducation(edu)}
                    className="text-primary-600 hover:text-primary-800 p-1"
                    aria-label="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(edu.id)}
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

export default EducationForm;