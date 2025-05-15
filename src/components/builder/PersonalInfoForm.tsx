import React from 'react';
import { useForm } from 'react-hook-form';
import { useResumeStore, PersonalInfo } from '../../store/resumeStore';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, FileText } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const { personalInfo, setPersonalInfo, nextStep } = useResumeStore();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: personalInfo
  });

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data);
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                id="firstName"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="John"
                {...register('firstName', { required: 'First name is required' })}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-error-500">{errors.firstName.message}</p>
            )}
          </div>
          
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                id="lastName"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Doe"
                {...register('lastName', { required: 'Last name is required' })}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-error-500">{errors.lastName.message}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="johndoe@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>
            )}
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="h-5 w-5" />
              </div>
              <input
                id="phone"
                type="tel"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="(123) 456-7890"
                {...register('phone')}
              />
            </div>
          </div>
          
          {/* Professional Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Title
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FileText className="h-5 w-5" />
              </div>
              <input
                id="title"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Software Engineer"
                {...register('title', { required: 'Professional title is required' })}
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-error-500">{errors.title.message}</p>
            )}
          </div>
          
          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                id="address"
                type="text"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="123 Main St"
                {...register('address')}
              />
            </div>
          </div>
          
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="San Francisco"
              {...register('city')}
            />
          </div>
          
          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              id="state"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="CA"
              {...register('state')}
            />
          </div>
          
          {/* Zip Code */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              id="zipCode"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="94105"
              {...register('zipCode')}
            />
          </div>
          
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              placeholder="United States"
              {...register('country')}
            />
          </div>
          
          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Globe className="h-5 w-5" />
              </div>
              <input
                id="website"
                type="url"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="https://johndoe.com"
                {...register('website')}
              />
            </div>
          </div>
          
          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Linkedin className="h-5 w-5" />
              </div>
              <input
                id="linkedin"
                type="url"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="https://linkedin.com/in/johndoe"
                {...register('linkedin')}
              />
            </div>
          </div>
          
          {/* GitHub */}
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Github className="h-5 w-5" />
              </div>
              <input
                id="github"
                type="url"
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="https://github.com/johndoe"
                {...register('github')}
              />
            </div>
          </div>
        </div>
        
        {/* Professional Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary
          </label>
          <textarea
            id="summary"
            rows={4}
            className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="A brief summary of your professional background and skills..."
            {...register('summary', { required: 'Professional summary is required' })}
          ></textarea>
          {errors.summary && (
            <p className="mt-1 text-sm text-error-500">{errors.summary.message}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary py-2 px-6 rounded-md transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;