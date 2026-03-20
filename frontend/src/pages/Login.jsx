import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, KeyRound, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8-dMwqgQ0jOgoyXXoYxLOZQGH9yAlYOkpcQ&s')] bg-cover bg-center flex items-center justify-center p-4 relative">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>
      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transition-all z-10 p-8 transform hover:scale-105 duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            <Bus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Challo Sairam</h1>
          <p className="text-blue-200 text-sm mt-2 font-medium">Next-Gen College Transit System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <Mail className="w-5 h-5 absolute top-3.5 left-4 text-blue-200 group-focus-within:text-white transition-colors" />
            <input 
              type="email" 
              placeholder="College Email Address"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-blue-200/70 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative group">
            <KeyRound className="w-5 h-5 absolute top-3.5 left-4 text-blue-200 group-focus-within:text-white transition-colors" />
            <input 
              type="password" 
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-blue-200/70 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center space-x-2 mt-4"
          >
            <span>Access Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
