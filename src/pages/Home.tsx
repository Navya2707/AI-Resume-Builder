import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Wand2, Download, CheckCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Create Professional Resumes with AI
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Build a standout resume in minutes with our free AI-powered builder. Get personalized
                suggestions and export as PDF.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/builder"
                  className="btn bg-white text-primary-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center"
                >
                  Create Resume
                </Link>
                <Link
                  to="/templates"
                  className="btn border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center"
                >
                  View Templates
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-fade-in">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Resume Builder"
                className="rounded-lg shadow-2xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional resumes that stand out from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Wand2 className="h-8 w-8 text-primary-600" />}
              title="AI-Powered Content"
              description="Get smart suggestions for your resume content based on your experience and the job you're applying for."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-primary-600" />}
              title="Professional Templates"
              description="Choose from a variety of professionally designed templates that are ATS-friendly and customizable."
            />
            <FeatureCard
              icon={<Download className="h-8 w-8 text-primary-600" />}
              title="Easy PDF Export"
              description="Download your finished resume as a professional PDF ready to send to employers."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create your professional resume in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              number="1"
              title="Enter Your Information"
              description="Fill out your personal details, work experience, education, and skills."
            />
            <StepCard
              number="2"
              title="Choose Your Template"
              description="Select from our collection of professional resume templates."
            />
            <StepCard
              number="3"
              title="Download Your Resume"
              description="Preview your resume and download it as a PDF ready to share."
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/builder"
              className="btn-primary px-8 py-3 text-lg rounded-md transition-colors duration-300"
            >
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of job seekers have used ResumeAI to land their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I landed three interviews within a week of using my new resume from ResumeAI. The AI suggestions really helped improve my content!"
              author="Sarah J."
              role="Marketing Specialist"
            />
            <TestimonialCard
              quote="The templates are professional and ATS-friendly. The step-by-step process made it easy to create a resume that stands out."
              author="Michael T."
              role="Software Engineer"
            />
            <TestimonialCard
              quote="As a recent graduate, I had no idea how to showcase my limited experience. ResumeAI helped me create a resume that got me my first job!"
              author="Jessica L."
              role="Graphic Designer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Resume?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have created professional resumes with ResumeAI.
          </p>
          <Link
            to="/builder"
            className="btn bg-white text-primary-900 hover:bg-gray-100 px-8 py-3 rounded-md font-medium inline-block"
          >
            Start for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StepCard: React.FC<{
  number: string;
  title: string;
  description: string;
}> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  role: string;
}> = ({ quote, author, role }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <p className="text-gray-700 mb-4 italic">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center">
        <div className="mr-3 bg-primary-100 rounded-full p-2">
          <CheckCircle2 className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;