const locations = [
  // Chennai District
  { name: 'Anna Nagar', district: 'Chennai', lat: 13.0850, lng: 80.2100 },
  { name: 'Velachery', district: 'Chennai', lat: 12.9780, lng: 80.2206 },
  { name: 'T Nagar', district: 'Chennai', lat: 13.0405, lng: 80.2337 },
  { name: 'Mylapore', district: 'Chennai', lat: 13.0368, lng: 80.2676 },
  { name: 'Guindy', district: 'Chennai', lat: 13.0067, lng: 80.2206 },
  { name: 'Porur', district: 'Chennai', lat: 13.0382, lng: 80.1565 },
  { name: 'Adyar', district: 'Chennai', lat: 13.0012, lng: 80.2565 },
  { name: 'Koyambedu', district: 'Chennai', lat: 13.0694, lng: 80.1948 },
  // Chengalpattu District
  { name: 'Chengalpattu', district: 'Chengalpattu', lat: 12.6934, lng: 79.9756 },
  { name: 'Tambaram', district: 'Chengalpattu', lat: 12.9249, lng: 80.1100 },
  { name: 'Kelambakkam', district: 'Chengalpattu', lat: 12.7904, lng: 80.2166 },
  { name: 'Maraimalai Nagar', district: 'Chengalpattu', lat: 12.7937, lng: 80.0243 },
  { name: 'Mahabalipuram', district: 'Chengalpattu', lat: 12.6208, lng: 80.1945 },
  { name: 'Guduvancheri', district: 'Chengalpattu', lat: 12.8427, lng: 80.0601 },
  // Kancheepuram District
  { name: 'Kancheepuram', district: 'Kancheepuram', lat: 12.8342, lng: 79.7036 },
  { name: 'Sriperumbudur', district: 'Kancheepuram', lat: 12.9675, lng: 79.9486 },
  { name: 'Walajabad', district: 'Kancheepuram', lat: 12.7961, lng: 79.8050 },
  { name: 'Uthiramerur', district: 'Kancheepuram', lat: 12.6200, lng: 79.7616 },
  { name: 'Sunguvarchatram', district: 'Kancheepuram', lat: 12.9348, lng: 79.8824 },
  // Thiruvallur District
  { name: 'Thiruvallur', district: 'Thiruvallur', lat: 13.1437, lng: 79.9130 },
  { name: 'Avadi', district: 'Thiruvallur', lat: 13.1143, lng: 80.0948 },
  { name: 'Ambattur', district: 'Thiruvallur', lat: 13.1143, lng: 80.1548 },
  { name: 'Poonamallee', district: 'Thiruvallur', lat: 13.0469, lng: 80.0968 },
  { name: 'Tiruttani', district: 'Thiruvallur', lat: 13.1788, lng: 79.6200 },
  { name: 'Gummidipoondi', district: 'Thiruvallur', lat: 13.4072, lng: 80.1158 },
  { name: 'Minjur', district: 'Thiruvallur', lat: 13.2736, lng: 80.2647 }
];

const mockRoutes = [];
const mockBuses = [];

// Base Sairam College Coordinates - now ORIGIN
const SAIRAM_LAT = 12.9601;
const SAIRAM_LNG = 80.0558;

for (let i = 1; i <= 60; i++) {
  const loc = locations[i % locations.length];
  
  // Adding slight variance so multiple buses to same town look unique
  const endLat = loc.lat + (Math.random() * 0.02 - 0.01);
  const endLng = loc.lng + (Math.random() * 0.02 - 0.01);
  
  const midLat = (SAIRAM_LAT + endLat) / 2;
  const midLng = (SAIRAM_LNG + endLng) / 2;

  const route = {
    _id: `route_${i}`,
    routeName: `Sairam College to ${loc.name} (${loc.district})`,
    source: 'Sairam Engineering College',
    destination: loc.name,
    areasCovered: ['Sairam Engineering College', loc.district, loc.name],
    pathCoordinates: [
      { lat: SAIRAM_LAT, lng: SAIRAM_LNG },
      { lat: midLat, lng: midLng },
      { lat: endLat, lng: endLng }
    ],
    stops: [
      { stopName: 'Sairam College Campus', eta: '07:00 AM', lat: SAIRAM_LAT, lng: SAIRAM_LNG },
      { stopName: 'Midway Halt', eta: '07:45 AM', lat: midLat, lng: midLng },
      { stopName: `${loc.name} Junction`, eta: '08:20 AM', lat: endLat, lng: endLng }
    ]
  };
  mockRoutes.push(route);

  const speed = Math.floor(Math.random() * 40) + 20; // 20 to 60 km/h
  const isParked = i % 8 === 0;

  mockBuses.push({
    _id: `bus_${i}`,
    busNumber: `TN-${String((i % 80) + 11).padStart(2, '0')}-AB-${String(1000 + i).padStart(4, '0')}`,
    driverName: `Driver ${i}`,
    driverContact: `+91 ${String(9000000000 + i).slice(0, 10)}`,
    capacity: 50,
    currentLocation: isParked ? { lat: SAIRAM_LAT, lng: SAIRAM_LNG } : { lat: midLat, lng: midLng },
    speed: isParked ? 0 : speed,
    parkingLocation: `Bay ${String.fromCharCode(65 + (i % 8))}${i % 10 || 1}`,
    routeId: route
  });
}

module.exports = { mockRoutes, mockBuses };
