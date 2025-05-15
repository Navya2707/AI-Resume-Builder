import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

const MinimalTemplate: React.FC = () => {
  const { 
    personalInfo, 
    education, 
    experience, 
    skills,
    projects
  } = useResumeStore();

  return (
    <div className="resume-paper">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-600 mt-1 font-light">{personalInfo.title}</p>
        
        <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}
          
          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <span>
              {[
                personalInfo.city,
                personalInfo.state,
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          )}
          
          {personalInfo.website && (
            <a href={personalInfo.website} className="hover:underline">
              {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          )}
          
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="hover:underline">
              LinkedIn
            </a>
          )}
          
          {personalInfo.github && (
            <a href={personalInfo.github} className="hover:underline">
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wide text-gray-500 mb-3 font-light">
            Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wide text-gray-500 mb-3 font-light">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between mb-1">
                  <h3 className="font-medium">{exp.position}, <span className="font-normal">{exp.company}</span></h3>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                )}
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wide text-gray-500 mb-3 font-light">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col md:flex-row md:justify-between mb-1">
                  <h3 className="font-medium">{edu.degree} in {edu.fieldOfStudy}, <span className="font-normal">{edu.school}</span></h3>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wide text-gray-500 mb-3 font-light">
            Skills
          </h2>
          <p className="text-sm">
            {skills.map((skill) => skill.name).join(', ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wide text-gray-500 mb-3 font-light">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex flex-col md:flex-row md:justify-between mb-1">
                  <h3 className="font-medium">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      className="text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{project.technologies}</p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;