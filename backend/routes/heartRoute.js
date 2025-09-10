const express = require('express');
const router = express.Router();
const HeartData = require('../models/HeartData');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');

// POST /heart/submit
router.post('/submit', async (req, res) => {
    try {
        console.log('🔍 Received heart disease form data:', req.body);

        const requiredFields = [
            'age', 'sex', 'chestPainType', 'restingBP', 'cholesterol',
            'fastingBS', 'restECG', 'maxHR', 'exerciseAngina', 'oldpeak', 'stSlope'
        ];
        const missing = requiredFields.filter(f => !req.body[f] || req.body[f] === '');

        if (missing.length > 0) {
            return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}`, success: false });
        }

        // Save to DB
        const entry = new HeartData(req.body);
        await entry.save();
        console.log('✅ Data saved to DB');

        // Get prediction
        const prediction = await getPrediction(req.body);
        console.log('✅ Prediction:', prediction);

        res.status(201).json({ message: 'Heart data saved', prediction, success: true });
    } catch (err) {
        console.error('❌ Error in heart route:', err);
        res.status(500).json({ error: err.message, success: false });
    }
});

async function getPrediction(formData) {
    return new Promise((resolve, reject) => {
        const pythonDir = path.resolve(__dirname, '..', 'python');
        const script = path.join(pythonDir, 'predict.py');

        if (!fs.existsSync(script)) {
            return reject(new Error(`Python script not found: ${script}`));
        }

        const options = {
            mode: 'json', // auto parse JSON
            pythonPath: process.env.PYTHON_PATH || 'python',
            scriptPath: pythonDir
        };

        const pyshell = new PythonShell('predict.py', options);

        pyshell.send(formData);

        pyshell.on('message', (msg) => resolve(msg));

        pyshell.end((err) => {
            if (err) {
                console.error('❌ Python error:', err);
                reject(new Error('Python execution failed: ' + err.message));
            }
        });
    });
}

module.exports = router;
