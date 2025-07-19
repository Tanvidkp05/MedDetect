require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Initialize app
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patient'); // ✅ Corrected the typo

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes); // ✅ Now mounted correctly

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
