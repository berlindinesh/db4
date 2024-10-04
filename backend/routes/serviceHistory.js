const express = require('express');
const router = express.Router();
const EmployeeServiceHistory = require('../models/EmployeeServiceHistory');

// GET all service history
router.get('/', async (req, res) => {
  const serviceHistory = await EmployeeServiceHistory.find();
  res.json(serviceHistory);
});

// POST new service history entry
router.post('/', async (req, res) => {
  const newServiceHistory = new EmployeeServiceHistory(req.body);
  await newServiceHistory.save();
  res.json(newServiceHistory);
});

// DELETE service history entry
router.delete('/:id', async (req, res) => {
  const serviceHistory = await EmployeeServiceHistory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service entry removed', serviceHistory });
});

module.exports = router;
