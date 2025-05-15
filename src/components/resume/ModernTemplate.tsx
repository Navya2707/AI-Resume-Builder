import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const ModernTemplate: React.FC = () => {
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
      <header className="border-b border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-primary-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          {personalInfo.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-primary-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-primary-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.address || personalInfo.city || personalInfo.state) && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary-600" />
              <span>
                {[
                  personalInfo.address,
                  personalInfo.city,
                  personalInfo.state,
                  personalInfo.zipCode,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 mr-2 text-primary-600" />
              <a href={personalInfo.website} className="text-primary-600 hover:underline">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center text-sm">
              <Linkedin className="h-4 w-4 mr-2 text-primary-600" />
              <a href={personalInfo.linkedin} className="text-primary-600 hover:underline">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center text-sm">
              <Github className="h-4 w-4 mr-2 text-primary-600" />
              <a href={personalInfo.github} className="text-primary-600 hover:underline">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary-900 border-b border-gray-200 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary-900 border-b border-gray-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-sm text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <p className="text-sm text-gray-600 mt-1">{exp.location}</p>
                )}
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary-900 border-b border-gray-200 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="font-semibold">{edu.school}</h3>
                    <p className="text-sm text-gray-700">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary-900 border-b border-gray-200 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary-900 border-b border-gray-200 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      className="text-primary-600 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm text-primary-600">{project.technologies}</p>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;