const mongoose = require('mongoose');

// Define the schema
const dietRecommendationSchema = new mongoose.Schema({
    bmiMin: { type: Number, required: true },
    bmiMax: { type: Number, required: true },
    recommendation: {
        breakfast: { type: String, required: true },
        lunch: { type: String, required: true },
        snacks: { type: String, required: true },
        dinner: { type: String, required: true },
        dessert: { type: String, required: true }
    }
});

// Create the model
const DietRecommendation = mongoose.model('DietRecommendation', dietRecommendationSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bmi_app', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB diet');
    seedDatabase();
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Function to seed the database
const seedDatabase = async () => {
    const dietRecommendations = [
        {
            bmiMin: 0,
            bmiMax: 18.5,
            recommendation: {
                breakfast: "Whole grain toast with avocado and poached eggs, smoothie with spinach, banana, and protein powder",
                lunch: "Grilled chicken or tofu with quinoa, mixed greens, and a drizzle of olive oil",
                snacks: "Nuts and seeds, Greek yogurt with honey and berries",
                dinner: "Salmon or lentils with sweet potatoes and steamed broccoli",
                dessert: "Greek yogurt with a handful of granola"
            }
        },
        {
            bmiMin: 18.5,
            bmiMax: 24.9,
            recommendation: {
                breakfast: "Oatmeal with fresh fruits and a sprinkle of chia seeds",
                lunch: "Turkey sandwich with whole grain bread, lettuce, tomato, and a side of baby carrots",
                snacks: "Apple slices with almond butter",
                dinner: "Grilled chicken breast with brown rice, sautéed vegetables, and a side salad",
                dessert: "A small piece of dark chocolate or a fruit salad"
            }
        },
        {
            bmiMin: 25,
            bmiMax: 29.9,
            recommendation: {
                breakfast: "Low-fat Greek yogurt with mixed berries and a tablespoon of flaxseeds",
                lunch: "Mixed greens salad with chickpeas, cherry tomatoes, cucumbers, and a light vinaigrette dressing",
                snacks: "Carrot sticks with hummus",
                dinner: "Baked fish with a side of quinoa and roasted Brussels sprouts",
                dessert: "Fresh fruit such as a bowl of strawberries or an orange"
            }
        },
        {
            bmiMin: 30,
            bmiMax: 100,
            recommendation: {
                breakfast: "Smoothie made with spinach, kale, cucumber, and a green apple",
                lunch: "Large salad with mixed greens, grilled chicken, avocado, cherry tomatoes, and a light lemon vinaigrette",
                snacks: "Sliced bell peppers with hummus",
                dinner: "Lean protein like grilled turkey breast with a side of steamed vegetables and a small portion of brown rice",
                dessert: "A serving of low-fat Greek yogurt with a few fresh berries"
            }
        }
    ];

    try {
        // Clear the collection before seeding
        await DietRecommendation.deleteMany({});
        console.log('Cleared existing diet recommendations');

        await DietRecommendation.insertMany(dietRecommendations);
        console.log('Diet recommendations seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};
