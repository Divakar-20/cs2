import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, MapPin, Gauge, Bus, Info } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapPage() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [exactRouteCoords, setExactRouteCoords] = useState([]);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/buses/${busId}`);
        const busData = res.data;
        setBus(busData);

        // Fetch Exact Route Polygon via OSRM Engine
        if (busData.routeId?.pathCoordinates?.length >= 2) {
            const startNode = busData.routeId.pathCoordinates[0];
            const endNode = busData.routeId.pathCoordinates[busData.routeId.pathCoordinates.length - 1];
            
            // OSRM expects coordinates in lng,lat format
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startNode.lng},${startNode.lat};${endNode.lng},${endNode.lat}?overview=full&geometries=geojson`;
            
            try {
                const routeRes = await axios.get(osrmUrl);
                if (routeRes.data.routes && routeRes.data.routes.length > 0) {
                    // Extract GeoJSON LineString coordinates and map back to lat,lng format for Leaflet
                    const pathGeom = routeRes.data.routes[0].geometry.coordinates;
                    const mappedCoords = pathGeom.map(coord => [coord[1], coord[0]]);
                    setExactRouteCoords(mappedCoords);
                }
            } catch (err) {
                console.error("OSRM Routing API Failed:", err);
            }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBusData();
  }, [busId]);

  if (!bus) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-pulse flex flex-col items-center">
          <Bus className="w-12 h-12 text-indigo-500 mb-4 animate-bounce" />
          <p className="text-white font-medium tracking-widest uppercase">Establishing Satellite Link...</p>
        </div>
      </div>
    );
  }

  // Backup straight-line coords if OSRM fails
  const backupCoords = bus.routeId?.pathCoordinates?.map(coord => [coord.lat, coord.lng]) || [];
  const mapCenter = backupCoords.length > 0 ? backupCoords[0] : [12.9601, 80.0558];
  
  // Decide which coordinates to paint: preferred OSRM Exact Path or backup
  const renderCoords = exactRouteCoords.length > 0 ? exactRouteCoords : backupCoords;

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden relative">
      
      {/* Absolute Map Layer filling 100% of the screen under the overlay */}
      <div className="absolute inset-0 z-0">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100vw' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {renderCoords.length > 0 && (
            <Polyline 
              positions={renderCoords} 
              pathOptions={{ color: '#4f46e5', weight: 6, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }} 
            />
          )}

          {bus.currentLocation && bus.currentLocation.lat && (
            <Marker position={[bus.currentLocation.lat, bus.currentLocation.lng]}>
              <Popup className="rounded-xl overflow-hidden shadow-2xl">
                <div className="p-1 text-center font-sans">
                  <span className="block px-2 py-1 bg-slate-900 text-white font-bold text-xs rounded mb-2">
                    {bus.busNumber}
                  </span>
                  <div className="text-indigo-600 font-bold text-lg mb-0">{bus.speed} km/h</div>
                  <div className="text-slate-500 text-xs">Current Velocity</div>
                </div>
              </Popup>
            </Marker>
          )}
          
          {bus.routeId?.stops?.map((stop, i) => (
            stop.lat && stop.lng ? (
              <Marker key={i} position={[stop.lat, stop.lng]}>
                <Popup className="font-sans font-bold text-slate-800">
                  {stop.stopName} <br/><span className="text-indigo-600 text-xs font-normal">ETA: {stop.eta}</span>
                </Popup>
              </Marker>
            ) : null
          ))}
        </MapContainer>
      </div>

      {/* Floating UI Elements Over Map */}
      <div className="relative z-10 w-full h-full pointer-events-none flex">
        
        {/* Left Sidebar Panel */}
        <aside className="w-[380px] bg-white/80 backdrop-blur-2xl border-r border-white/50 shadow-2xl flex flex-col h-full pointer-events-auto transition-all m-4 rounded-3xl overflow-hidden">
          
          {/* Panel Header */}
          <div className="p-8 pb-6 border-b border-slate-200/60 bg-white/50">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition mb-6 shadow-sm border border-slate-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-md tracking-widest uppercase shadow-md shadow-indigo-500/30">
                {bus.busNumber}
              </span>
              <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-700 font-bold text-[10px] uppercase rounded-md border border-emerald-200">
                Exact Path Enabled
              </span>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
              {bus.routeId?.routeName || 'Unassigned Route'}
            </h2>
            
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pilot Details</p>
                <p className="font-bold text-slate-800 text-sm">{bus.driverName} <span className="text-slate-400 font-medium ml-1">({bus.driverContact})</span></p>
              </div>
            </div>
          </div>

          {/* Stops Timeline */}
          <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-slate-50/30">
            <h3 className="font-black text-slate-800 mb-8 flex items-center tracking-wide">
              <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
              ARRIVAL SCHEDULE
            </h3>
            
            <div className="relative pl-6 space-y-10 border-l-2 border-indigo-200/60 ml-3">
              {bus.routeId?.stops?.map((stop, index) => (
                <div key={index} className="relative group">
                  <span className="absolute -left-[32px] flex items-center justify-center w-8 h-8 rounded-full bg-white border-[3px] border-indigo-500 shadow-lg group-hover:scale-110 transition-transform">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  </span>
                  <div className="pl-4">
                    <h4 className="font-bold text-slate-800 text-base">{stop.stopName}</h4>
                    <div className="inline-flex items-center mt-2 px-2.5 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      <span className="text-xs font-bold text-indigo-600">{stop.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Floating Widgets */}
        <div className="flex-1 p-6 flex flex-col items-end pointer-events-none">
          <div className="pointer-events-auto flex flex-col gap-4">
            
            <div className="bg-white/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border border-white/40 flex items-center space-x-5 min-w-[220px] transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-xl shadow-lg shadow-emerald-500/30">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Final Arrival</p>
                <p className="text-2xl font-black text-slate-800 font-mono tracking-tight">08:20 AM</p>
              </div>
            </div>
            
            <div className="bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border border-slate-800 flex items-center space-x-5 min-w-[220px] transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg shadow-blue-500/30">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Velocity</p>
                <p className="text-2xl font-black text-white font-mono tracking-tight">{bus.speed} <span className="text-sm font-medium text-slate-400">km/h</span></p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.5); }
      `}} />
    </div>
  );
}
