   /* Global Variables */
   const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
   const zipCode = '';
   const apiKey = ',us&appid=e01326745c3f1d77e53a7d7bdef1f809';

   // Add a click listener to the 'generate' button
   document.getElementById('generate').addEventListener('click', performAction);

   // Function called by event listener to post data to the '/addWeatherData' POST route
   function performAction(e) {

       const zipCode = document.getElementById("zip").value;
       const feelings = document.getElementById("feelings").value;

       getWeatherData(baseURL, zipCode, apiKey).then(function (data) {
           postData('/addWeatherData', {
               temperature: data.main.temp,
               zip: zip,
               feelings: feelings
           })
           updateUI();
       })
   }

   // Function to GET Web API data by fetching the Open Weather App JSON data
   const getWeatherData = async (url, zip, key) => {

       const res = await fetch(url + zip + key).then()
       try {

           const data = await res.json();
           return data;
       } catch (error) {
           console.log("Error:", error);
           // appropriately handle the error
       }

   }

   // Function to POST data on the POST route we setup in server.js. 
   const postData = async (url = '', data = {}) => {
       const response = await fetch(url, {
           method: 'POST',
           credentials: 'same-origin',
           headers: {
               'Content-Type': 'application/json',
           },
           // convert a JavaScript object into a string using the JavaScript method JSON.stringify(), 
           // which turns JavaScript objects and JSON data into a string for our server to receive the information        
           body: JSON.stringify(data),
       });

       try {
           const newData = await response.json();
           return newData;

       } catch (error) {
           console.log("Error:", error);
       }
   }

   // Function to GET Project Data and update UI
   const updateUI = async () => {
       const request = await fetch('/weather-data').then()
       try {
           const allData = await request.json();
           console.log(allData);
           document.getElementById("content").innerHTML = allData.feelings;
           document.getElementById("displayTemp").innerHTML = allData.temperature;
       } catch (error) {
           console.log("Error:", error)
       }
   }

   window.addEventListener('load', () => {
       console.log('page is fully loaded');
       let today = new Date();
       const dd = String(today.getDate()).padStart(2, '0');
       const mm = String(today.getMonth() + 1).padStart(2, '0');
       const yyyy = today.getFullYear();

       today = mm + '/' + dd + '/' + yyyy;
       document.getElementById("date").innerHTML = today;
   });