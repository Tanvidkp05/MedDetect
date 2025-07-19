import React from 'react';
import Navbar from '../../layout/Navbar';

const HeartDiseaseForm = () => {
  return (
    <>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Heart Disease Risk Prediction Form</h1>
        <p className="text-gray-600 mt-4">This will contain form elements for assessment.</p>
      </div>
    </>
  );
};

export default HeartDiseaseForm;
