import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <FileSearch className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="btn-primary px-6 py-2 text-center inline-block rounded-md transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;