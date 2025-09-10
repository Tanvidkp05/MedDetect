const express = require('express');
const router = express.Router();
const HeartData = require('../models/HeartData');
const heartModel = require('../modelService');

router.post('/submit', async (req, res) => {
  try {
    // Save data to database
    const data = new HeartData(req.body);
    await data.save();
    
    // Get prediction from Python model
    // const prediction = await heartModel.predict(req.body);
    
    res.status(201).json({
      message: 'Heart data saved successfully',
      // prediction: prediction
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;