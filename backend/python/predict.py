import pandas as pd
import joblib
import json
import sys
import os

def map_frontend_data(data):
    """Map frontend form data to model format"""
    mapped_data = {}

    # Direct mappings
    mapped_data['age'] = int(data.get('age', 0))
    mapped_data['trestbps'] = int(data.get('restingBP', 0))
    mapped_data['chol'] = int(data.get('cholesterol', 0))
    mapped_data['thalch'] = int(data.get('maxHR', 0))
    mapped_data['oldpeak'] = float(data.get('oldpeak', 0))

    # Sex mapping
    sex_mapping = {'Male': 1, 'Female': 0}
    mapped_data['sex'] = sex_mapping.get(data.get('sex', 'Male'), 1)

    # Chest pain type mapping
    cp_frontend_mapping = {
        'TA': 0,   # typical angina
        'ATA': 1,  # atypical angina
        'NAP': 2,  # non-anginal
        'ASY': 3   # asymptomatic
    }
    mapped_data['cp'] = cp_frontend_mapping.get(data.get('chestPainType', 'ASY'), 3)

    # Fasting blood sugar mapping
    fbs_mapping = {'No (0)': 0, 'Yes (1)': 1}
    mapped_data['fbs'] = fbs_mapping.get(data.get('fastingBS', 'No (0)'), 0)

    # Resting ECG mapping
    restecg_mapping = {
        'Normal': 0,
        'ST-T wave abnormality': 1,
        'Left ventricular hypertrophy': 2
    }
    mapped_data['restecg'] = restecg_mapping.get(data.get('restECG', 'Normal'), 0)

    # Exercise induced angina mapping
    exang_mapping = {'No': 0, 'Yes': 1}
    mapped_data['exang'] = exang_mapping.get(data.get('exerciseAngina', 'No'), 0)

    # ST slope mapping
    slope_mapping = {
        'Up': 0,     # upsloping
        'Flat': 1,   # flat
        'Down': 2    # downsloping
    }
    mapped_data['slope'] = slope_mapping.get(data.get('stSlope', 'Up'), 0)

    # Default values for missing fields
    mapped_data['ca'] = 0
    mapped_data['thal'] = 1

    return mapped_data


def get_recommendation(prediction, confidence):
    """Return recommendation string"""
    if prediction == 1:
        if confidence > 80:
            return "High risk detected. Please consult a cardiologist immediately."
        elif confidence > 60:
            return "Moderate to high risk. Please schedule a check-up with your doctor."
        else:
            return "Some risk factors detected. Consider lifestyle improvements and regular check-ups."
    else:
        return "Low risk. Maintain a healthy lifestyle."


def predict_heart_disease(input_data):
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))

        model_path = os.path.join(script_dir, 'heart_disease_model.pkl')
        feature_names_path = os.path.join(script_dir, 'feature_names.pkl')

        if not os.path.exists(model_path) or not os.path.exists(feature_names_path):
            return {"error": "Model files missing. Train the model first.", "success": False}

        model = joblib.load(model_path)
        feature_names = joblib.load(feature_names_path)

        mapped_data = map_frontend_data(input_data)

        feature_vector = [mapped_data.get(f, 0) for f in feature_names]
        X = pd.DataFrame([feature_vector], columns=feature_names)

        prediction = model.predict(X)[0]
        prediction_proba = model.predict_proba(X)[0]

        confidence_no = prediction_proba[0] * 100
        confidence_yes = prediction_proba[1] * 100

        risk_level = "Low"
        if confidence_yes > 70:
            risk_level = "High"
        elif confidence_yes > 40:
            risk_level = "Medium"

        return {
            "prediction": int(prediction),
            "risk_level": risk_level,
            "confidence_no_disease": round(confidence_no, 2),
            "confidence_disease": round(confidence_yes, 2),
            "recommendation": get_recommendation(prediction, confidence_yes),
            "success": True
        }
    except Exception as e:
        return {"error": str(e), "success": False}


if __name__ == "__main__":
    try:
        raw_input = sys.stdin.read().strip()
        input_data = json.loads(raw_input) if raw_input else {}

        result = predict_heart_disease(input_data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e), "success": False}))
