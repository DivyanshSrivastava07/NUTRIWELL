const mongoose = require('mongoose');

const exerciseRecommendationSchema = new mongoose.Schema({
    bmiMin: { type: Number, required: true },
    bmiMax: { type: Number, required: true },
    recommendation: {
        strengthTraining: { type: String, required: true },
        cardio: { type: String, required: true },
        flexibility: { type: String, required: true }
    }
});

module.exports = mongoose.model('ExerciseRecommendation', exerciseRecommendationSchema);
