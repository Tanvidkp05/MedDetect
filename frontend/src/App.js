import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/home';
import Navbar from './components/layout/Navbar';
import RiskPrediction from './components/riskprediction/RiskPrediction';

// Risk Form Pages (ensure these are actual components)
import HeartDiseaseForm from './components/riskprediction/forms/HeartDiseaseForm';
import DiabetesForm from './components/riskprediction/forms/DiabetesForm';
import PCOSForm from './components/riskprediction/forms/PCOSForm';
import HypertensionForm from './components/riskprediction/forms/HypertensionForm'; // ✅ this should exist

const PrescriptionValidation = () => (
  <>
    <Navbar />
    <div className="p-4">Prescription Validation Page</div>
  </>
);

const Profile = () => (
  <>
    <Navbar />
    <div className="p-4">Profile Page</div>
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/risk-prediction" element={<RiskPrediction />} />

          {/* ✅ Actual working form components */}
          <Route path="/predict/heart-disease" element={<HeartDiseaseForm />} />
          <Route path="/predict/diabetes" element={<DiabetesForm />} />
          <Route path="/predict/pcos" element={<PCOSForm />} />
          <Route path="/predict/hypertension" element={<HypertensionForm />} />

          <Route path="/prescription" element={<PrescriptionValidation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
