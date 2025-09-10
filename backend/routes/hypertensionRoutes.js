const express = require('express');
const router = express.Router();
const HypertensionForm = require('../models/HypertensionForm');
const { spawn } = require('child_process');
const path = require('path');

router.post('/', async (req, res) => {
  try {
    const newForm = new HypertensionForm(req.body);
    await newForm.save();

    // Build absolute path to Python script
    const scriptPath = path.join(__dirname, '../python/Hypertension/predict1.py');

    // Use correct Python executable (py on Windows, python3 on Linux/Mac)
    const python = spawn('py', [scriptPath]);

    let dataToSend = '';
    let errorToSend = '';

    python.stdout.on('data', (data) => {
      dataToSend += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorToSend += data.toString();
    });

    python.on('close', (code) => {
      if (errorToSend) {
        console.error("Python stderr:", errorToSend);
        return res.status(500).json({ error: errorToSend });
      }

      if (!dataToSend) {
        return res.status(500).json({ error: "No output from Python script" });
      }

      try {
        const result = JSON.parse(dataToSend);
        if (result.error) {
          return res.status(400).json(result);
        }
        return res.status(200).json(result);
      } catch (err) {
        console.error("Invalid JSON from Python:", dataToSend);
        return res.status(500).json({ error: "Invalid JSON from Python script" });
      }
    });

    python.stdin.write(JSON.stringify(req.body));
    python.stdin.end();

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error while submitting form' });
  }
});

module.exports = router;