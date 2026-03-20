import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Shield, CreditCard, Key, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/useLocalStorage';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useLocalStorage('userProfile', {
    firstName: 'Divakar',
    lastName: 'Admin',
    email: 'divakar@sairam.edu.in',
    phone: '+91 9876543210'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update initials from form
      const initials = `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
      
      // Save (already via hook)
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Save failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const avatarInitials = `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();

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
                {avatarInitials}
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{formData.firstName} {formData.lastName}</h2>
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
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl shadow-slate-200/50 relative">
              {success && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center shadow-lg animate-pulse">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Profile updated!
                </div>
              )}
              {error && (
                <div className="absolute top-4 right-4 bg-rose-500 text-white px-4 py-2 rounded-xl flex items-center shadow-lg">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}
              
              <h3 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                    <input 
                      name="firstName" 
                      type="text" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                    <input 
                      name="lastName" 
                      type="text" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[+]?[0-9]{10,12}"
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-800" 
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-transform transform hover:-translate-y-0.5 flex items-center disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
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
