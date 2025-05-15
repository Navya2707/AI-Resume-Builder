import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResumeStore, Skill } from '../../store/resumeStore';
import { Plus, Trash2, Edit, Star } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { skills, addSkill, updateSkill, removeSkill, nextStep, prevStep } = useResumeStore();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    watch
  } = useForm<Skill & { id: string }>({
    defaultValues: {
      id: '',
      name: '',
      level: 3
    }
  });

  const skillLevel = watch('level');

  const handleAddSkill = (data: Skill & { id: string }) => {
    if (editMode) {
      updateSkill(editMode, data);
      setEditMode(null);
    } else {
      addSkill({
        ...data,
        id: crypto.randomUUID()
      });
    }
    
    reset({
      id: '',
      name: '',
      level: 3
    });
  };

  const handleEditSkill = (skill: Skill) => {
    setEditMode(skill.id);
    reset(skill);
  };

  const handleDeleteSkill = (id: string) => {
    removeSkill(id);
  };

  const handleCancel = () => {
    setEditMode(null);
    reset({
      id: '',
      name: '',
      level: 3
    });
  };

  const handleContinue = () => {
    nextStep();
  };

  const renderStars = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < level ? 'text-accent-500 fill-accent-500' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      
      {/* Skills Form */}
      <form onSubmit={handleSubmit(handleAddSkill)} className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skill Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Skill
            </label>
            <input
              id="name"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="e.g., JavaScript, Project Management"
              {...register('name', { required: 'Skill name is required' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error-500">{errors.name.message}</p>
            )}
          </div>
          
          {/* Skill Level */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level (1-5)
            </label>
            <div className="flex flex-col">
              <input
                id="level"
                type="range"
                min="1"
                max="5"
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                {...register('level', { 
                  required: 'Skill level is required',
                  min: 1,
                  max: 5
                })}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Beginner</span>
                <div className="flex space-x-1">
                  {renderStars(Number(skillLevel))}
                </div>
                <span className="text-xs text-gray-500">Expert</span>
              </div>
            </div>
          </div>
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
            {editMode ? 'Update Skill' : 'Add Skill'}
          </button>
        </div>
      </form>
      
      {/* Skills List */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Your Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{skill.name}</h4>
                  <div className="flex mt-1">
                    {renderStars(skill.level)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditSkill(skill)}
                    className="text-primary-600 hover:text-primary-800 p-1"
                    aria-label="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill.id)}
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

export default SkillsForm;