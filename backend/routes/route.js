const express = require('express');
const router = express.Router();
const { mockRoutes } = require('../mockData');

router.get('/', (req, res) => {
  res.json(mockRoutes);
});

router.get('/:id', (req, res) => {
  const route = mockRoutes.find(r => r._id === req.params.id);
  if(!route) return res.status(404).json({ message: 'Route not found' });
  res.json(route);
});

module.exports = router;
