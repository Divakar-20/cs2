const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', msg: 'Sairam Bus Tracking API is running in mock mode' });
});

app.get('/api/seed', (req, res) => {
  res.json({ message: 'Mock data is active, no seeding required' });
});

const busRoutes = require('./routes/bus');
app.use('/api/buses', busRoutes);

const routeRoutes = require('./routes/route');
app.use('/api/routes', routeRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
