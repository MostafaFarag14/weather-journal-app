
/* Global Variables */
const generateButton = document.querySelector('#generate')
const dateElement = document.querySelector('#date')
const tempElement = document.querySelector('#temp')
const contentElement = document.querySelector('#content')

// Personal API Key for OpenWeatherMap API
const apiKey = 'b571894544916e3dbe6d8e51836b07dc'
const baseURL = `http://api.openweathermap.org/data/2.5/weather?units=metric&`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to GET Web API Data*/
const getWeatherData = () => {
  // Get input data from HTML
  const zipCode = document.querySelector('#zip').value
  const feelings = document.querySelector('#feelings').value
  
  fetch(`${baseURL}zip=${zipCode}&appid=${apiKey}`)
    .then(res => res.json())
    .then(jsonRes => postData('/sendData', {
      date: newDate,
      temp: jsonRes.main.temp,
      content: feelings
    }))
    .catch(error => console.log(error))
}
// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', getWeatherData)

/* Function to update UI*/
const updateUI = async () => {
  const { date, temp, content } = await getData()
  dateElement.innerHTML = date
  tempElement.innerHTML = `${temp} Celsius`
  contentElement.innerHTML = content
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(updateUI)
}

/* Function to GET Project Data */
const getData = async () => {
  const response = await fetch('/recieveData')
  const data = await response.json()
  return data
}
