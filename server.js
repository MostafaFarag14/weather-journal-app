// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const opn = require('opn')
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Server routes
app.get('/recieveData', (req, res) => {
  res.send(projectData)
})

app.post('/sendData', (req, res) => {
  projectData = req.body
  res.send(projectData)
})

// Setup Server
const port = 8000
const server = app.listen( port , () => {
  console.log(`Server is running at http://localhost:${port}`)
  opn(`http://localhost:${port}`)
})