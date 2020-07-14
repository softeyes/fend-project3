   // A GET request to the Open Weather Map API in an Async function

   let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
   let zipCode = '02215';
   let apiKey = ',us&appid=e01326745c3f1d77e53a7d7bdef1f809';

   // Add a click listener to the 'generate' button
   document.getElementById('generate').addEventListener('click', performAction);

   // Runs a function to post data to the '/addNewLocation' post route
   function performAction(e) {
       getWeatherInfo(baseURL, zipCode, apiKey).then(data => {
           console.log(data);
           postData('/addNewLocation', {
               temperature: data.main.temp,
               date: data.date,
               userResponse: data["user response"]
           })
       });
   }

   // Runs getWeatherInfo function, which fetches the Open Weather App JSON data
   const getWeatherInfo = async (url, zip, key) => {

       const res = await fetch(url + zip + key).then()
       try {

           const data = await res.json();
           return data;
       } catch (error) {
           console.log("Error:", error);
           // appropriately handle the error
       }

   }

   // POST CALL - A request to store all the data we received locally in our app

   // The POST request - accessing the POST route we setup in server.js. 
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
           console.log(newData);
           return newData;
       } catch (error) {
           console.log("error", error);
       }
   }


   // postData('/add', {
   //     answer: 42
   // });