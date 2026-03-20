const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  driverContact: { type: String, required: true },
  capacity: { type: Number, default: 50 },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  speed: { type: Number, default: 0 },
  parkingLocation: { type: String },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
