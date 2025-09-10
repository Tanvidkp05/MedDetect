const mongoose = require('mongoose');

const HeartDataSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    chestPainType: {
        type: String,
        required: true,
        enum: ['TA', 'ATA', 'NAP', 'ASY']
    },
    restingBP: {
        type: Number,
        required: true
    },
    cholesterol: {
        type: Number,
        required: true
    },
    fastingBS: {
        type: String,
        required: true,
        enum: ['No (0)', 'Yes (1)']
    },
    restECG: {
        type: String,
        required: true,
        enum: ['Normal', 'ST-T wave abnormality', 'Left ventricular hypertrophy']
    },
    maxHR: {
        type: Number,
        required: true
    },
    exerciseAngina: {
        type: String,
        required: true,
        enum: ['No', 'Yes']
    },
    oldpeak: {
        type: Number,
        required: true
    },
    stSlope: {
        type: String,
        required: true,
        enum: ['Up', 'Flat', 'Down']
    },
    prediction: {
        type: Object,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HeartData', HeartDataSchema);