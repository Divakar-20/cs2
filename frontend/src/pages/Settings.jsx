  import React from 'react';
import { ArrowLeft, Bell, Navigation, Map, Server, Lock, CheckCircle, AlertCircle, Save, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/useLocalStorage';

export default function Settings() {
  const navigate = useNavigate();
  const [pushNotifs, setPushNotifs] = useLocalStorage('settings.pushNotifs', true);
  const [emailNotifs, setEmailNotifs] = useLocalStorage('settings.emailNotifs', false);
  const [routingEngine, setRoutingEngine] = useLocalStorage('settings.routingEngine', 'OSRM (Open Source Routing Machine)');
  const [mapTiles, setMapTiles] = useLocalStorage('settings.mapTiles', 'CartoDB Voyager (Light)');
  const [highContrast, setHighContrast] = useLocalStorage('settings.highContrast', false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSuccess(false);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Mock API
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setError('Failed to save. Reload and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`min-h-screen p-8 font-sans text-slate-800 transition-all duration-300 ${highContrast ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`max-w-4xl mx-auto ${highContrast ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-xl rounded-3xl p-8 border ${highContrast ? 'border-slate-700' : 'border-white/60'} shadow-xl shadow-slate-200/50 relative`}>
        
        {success && (
          <div className="absolute top-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl flex items-center shadow-2xl animate-pulse">
            <CheckCircle className="w-5 h-5 mr-3" />
            Settings saved successfully!
          </div>
        )}
        
        {error && (
          <div className="absolute top-6 right-6 bg-rose-500 text-white px-6 py-3 rounded-2xl flex items-center shadow-2xl">
            <AlertCircle className="w-5 h-5 mr-3" />
            {error}
          </div>
        )}

        <button 
          onClick={() => navigate('/dashboard')}
          className={`flex items-center font-medium mb-8 transition-colors ${highContrast ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <h1 className={`text-3xl font-extrabold mb-8 tracking-tight ${highContrast ? 'text-slate-100' : 'text-slate-900'}`}>System Settings</h1>

        {/* Section 1: Notifications */}
        <div className="mb-12">
          <h2 className={`text-xl font-bold mb-8 flex items-center tracking-tight ${highContrast ? 'text-slate-100' : 'text-slate-800'}`}>
            <Bell className="w-6 h-6 mr-4 text-indigo-500" />
            Notifications
          </h2>
          <div className="space-y-6">
            
            <div className="flex items-center justify-between p-6 border ${highContrast ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-white shadow-sm'} rounded-2xl hover:border-indigo-400 transition-all">
              <div>
                <h4 className={`font-bold ${highContrast ? 'text-slate-100' : 'text-slate-700'}`}>Push Notifications</h4>
                <p className={`text-sm mt-2 ${highContrast ? 'text-slate-300' : 'text-slate-500'}`}>Live alerts for delays, accidents, arrivals</p>
              </div>
              <button 
                onClick={() => setPushNotifs(!pushNotifs)}
                className={`w-16 h-9 rounded-full transition-all relative overflow-hidden shadow-md ${pushNotifs ? 'bg-emerald-500 ring-2 ring-emerald-400/50' : 'bg-slate-200 ring-slate-300'}`}
                aria-label="Toggle push notifications"
              >
                <span className={`w-7 h-7 bg-white rounded-full shadow-lg absolute top-1 transition-all duration-200 ease-in-out ${pushNotifs ? 'translate-x-8' : 'translate-x-1'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-6 border ${highContrast ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-white shadow-sm'} rounded-2xl hover:border-indigo-400 transition-all">
              <div>
                <h4 className={`font-bold ${highContrast ? 'text-slate-100' : 'text-slate-700'}`}>Email Summary</h4>
                <p className={`text-sm mt-2 ${highContrast ? 'text-slate-300' : 'text-slate-500'}`}>Daily EOD operations report</p>
              </div>
              <button 
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`w-16 h-9 rounded-full transition-all relative overflow-hidden shadow-md ${emailNotifs ? 'bg-emerald-500 ring-2 ring-emerald-400/50' : 'bg-slate-200 ring-slate-300'}`}
                aria-label="Toggle email notifications"
              >
                <span className={`w-7 h-7 bg-white rounded-full shadow-lg absolute top-1 transition-all duration-200 ease-in-out ${emailNotifs ? 'translate-x-8' : 'translate-x-1'}`}></span>
              </button>
            </div>

          </div>
        </div>

        {/* Section 2: Tracking */}
        <div className="mb-12 pt-8 border-t ${highContrast ? 'border-slate-700' : 'border-slate-100'}">
          <h2 className={`text-xl font-bold mb-8 flex items-center tracking-tight ${highContrast ? 'text-slate-100' : 'text-slate-800'}`}>
            <Navigation className="w-6 h-6 mr-4 text-indigo-500" />
            Tracking & Mapping
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-3">
              <label className={`text-sm font-bold uppercase tracking-wider ${highContrast ? 'text-slate-300' : 'text-slate-700'}`}>Routing Engine</label>
              <select 
                value={routingEngine}
                onChange={(e) => setRoutingEngine(e.target.value)}
                className={`w-full bg-slate-50 border rounded-xl px-5 py-4 outline-none focus:ring-3 focus:ring-indigo-500/20 transition-all appearance-none font-semibold ${highContrast ? 'bg-slate-800/50 border-slate-600 text-slate-100' : 'border-slate-200 text-slate-800 shadow-sm'}`}
              >
                <option>OSRM (Open Source)</option>
                <option>Google Maps API</option>
                <option>Mapbox Directions</option>
                <option>GraphHopper</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className={`text-sm font-bold uppercase tracking-wider ${highContrast ? 'text-slate-300' : 'text-slate-700'}`}>Map Style</label>
              <select 
                value={mapTiles}
                onChange={(e) => setMapTiles(e.target.value)}
                className={`w-full bg-slate-50 border rounded-xl px-5 py-4 outline-none focus:ring-3 focus:ring-indigo-500/20 transition-all appearance-none font-semibold ${highContrast ? 'bg-slate-800/50 border-slate-600 text-slate-100' : 'border-slate-200 text-slate-800 shadow-sm'}`}
              >
                <option>CartoDB Voyager (Default)</option>
                <option>CartoDB Dark Matter</option>
                <option>OpenStreetMap Classic</option>
                <option>Satellite Hybrid</option>
              </select>
            </div>

          </div>
        </div>

        {/* Section 3: Theme Toggle */}
        <div className="pt-8 border-t ${highContrast ? 'border-slate-700' : 'border-slate-100'}">
          <h2 className={`text-xl font-bold mb-8 flex items-center tracking-tight ${highContrast ? 'text-slate-100' : 'text-slate-800'}`}>
            <Server className="w-6 h-6 mr-4 text-indigo-500" />
            Appearance
          </h2>
          
          <div className="flex items-center justify-between p-6 border ${highContrast ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-white shadow-sm'} rounded-2xl hover:border-indigo-400 transition-all">
            <div>
              <h4 className={`font-bold ${highContrast ? 'text-slate-100' : 'text-slate-700'}`}>High Contrast Mode</h4>
              <p className={`text-sm mt-2 ${highContrast ? 'text-slate-300' : 'text-slate-500'}`}>Enhanced accessibility for low vision</p>
            </div>
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`w-16 h-9 rounded-full transition-all relative overflow-hidden shadow-md ${highContrast ? 'bg-emerald-500 ring-2 ring-emerald-400/50' : 'bg-slate-200 ring-slate-300'}`}
            >
              <span className={`w-7 h-7 bg-white rounded-full shadow-lg absolute top-1 transition-all duration-200 ease-in-out ${highContrast ? 'translate-x-8' : 'translate-x-1'}`}></span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-10 py-4 rounded-2xl font-bold shadow-lg transition-all transform ${isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-600/50 hover:-translate-y-1'} ${highContrast ? 'text-white shadow-emerald-500/30 ring-2 ring-emerald-400/50' : 'text-white shadow-indigo-600/30'}`}
          >
            {isSaving ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3 inline-block"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2 inline" />
                Save All Changes
              </>
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}
