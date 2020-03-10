#!/usr/local/bin/node

const path = require('path')
const bitbar = require("bitbar");
const axios = require("axios");

// To make sure .env file is loaded correctly even the script is run with symlink
require('dotenv').config({ path: path.join(__dirname, '.env') })

const api = axios.create({
  baseURL: `https://free-api.heweather.net/s6/weather`,
  timeout: 5000
});

api
  .get("/now", {
    params: {
      location: process.env.LOCATION,
      key: process.env.API_KEY
    }
  })
  .then(response => {
    let data = response.data;
    if (
      response.status != 200 ||
      !data["HeWeather6"] ||
      data["HeWeather6"][0]["status"] !== "ok"
    ) {
      bitbar([
        {
          text: "❔",
          dropdown: false
        },
        bitbar.separator,
        {
          text: "刷新",
          refresh: true
        }
      ]);
      return;
    }
    data = data["HeWeather6"][0];
    let cond_icon;
    switch (data.now.cond_code) {
      case "100":
        cond_icon = "☀️";
        break;
      case "102":
        cond_icon = "🌥";
        break;
      case "103":
        cond_icon = "⛅️";
        break;
      case "101":
      case "104":
        cond_icon = "☁️";
        break;
      case "200":
      case "201":
      case "203":
      case "204":
        cond_icon = "🎐";
        break;
      case "205":
      case "206":
      case "207":
        cond_icon = "💨";
        break;
      case "208":
      case "209":
      case "210":
      case "211":
      case "212":
      case "213":
        cond_icon = "🌪";
        break;
      case "300":
      case "301":
      case "302":
      case "303":
      case "310":
      case "311":
      case "312":
      case "315":
      case "316":
      case "317":
      case "318":
        cond_icon = "⛈";
        break;
      case "300":
      case "304":
      case "305":
      case "306":
      case "307":
      case "309":
      case "313":
      case "314":
      case "399":
        cond_icon = "🌧";
        break;
      case "400":
      case "404":
      case "405":
      case "408":
        cond_icon = "❄️";
        break;
      case "401":
      case "402":
      case "403":
      case "406":
      case "407":
      case "409":
      case "410":
      case "499":
        cond_icon = "❄️";
        break;
      case "500":
      case "501":
      case "502":
      case "503":
      case "509":
      case "510":
      case "511":
      case "512":
      case "513":
      case "514":
      case "515":
        cond_icon = "🌫";
        break;
      default:
        cond_icon = "❔";
    }
    bitbar([
      {
        text: cond_icon,
        dropdown: false
      },
      bitbar.separator,
      `天气: ${data.now.cond_txt}`,
      `气温: ${data.now.tmp} °C`,
      bitbar.separator,
      {
        text: "刷新",
        refresh: true
      }
    ]);
  });
