const express = require('express');
const router = express.Router();
const HypertensionForm = require('../models/HypertensionForm');

// @desc    Submit hypertension form
router.post('/', async (req, res) => {
  try {
    const newForm = new HypertensionForm(req.body);
    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while submitting form' });
  }
});

module.exports=router;