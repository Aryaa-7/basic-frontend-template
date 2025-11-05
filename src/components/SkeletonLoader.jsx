import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 animate-pulse">
        <div className="flex items-start space-x-3">
          <div className="bg-gray-200 w-9 h-9 rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;