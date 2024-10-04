const express = require('express');
const router = express.Router();
const EmployeeNominationdetails = require('../models/EmployeeNominationdetails');

// GET all nomination details
router.get('/', async (req, res) => {
  const nominationDetails = await EmployeeNominationdetails.find();
  res.json(nominationDetails);
});

// POST new nomination detail
router.post('/', async (req, res) => {
  const newNominationDetail = new EmployeeNominationdetails(req.body);
  await newNominationDetail.save();
  res.json(newNominationDetail);
});

// DELETE nomination detail
router.delete('/:id', async (req, res) => {
  const nominationDetail = await EmployeeNominationdetails.findByIdAndDelete(req.params.id);
  res.json({ message: 'Nomination detail removed', nominationDetail });
});


