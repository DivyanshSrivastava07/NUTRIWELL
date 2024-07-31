const mongoose = require('mongoose');

const dietRecommendationSchema = new mongoose.Schema({
    bmiMin: { type: Number, required: true },
    bmiMax: { type: Number, required: true },
    recommendation: { type: String, required: true }
});

module.exports = mongoose.model('DietRecommendation', dietRecommendationSchema);
