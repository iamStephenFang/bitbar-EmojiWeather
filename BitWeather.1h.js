#!/usr/local/bin/node

/* jshint esversion: 6 */

let request = require('request');

let apiKey = '1686676383cc4b92a06b5df3b8f34f37';
let city = 'hangzhou';
let url = `https://free-api.heweather.net/s6/weather/now?location=${city}&key=${apiKey}`;


request(url, function(err, response, body) { // Collect JSON object
    if (err) { // If no connection, so sad...
        console.log(emojis[0]);
    } else {
        var cond;
        let weather = JSON.parse(body);
        // console.log(weather.HeWeather6[0].now.cond_code);
        switch (weather.HeWeather6[0].now.cond_code) {
            case 100:
                cond = ":sunny:";
                break;
            case 101:
                cond = ":cloud:";
                break;
            case 102:
                cond = "🌥";
                break;
            case 103:
                cond = "⛅️";
                break;
            case 104:
                cond = "Thurscond";
                break;
            case 5:
                cond = "Fricond";
                break;
            case 6:
                cond = "❔";
                break;
            default:
                cond = "❔";
        }
        console.log(cond);
    }
});