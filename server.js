// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Load up the Express package to run server and routes
const express = require('express');

// Start up an instance of the app
const app = express();

// Dependencies
const bodyParser = require('body-parser')
const cors = require('cors')

// Cors for cross origin allowance
app.use(cors());

// Configure Express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Initialize main project folder
app.use(express.static('website'));

// Set up server
const port = 5500;

// This function will run when we execute the listen method to let you know that the server is running and on which port by logging messages to the console.
const server = app.listen(port, () => console.log(`Weather Journal App listening at http://localhost:${port}`));

const weatherData = [];

// POST ROUTE - process the data we receive with our POST request
app.post('/addWeatherData', function addWeatherData(req, res) {
    let data = req.body;

    projectData["feelings"] = data.feelings;
    projectData["temperature"] = data.temperature;

    res.send(projectData);
    console.log('POST');
    console.log(projectData);

});

// GET ROUTE - return the projectData object in the server code
app.get('/weather-data', function getData(req, res) {

    res.send(projectData);
    console.log('GET');
    console.log(projectData);

});