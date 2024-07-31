const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bmi: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
