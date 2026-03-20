const express = require('express');
const router = express.Router();
const { mockBuses, mockRoutes } = require('../mockData');

router.get('/', (req, res) => {
  res.json(mockBuses);
});

router.get('/:id', (req, res) => {
  const bus = mockBuses.find(b => b._id === req.params.id);
  if (!bus) return res.status(404).json({ message: 'Bus not found' });
  res.json(bus);
});

router.get('/search/:query', (req, res) => {
  const searchQuery = req.params.query.toLowerCase();
  
  const matchedRoutes = mockRoutes.filter(r => 
    r.routeName.toLowerCase().includes(searchQuery) ||
    r.areasCovered.some(area => area.toLowerCase().includes(searchQuery))
  );
  
  const routeIds = matchedRoutes.map(r => r._id);

  const matchedBuses = mockBuses.filter(b => 
    b.busNumber.toLowerCase().includes(searchQuery) || 
    routeIds.includes(b.routeId._id)
  );
  
  res.json(matchedBuses);
});

module.exports = router;
