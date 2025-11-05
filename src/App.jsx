import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FormInput from './components/FormInput';
import ResultCard from './components/ResultCard';
import SkeletonLoader from './components/SkeletonLoader';
import { generateResponse } from './services/api';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (input) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await generateResponse(input);
      setResult(data.result || data.message);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Hackathon Ready Template
          </h1>
          <p className="text-gray-600 text-lg">
            Quick-start template with all essential components
          </p>
        </div>
        
        <FormInput onSubmit={handleSubmit} loading={loading} />
        
        {loading && <SkeletonLoader />}
        {!loading && <ResultCard result={result} />}
      </main>
    </div>
  );
}

export default App;