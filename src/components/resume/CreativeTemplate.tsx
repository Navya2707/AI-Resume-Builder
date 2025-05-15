import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Star } from 'lucide-react';

const CreativeTemplate: React.FC = () => {
  const { 
    personalInfo, 
    education, 
    experience, 
    skills,
    projects
  } = useResumeStore();

  const renderStars = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < level ? 'text-accent-500 fill-accent-500' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <div className="resume-paper grid grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-primary-900 text-white p-6">
        {/* Profile */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white text-primary-900 text-2xl font-bold mb-4">
            {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
          </div>
          <h1 className="text-xl font-bold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-primary-200 mt-1">{personalInfo.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-primary-700 pb-2 mb-3">
            Contact
          </h2>
          <div className="space-y-2">
            {personalInfo.email && (
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-primary-300" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-primary-300" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {(personalInfo.city || personalInfo.state) && (
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-primary-300" />
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
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-primary-300" />
                <a href={personalInfo.website} className="hover:underline">
                  {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center text-sm">
                <Linkedin className="h-4 w-4 mr-2 text-primary-300" />
                <a href={personalInfo.linkedin} className="hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center text-sm">
                <Github className="h-4 w-4 mr-2 text-primary-300" />
                <a href={personalInfo.github} className="hover:underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold border-b border-primary-700 pb-2 mb-3">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill.name}</span>
                  </div>
                  <div className="flex">
                    {renderStars(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-primary-700 pb-2 mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold">{edu.school}</h3>
                  <p className="text-sm text-primary-200">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <p className="text-xs text-primary-300">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-primary-900 mb-3">
              About Me
            </h2>
            <p className="text-sm">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-primary-900 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 pb-4 border-l-2 border-primary-200">
                  <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1"></div>
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    {exp.location && (
                      <p className="text-sm text-gray-500 italic">{exp.location}</p>
                    )}
                    <p className="text-sm mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary-900 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{project.title}</h3>
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
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.split(',').map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;