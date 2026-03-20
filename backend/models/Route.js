const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true }, // e.g., "Tambaram to Sairam College"
  source: { type: String, required: true },
  destination: { type: String, required: true },
  areasCovered: [{ type: String }],
  pathCoordinates: [{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }],
  stops: [{
    stopName: { type: String, required: true },
    eta: { type: String }, // e.g., "08:15 AM"
    lat: { type: Number },
    lng: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
