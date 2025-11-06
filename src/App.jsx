// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import FormInput from './components/FormInput';
// import ResultCard from './components/ResultCard';
// import SkeletonLoader from './components/SkeletonLoader';
// import { generateResponse } from './services/api';

// function App() {
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const handleSubmit = async (input) => {
//     setLoading(true);
//     setResult(null);
//     setError(null);
    
//     try {
//       const data = await generateResponse(input);
//       setResult(data.result || data.message);
//     } catch (err) {
//       console.error('Error:', err);
//       setError(err.message);
//       setResult('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <main className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Hackathon Ready Template
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Quick-start template with all essential components
//           </p>
//         </div>
        
//         <FormInput onSubmit={handleSubmit} loading={loading} />
        
//         {loading && <SkeletonLoader />}
//         {!loading && <ResultCard result={result} />}
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MessageSquare, Plus, TrendingUp, Users, CheckCircle } from 'lucide-react';

const API_URL = 'https://sinister-backend-g3ey.onrender.com';

function App() {
  const [activeTab, setActiveTab] = useState('report');
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'infrastructure',
    location: ''
  });
  const mountRef = useRef(null);
  const cubesRef = useRef([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x34d399, 1);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    const colors = [0x3b82f6, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b];
    
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ 
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.7
      });
      const cube = new THREE.Mesh(geometry, material);
      
      cube.position.x = (Math.random() - 0.5) * 20;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 10;
      
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      
      cube.userData = {
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.01,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      };
      
      scene.add(cube);
      cubesRef.current.push(cube);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      cubesRef.current.forEach(cube => {
        cube.rotation.x += cube.userData.rotationSpeed;
        cube.rotation.y += cube.userData.rotationSpeed;
        
        cube.position.x += cube.userData.speedX;
        cube.position.y += cube.userData.speedY;
        
        if (Math.abs(cube.position.x) > 15) cube.userData.speedX *= -1;
        if (Math.abs(cube.position.y) > 15) cube.userData.speedY *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cubesRef.current.forEach(cube => {
        cube.geometry.dispose();
        cube.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/problems`);
      const data = await response.json();
      if (data.success) {
        setProblems(data.data);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormData({ title: '', description: '', category: 'infrastructure', location: '' });
        await fetchProblems();
        setActiveTab('track');
      }
    } catch (error) {
      console.error('Error submitting problem:', error);
      alert('Failed to submit problem');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/problems/${id}/upvote`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchProblems();
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/problems/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchProblems();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Community Problem Solver
            </h1>
            <p className="text-blue-200 mt-2">Build a platform for students to report and track community issues</p>
          </div>
        </header>

        <nav className="backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              {[
                { id: 'report', label: 'Report Issue', icon: Plus },
                { id: 'track', label: 'Track Issues', icon: TrendingUp },
                { id: 'dashboard', label: 'Dashboard', icon: Users }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'report' && (
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-6">Report a Community Issue</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
                  >
                    <option value="infrastructure">Infrastructure</option>
                    <option value="safety">Safety</option>
                    <option value="environment">Environment</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
                    placeholder="Where is this issue located?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
                    placeholder="Provide detailed information about the issue..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Issue'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'track' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Community Issues</h2>
              {loading ? (
                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-white/20 text-center">
                  <p className="text-xl text-blue-200">Loading...</p>
                </div>
              ) : problems.length === 0 ? (
                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-white/20 text-center">
                  <MessageSquare size={64} className="mx-auto mb-4 text-blue-400" />
                  <p className="text-xl text-blue-200">No issues reported yet. Be the first to report one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {problems.map(problem => (
                    <div key={problem.id} className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                          <p className="text-blue-200 mb-3">{problem.description}</p>
                          <div className="flex gap-4 text-sm flex-wrap">
                            <span className="px-3 py-1 bg-blue-500/30 rounded-full">{problem.category}</span>
                            <span className="text-blue-300">📍 {problem.location}</span>
                            <span className="text-blue-300">📅 {new Date(problem.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <button
                            onClick={() => handleUpvote(problem.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                          >
                            <TrendingUp size={16} />
                            {problem.upvotes}
                          </button>
                          <select
                            value={problem.status}
                            onChange={(e) => handleStatusChange(problem.id, e.target.value)}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/20 text-sm text-white"
                          >
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Issues</h3>
                  <MessageSquare className="text-blue-400" size={32} />
                </div>
                <p className="text-4xl font-bold">{problems.length}</p>
              </div>

              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">In Progress</h3>
                  <TrendingUp className="text-yellow-400" size={32} />
                </div>
                <p className="text-4xl font-bold">
                  {problems.filter(p => p.status === 'in-progress').length}
                </p>
              </div>

              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Resolved</h3>
                  <CheckCircle className="text-green-400" size={32} />
                </div>
                <p className="text-4xl font-bold">
                  {problems.filter(p => p.status === 'resolved').length}
                </p>
              </div>

              <div className="md:col-span-3 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {problems.slice(0, 5).map(problem => (
                    <div key={problem.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-blue-200">{problem.title}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        problem.status === 'resolved' ? 'bg-green-500/30' :
                        problem.status === 'in-progress' ? 'bg-yellow-500/30' :
                        'bg-blue-500/30'
                      }`}>
                        {problem.status}
                      </span>
                    </div>
                  ))}
                  {problems.length === 0 && (
                    <p className="text-center text-blue-300 py-4">No activity yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;