import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/home';
import Navbar from './components/layout/Navbar';
import RiskPrediction from './components/riskprediction/RiskPrediction';
import HeartDiseaseForm from './components/riskprediction/forms/HeartDiseaseForm';
import HypertensionForm from './components/riskprediction/forms/HypertensionForm';
import DiabetesForm from './components/riskprediction/forms/DiabetesForm';
import PCOSForm from './components/riskprediction/forms/PCOSForm';
import ValidatorForm from './components/prescription-validation/ValidatorForm';



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

// Risk form pages
const HeartDiseaseFormPage = () => (
  <>
    <Navbar />
    <HeartDiseaseForm />
  </>
);

const DiabetesFormPage = () => (
  <>
    <Navbar />
    <DiabetesForm />
  </>
);

const PCOSFormPage = () => (
  <>
    <Navbar />
    <PCOSForm />
  </>
);


const HypertensionFormPage = () => (
  <>
    <Navbar />
    <HypertensionForm />
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

          {/* Risk Form Routes */}
          <Route path="/heart-disease" element={<HeartDiseaseFormPage />} />
          <Route path="/diabetes" element={<DiabetesFormPage />} />
          <Route path="/pcos" element={<PCOSFormPage />} />

          <Route path="/test-pcos" element={<PCOSForm />} />


          <Route path="/predict/hypertension" element={<HypertensionFormPage />} />

          <Route path="/prescription" element={<PrescriptionValidation />} />
          <Route path="/prescription-validation" element={<ValidatorForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
