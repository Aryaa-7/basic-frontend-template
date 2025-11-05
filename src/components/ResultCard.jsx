import React from 'react';
import { Sparkles } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Result</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;