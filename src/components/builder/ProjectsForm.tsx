import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResumeStore, Project } from '../../store/resumeStore';
import { Plus, Trash2, Edit, FolderGit2, Link } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const { projects, addProject, updateProject, removeProject, nextStep, prevStep } = useResumeStore();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<Project & { id: string }>({
    defaultValues: {
      id: '',
      title: '',
      description: '',
      link: '',
      technologies: ''
    }
  });

  const handleAddProject = (data: Project & { id: string }) => {
    if (editMode) {
      updateProject(editMode, data);
      setEditMode(null);
    } else {
      addProject({
        ...data,
        id: crypto.randomUUID()
      });
    }
    
    reset({
      id: '',
      title: '',
      description: '',
      link: '',
      technologies: ''
    });
  };

  const handleEditProject = (project: Project) => {
    setEditMode(project.id);
    reset(project);
  };

  const handleDeleteProject = (id: string) => {
    removeProject(id);
  };

  const handleCancel = () => {
    setEditMode(null);
    reset({
      id: '',
      title: '',
      description: '',
      link: '',
      technologies: ''
    });
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      
      {/* Projects Form */}
      <form onSubmit={handleSubmit(handleAddProject)} className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <input
                id="title"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Project name"
                {...register('title', { required: 'Project title is required' })}
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-error-500">{errors.title.message}</p>
            )}
          </div>
          
          {/* Project Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Link className="h-5 w-5" />
              </div>
              <input
                id="link"
                type="url"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="https://github.com/username/project"
                {...register('link')}
              />
            </div>
          </div>
          
          {/* Technologies Used */}
          <div className="md:col-span-2">
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <input
              id="technologies"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="React, Node.js, MongoDB, etc."
              {...register('technologies', { required: 'Technologies are required' })}
            />
            {errors.technologies && (
              <p className="mt-1 text-sm text-error-500">{errors.technologies.message}</p>
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
            placeholder="Describe your project, its purpose, and your contribution"
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
            {editMode ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>
      
      {/* Projects List */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Your Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between"
              >
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{project.title}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800 flex items-center text-sm"
                      >
                        <Link className="h-4 w-4 mr-1" />
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-primary-600 mt-1">{project.technologies}</p>
                  <p className="text-sm mt-2 text-gray-700">{project.description}</p>
                </div>
                <div className="flex space-x-2 mt-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    onClick={() => handleEditProject(project)}
                    className="text-primary-600 hover:text-primary-800 p-1"
                    aria-label="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
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

export default ProjectsForm;