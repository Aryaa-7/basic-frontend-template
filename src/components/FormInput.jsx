import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const FormInput = ({ onSubmit, loading }) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput(''); // Clear input after submit
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your query..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FormInput;