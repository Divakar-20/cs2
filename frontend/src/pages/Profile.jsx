import React from 'react';
import { ArrowLeft, User, Shield, CreditCard, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Admin Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-200 mb-6">
                AD
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Divakar</h2>
              <p className="text-indigo-500 font-bold uppercase tracking-widest text-xs mt-1 bg-indigo-50 px-3 py-1 rounded-full">System Admin</p>
              
              <div className="w-full h-px bg-slate-100 my-6"></div>
              
              <div className="w-full space-y-3">
                <button className="w-full flex items-center p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition">
                  <User className="w-5 h-5 mr-3 text-slate-400" /> Account Details
                </button>
                <button className="w-full flex items-center p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition">
                  <Shield className="w-5 h-5 mr-3 text-slate-400" /> Security
                </button>
                <button className="w-full flex items-center p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition">
                  <Key className="w-5 h-5 mr-3 text-slate-400" /> API Keys
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
             <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl shadow-slate-200/50">
               <h3 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h3>
               
               <form className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                     <input type="text" defaultValue="Divakar" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                     <input type="text" defaultValue="Admin" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                   <input type="email" defaultValue="divakar@sairam.edu.in" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" />
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
                   <input type="tel" defaultValue="+91 9876543210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" />
                 </div>

                 <div className="pt-4 flex justify-end">
                   <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-transform transform hover:-translate-y-0.5">
                     Save Changes
                   </button>
                 </div>
               </form>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
