const mongoose = require('mongoose');
const ExerciseRecommendation = require('./models/ExerciseRecommendation');

mongoose.connect('mongodb://localhost:27017/bmi_app')

const exerciseRecommendations = [
    {
        bmiMin: 0,
        bmiMax: 18.5,
        recommendation: {
            strengthTraining: "Light weights or bodyweight exercises like squats, lunges, and push-ups, 3 times a week",
            cardio: "Brisk walking, cycling, or swimming for 30 minutes, 3-4 times a week",
            flexibility: "Yoga or stretching exercises for 20 minutes, 2 times a week"
        }
    },
    {
        bmiMin: 18.5,
        bmiMax: 24.9,
        recommendation: {
            strengthTraining: "Full-body workout with weights or resistance bands, 2-3 times a week",
            cardio: "Running, cycling, or swimming for 30-45 minutes, 3-5 times a week",
            flexibility: "Yoga, Pilates, or stretching for 30 minutes, 2 times a week"
        }
    },
    {
        bmiMin: 25,
        bmiMax: 29.9,
        recommendation: {
            strengthTraining: "Bodyweight exercises, resistance bands, or light weights, 2-3 times a week",
            cardio: "Walking, elliptical, or water aerobics for 30-45 minutes, 4-5 times a week",
            flexibility: "Stretching exercises or yoga for 20-30 minutes, 2-3 times a week"
        }
    },
    {
        bmiMin: 30,
        bmiMax: 100,
        recommendation: {
            strengthTraining: "Low-impact exercises like seated resistance exercises or water resistance exercises, 2 times a week",
            cardio: "Walking, water aerobics, or stationary cycling for 20-30 minutes, 5 times a week",
            flexibility: "Gentle stretching or chair yoga for 20 minutes, 3 times a week"
        }
    }
];

ExerciseRecommendation.insertMany(exerciseRecommendations)
    .then(() => {
        console.log('Exercise recommendations added successfully');
        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Error adding recommendations:', error);
        mongoose.connection.close();
    });
