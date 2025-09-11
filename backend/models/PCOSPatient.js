const mongoose = require('mongoose');

const PCOSchema = new mongoose.Schema({
  Age: {
    type: Number,
    min: 15,
    max: 49,
    required: true
  },
  BMI: {
    type: Number,
    required: true
  },
  MenstrualRegularity: {
    type: String,
    enum: ['Regular', 'Irregular'],
    required: true
  },
  Hirsutism: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  AcneSeverity: {
    type: String,
    enum: ['None', 'Mild', 'Moderate', 'Severe'],
    required: true
  },
  FamilyHistory: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  InsulinResistance: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  LifestyleScore: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  StressLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  }
});

module.exports = mongoose.model('PCOSPatient', PCOSchema);
