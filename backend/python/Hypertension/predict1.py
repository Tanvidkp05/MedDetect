# backend/python/Hypertension/predict.py
import pickle
import sys
import json
import pandas as pd
import os

# Base directory of this script (always correct even if Node runs elsewhere)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model
with open(os.path.join(BASE_DIR, "model.pkl"), "rb") as f:
    model = pickle.load(f)

# Load features
with open(os.path.join(BASE_DIR, "features.pkl"), "rb") as f:
    features = pickle.load(f)

# Read input JSON
if sys.stdin.isatty():
    # Test mode: run script without input
    sample = {
        "male": 1,
        "age": 45,
        "currentSmoker": 0,
        "cigsPerDay": 0,
        "BPMeds": 0,
        "diabetes": 1,
        "totChol": 210,
        "sysBP": 140,
        "diaBP": 90,
        "BMI": 28,
        "heartRate": 80,
        "glucose": 120
    }
    raw_input = json.dumps(sample)
else:
    raw_input = sys.stdin.read()

if not raw_input.strip():
    print(json.dumps({"error": "No input data received"}))
    sys.exit(1)

try:
    data = json.loads(raw_input)
except Exception as e:
    print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
    sys.exit(1)

# Convert input dict → DataFrame with correct feature order
try:
    df = pd.DataFrame([data], columns=features)
except Exception as e:
    print(json.dumps({"error": f"Failed to build DataFrame: {str(e)}"}))
    sys.exit(1)

# Predict probability
try:
    prob = model.predict_proba(df)[0][1]  # probability of hypertension
    pred = int(prob >= 0.5)               # 1 if high risk, else 0
except Exception as e:
    print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
    sys.exit(1)

# Return result
result = {
    "prediction": pred,                        # 0 or 1
    "risk_percentage": round(prob * 100, 2),   # e.g. 73.45
    "input": data
}
print(json.dumps(result))
