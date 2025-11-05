import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
return (
    <nav className="bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                    <Sparkles className="w-6 h-6" />
                    <span className="font-bold text-xl">HackApp</span>
                </div>
                
                <div className="hidden md:flex space-x-4">
                    <a href="#" className="hover:bg-white/20 px-3 py-2 rounded-md transition">Home</a>
                    <a href="#" className="hover:bg-white/20 px-3 py-2 rounded-md transition">Features</a>
                    <a href="#" className="hover:bg-white/20 px-3 py-2 rounded-md transition">About</a>
                </div>
                
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-white/20"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            
            {isOpen && (
                <div className="md:hidden pb-4 space-y-2">
                    <a href="#" className="block hover:bg-white/20 px-3 py-2 rounded-md">Home</a>
                    <a href="#" className="block hover:bg-white/20 px-3 py-2 rounded-md">Features</a>
                    <a href="#" className="block hover:bg-white/20 px-3 py-2 rounded-md">About</a>
                </div>
            )}
        </div>
    </nav>
);
};

export default Navbar;