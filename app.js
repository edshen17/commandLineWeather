//Require https module
const https = require('https');
const http = require('http');

const api = require('./api.json');

//prints location given zip or coordinates
function printWeather(loc, temp) {
  console.log(`Current temperature in ${loc} is ${temp}F`);
}

//gets weather using API
function get(key, lat, long) {
  const request = https.get(`https://api.darksky.net/forecast/${api.key}/${lat},${long}`, response => {
    try {
      if (response.statusCode === 200) {
        //Read data
        let body = '';
        response.on('data', data => {
          body += data.toString();
        });


        //Parse data
        response.on('end', () => {
          try {
            const weatherJSON = JSON.parse(body);
            printWeather(weatherJSON.timezone, weatherJSON.currently.temperature);
          } catch (error) {
            console.error(error.message);
          }
        });
      } else {
        const message = `There was an error getting the weather. (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        console.error(statusCodeError);
      }

    } catch (error) {
      console.error(error.message);
    }
  });
}


get(api.key, 42.3601, -71.0589);