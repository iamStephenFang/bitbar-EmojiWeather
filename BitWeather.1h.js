#!/usr/bin/env /usr/local/bin/node

/* jshint esversion: 6 */

let request = require('request');

let apiKey = '1686676383cc4b92a06b5df3b8f34f37';
let city = 'hangzhou';
let url = `https://free-api.heweather.net/s6/weather/now?location=${city}&key=${apiKey}`;


request(url, function(err, response, body) { // Collect JSON object
    if (err) { // If no connection, so sad...
        console.log(emojis[0]);
    } else {
        let weather = JSON.parse(body);
        var cond;
        switch (parseInt(weather.HeWeather6[0].now.cond_code)) {
            case 100:
                cond = "☀️";
                break;
            case 102:
                cond = "🌥";
                break;
            case 103:
                cond = "⛅️";
                break;
            case 101, 104:
                cond = "☁️";
                break;
            case 200, 201, 203, 204:
                cond = "🎐";
                break;
            case 205, 206, 207:
                cond = "💨";
                break;
            case 208, 209, 210, 211, 212, 213:
                cond = "🌪";
                break;
            case 300, 301, 302, 303, 310, 311, 312, 315, 316, 317, 318:
                cond = "⛈";
                break;
            case 300, 304, 305, 306, 307, 309, 313, 314, 399:
                cond = "🌧";
                break;
            case 400, 404, 405, 408:
                cond = "❄️";
                break;
            case 401, 402, 403, 406, 407, 409, 410, 499:
                cond = "❄️";
                break;
            case 500, 501, 502, 503, 509, 510, 511, 512, 513, 514, 515:
                cond = "🌫";
                break;
            default:
                cond = "❔";
        }
        console.log(cond);
        console.log("---");
        console.log("今天天气为" + weather.HeWeather6[0].now.cond_txt);
    }

});