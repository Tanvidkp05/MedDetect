const mongoose = require('mongoose');

const HypertensionFormSchema = new mongoose.Schema({
  male: Number,
  age: Number,
  currentSmoker: Number,
  cigsPerDay: Number,
  BPMeds: Number,
  diabetes: Number,
  totChol: Number,
  sysBP: Number,
  diaBP: Number,
  BMI: Number,
  heartRate: Number,
  glucose: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

<<<<<<< HEAD
module.exports = mongoose.model('HypertensionForm', HypertensionFormSchema);
=======
module.exports = mongoose.model('HypertensionForm', HypertensionFormSchema)
>>>>>>> tanvi
