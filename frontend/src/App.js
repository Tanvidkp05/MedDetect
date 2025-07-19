import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/home';
import Navbar from './components/layout/Navbar';
import RiskPrediction from './components/riskprediction/RiskPrediction';


// Placeholder pages
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

// 🔽 Risk form pages (create these files under /components/riskprediction/forms/)
const HeartDiseaseForm = () => (
  <>
    <Navbar />
    <div className="p-4">Heart Disease Risk Prediction Form</div>
  </>
);

const DiabetesForm = () => (
  <>
    <Navbar />
    <div className="p-4">Diabetes Risk Prediction Form</div>
  </>
);

const PCOSForm = () => (
  <>
    <Navbar />
    <div className="p-4">PCOS Risk Prediction Form</div>
  </>
);

const HypertensionForm = () => (
  <>
    <Navbar />
    <div className="p-4">Hypertension Risk Prediction Form</div>
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
          
          {/* ✅ Risk Form Routes */}
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
