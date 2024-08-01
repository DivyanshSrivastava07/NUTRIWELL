const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, './front-end/index.html');


const User = require('./models/User');
const DietRecommendation = require('./models/DietRecommendation');
const ExerciseRecommendation = require('./models/ExerciseRecommendation');

const app = express();
const port = 3000;

// Function to check if the path exists
function checkPath(filePath) {
    return fs.existsSync(filePath);
}

// Check if all paths exist
const pathsToCheck = [
    './models/User.js',
    './models/DietRecommendation.js',
    './models/ExerciseRecommendation.js',
    './front-end',
    './front-end/index.html'
];

pathsToCheck.forEach(filePath => {
    if (!checkPath(filePath)) {
        console.error(`Error: ${filePath} does not exist.`);
        process.exit(1);
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bmi_app', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.use(bodyParser.json());
app.use(express.static('front-end'));

app.get('/submit', (req, res) => {
  res.sendFile(indexPath, (err) => {
      if (err) {
          res.status(500).send('Server error: Unable to find index.html');
      }
  });
});

// Endpoint to calculate BMI and store user data
app.post('/submit', async (req, res) => {
    try {
        const { height, weight, age, gender } = req.body;
        const bmi = weight / ((height / 100) * (height / 100));

        const newUser = new User({ height, weight, age, gender, bmi });
        await newUser.save();
        res.json({ message: 'User data saved successfully' });
        const dietRecommendation = await DietRecommendation.findOne({ bmiMin: { $lte: bmi }, bmiMax: { $gte: bmi } });
        const exerciseRecommendation = await ExerciseRecommendation.findOne({ bmiMin: { $lte: bmi }, bmiMax: { $gte: bmi } });

        res.json({
            bmi: bmi,
            dietRecommendation: dietRecommendation ? dietRecommendation.recommendation : 'No recommendation found',
            exerciseRecommendation: exerciseRecommendation ? exerciseRecommendation.recommendation : 'No recommendation found'
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
