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
// import React, { useState, useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { MessageSquare, Plus, TrendingUp, Users, CheckCircle } from 'lucide-react';

// const API_URL = 'https://sinister-backend-g3ey.onrender.com';

// function App() {
//   const [activeTab, setActiveTab] = useState('report');
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'infrastructure',
//     location: ''
//   });
//   const mountRef = useRef(null);
//   const cubesRef = useRef([]);

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x0f172a);

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 15;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     const pointLight = new THREE.PointLight(0x60a5fa, 1);
//     pointLight.position.set(10, 10, 10);
//     scene.add(pointLight);

//     const pointLight2 = new THREE.PointLight(0x34d399, 1);
//     pointLight2.position.set(-10, -10, 5);
//     scene.add(pointLight2);

//     const colors = [0x3b82f6, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b];
    
//     for (let i = 0; i < 12; i++) {
//       const geometry = new THREE.BoxGeometry(1, 1, 1);
//       const material = new THREE.MeshPhongMaterial({ 
//         color: colors[i % colors.length],
//         transparent: true,
//         opacity: 0.7
//       });
//       const cube = new THREE.Mesh(geometry, material);
      
//       cube.position.x = (Math.random() - 0.5) * 20;
//       cube.position.y = (Math.random() - 0.5) * 20;
//       cube.position.z = (Math.random() - 0.5) * 10;
      
//       cube.rotation.x = Math.random() * Math.PI;
//       cube.rotation.y = Math.random() * Math.PI;
      
//       cube.userData = {
//         speedX: (Math.random() - 0.5) * 0.01,
//         speedY: (Math.random() - 0.5) * 0.01,
//         rotationSpeed: (Math.random() - 0.5) * 0.02
//       };
      
//       scene.add(cube);
//       cubesRef.current.push(cube);
//     }

//     const animate = () => {
//       requestAnimationFrame(animate);

//       cubesRef.current.forEach(cube => {
//         cube.rotation.x += cube.userData.rotationSpeed;
//         cube.rotation.y += cube.userData.rotationSpeed;
        
//         cube.position.x += cube.userData.speedX;
//         cube.position.y += cube.userData.speedY;
        
