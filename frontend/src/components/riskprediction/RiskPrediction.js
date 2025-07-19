import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const RiskPrediction = () => {
  const navigate = useNavigate();

  const riskOptions = [
    { 
      id: 1, 
      title: "Heart Disease", 
      icon: "❤️", 
      path: "heart-disease",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      borderColor: "border-red-200",
      textColor: "text-red-600"
    },
    { 
      id: 2, 
      title: "PCOS", 
      icon: "🌸", 
      path: "pcos",
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      borderColor: "border-pink-200",
      textColor: "text-pink-600"
    },
    { 
      id: 3, 
      title: "Diabetes", 
      icon: "🩸", 
      path: "diabetes",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-600"
    },
    { 
      id: 4, 
      title: "Hypertension", 
      icon: "💓", 
      path: "hypertension",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Health Risk Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a health condition to assess your risk and receive personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskOptions.map(option => (
            <div
              key={option.id}
              onClick={() => navigate(`/predict/${option.path}`)}
              className={`${option.bgColor} rounded-2xl p-8 text-center border ${option.borderColor} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
            >
              <div className={`text-5xl mb-6 transition-transform duration-300 hover:scale-110 ${option.textColor}`}>
                {option.icon}
              </div>
              <h3 className={`text-2xl font-semibold mb-3 ${option.textColor}`}>
                {option.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Get personalized risk assessment and health suggestions
              </p>
              <div className="mt-6">
                <button className={`px-4 py-2 rounded-lg ${option.textColor} bg-white border ${option.borderColor} hover:bg-opacity-90 transition-colors`}>
                  Assess Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                <span className="text-4xl">📊</span>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                How It Works
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Select a health condition to assess</li>
                <li>Complete the simple questionnaire</li>
                <li>Receive your personalized risk assessment</li>
                <li>Get actionable health recommendations</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPrediction;