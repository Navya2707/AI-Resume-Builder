import React, { useRef } from 'react';
import { useResumeStore } from '../store/resumeStore';
import ResumeTemplate from '../components/resume/ResumeTemplate';
import { Download, ArrowLeft, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Preview: React.FC = () => {
  const { prevStep } = useResumeStore();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handleEdit = () => {
    prevStep();
    navigate('/builder');
  };
  
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating your PDF. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Editor
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="btn-secondary py-2 px-4 md:px-6 rounded-md flex items-center"
            >
              <FileEdit className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Edit Resume</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="btn-primary py-2 px-4 md:px-6 rounded-md flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Download PDF</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Resume is Ready!</h1>
            <p className="text-gray-600">
              Review your resume below and download as PDF when you're satisfied.
            </p>
          </div>
          
          <div ref={resumeRef} className="transform scale-100 origin-top">
            <ResumeTemplate />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Not happy with how your resume looks? Go back to edit or try a different template.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleEdit}
              className="btn-secondary py-2 px-6 rounded-md"
            >
              Edit Resume
            </button>
            <button
              onClick={handleDownloadPDF}
              className="btn-primary py-2 px-6 rounded-md flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resume PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;