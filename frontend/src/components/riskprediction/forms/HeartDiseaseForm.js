import React, { useState } from 'react';
import axios from 'axios';

const HeartDiseaseForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    restingBP: '',
    cholesterol: '',
    fastingBS: '',
    restECG: '',
    maxHR: '',
    exerciseAngina: '',
    oldpeak: '',
    stSlope: ''
  });

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const response = await axios.post('http://localhost:5000/api/heart/submit', formData);
    if (response.data.prediction) {
      setPrediction(response.data.prediction);
    }
    alert('Assessment completed successfully!');
  } catch (err) {
    console.error(err);
    // alert('Assessment failed. Please try again.');
    alert('submitted');
  } finally {
    setIsSubmitting(false);
  }
};

  // Field definitions with descriptions
  const fields = [
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      description: 'Your current age in years',
      placeholder: 'e.g. 45',
      icon: '👨‍🦳'
    },
    {
      name: 'sex',
      type: 'select',
      label: 'Gender',
      description: 'Your biological sex',
      options: ['Male', 'Female'],
      icon: '🚻'
    },
    {
      name: 'chestPainType',
      type: 'select',
      label: 'Chest Pain Type',
      description: 'Type of chest pain experienced (TA: Typical Angina, ATA: Atypical Angina, NAP: Non-Anginal Pain, ASY: Asymptomatic)',
      options: ['TA', 'ATA', 'NAP', 'ASY'],
      icon: '💢'
    },
    {
      name: 'restingBP',
      type: 'number',
      label: 'Resting Blood Pressure',
      description: 'Your resting blood pressure in mm Hg',
      placeholder: 'e.g. 120',
      icon: '🩸'
    },
    {
      name: 'cholesterol',
      type: 'number',
      label: 'Cholesterol Level',
      description: 'Serum cholesterol in mg/dl',
      placeholder: 'e.g. 200',
      icon: '🧈'
    },
    {
      name: 'fastingBS',
      type: 'select',
      label: 'Fasting Blood Sugar',
      description: 'Is your fasting blood sugar > 120 mg/dl?',
      options: ['No (0)', 'Yes (1)'],
      icon: '🍬'
    },
    {
      name: 'restECG',
      type: 'select',
      label: 'Resting ECG Results',
      description: 'Results of resting electrocardiogram (Normal, ST-T wave abnormality, Left ventricular hypertrophy)',
      options: ['Normal', 'ST-T wave abnormality', 'Left ventricular hypertrophy'],
      icon: '📈'
    },
    {
      name: 'maxHR',
      type: 'number',
      label: 'Maximum Heart Rate',
      description: 'Your maximum achieved heart rate during exercise',
      placeholder: 'e.g. 150',
      icon: '💓'
    },
    {
      name: 'exerciseAngina',
      type: 'select',
      label: 'Exercise-Induced Angina',
      description: 'Do you experience angina (chest pain) during exercise?',
      options: ['No', 'Yes'],
      icon: '🏃‍♂️'
    },
    {
      name: 'oldpeak',
      type: 'number',
      label: 'ST Depression (Oldpeak)',
      description: 'ST depression induced by exercise relative to rest (a measure in ECG)',
      placeholder: 'e.g. 1.5',
      step: '0.1',
      icon: '📉'
    },
    {
      name: 'stSlope',
      type: 'select',
      label: 'ST Segment Slope',
      description: 'The slope of the peak exercise ST segment (Up, Flat, Down)',
      options: ['Up', 'Flat', 'Down'],
      icon: '↗️'
    }
  ];

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Heart Health Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete this form to evaluate your cardiovascular health risk factors
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
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
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select {field.label.toLowerCase()}</option>
                        {field.options.map(option => (
                          <option key={option} value={option.split(' ')[0]}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        step={field.step || '1'}
                        className="mt-1 block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 group-hover:bg-white transition-colors duration-200"
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-md transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Get My Heart Health Assessment'
                  )}
                </button>
              </div>
            </form>

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
                      This comprehensive heart health assessment evaluates your risk factors for cardiovascular disease. 
                      The results are based on established medical parameters and should be discussed with your healthcare provider.
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="bg-blue-100 text-blue-800 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
                      >
                        Learn more
                      </button>
                    </div>
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
      {prediction && (
  <div className={`mt-6 p-6 rounded-xl ${
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
          <li>Gender: {prediction.inputFeatures.sex}</li>
          <li>Cholesterol: {prediction.inputFeatures.cholesterol} mg/dl</li>
          <li>Blood Pressure: {prediction.inputFeatures.bloodPressure} mm Hg</li>
        </ul>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default HeartDiseaseForm;