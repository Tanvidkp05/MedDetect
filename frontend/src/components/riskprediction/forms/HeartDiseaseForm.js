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
    const [showResults, setShowResults] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setPrediction(null);

        try {
            console.log('Submitting form data:', formData);
            const response = await axios.post('http://localhost:5000/api/heart/submit', formData);

            console.log('Response received:', response.data);

            if (response.data.prediction && response.data.prediction.success) {
                setPrediction(response.data.prediction);
                setShowResults(true);
            } else if (response.data.prediction && response.data.prediction.error) {
                alert(`Prediction Error: ${response.data.prediction.error}`);
            } else {
                alert('Assessment completed but prediction unavailable. Data saved successfully.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('Assessment failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getRiskColor = (riskLevel) => {
        switch (riskLevel) {
            case 'Low': return 'text-green-600 bg-green-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            case 'High': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const resetForm = () => {
        setFormData({
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
        setPrediction(null);
        setShowResults(false);
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

    if (showResults && prediction) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 mt-7">
                            <h1 className="text-3xl font-bold text-white flex items-center">
                                🫀 Heart Disease Risk Assessment Results
                            </h1>
                        </div>

                        <div className="p-8">
                            {/* Risk Level Display */}
                            <div className="text-center mb-8">
                                <div className={`inline-flex items-center px-6 py-3 rounded-full text-xl font-semibold ${getRiskColor(prediction.risk_level)}`}>
                                    Risk Level: {prediction.risk_level}
                                </div>
                            </div>

                            {/* Confidence Scores */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                    <h3 className="text-lg font-semibold text-green-800 mb-2">No Disease Confidence</h3>
                                    <div className="text-3xl font-bold text-green-600">{prediction.confidence_no_disease}%</div>
                                    <div className="w-full bg-green-200 rounded-full h-3 mt-2">
                                        <div 
                                            className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                                            style={{width: `${prediction.confidence_no_disease}%`}}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <h3 className="text-lg font-semibold text-red-800 mb-2">Disease Risk Confidence</h3>
                                    <div className="text-3xl font-bold text-red-600">{prediction.confidence_disease}%</div>
                                    <div className="w-full bg-red-200 rounded-full h-3 mt-2">
                                        <div 
                                            className="bg-red-500 h-3 rounded-full transition-all duration-1000" 
                                            style={{width: `${prediction.confidence_disease}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendation */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                                <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                                    💡 Recommendation
                                </h3>
                                <p className="text-blue-700 text-lg leading-relaxed">{prediction.recommendation}</p>
                            </div>

                            {/* Disclaimer */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                                <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
                                    ⚠️ Important Disclaimer
                                </h3>
                                <p className="text-yellow-700">
                                    This assessment is for informational purposes only and should not replace professional medical advice. 
                                    Please consult with your healthcare provider for proper diagnosis and treatment.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetForm}
                                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                                >
                                    📋 Take Another Assessment
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                                >
                                    🖨️ Print Results
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white flex items-center">
                            🫀 Heart Health Assessment
                        </h1>
                        <p className="text-blue-100 mt-2">
                            Complete this form to evaluate your cardiovascular health risk factors
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid gap-6 md:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name} className="relative">
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <span className="text-lg mr-2">{field.icon}</span>
                                        {field.label}
                                        <button
                                            type="button"
                                            className="ml-2 text-blue-500 hover:text-blue-700"
                                            onMouseEnter={() => setActiveTooltip(field.name)}
                                            onMouseLeave={() => setActiveTooltip(null)}
                                        >
                                            ℹ️
                                        </button>
                                    </label>

                                    {activeTooltip === field.name && (
                                        <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
                                            {field.description}
                                        </div>
                                    )}

                                    {field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option value="">Select {field.label.toLowerCase()}</option>
                                            {field.options.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            step={field.step}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center mx-auto"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Processing Assessment...
                                    </>
                                ) : (
                                    <>🔍 Analyze Heart Health</>
                                )}
                            </button>
                        </div>

                        {/* Information Section */}
                        <div className="mt-12 bg-gray-50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">About This Assessment</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                                <div>
                                    <p className="mb-3">
                                        This comprehensive heart health assessment evaluates your risk factors for cardiovascular disease. 
                                        The results are based on established medical parameters and machine learning analysis.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2">
                                        <span className="text-green-500 mr-2">🔒</span>
                                        <span>Your data is secure and encrypted</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="text-blue-500 mr-2">🤖</span>
                                        <span>AI-powered risk assessment</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Instant results and recommendations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeartDiseaseForm;