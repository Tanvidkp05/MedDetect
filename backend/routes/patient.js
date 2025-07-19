const express = require('express');
const router = express.Router();
const Patient = require('../models/Diabetes');

router.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    const patient = new Patient(data);
    await patient.save();

    // const prediction = predictDiabetesRisk(data);
    res.json({ prediction });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error during prediction');
  }
});

module.exports = router;
