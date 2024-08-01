const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bmi: { type: Number, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
