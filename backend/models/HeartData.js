const mongoose = require('mongoose');

const HeartDataSchema = new mongoose.Schema({
  age: Number,
  sex: String,
  chestPainType: String,
  restingBP: Number,
  cholesterol: Number,
  fastingBS: String,
  restECG: String,
  maxHR: Number,
  exerciseAngina: String,
  oldpeak: Number,
  stSlope: String,
  result: String // optional, if you want prediction result stored
});

module.exports = mongoose.model('HeartData', HeartDataSchema);
