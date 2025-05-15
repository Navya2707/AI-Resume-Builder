import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const ProfessionalTemplate: React.FC = () => {
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
      <header className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {[
                  personalInfo.city,
                  personalInfo.state,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <a href={personalInfo.website} className="hover:underline">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              <a href={personalInfo.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-1" />
              <a href={personalInfo.github} className="hover:underline">
                GitHub
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-sm font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-sm italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <p className="text-sm italic mt-1">{exp.location}</p>
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
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="font-bold">{edu.school}</h3>
                    <p className="text-sm">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  </div>
                  <div className="text-sm italic">
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
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                • {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{project.title}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      className="text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm italic">{project.technologies}</p>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;