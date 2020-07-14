// Load up the Express package to run server and routes
const express = require('express');

// Start up an instance of the app
const app = express();

// Load up body-parser middle-ware
const bodyParser = require('body-parser')

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());

// Initialize main project folder
app.use(express.static('website'));


// The port number
const port = 5500;

// This function will run when we execute the listen method to let you know that the server is running and on which port by logging messages to the console.
const server = app.listen(port, () => console.log(`Weather Journal App listening at http://localhost:${port}`));


// POST ROUTE - Process the data we receive with our POST request
app.post('/addNewLocation', function addData(req, res) {

    let data = req.body

    let newEntry = {
        temperature: data.main.temp,
        date: data.date,
        userResponse: data["user response"]
    }

    projectData.push(newEntry);
});

// A GET route that returns the projectData object in the server code
app.get('/addNewLocation', function addData(req, res) {
    res.send(projectData);
});

const projectData = {};