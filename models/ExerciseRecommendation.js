const mongoose = require('mongoose');

// Define the schema
const exerciseRecommendationSchema = new mongoose.Schema({
    bmiMin: { type: Number, required: true },
    bmiMax: { type: Number, required: true },
    recommendation: {
        strengthTraining: { type: String, required: true },
        cardio: { type: String, required: true },
        flexibility: { type: String, required: true }
    }
});

// Create the model
const ExerciseRecommendation = mongoose.model('ExerciseRecommendation', exerciseRecommendationSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bmi_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB exercise');
    seedDatabase();
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Function to seed the database
const seedDatabase = async () => {
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

    try {
        // Clear the collection before seeding
        await ExerciseRecommendation.deleteMany({});
        console.log('Cleared existing exercise recommendations');

        await ExerciseRecommendation.insertMany(exerciseRecommendations);
        console.log('Exercise recommendations seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};