//         if (Math.abs(cube.position.x) > 15) cube.userData.speedX *= -1;
//         if (Math.abs(cube.position.y) > 15) cube.userData.speedY *= -1;
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       if (!mountRef.current) return;
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       cubesRef.current.forEach(cube => {
//         cube.geometry.dispose();
//         cube.material.dispose();
//       });
//       renderer.dispose();
//     };
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`);
//       const data = await response.json();
//       if (data.success) {
//         setProblems(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching problems:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title || !formData.description || !formData.location) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setFormData({ title: '', description: '', category: 'infrastructure', location: '' });
//         await fetchProblems();
//         setActiveTab('track');
//       }
//     } catch (error) {
//       console.error('Error submitting problem:', error);
//       alert('Failed to submit problem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpvote = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/upvote`, {
//         method: 'POST',
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error upvoting:', error);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
//       <div ref={mountRef} className="fixed inset-0 z-0" />
      
//       <div className="relative z-10">
//         <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
//           <div className="max-w-7xl mx-auto px-6 py-6">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Community Problem Solver
//             </h1>
//             <p className="text-blue-200 mt-2">Build a platform for students to report and track community issues</p>
//           </div>
//         </header>

//         <nav className="backdrop-blur-md bg-white/5 border-b border-white/10">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="flex gap-1">
//               {[
//                 { id: 'report', label: 'Report Issue', icon: Plus },
//                 { id: 'track', label: 'Track Issues', icon: TrendingUp },
//                 { id: 'dashboard', label: 'Dashboard', icon: Users }
//               ].map(tab => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-2 px-6 py-4 transition-all ${
//                       activeTab === tab.id
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
//                         : 'text-blue-200 hover:bg-white/10'
//                     }`}
//                   >
//                     <Icon size={20} />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-7xl mx-auto px-6 py-8">
//           {activeTab === 'report' && (
//             <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold mb-6">Report a Community Issue</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Issue Title</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
//                     placeholder="Brief description of the issue"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Category</label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
//                   >
//                     <option value="infrastructure">Infrastructure</option>
//                     <option value="safety">Safety</option>
//                     <option value="environment">Environment</option>
//                     <option value="education">Education</option>
//                     <option value="health">Health</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Location</label>
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
//                     placeholder="Where is this issue located?"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     rows={5}
//                     className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-white"
//                     placeholder="Provide detailed information about the issue..."
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50"
//                 >
//                   {loading ? 'Submitting...' : 'Submit Issue'}
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === 'track' && (
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Community Issues</h2>
//               {loading ? (
//                 <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-white/20 text-center">
//                   <p className="text-xl text-blue-200">Loading...</p>
//                 </div>
//               ) : problems.length === 0 ? (
//                 <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-white/20 text-center">
//                   <MessageSquare size={64} className="mx-auto mb-4 text-blue-400" />
//                   <p className="text-xl text-blue-200">No issues reported yet. Be the first to report one!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {problems.map(problem => (
//                     <div key={problem.id} className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
//                           <p className="text-blue-200 mb-3">{problem.description}</p>
//                           <div className="flex gap-4 text-sm flex-wrap">
//                             <span className="px-3 py-1 bg-blue-500/30 rounded-full">{problem.category}</span>
//                             <span className="text-blue-300">📍 {problem.location}</span>
//                             <span className="text-blue-300">📅 {new Date(problem.createdAt).toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end gap-2 ml-4">
//                           <button
//                             onClick={() => handleUpvote(problem.id)}
//                             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
//                           >
//                             <TrendingUp size={16} />
//                             {problem.upvotes}
//                           </button>
//                           <select
//                             value={problem.status}
//                             onChange={(e) => handleStatusChange(problem.id, e.target.value)}
//                             className="px-3 py-1 rounded-lg bg-white/5 border border-white/20 text-sm text-white"
//                           >
//                             <option value="open">Open</option>
//                             <option value="in-progress">In Progress</option>
//                             <option value="resolved">Resolved</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === 'dashboard' && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Total Issues</h3>
//                   <MessageSquare className="text-blue-400" size={32} />
//                 </div>
//                 <p className="text-4xl font-bold">{problems.length}</p>
//               </div>

//               <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">In Progress</h3>
//                   <TrendingUp className="text-yellow-400" size={32} />
//                 </div>
//                 <p className="text-4xl font-bold">
//                   {problems.filter(p => p.status === 'in-progress').length}
//                 </p>
//               </div>

//               <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Resolved</h3>
//                   <CheckCircle className="text-green-400" size={32} />
//                 </div>
//                 <p className="text-4xl font-bold">
//                   {problems.filter(p => p.status === 'resolved').length}
//                 </p>
//               </div>

//               <div className="md:col-span-3 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
//                 <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
//                 <div className="space-y-3">
//                   {problems.slice(0, 5).map(problem => (
//                     <div key={problem.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
//                       <span className="text-blue-200">{problem.title}</span>
//                       <span className={`px-3 py-1 rounded-full text-sm ${
//                         problem.status === 'resolved' ? 'bg-green-500/30' :
//                         problem.status === 'in-progress' ? 'bg-yellow-500/30' :
//                         'bg-blue-500/30'
//                       }`}>
//                         {problem.status}
//                       </span>
//                     </div>
//                   ))}
//                   {problems.length === 0 && (
//                     <p className="text-center text-blue-300 py-4">No activity yet</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { MessageSquare, Plus, TrendingUp, Users, CheckCircle } from 'lucide-react';

// // Backend URL
// const API_URL = 'https://sinister-backend-g3ey.onrender.com';

// function App() {
//   const [activeTab, setActiveTab] = useState('report');
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'infrastructure',
//     location: ''
//   });
//   const mountRef = useRef(null);
//   const cubesRef = useRef([]);

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000000);

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 15;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//     scene.add(ambientLight);

//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(10, 10, 10);
//     scene.add(pointLight);

//     const pointLight2 = new THREE.PointLight(0xcccccc, 0.8);
//     pointLight2.position.set(-10, -10, 5);
//     scene.add(pointLight2);

//     const colors = [0xffffff, 0xcccccc, 0x999999, 0x666666, 0x333333];
    
//     for (let i = 0; i < 12; i++) {
//       const geometry = new THREE.BoxGeometry(1, 1, 1);
//       const material = new THREE.MeshPhongMaterial({ 
//         color: colors[i % colors.length],
//         transparent: true,
//         opacity: 0.5
//       });
//       const cube = new THREE.Mesh(geometry, material);
      
//       cube.position.x = (Math.random() - 0.5) * 20;
//       cube.position.y = (Math.random() - 0.5) * 20;
//       cube.position.z = (Math.random() - 0.5) * 10;
      
//       cube.rotation.x = Math.random() * Math.PI;
//       cube.rotation.y = Math.random() * Math.PI;
      
//       cube.userData = {
//         speedX: (Math.random() - 0.5) * 0.01,
//         speedY: (Math.random() - 0.5) * 0.01,
//         rotationSpeed: (Math.random() - 0.5) * 0.02
//       };
      
//       scene.add(cube);
//       cubesRef.current.push(cube);
//     }

//     const animate = () => {
//       requestAnimationFrame(animate);

//       cubesRef.current.forEach(cube => {
//         cube.rotation.x += cube.userData.rotationSpeed;
//         cube.rotation.y += cube.userData.rotationSpeed;
        
//         cube.position.x += cube.userData.speedX;
//         cube.position.y += cube.userData.speedY;
        
//         if (Math.abs(cube.position.x) > 15) cube.userData.speedX *= -1;
//         if (Math.abs(cube.position.y) > 15) cube.userData.speedY *= -1;
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       if (!mountRef.current) return;
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       cubesRef.current.forEach(cube => {
//         cube.geometry.dispose();
//         cube.material.dispose();
//       });
//       renderer.dispose();
//     };
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`);
//       const data = await response.json();
//       if (data.success) {
//         setProblems(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching problems:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title || !formData.description || !formData.location) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setFormData({ title: '', description: '', category: 'infrastructure', location: '' });
//         await fetchProblems();
//         setActiveTab('track');
//       }
//     } catch (error) {
//       console.error('Error submitting problem:', error);
//       alert('Failed to submit problem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpvote = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/upvote`, {
//         method: 'POST',
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error upvoting:', error);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div ref={mountRef} className="fixed inset-0 z-0" />
      
//       <div className="relative z-10">
//         <header className="backdrop-blur-md bg-white/5 border-b border-white/10">
//           <div className="max-w-7xl mx-auto px-6 py-6">
//             <h1 className="text-4xl font-bold text-white">
//               Tour De Campus
//             </h1>
//             <p className="text-gray-400 mt-2">Report and track community issues efficiently</p>
//           </div>
//         </header>

//         <nav className="backdrop-blur-md bg-white/5 border-b border-white/10">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="flex gap-1">
//               {[
//                 { id: 'report', label: 'Report Issue', icon: Plus },
//                 { id: 'track', label: 'Track Issues', icon: TrendingUp },
//                 { id: 'dashboard', label: 'Dashboard', icon: Users }
//               ].map(tab => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-2 px-6 py-4 transition-all ${
//                       activeTab === tab.id
//                         ? 'bg-white text-black font-semibold'
//                         : 'text-gray-300 hover:bg-white/10 hover:text-white'
//                     }`}
//                   >
//                     <Icon size={20} />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </nav>

//         <main className="max-w-7xl mx-auto px-6 py-8">
//           {activeTab === 'report' && (
//             <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
//               <h2 className="text-3xl font-bold mb-6">Report a Community Issue</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-300">Issue Title</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-500"
//                     placeholder="Brief description of the issue"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
//                   >
//                     <option value="infrastructure">Infrastructure</option>
//                     <option value="safety">Safety</option>
//                     <option value="environment">Environment</option>
//                     <option value="education">Education</option>
//                     <option value="health">Health</option>
//                     <option value="administration">Administration</option>
//                     <option value="registration">Registration</option>
//                     <option value="campus">Campus</option>
//                     <option value="ragging">Ragging</option>
//                     <option value="events">Events</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-300">Location</label>
//                   <input
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-500"
//                     placeholder="Where is this issue located?"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     rows={5}
//                     className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-500"
//                     placeholder="Provide detailed information about the issue..."
//                   />
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
//                 >
//                   {loading ? 'Submitting...' : 'Submit Issue'}
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === 'track' && (
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Community Issues</h2>
//               {loading ? (
//                 <div className="backdrop-blur-md bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
//                   <p className="text-xl text-gray-400">Loading...</p>
//                 </div>
//               ) : problems.length === 0 ? (
//                 <div className="backdrop-blur-md bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
//                   <MessageSquare size={64} className="mx-auto mb-4 text-gray-600" />
//                   <p className="text-xl text-gray-400">No issues reported yet. Be the first to report one!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {problems.map(problem => (
//                     <div key={problem.id} className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
//                           <p className="text-gray-400 mb-3">{problem.description}</p>
//                           <div className="flex gap-4 text-sm flex-wrap">
//                             <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white">
//                               {problem.category}
//                             </span>
//                             <span className="text-gray-400">📍 {problem.location}</span>
//                             <span className="text-gray-400">📅 {new Date(problem.createdAt).toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end gap-2 ml-4">
//                           <button
//                             onClick={() => handleUpvote(problem.id)}
//                             className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all font-semibold"
//                           >
//                             <TrendingUp size={16} />
//                             {problem.upvotes}
//                           </button>
//                           <select
//                             value={problem.status}
//                             onChange={(e) => handleStatusChange(problem.id, e.target.value)}
//                             className="px-3 py-1 rounded-lg bg-black/50 border border-white/20 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white"
//                           >
//                             <option value="open">Open</option>
//                             <option value="in-progress">In Progress</option>
//                             <option value="resolved">Resolved</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === 'dashboard' && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Total Issues</h3>
//                   <MessageSquare className="text-gray-400" size={32} />
//                 </div>
//                 <p className="text-4xl font-bold">{problems.length}</p>
//               </div>

//               <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">In Progress</h3>
//                   <TrendingUp className="text-gray-400" size={32} />
//                 </div>
//                 <p className="text-4xl font-bold">
//                   {problems.filter(p => p.status === 'in-progress').length}
//                 </p>
//               </div>

//               <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Resolved</h3>
//                   <CheckCircle className="text-gray-400" size={32} />
//                 </div>
//                 <p className="text-4xl font-bold">
//                   {problems.filter(p => p.status === 'resolved').length}
//                 </p>
//               </div>

//               <div className="md:col-span-3 backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
//                 <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
//                 <div className="space-y-3">
//                   {problems.slice(0, 5).map(problem => (
//                     <div key={problem.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
//                       <span className="text-gray-300">{problem.title}</span>
//                       <span className={`px-3 py-1 rounded-full text-sm border ${
//                         problem.status === 'resolved' ? 'bg-white/10 border-white/30 text-white' :
//                         problem.status === 'in-progress' ? 'bg-white/5 border-white/20 text-gray-300' :
//                         'bg-black/30 border-white/10 text-gray-400'
//                       }`}>
//                         {problem.status}
//                       </span>
//                     </div>
//                   ))}
//                   {problems.length === 0 && (
//                     <p className="text-center text-gray-500 py-4">No activity yet</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { Plus, TrendingUp, Users, CheckCircle, Upload, X, AlertTriangle } from 'lucide-react';

// const API_URL = 'https://sinister-backend-g3ey.onrender.com';

// const categoryEmojis = {
//   infrastructure: '🏗️',
//   safety: '🛡️',
//   environment: '🌱',
//   education: '📚',
//   health: '🏥',
//   administration: '📋',
//   registration: '📝',
//   campus: '🏫',
//   ragging: '⚠️',
//   events: '🎉'
// };

// const severityStyles = {
//   low: 'bg-green-50 text-green-700 border-green-200',
//   medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
//   high: 'bg-orange-50 text-orange-700 border-orange-200',
//   critical: 'bg-red-50 text-red-700 border-red-200'
// };

// function App() {
//   const [activeTab, setActiveTab] = useState('report');
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'infrastructure',
//     location: '',
//     severity: 'medium'
//   });

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`);
//       const data = await response.json();
//       if (data.success) {
//         setProblems(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching problems:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (uploadedImages.length + files.length > 5) {
//       alert('Maximum 5 images allowed');
//       return;
//     }
    
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImages(prev => [...prev, {
//           id: Date.now() + Math.random(),
//           url: reader.result,
//           name: file.name
//         }]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (id) => {
//     setUploadedImages(prev => prev.filter(img => img.id !== id));
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
    
//     if (!formData.title || !formData.description || !formData.location) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           images: uploadedImages.map(img => img.url)
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setFormData({ title: '', description: '', category: 'infrastructure', location: '', severity: 'medium' });
//         setUploadedImages([]);
//         await fetchProblems();
//         setActiveTab('track');
//       }
//     } catch (error) {
//       console.error('Error submitting problem:', error);
//       alert('Failed to submit problem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpvote = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/upvote`, {
//         method: 'POST',
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error upvoting:', error);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="relative h-96 bg-gray-900 overflow-hidden">
//         <img 
//           src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=400&fit=crop" 
//           alt="Community"
//           className="absolute inset-0 w-full h-full object-cover opacity-40"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60" />
//         <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
//           <h1 className="text-6xl font-light text-white mb-4 tracking-tight">
//             Tour De Campus
//           </h1>
//           <p className="text-xl text-gray-200 font-light max-w-2xl">
//             Report and track community issues with simplicity and efficiency
//           </p>
//         </div>
//       </div>

//       <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex gap-8">
//             {[
//               { id: 'report', label: 'Report Issue', icon: Plus },
//               { id: 'track', label: 'Track Issues', icon: TrendingUp },
//               { id: 'dashboard', label: 'Dashboard', icon: Users }
//             ].map(tab => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-1 py-4 transition-all font-light text-sm tracking-wide ${
//                     activeTab === tab.id
//                       ? 'border-b-2 border-black text-black'
//                       : 'text-gray-500 hover:text-black'
//                   }`}
//                 >
//                   <Icon size={18} />
//                   {tab.label.toUpperCase()}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         {activeTab === 'report' && (
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-4xl font-light mb-8 tracking-tight">Report an Issue</h2>
            
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-light mb-2 text-gray-700 tracking-wide">ISSUE TITLE *</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-light"
//                   placeholder="Brief description of the issue"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-light mb-2 text-gray-700 tracking-wide">CATEGORY *</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-3 text-xl pointer-events-none">
//                       {categoryEmojis[formData.category]}
//                     </span>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-light appearance-none bg-white"
//                     >
//                       {Object.keys(categoryEmojis).map(cat => (
//                         <option key={cat} value={cat}>
//                           {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-light mb-2 text-gray-700 tracking-wide">SEVERITY LEVEL *</label>
//                   <div className="relative">
//                     <AlertTriangle className="absolute left-3 top-3 text-gray-400 pointer-events-none" size={20} />
//                     <select
//                       value={formData.severity}
//                       onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-light appearance-none bg-white"
//                     >
//                       <option value="low">Low</option>
//                       <option value="medium">Medium</option>
//                       <option value="high">High</option>
//                       <option value="critical">Critical</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-light mb-2 text-gray-700 tracking-wide">LOCATION *</label>
//                 <input
//                   type="text"
//                   value={formData.location}
//                   onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-light"
//                   placeholder="Where is this issue located?"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-light mb-2 text-gray-700 tracking-wide">DESCRIPTION *</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   rows={6}
//                   className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-light resize-none"
//                   placeholder="Provide detailed information about the issue..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-light mb-2 text-gray-700 tracking-wide">
//                   UPLOAD IMAGES (Optional, max 5)
//                 </label>
//                 <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-black transition-colors">
//                   <input
//                     type="file"
//                     id="image-upload"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                   <label htmlFor="image-upload" className="cursor-pointer block">
//                     <Upload className="mx-auto mb-3 text-gray-400" size={32} />
//                     <p className="text-sm font-light text-gray-600">
//                       Click to upload or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
//                   </label>
//                 </div>

//                 {uploadedImages.length > 0 && (
//                   <div className="mt-4 grid grid-cols-5 gap-3">
//                     {uploadedImages.map(img => (
//                       <div key={img.id} className="relative group">
//                         <img 
//                           src={img.url} 
//                           alt={img.name}
//                           className="w-full h-24 object-cover border border-gray-200"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(img.id)}
//                           className="absolute top-1 right-1 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-black text-white py-4 font-light tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'SUBMITTING...' : 'SUBMIT ISSUE'}
//               </button>
//             </div>
//           </div>
//         )}

//         {activeTab === 'track' && (
//           <div>
//             <h2 className="text-4xl font-light mb-8 tracking-tight">All Issues</h2>
//             {loading ? (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 font-light">Loading...</p>
//               </div>
//             ) : problems.length === 0 ? (
//               <div className="text-center py-20 border border-gray-200">
//                 <p className="text-xl text-gray-500 font-light">No issues reported yet</p>
//                 <button
//                   onClick={() => setActiveTab('report')}
//                   className="mt-6 px-8 py-3 bg-black text-white font-light tracking-wide hover:bg-gray-800"
//                 >
//                   REPORT FIRST ISSUE
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 gap-6">
//                 {problems.map(problem => (
//                   <div key={problem.id} className="border border-gray-200 p-6 hover:shadow-lg transition-shadow">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           <span className="text-2xl">{categoryEmojis[problem.category]}</span>
//                           <h3 className="text-xl font-light">{problem.title}</h3>
//                         </div>
//                         <p className="text-gray-600 font-light mb-4 leading-relaxed">{problem.description}</p>
                        
//                         <div className="flex gap-3 text-sm flex-wrap items-center">
//                           <span className={`px-3 py-1 border font-light text-xs tracking-wide ${severityStyles[problem.severity || 'medium']}`}>
//                             {(problem.severity || 'medium').toUpperCase()}
//                           </span>
//                           <span className="px-3 py-1 bg-gray-100 text-gray-700 font-light text-xs tracking-wide">
//                             {problem.category.toUpperCase()}
//                           </span>
//                           <span className="text-gray-500 font-light">📍 {problem.location}</span>
//                           <span className="text-gray-400 font-light text-xs">
//                             {new Date(problem.createdAt).toLocaleDateString('en-US', { 
//                               month: 'short', 
//                               day: 'numeric', 
//                               year: 'numeric' 
//                             })}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-col items-end gap-3 ml-6">
//                         <button
//                           onClick={() => handleUpvote(problem.id)}
//                           className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors font-light"
//                         >
//                           <TrendingUp size={16} />
//                           {problem.upvotes}
//                         </button>
//                         <select
//                           value={problem.status}
//                           onChange={(e) => handleStatusChange(problem.id, e.target.value)}
//                           className="px-3 py-2 border border-gray-300 text-xs font-light focus:outline-none focus:border-black"
//                         >
//                           <option value="open">Open</option>
//                           <option value="in-progress">In Progress</option>
//                           <option value="resolved">Resolved</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'dashboard' && (
//           <div>
//             <h2 className="text-4xl font-light mb-8 tracking-tight">Dashboard</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//               <div className="border border-gray-200 p-6">
//                 <p className="text-sm text-gray-500 font-light tracking-wide mb-2">TOTAL ISSUES</p>
//                 <p className="text-4xl font-light">{problems.length}</p>
//               </div>

//               <div className="border border-gray-200 p-6">
//                 <p className="text-sm text-gray-500 font-light tracking-wide mb-2">OPEN</p>
//                 <p className="text-4xl font-light text-red-600">
//                   {problems.filter(p => p.status === 'open').length}
//                 </p>
//               </div>

//               <div className="border border-gray-200 p-6">
//                 <p className="text-sm text-gray-500 font-light tracking-wide mb-2">IN PROGRESS</p>
//                 <p className="text-4xl font-light text-yellow-600">
//                   {problems.filter(p => p.status === 'in-progress').length}
//                 </p>
//               </div>

//               <div className="border border-gray-200 p-6">
//                 <p className="text-sm text-gray-500 font-light tracking-wide mb-2">RESOLVED</p>
//                 <p className="text-4xl font-light text-green-600">
//                   {problems.filter(p => p.status === 'resolved').length}
//                 </p>
//               </div>
//             </div>

//             <div className="border border-gray-200 p-8">
//               <h3 className="text-2xl font-light mb-6 tracking-tight">Recent Activity</h3>
//               <div className="space-y-4">
//                 {problems.slice(0, 8).map(problem => (
//                   <div key={problem.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl">{categoryEmojis[problem.category]}</span>
//                       <span className="font-light text-gray-700">{problem.title}</span>
//                     </div>
//                     <span className={`px-3 py-1 text-xs font-light tracking-wide ${
//                       problem.status === 'resolved' ? 'bg-green-50 text-green-700' :
//                       problem.status === 'in-progress' ? 'bg-yellow-50 text-yellow-700' :
//                       'bg-gray-100 text-gray-600'
//                     }`}>
//                       {problem.status.toUpperCase()}
//                     </span>
//                   </div>
//                 ))}
//                 {problems.length === 0 && (
//                   <p className="text-center text-gray-400 py-8 font-light">No activity yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className="border-t border-gray-200 mt-20 py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <p className="text-sm font-light text-gray-500 tracking-wide">
//             © 2024 Tour De Campus. Making communities better, together.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { Plus, TrendingUp, Users, CheckCircle, Upload, X, AlertTriangle } from 'lucide-react';

// const API_URL = 'https://sinister-backend-g3ey.onrender.com';

// const categoryEmojis = {
//   infrastructure: '🏗️',
//   safety: '🛡️',
//   environment: '🌱',
//   education: '📚',
//   health: '🏥',
//   administration: '📋',
//   registration: '📝',
//   campus: '🏫',
//   ragging: '⚠️',
//   events: '🎉'
// };

// const severityStyles = {
//   low: 'bg-white text-gray-900 border-gray-300',
//   medium: 'bg-gray-100 text-gray-900 border-gray-400',
//   high: 'bg-gray-200 text-black border-gray-500',
//   critical: 'bg-black text-white border-black'
// };

// function App() {
//   const [activeTab, setActiveTab] = useState('report');
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'infrastructure',
//     location: '',
//     severity: 'medium'
//   });

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`);
//       const data = await response.json();
//       if (data.success) {
//         setProblems(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching problems:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (uploadedImages.length + files.length > 5) {
//       alert('Maximum 5 images allowed');
//       return;
//     }
    
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImages(prev => [...prev, {
//           id: Date.now() + Math.random(),
//           url: reader.result,
//           name: file.name
//         }]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (id) => {
//     setUploadedImages(prev => prev.filter(img => img.id !== id));
//   };

//   const handleSubmit = async () => {
//     const trimmedTitle = formData.title.trim();
//     const trimmedDescription = formData.description.trim();
//     const trimmedLocation = formData.location.trim();
    
//     if (!trimmedTitle || !trimmedDescription || !trimmedLocation) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL}/problems`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: trimmedTitle,
//           description: trimmedDescription,
//           category: formData.category,
//           location: trimmedLocation,
//           severity: formData.severity,
//           images: uploadedImages.map(img => img.url)
//         }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setFormData({ title: '', description: '', category: 'infrastructure', location: '', severity: 'medium' });
//         setUploadedImages([]);
//         await fetchProblems();
//         setActiveTab('track');
//         alert('Issue submitted successfully!');
//       } else {
//         alert('Failed to submit issue. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting problem:', error);
//       alert('Failed to submit problem. Please check your connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpvote = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/upvote`, {
//         method: 'POST',
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error upvoting:', error);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await fetch(`${API_URL}/problems/${id}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchProblems();
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const isFormValid = formData.title.trim() && formData.description.trim() && formData.location.trim();

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="relative h-96 bg-black overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
//         <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
//           <h1 className="text-6xl font-light text-white mb-4 tracking-tight">
//             Tour De Campus
//           </h1>
//           <p className="text-xl text-gray-300 font-light max-w-2xl">
//             Report and track community issues with simplicity and efficiency
//           </p>
//         </div>
//       </div>

//       <nav className="border-b-2 border-black bg-white sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex gap-8">
//             {[
//               { id: 'report', label: 'Report Issue', icon: Plus },
//               { id: 'track', label: 'Track Issues', icon: TrendingUp },
//               { id: 'dashboard', label: 'Dashboard', icon: Users }
//             ].map(tab => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-1 py-4 transition-all font-light text-sm tracking-wide ${
//                     activeTab === tab.id
//                       ? 'border-b-2 border-black text-black -mb-0.5'
//                       : 'text-gray-500 hover:text-black'
//                   }`}
//                 >
//                   <Icon size={18} />
//                   {tab.label.toUpperCase()}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         {activeTab === 'report' && (
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-4xl font-light mb-8 tracking-tight">Report an Issue</h2>
            
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-light mb-2 text-black tracking-wide">ISSUE TITLE *</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-4 py-3 border-2 border-black focus:border-black focus:outline-none font-light bg-white"
//                   placeholder="Brief description of the issue"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-light mb-2 text-black tracking-wide">CATEGORY *</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-3 text-xl pointer-events-none">
//                       {categoryEmojis[formData.category]}
//                     </span>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-black focus:border-black focus:outline-none font-light appearance-none bg-white"
//                     >
//                       {Object.keys(categoryEmojis).map(cat => (
//                         <option key={cat} value={cat}>
//                           {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-light mb-2 text-black tracking-wide">SEVERITY LEVEL *</label>
//                   <div className="relative">
//                     <AlertTriangle className="absolute left-3 top-3 text-black pointer-events-none" size={20} />
//                     <select
//                       value={formData.severity}
//                       onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-black focus:border-black focus:outline-none font-light appearance-none bg-white"
//                     >
//                       <option value="low">Low</option>
//                       <option value="medium">Medium</option>
//                       <option value="high">High</option>
//                       <option value="critical">Critical</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-light mb-2 text-black tracking-wide">LOCATION *</label>
//                 <input
//                   type="text"
//                   value={formData.location}
//                   onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                   className="w-full px-4 py-3 border-2 border-black focus:border-black focus:outline-none font-light bg-white"
//                   placeholder="Where is this issue located?"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-light mb-2 text-black tracking-wide">DESCRIPTION *</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   rows={6}
//                   className="w-full px-4 py-3 border-2 border-black focus:border-black focus:outline-none font-light resize-none bg-white"
//                   placeholder="Provide detailed information about the issue..."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-light mb-2 text-black tracking-wide">
//                   UPLOAD IMAGES (Optional, max 5)
//                 </label>
//                 <div className="border-2 border-dashed border-black p-8 text-center hover:bg-gray-100 transition-colors">
//                   <input
//                     type="file"
//                     id="image-upload"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                   <label htmlFor="image-upload" className="cursor-pointer block">
//                     <Upload className="mx-auto mb-3 text-black" size={32} />
//                     <p className="text-sm font-light text-black">
//                       Click to upload or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</p>
//                   </label>
//                 </div>

//                 {uploadedImages.length > 0 && (
//                   <div className="mt-4 grid grid-cols-5 gap-3">
//                     {uploadedImages.map(img => (
//                       <div key={img.id} className="relative group">
//                         <img 
//                           src={img.url} 
//                           alt={img.name}
//                           className="w-full h-24 object-cover border-2 border-black"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(img.id)}
//                           className="absolute top-1 right-1 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading || !isFormValid}
//                 className="w-full bg-black text-white py-4 font-light tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'SUBMITTING...' : 'SUBMIT ISSUE'}
//               </button>
              
//               {!isFormValid && (
//                 <p className="text-sm text-gray-600 text-center font-light">
//                   Please fill in all required fields (Title, Location, and Description)
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === 'track' && (
//           <div>
//             <h2 className="text-4xl font-light mb-8 tracking-tight">All Issues</h2>
//             {loading ? (
//               <div className="text-center py-20">
//                 <p className="text-gray-500 font-light">Loading...</p>
//               </div>
//             ) : problems.length === 0 ? (
//               <div className="text-center py-20 border-2 border-black">
//                 <p className="text-xl text-gray-900 font-light">No issues reported yet</p>
//                 <button
//                   onClick={() => setActiveTab('report')}
//                   className="mt-6 px-8 py-3 bg-black text-white font-light tracking-wide hover:bg-gray-800"
//                 >
//                   REPORT FIRST ISSUE
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 gap-6">
//                 {problems.map(problem => (
//                   <div key={problem.id} className="border-2 border-black p-6 hover:bg-gray-50 transition-colors">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           <span className="text-2xl">{categoryEmojis[problem.category]}</span>
//                           <h3 className="text-xl font-light">{problem.title}</h3>
//                         </div>
//                         <p className="text-gray-800 font-light mb-4 leading-relaxed">{problem.description}</p>
                        
//                         <div className="flex gap-3 text-sm flex-wrap items-center">
//                           <span className={`px-3 py-1 border-2 font-light text-xs tracking-wide ${severityStyles[problem.severity || 'medium']}`}>
//                             {(problem.severity || 'medium').toUpperCase()}
//                           </span>
//                           <span className="px-3 py-1 bg-black text-white font-light text-xs tracking-wide">
//                             {problem.category.toUpperCase()}
//                           </span>
//                           <span className="text-gray-700 font-light">📍 {problem.location}</span>
//                           <span className="text-gray-500 font-light text-xs">
//                             {new Date(problem.createdAt).toLocaleDateString('en-US', { 
//                               month: 'short', 
//                               day: 'numeric', 
//                               year: 'numeric' 
//                             })}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-col items-end gap-3 ml-6">
//                         <button
//                           onClick={() => handleUpvote(problem.id)}
//                           className="flex items-center gap-2 px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors font-light"
//                         >
//                           <TrendingUp size={16} />
//                           {problem.upvotes}
//                         </button>
//                         <select
//                           value={problem.status}
//                           onChange={(e) => handleStatusChange(problem.id, e.target.value)}
//                           className="px-3 py-2 border-2 border-black text-xs font-light focus:outline-none focus:border-black bg-white"
//                         >
//                           <option value="open">Open</option>
//                           <option value="in-progress">In Progress</option>
//                           <option value="resolved">Resolved</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'dashboard' && (
//           <div>
//             <h2 className="text-4xl font-light mb-8 tracking-tight">Dashboard</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//               <div className="border-2 border-black p-6 bg-white">
//                 <p className="text-sm text-gray-600 font-light tracking-wide mb-2">TOTAL ISSUES</p>
//                 <p className="text-4xl font-light">{problems.length}</p>
//               </div>

//               <div className="border-2 border-black p-6 bg-gray-100">
//                 <p className="text-sm text-gray-600 font-light tracking-wide mb-2">OPEN</p>
//                 <p className="text-4xl font-light text-black">
//                   {problems.filter(p => p.status === 'open').length}
//                 </p>
//               </div>

//               <div className="border-2 border-black p-6 bg-gray-200">
//                 <p className="text-sm text-gray-600 font-light tracking-wide mb-2">IN PROGRESS</p>
//                 <p className="text-4xl font-light text-black">
//                   {problems.filter(p => p.status === 'in-progress').length}
//                 </p>
//               </div>

//               <div className="border-2 border-black p-6 bg-black">
//                 <p className="text-sm text-gray-400 font-light tracking-wide mb-2">RESOLVED</p>
//                 <p className="text-4xl font-light text-white">
//                   {problems.filter(p => p.status === 'resolved').length}
//                 </p>
//               </div>
//             </div>

//             <div className="border-2 border-black p-8 bg-white">
//               <h3 className="text-2xl font-light mb-6 tracking-tight">Recent Activity</h3>
//               <div className="space-y-4">
//                 {problems.slice(0, 8).map(problem => (
//                   <div key={problem.id} className="flex items-center justify-between py-3 border-b-2 border-gray-200 last:border-0">
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl">{categoryEmojis[problem.category]}</span>
//                       <span className="font-light text-gray-900">{problem.title}</span>
//                     </div>
//                     <span className={`px-3 py-1 text-xs font-light tracking-wide border ${
//                       problem.status === 'resolved' ? 'bg-black text-white border-black' :
//                       problem.status === 'in-progress' ? 'bg-gray-200 text-black border-black' :
//                       'bg-white text-black border-black'
//                     }`}>
//                       {problem.status.toUpperCase()}
//                     </span>
//                   </div>
//                 ))}
//                 {problems.length === 0 && (
//                   <p className="text-center text-gray-500 py-8 font-light">No activity yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className="border-t-2 border-black mt-20 py-12 bg-black">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <p className="text-sm font-light text-white tracking-wide">
//             © 2024 Tour De Campus. Making communities better, together.
//           </p>
//         </div>
//       </footer>
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

  const handleSubmit = async () => {
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
        alert('Issue submitted successfully!');
        setFormData({ title: '', description: '', category: 'infrastructure', location: '' });
        await fetchProblems();
        setActiveTab('track');
      } else {
        alert('Failed to submit issue: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting problem:', error);
      alert('Failed to submit problem. Please try again.');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
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
              <div className="space-y-6" onKeyDown={handleKeyDown}>
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
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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