const express = require('express');
const router = express.Router();
const PCOSPatient = require('../models/PCOSPatient'); // Mongoose schema

// Submit PCOS form (store in DB)
router.post('/submit', async (req, res) => {
  try {
    const patientData = req.body;

    // Save to DB
    const patient = new PCOSPatient(patientData);
    await patient.save();

    res.json({ success: true, message: 'PCOS data stored successfully', data: patient });
  } catch (err) {
    console.error('Error saving PCOS data:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
