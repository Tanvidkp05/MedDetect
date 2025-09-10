import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../layout/Navbar';

const HypertensionForm = () => {
  const initialState = {
    male: '',
    age: '',
    currentSmoker: '',
    cigsPerDay: '',
    BPMeds: '',
    diabetes: '',
    totChol: '',
    sysBP: '',
    diaBP: '',
    BMI: '',
    heartRate: '',
    glucose: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^[0-9]*\.?[0-9]$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/hypertension', {
        ...formData,
        age: Number(formData.age),
        cigsPerDay: Number(formData.cigsPerDay || 0),
        totChol: Number(formData.totChol),
        sysBP: Number(formData.sysBP),
        diaBP: Number(formData.diaBP),
        BMI: Number(formData.BMI),
        heartRate: Number(formData.heartRate),
        glucose: Number(formData.glucose)
      });
      
      if (response.data) {
        const backendData = response.data;
        const mappedResult = {
          prediction: backendData.prediction === 1 ? "High Risk" : "Low Risk",
          probability: backendData.risk_percentage + "%",
          confidence: (backendData.prediction === 1 
            ? backendData.risk_percentage 
            : 100 - backendData.risk_percentage) + "%",
          inputFeatures: backendData.input
        };
        setPrediction(mappedResult);
      }
      alert('Successfully submitted!'); // success alert stays here
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please try again.'); // Optional error alert
    } finally {
      setLoading(false);
    }
  };

  // Field configurations
  const fields = [
    {
      name: 'male',
      type: 'select',
      label: 'Gender',
      description: 'Biological sex (Male/Female)',
      options: [
        { value: '', label: 'Select gender' },
        { value: '1', label: 'Male' },
        { value: '0', label: 'Female' }
      ],
      icon: '🚻'
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age (years)',
      description: 'Age in years (18-120)',
      placeholder: '18-120',
      icon: '👨‍🦳'
    },
    {
      name: 'currentSmoker',
      type: 'select',
      label: 'Current Smoker',
      description: 'Do you currently smoke tobacco?',
      options: [
        { value: '', label: 'Select option' },
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ],
      icon: '🚬'
    },
    {
      name: 'cigsPerDay',
      type: 'number',
      label: 'Cigarettes/Day',
      description: 'Number of cigarettes smoked per day (0-100)',
      placeholder: '0-100',
      icon: '🚬',
      condition: formData.currentSmoker === '1'
    },
    {
      name: 'BPMeds',
      type: 'select',
      label: 'BP Medication',
      description: 'Are you on blood pressure medication?',
      options: [
        { value: '', label: 'Select option' },
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ],
      icon: '💊'
    },
    {
      name: 'diabetes',
      type: 'select',
      label: 'Diabetes',
      description: 'Do you have diabetes?',
      options: [
        { value: '', label: 'Select option' },
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ],
      icon: '🩸'
    },
    {
      name: 'totChol',
      type: 'number',
      label: 'Total Cholesterol',
      description: 'Total cholesterol in mg/dL (100-600)',
      placeholder: '100-600',
      icon: '🧈'
    },
    {
      name: 'sysBP',
      type: 'number',
      label: 'Systolic BP',
      description: 'Systolic blood pressure in mmHg (50-250)',
      placeholder: '50-250',
      icon: '🩺'
    },
    {
      name: 'diaBP',
      type: 'number',
      label: 'Diastolic BP',
      description: 'Diastolic blood pressure in mmHg (30-150)',
      placeholder: '30-150',
      icon: '🩺'
    },
    {
      name: 'BMI',
      type: 'number',
      label: 'Body Mass Index',
      description: 'Weight-to-height ratio (15-50)',
      placeholder: '15-50',
      icon: '⚖'
    },
    {
      name: 'heartRate',
      type: 'number',
      label: 'Heart Rate',
      description: 'Resting heart rate in bpm (40-200)',
      placeholder: '40-200',
      icon: '💓'
    },
    {
      name: 'glucose',
      type: 'number',
      label: 'Glucose Level',
      description: 'Blood glucose level in mg/dL (50-300)',
      placeholder: '50-300',
      icon: '🍬'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br mt-12 from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Hypertension Risk Assessment
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete this form to evaluate your hypertension risk factors
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
            <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => (
                  (!field.condition || field.condition) && (
                    <div key={field.name} className="relative group">
                      <div className="flex items-center mb-1">
                        <span className="text-2xl mr-3" aria-hidden="true">{field.icon}</span>
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700">
                          {field.label}
                        </label>
                        <button 
                          type="button" 
                          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                          onMouseEnter={() => setActiveTooltip(field.name)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() => setActiveTooltip(activeTooltip === field.name ? null : field.name)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>

                      {activeTooltip === field.name && (
                        <div className="absolute z-10 w-full p-3 mt-1 bg-blue-100 text-blue-900 text-sm rounded-lg shadow-lg border border-blue-200">
                          {field.description}
                        </div>
                      )}

                      {field.type === 'select' ? (
                        <div className="relative">
                          <select
                            id={field.name}
                            name={field.name}
                            className="mt-1 block w-full pl-12 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-gray-50 group-hover:bg-white transition-colors duration-200"
                            value={formData[field.name]}
                            onChange={handleSelectChange}
                            required
                          >
                            {field.options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            id={field.name}
                            type="number"
                            name={field.name}
                            placeholder={field.placeholder}
                            className="mt-1 block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 group-hover:bg-white transition-colors duration-200"
                            value={formData[field.name]}
                            onChange={handleNumericChange}
                            required
                          />
                        </div>
                      )}
                    </div>
                  )
                ))}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                      loading 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-md transform hover:-translate-y-0.5'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Get My Hypertension Risk Assessment'
                    )}
                  </button>
                </div>
              </form>

              {prediction && (
                <div className={`mt-8 p-6 rounded-xl ${
                  prediction.prediction === 'High Risk' 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <h3 className="text-xl font-bold mb-3">
                    Assessment Result: 
                    <span className={prediction.prediction === 'High Risk' 
                      ? 'text-red-600 ml-2' 
                      : 'text-green-600 ml-2'}>
                      {prediction.prediction}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Details:</h4>
                      <p>Probability: {prediction.probability}</p>
                      <p>Confidence: {prediction.confidence}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Key Factors:</h4>
                      <ul className="list-disc pl-5">
                        <li>Age: {prediction.inputFeatures.age}</li>
                        <li>Blood Pressure: {prediction.inputFeatures.sysBP}/{prediction.inputFeatures.diaBP} mmHg</li>
                        <li>Cholesterol: {prediction.inputFeatures.totChol} mg/dL</li>
                        <li>BMI: {prediction.inputFeatures.BMI}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-blue-800">About This Assessment</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        This hypertension risk assessment evaluates your risk factors for high blood pressure.
                        The results are based on established medical parameters and should be discussed with your healthcare provider.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your data is secure and will never be shared without your consent.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HypertensionForm;
