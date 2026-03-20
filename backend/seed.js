const mongoose = require('mongoose');
const Bus = require('./models/Bus');
const Route = require('./models/Route');

const seedDatabase = async () => {
  // Clear existing data
  await Bus.deleteMany({});
  await Route.deleteMany({});

  // 1. Create Route
  const route1 = new Route({
    routeName: 'Tambaram to Sairam College (Route 12)',
    source: 'Tambaram',
    destination: 'Sairam Engineering College',
    areasCovered: ['Tambaram', 'Perungalathur', 'Vandalur', 'Mudichur', 'Sairam Engineering College'],
    pathCoordinates: [
      { lat: 12.9249, lng: 80.1100 }, // Tambaram
      { lat: 12.9048, lng: 80.0890 }, // Perungalathur
      { lat: 12.8913, lng: 80.0805 }, // Vandalur
      { lat: 12.9102, lng: 80.0543 }, // Mudichur
      { lat: 12.9601, lng: 80.0558 }  // Sairam College
    ],
    stops: [
      { stopName: 'Tambaram Bus Stand', eta: '07:30 AM', lat: 12.9249, lng: 80.1100 },
      { stopName: 'Perungalathur', eta: '07:45 AM', lat: 12.9048, lng: 80.0890 },
      { stopName: 'Vandalur Zoo', eta: '07:55 AM', lat: 12.8913, lng: 80.0805 },
      { stopName: 'Mudichur Junction', eta: '08:05 AM', lat: 12.9102, lng: 80.0543 },
      { stopName: 'Sairam College', eta: '08:20 AM', lat: 12.9601, lng: 80.0558 }
    ]
  });

  const savedRoute1 = await route1.save();

  // 2. Create Bus
  const bus1 = new Bus({
    busNumber: 'TN-01-AB-1234',
    driverName: 'Ramesh',
    driverContact: '+91 9876543210',
    capacity: 50,
    currentLocation: { lat: 12.9048, lng: 80.0890 }, // Currently near Perungalathur
    speed: 40,
    parkingLocation: 'Bay A1',
    routeId: savedRoute1._id
  });

  const bus2 = new Bus({
    busNumber: 'TN-22-CD-5678',
    driverName: 'Suresh',
    driverContact: '+91 8765432109',
    capacity: 60,
    currentLocation: { lat: 12.9601, lng: 80.0558 }, // Parked at college
    speed: 0,
    parkingLocation: 'Bay B3',
    routeId: savedRoute1._id
  });

  await bus1.save();
  await bus2.save();

  console.log('Mock Data Seeded');
};

module.exports = seedDatabase;
