const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  Pregnancies: Number,
  Glucose: Number,
  BloodPressure: Number,
  SkinThickness: Number,
  Insulin: Number,
  BMI: Number,
  DiabetesPedigreeFunction: Number,
  Age: Number
});

module.exports = mongoose.model('Patient', PatientSchema);
