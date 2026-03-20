import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Bell, Bus, MapPin, Phone, LogOut, LayoutDashboard, Navigation, Wifi, ArrowRight, User, Settings, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [buses, setBuses] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    fetchBuses('');
  }, []);

  // Handle outside clicks for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotif(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchBuses = async (query) => {
    try {
      const url = query 
        ? `http://localhost:5000/api/buses/search/${query}`
        : `http://localhost:5000/api/buses`;
      const res = await axios.get(url);
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchQuery(query);
    fetchBuses(query); // Real-time search processing
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden text-slate-800">
      {/* Sleek Dark Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20 transition-all duration-300">
        <div className="p-8 flex items-center space-x-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-2.5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Bus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Challo Sairam</h1>
            <p className="text-xs text-indigo-400 font-medium">Live Transit Control</p>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          <a href="#" className="flex items-center space-x-3 bg-indigo-600/10 text-indigo-400 p-3.5 rounded-xl font-semibold border border-indigo-500/20 shadow-sm transition-all hover:bg-indigo-600/20">
            <LayoutDashboard className="w-5 h-5" />
            <span>Command Center</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3.5 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all group">
            <Navigation className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            <span>Active Routes <span className="ml-auto bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-400 group-hover:bg-slate-700">{buses.length}</span></span>
          </a>
        </nav>
        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center space-x-3 w-full p-3.5 rounded-xl text-rose-400 font-medium hover:bg-rose-500/10 hover:text-rose-300 transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>End Session</span>
          </button>
        </div>
      </aside>

      {/* Main Glassmorphic Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-100">
        
        {/* Decorative Background Blob */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/50 bg-white/40 backdrop-blur-xl z-30 sticky top-0 shadow-sm">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Fleet Overview</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Monitoring active units across the grid</p>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <div 
                className="cursor-pointer group bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all border border-slate-100 relative"
                onClick={() => setShowNotif(!showNotif)}
              >
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                <span className="absolute top-2 right-2 flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-rose-500"></span>
                </span>
              </div>
              
              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 font-bold text-slate-800 flex justify-between items-center">
                    Notifications
                    <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">2 New</span>
                  </div>
                  <div className="p-2">
                    <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-start space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><CheckCircle className="w-4 h-4" /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Bus TN-12 arriving early</p>
                        <p className="text-xs text-slate-500">2 mins ago</p>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-start space-x-3">
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><MapPin className="w-4 h-4" /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Route 50 delayed by traffic</p>
                        <p className="text-xs text-slate-500">14 mins ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div 
                className="flex items-center space-x-3 cursor-pointer pl-4 border-l border-slate-300"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="text-right hidden sm:block hover:opacity-80 transition-opacity">
                  <p className="text-sm font-bold text-slate-800 leading-none">Divakar</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">System Admin</p>
                </div>
                <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-shadow">
                  AD
                </div>
              </div>
              
              {showProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="flex flex-col p-2 space-y-1">
                    <button onClick={() => navigate('/profile')} className="flex items-center w-full px-4 py-2.5 hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-700 transition">
                      <User className="w-4 h-4 mr-3 text-slate-400" /> My Profile
                    </button>
                    <button onClick={() => navigate('/settings')} className="flex items-center w-full px-4 py-2.5 hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-700 transition">
                      <Settings className="w-4 h-4 mr-3 text-slate-400" /> Settings
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button onClick={() => navigate('/login')} className="flex items-center w-full px-4 py-2.5 hover:bg-rose-50 rounded-xl text-sm font-bold text-rose-600 transition">
                      <LogOut className="w-4 h-4 mr-3 text-rose-500" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-10 z-10 custom-scrollbar relative">
          
          {/* Real-time Glass Search Bar */}
          <div className="bg-white/70 backdrop-blur-lg p-2 rounded-2xl shadow-sm mb-6 border border-white/60 flex items-center focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all max-w-3xl mx-auto">
            <div className="bg-indigo-50 p-3 rounded-xl ml-1">
              <Search className="w-6 h-6 text-indigo-600" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <input 
                type="text" 
                placeholder="Search precise routes, destination nodes, or TN registration marks..." 
                className="w-full py-4 px-5 outline-none text-slate-700 bg-transparent font-medium text-lg placeholder-slate-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {/* Parking Bay Visualization - SVG Image */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200/60 mb-10 mx-auto max-w-7xl">
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center">
                Parking Status <span className="ml-4 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold">Live Bay Occupancy</span>
              </h3>
            </div>

            <div className="lg:col-span-1 bg-gradient-to-b from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 shadow-inner">
                <h4 className="font-bold text-lg text-amber-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Your Route to Sairam
                </h4>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-bold text-slate-700">From:</span> 
                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-mono">{navigator.geolocation ? 'Loading GPS...' : 'Chennai (13.08,80.27)'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-slate-700">To:</span> 
                    <span className="ml-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">Sairam College<br/>12.9601° N, 80.0558° E</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border">
                    <span className="text-sm font-bold text-slate-700">ETA:</span>
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold shadow-md">25 min</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-1">15km remaining • Traffic: Normal</p>
                </div>
              </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: User Location to Sairam */}
              

              {/* Right: SVG Parking Bays */}
              <div className="lg:col-span-2">
                <h4 className="font-bold text-lg text-slate-800 mb-4">Bus Bays</h4>
                <div className="grid grid-cols-6 md:grid-cols-8 gap-4">
                  {buses.filter(bus => bus.speed === 0).slice(0,16).map((bus, idx) => (
                    <div key={bus._id} className="group relative" title={`Bay ${bus.parkingLocation}: ${bus.busNumber}`}>
                      <svg viewBox="0 0 120 80" className="w-20 h-16 shadow-lg transform group-hover:scale-110 transition-all duration-300 cursor-pointer" onClick={() => navigate(`/map/${bus._id}`)}>
                        <rect x="10" y="10" width="100" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3"/>
                        <rect x="15" y="20" width="90" height="35" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
                        <rect x="25" y="25" width="10" height="6" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
                        <rect x="42" y="25" width="10" height="6" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
                        <rect x="59" y="25" width="10" height="6" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
                        <rect x="76" y="25" width="10" height="6" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
                        <text x="60" y="46" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">{bus.busNumber.slice(-3)}</text>
                      </svg>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {bus.parkingLocation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Parked Bus List */}
            {buses.filter(bus => bus.speed === 0).length > 0 && (
              <div className="mt-8">
                <h4 className="font-bold text-lg text-slate-800 mb-6 flex items-center">
                  Parked Buses <span className="ml-auto text-sm text-slate-500">({buses.filter(b => b.speed === 0).length})</span>
                </h4>
                <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar -mr-6 pr-6">
                  {buses.filter(bus => bus.speed === 0).map(bus => (
                    <div key={bus._id} className="flex-shrink-0 w-64 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate(`/map/${bus._id}`)}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-bold">{bus.busNumber}</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          Bay {bus.parkingLocation}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-2 truncate" title={bus.routeId?.routeName}>{bus.routeId?.routeName}</p>
                      <div className="text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-indigo-600" />
                          </div>
                          <span>{bus.driverName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{bus.driverContact}</span>
                          <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                            Ready
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <Wifi className="w-5 h-5 mr-2 text-emerald-500" />
              Live Deployment Grid
            </h3>
            <span className="bg-slate-800 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
              {buses.length} Results
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {buses.length > 0 ? buses.map((bus, idx) => (
              <div 
                key={bus._id} 
                className="group bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-5 hover:border-indigo-400/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden relative"
                onClick={() => navigate(`/map/${bus._id}`)}
                style={{ animationFillMode: 'both', animation: `fadeIn 0.5s ease-out ${idx * 0.05}s` }}
              >
                {/* Parked vs Active Status line */}
                <div className={`absolute top-0 left-0 w-full h-1 ${bus.speed === 0 ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>

                <div className="flex justify-between items-start mb-5 mt-1">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg tracking-widest uppercase shadow-sm">
                      {bus.busNumber}
                    </span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${bus.speed === 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} flex items-center gap-1.5`}>
                     <span className={`w-1.5 h-1.5 rounded-full ${bus.speed === 0 ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                     {bus.speed === 0 ? 'Parked' : 'En Route'}
                  </div>
                </div>

                <h4 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors" title={bus.routeId?.routeName}>
                  {bus.routeId?.routeName || 'Unassigned Route Node'}
                </h4>
                
                <div className="flex items-center text-xs font-semibold text-slate-500 mb-6 bg-slate-100/50 w-fit px-2 py-1 rounded-md border border-slate-200">
                  <MapPin className="w-3 h-3 mr-1" />
                  Bay: <span className="text-indigo-600 ml-1 font-bold">{bus.parkingLocation}</span>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center mr-3 border border-indigo-100">
                      <Phone className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm leading-none mb-1">{bus.driverName}</p>
                      <p className="text-xs text-slate-500 font-medium">{bus.driverContact}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center text-slate-500 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-300">
                <Bus className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-bold text-slate-700">No vessels matched your criteria.</p>
                <p className="text-sm">Try broadening your search parameters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}
