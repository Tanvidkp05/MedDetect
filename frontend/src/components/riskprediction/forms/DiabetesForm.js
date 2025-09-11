import React, { useState } from 'react';
import axios from 'axios';

const DiabetesForm = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    age: ''
  });

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState(null); // store backend prediction

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsedData = {
      Pregnancies: parseInt(formData.pregnancies),
      Glucose: parseFloat(formData.glucose),
      BloodPressure: parseFloat(formData.bloodPressure),
      SkinThickness: parseFloat(formData.skinThickness),
      Insulin: parseFloat(formData.insulin),
      BMI: parseFloat(formData.bmi),
      DiabetesPedigreeFunction: parseFloat(formData.diabetesPedigree),
      Age: parseInt(formData.age)
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/patient/submit',
        parsedData
      );
      if (data.prediction) {
        setPrediction(data.prediction); // update state with prediction
        alert(`Your diabetes risk is: ${data.prediction}`);
      }
    } catch (err) {
      console.error(err);
      alert('Assessment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'pregnancies', label: 'Pregnancies', description: 'Number of times pregnant (0 if male)', icon: '🤰', min: 0, max: 20 },
    { name: 'glucose', label: 'Glucose Level', description: 'Plasma glucose concentration (mg/dL)', icon: '🩸', min: 0, max: 300 },
    { name: 'bloodPressure', label: 'Blood Pressure', description: 'Diastolic blood pressure (mm Hg)', icon: '💓', min: 0, max: 150 },
    { name: 'skinThickness', label: 'Skin Thickness', description: 'Triceps skin fold thickness (mm)', icon: '👋', min: 0, max: 100 },
    { name: 'insulin', label: 'Insulin Level', description: '2-Hour serum insulin (mu U/ml)', icon: '💉', min: 0, max: 1000 },
    { name: 'bmi', label: 'Body Mass Index', description: 'Weight in kg/(height in m)^2', icon: '⚖️', min: 0, max: 70, step: 0.1 },
    { name: 'diabetesPedigree', label: 'Diabetes Pedigree', description: 'Diabetes family history function', icon: '👨‍👩‍👧‍👦', min: 0, max: 2, step: 0.001 },
    { name: 'age', label: 'Age', description: 'Age in years', icon: '👵', min: 0, max: 120 }
  ];

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
            Diabetes Risk Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete this form to evaluate your diabetes risk factors
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-green-500 to-blue-600"></div>
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
                      className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
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
                    <div className="absolute z-10 w-full p-3 mt-1 bg-green-100 text-green-900 text-sm rounded-lg shadow-lg border border-green-200">
                      {field.description}
                    </div>
                  )}

                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`e.g. ${field.placeholder || ''}`}
                    min={field.min}
                    max={field.max}
                    step={field.step || '1'}
                    required
                    className="mt-1 block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-50 group-hover:bg-white transition-colors duration-200"
                  />
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white focus:outline-none transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gradient-to-r from-green-400 to-blue-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-md transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Get My Diabetes Risk Assessment'
                  )}
                </button>
              </div>
            </form>

            {prediction !== null && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center text-lg font-medium">
                Your diabetes risk is: {prediction}
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

export default DiabetesForm;
