require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/authRoutes');
const heartRoute = require('./routes/heartRoute');
const hypertensionRoutes = require('./routes/hypertensionRoutes');
const diabetesRoutes = require('./routes/diabetesRoutes'); // ✅ fixed name
// If your file is PCOSRoutes.js
const pcosRoute = require('./routes/PCOSRoute'); 




const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/heart', heartRoute);
app.use('/api/hypertension', hypertensionRoutes);
app.use('/api/patient', diabetesRoutes); // ✅ corrected path
app.use('/api/pcos', pcosRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
