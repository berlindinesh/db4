const express = require('express');
const router = express.Router();
const EmployeeFamilyInfo = require('../models/EmployeeFamilyInfo');

// GET all family info
router.get('/', async (req, res) => {
  const familyInfo = await EmployeeFamilyInfo.find();
  res.json(familyInfo);
});

// POST new family info
router.post('/', async (req, res) => {
  const newFamilyInfo = new EmployeeFamilyInfo(req.body);
  await newFamilyInfo.save();
  res.json(newFamilyInfo);
});

// DELETE family info
router.delete('/:id', async (req, res) => {
  const familyInfo = await EmployeeFamilyInfo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Family member removed', familyInfo });
});

module.exports = router;
