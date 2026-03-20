import React, { useState } from 'react';
import { ArrowLeft, Bell, Navigation, Map, Server, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

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

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">System Settings</h1>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl shadow-slate-200/50">
           
           {/* Section 1 */}
           <div className="mb-10">
             <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
               <Bell className="w-5 h-5 mr-3 text-indigo-500" /> Notifications Preferences
             </h2>
             <div className="space-y-4 ml-8">
               
               <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:border-indigo-100 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-700">Push Notifications</h4>
                    <p className="text-xs text-slate-500 mt-1">Receive live alerts for delayed buses or accidents.</p>
                  </div>
                  <button 
                    onClick={() => setPushNotifs(!pushNotifs)}
                    className={`w-14 h-7 rounded-full transition-colors relative flex items-center ${pushNotifs ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <span className={`w-5 h-5 bg-white rounded-full absolute shadow-md transform transition-transform ${pushNotifs ? 'translate-x-8' : 'translate-x-1'}`}></span>
                  </button>
               </div>

               <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:border-indigo-100 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-700">Admin Email Summary</h4>
                    <p className="text-xs text-slate-500 mt-1">Receive a daily EOD operations summary email.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`w-14 h-7 rounded-full transition-colors relative flex items-center ${emailNotifs ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <span className={`w-5 h-5 bg-white rounded-full absolute shadow-md transform transition-transform ${emailNotifs ? 'translate-x-8' : 'translate-x-1'}`}></span>
                  </button>
               </div>

             </div>
           </div>

           {/* Section 2 */}
           <div className="mb-10 pt-6 border-t border-slate-100">
             <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
               <Navigation className="w-5 h-5 mr-3 text-indigo-500" /> Tracking & Mapping
             </h2>
             <div className="space-y-6 ml-8">
               
               <div className="space-y-3">
                 <label className="text-sm font-bold text-slate-700">Routing Provider Engine</label>
                 <select className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800 appearance-none">
                    <option>OSRM (Open Source Routing Machine)</option>
                    <option>Google Maps Matrix API (Requires Key)</option>
                    <option>Mapbox Navigation API</option>
                 </select>
               </div>
               
               <div className="space-y-3">
                 <label className="text-sm font-bold text-slate-700">Map Tile Server</label>
                 <select className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800 appearance-none">
                    <option>CartoDB Voyager (Light)</option>
                    <option>CartoDB Dark Matter (Dark Mode)</option>
                    <option>OpenStreetMap Standard</option>
                 </select>
               </div>

             </div>
           </div>

           {/* Save Action */}
           <div className="mt-8 flex justify-end">
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transition-transform transform hover:-translate-y-0.5">
                 Save System Configurations
               </button>
           </div>
           
        </div>
      </div>
    </div>
  );
}
