import os
import sys
import json
import joblib
import numpy as np

def load_models(assets_path):
    try:
        model_path = os.path.join(assets_path, 'heart_disease_rf_model.pkl')
        scaler_path = os.path.join(assets_path, 'heart_disease_scaler.pkl')
        
        print(f"Loading model from: {model_path}")
        print(f"Loading scaler from: {scaler_path}")
        
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        return model, scaler
    except Exception as e:
        print(json.dumps({'error': f"Model loading failed: {str(e)}"}))
        sys.exit(1)

def prepare_input(data):
    try:
        return np.array([[
            int(data['age']),
            1 if data['sex'] == 'Male' else 0,
            {'TA': 0, 'ATA': 1, 'NAP': 2, 'ASY': 3}.get(data['chestPainType'], 0),
            int(data['restingBP']),
            int(data['cholesterol']),
            1 if data['fastingBS'] == 'Yes (1)' else 0,
            {'Normal': 0, 'ST-T wave abnormality': 1, 'Left ventricular hypertrophy': 2}.get(data['restECG'], 0),
            int(data['maxHR']),
            1 if data['exerciseAngina'] == 'Yes' else 0,
            float(data['oldpeak']),
            {'Up': 0, 'Flat': 1, 'Down': 2}.get(data['stSlope'], 0)
        ]])
    except Exception as e:
        print(json.dumps({'error': f"Input preparation failed: {str(e)}"}))
        sys.exit(1)

if __name__ == '__main__':
    try:
        # Get arguments from Node.js
        input_data = json.loads(sys.argv[1])
        assets_path = sys.argv[2]
        
        # Load models
        model, scaler = load_models(assets_path)
        
        # Prepare input and predict
        input_array = prepare_input(input_data)
        scaled_data = scaler.transform(input_array)
        prediction = model.predict(scaled_data)[0]
        probabilities = model.predict_proba(scaled_data)[0]
        
        # Return results
        print(json.dumps({
            'prediction': 'High Risk' if prediction == 1 else 'Low Risk',
            'probability': f"{probabilities[1] * 100:.2f}%",
            'confidence': 'High' if probabilities[1] > 0.7 else 'Medium' if probabilities[1] > 0.4 else 'Low',
            'inputFeatures': {
                'age': input_data['age'],
                'sex': input_data['sex'],
                'cholesterol': input_data['cholesterol'],
                'bloodPressure': input_data['restingBP'],
                'heartRate': input_data['maxHR']
            }
        }))
    except Exception as e:
        print(json.dumps({'error': f"Prediction failed: {str(e)}"}))
        sys.exit(1)