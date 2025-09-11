import React, { useState } from 'react';
import axios from 'axios';

const PCOSForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    menstrual: '',
    hirsutism: '',
    acne: '',
    familyHistory: '',
    insulinResistance: '',
    lifestyleScore: '',
    stressLevel: ''
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

    const parsedData = {
      Age: parseInt(formData.age),
      BMI: parseFloat(formData.bmi),
      MenstrualRegularity: formData.menstrual,
      Hirsutism: formData.hirsutism,
      AcneSeverity: formData.acne,
      FamilyHistory: formData.familyHistory,
      InsulinResistance: formData.insulinResistance,
      LifestyleScore: parseInt(formData.lifestyleScore),
      StressLevel: formData.stressLevel
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/pcos/submit',
        parsedData
      );
      if (data.prediction) {
        setPrediction(data.prediction);
        alert(`Your PCOS risk is: ${data.prediction}`);
      }
    } catch (err) {
      console.error(err);
      alert('Assessment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'age', label: 'Age', description: 'Age in years (15-49)', icon: '👩', min: 15, max: 49 },
    { name: 'bmi', label: 'BMI', description: 'Body Mass Index (kg/m²)', icon: '⚖️', min: 0, max: 70, step: 0.1 },
    { name: 'menstrual', label: 'Menstrual Regularity', description: 'Regular or Irregular cycles', icon: '🩸', options: ['Regular', 'Irregular'] },
    { name: 'hirsutism', label: 'Hirsutism', description: 'Excess hair growth', icon: '🧔', options: ['Yes', 'No'] },
    { name: 'acne', label: 'Acne Severity', description: 'None, Mild, Moderate, or Severe', icon: '🧴', options: ['None', 'Mild', 'Moderate', 'Severe'] },
    { name: 'familyHistory', label: 'Family History of PCOS', description: 'Does anyone in your family have PCOS?', icon: '👨‍👩‍👧‍👦', options: ['Yes', 'No'] },
    { name: 'insulinResistance', label: 'Insulin Resistance', description: 'Do you have insulin resistance?', icon: '💉', options: ['Yes', 'No'] },
    { name: 'lifestyleScore', label: 'Lifestyle Score', description: 'Score from 1 (poor) to 10 (excellent)', icon: '🏃', min: 1, max: 10 },
    { name: 'stressLevel', label: 'Stress Level', description: 'Low, Medium, or High', icon: '🧘', options: ['Low', 'Medium', 'High'] },
  ];

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            PCOS Risk Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete this form to evaluate your PCOS risk factors
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div key={field.name} className="relative group">
                  <div className="flex items-center mb-1">
                    <span className="text-2xl mr-3">{field.icon}</span>
                    <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700">
                      {field.label}
                    </label>
                    <button
                      type="button"
                      className="ml-2 text-purple-500 hover:text-purple-700 focus:outline-none"
                      onMouseEnter={() => setActiveTooltip(field.name)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onClick={() =>
                        setActiveTooltip(activeTooltip === field.name ? null : field.name)
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>

                  {activeTooltip === field.name && (
                    <div className="absolute z-10 w-full p-3 mt-1 bg-purple-100 text-purple-900 text-sm rounded-lg shadow-lg border border-purple-200">
                      {field.description}
                    </div>
                  )}

                  {field.options ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50 group-hover:bg-white transition-colors duration-200"
                    >
                      <option value="">Select</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={formData[field.name]}
                      onChange={handleChange}
                      min={field.min}
                      max={field.max}
                      step={field.step || '1'}
                      required
                      className="mt-1 block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-50 group-hover:bg-white transition-colors duration-200"
                    />
                  )}
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white focus:outline-none transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-md transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Get My PCOS Risk Assessment'}
                </button>
              </div>
            </form>

            {prediction !== null && (
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-center text-lg font-medium">
                Your PCOS risk is: {prediction}
              </div>
            )}

          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your data is secure and will never be shared without your consent.</p>
        </div>
      </div>
    </div>
  );
};

export default PCOSForm;
