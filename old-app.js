const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded());

// Serve static files from the "public" directory (if needed)
app.use(express.static('front-end'));

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname,'index.html');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const weight = req.body.weight;
  const height = req.body.height;
  
  // Do something with the form data (e.g., save to a database)
  console.log(`Received form submission: weight - ${weight}, height - ${height}`);
  
  // Send a response to the client
  res.send('Form submitted successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
