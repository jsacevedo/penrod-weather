import React from 'react';
import Titles from './components/Titles';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import Menu from './components/Menu'

// CONSTANTS
const API_KEY_CURRENT = "dccd2efa4c8c7b83a35517c250eb468b";
const API_KEY_FORECAST = "5e96bc12f77de7f26ca0e3541313378e";
const CITY_IDS = {
  'chicago': '4887398',
  'dallas': '4684888',
  'milwaukee': '5263045',
  'minneapolis': '5037649'
};
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WIND_DIRECTION = ['North', 'North-Northeast', 'Northeast', 'East-Northeast', 'East', 'East-Southeast', 'Southeast', 'South-Southeast', 'South', 'South-Southwest', 'Southwest', 'West-Southwest', 'West', 'West-Northwest', 'Northwest', 'North-Northwest'];

// FUNCTIONS
// Returns the ID of the city
function assignId(city) {
  switch(city) {
    case 'chicago':
      return CITY_IDS.chicago;
    case 'dallas':
      return CITY_IDS.dallas;
    case 'milwaukee':
      return CITY_IDS.milwaukee;
    case 'minneapolis':
      return CITY_IDS.minneapolis;
    default:
      return CITY_IDS.chicago;
  }
} // End of assignId()

// Returns the cardinal wind direction
function getWindDirection(degrees) {
  if (degrees < 11.25) return WIND_DIRECTION[0];
  else if (degrees < 33.75) return WIND_DIRECTION[1];
  else if (degrees < 56.25) return WIND_DIRECTION[2];
  else if (degrees < 78.75) return WIND_DIRECTION[3];
  else if (degrees < 101.25) return WIND_DIRECTION[4];
  else if (degrees < 123.75) return WIND_DIRECTION[5];
  else if (degrees < 146.25) return WIND_DIRECTION[6];
  else if (degrees < 168.75) return WIND_DIRECTION[7];
  else if (degrees < 191.25) return WIND_DIRECTION[8];
  else if (degrees < 213.75) return WIND_DIRECTION[9];
  else if (degrees < 236.25) return WIND_DIRECTION[10];
  else if (degrees < 258.75) return WIND_DIRECTION[11];
  else if (degrees < 281.25) return WIND_DIRECTION[12];
  else if (degrees < 303.75) return WIND_DIRECTION[13];
  else if (degrees < 326.25) return WIND_DIRECTION[14];
  else if (degrees < 348.75) return WIND_DIRECTION[15];
  else return WIND_DIRECTION[0];
} // end of getWindDirection()

// Returns an array of objects of date keys with temperature values for all of the data points in the five day forecast data fetched from the OpenWeatherMap API
function createForecastArray(rawForecastArray) {
  let tempArray = [];
  for(let i = 0; i < rawForecastArray.list.length; i++) {
    tempArray.push({
      key: shortenDate(rawForecastArray.list[i].dt_txt),
      tempMax: rawForecastArray.list[i].main.temp_max,
      tempMin: rawForecastArray.list[i].main.temp_min
    });
  }
  if(tempArray.length > 5) {
    tempArray.shift();
  }
  return tempArray;
} // End of createForecastArray()

// Returns an object of arrays grouped by the shortened 5-day forecast dates
// Each array contains objects with date keys and temperature values
// The date key matches the key for each array of objects
function groupForecastArrays(formattedForecastArray, forecastKey) {
  return formattedForecastArray.reduce(function(acc,obj) {
    let key = obj[forecastKey];
    if(!acc[key]) acc[key] = [];
    acc[key].push(obj);
    return acc;
  }, {});
} // End of groupForecastArrays()

// Converts an object to an array
// Removes the initial date key and keeps the remaining arrays of objects together
function objectToArray(obj) {
  let result = Array.from(Object.keys(obj), key => obj[key]);
  return result;
}

// Get the high and low temperatures for each of the next 5 days from the grouped temperatures
function getHiLoTemp(groupedForecastKeys) {
  const forecastKeys = groupedForecastKeys;
  let forecastKeyArray = [];
  forecastKeys.forEach((array) => {
    forecastKeyArray.push(findTemps(array));
  });
  return forecastKeyArray;
} // End of getHiLoTemp()

// Returns the date value with no timestamp from the date string in the OpenWeatherMap API
function shortenDate(longDate) {
  return longDate.slice(0,10);
}

// Return a minimum and maximum temperature from an array of temperature values
function findTemps(dayArray) {
  let max = dayArray[0].tempMax;
  let min = dayArray[0].tempMin;
  for(let i = 0; i < dayArray.length; i++) {
    let minTemp = dayArray[i].tempMin;
    let maxTemp = dayArray[i].tempMax;
    max = (maxTemp > max) ? maxTemp : max;
    min = (minTemp < min) ? minTemp : min;
  }
  return [Math.round(min), Math.round(max)];
} // End of findMaxTemp()

// Return the current day of the week
function getCurrentDay() {
  let day = new Date();
  return DAYS_OF_WEEK[day.getDay()];
} // End of getCurrentDay()

// Return the next day based on the current day
function getTomorrow(today) {
  const todayIndex = DAYS_OF_WEEK.findIndex(day => day === today);
  if(today === DAYS_OF_WEEK[6]) return DAYS_OF_WEEK[0];
  return DAYS_OF_WEEK[todayIndex + 1];
} // end of getTomorrow()

// Return an array of the five days in the forecast
function getFiveDays(firstDay) {
  const firstDayIndex = DAYS_OF_WEEK.findIndex(day => day === firstDay);
  let fiveDays = [];
  for(let i = 0; i < 5; i++) {
    if(firstDayIndex + i > 6) {
      fiveDays.push(DAYS_OF_WEEK[firstDayIndex + i - 7]);
    } else {
      fiveDays.push(DAYS_OF_WEEK[firstDayIndex + i]);
    }
  }
  return fiveDays;
} // End of getFiveDays()

// Return string with the first letters of each word in uppercase
function toUpper(str) {
  return str.toLowerCase()
    .split(" ")
    .map((sChar) => sChar.charAt(0).toUpperCase() + sChar.substring(1))
    .join(" ");
} // End of toUppercase()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVisible: false,
      forecastVisible: false
    }
  } // End of constructor

  getWeather = async(event) => {
    event.preventDefault();
    const buttonId = assignId(event.currentTarget.name);

    // Call current weather data from OpenWeatherMap API
    const currentWeatherCall = await fetch(`
      http://api.openweathermap.org/data/2.5/weather?id=${buttonId}&APPID=${API_KEY_CURRENT}&units=imperial
    `);
    const currentData = await currentWeatherCall.json();

    // Call 5 day forecast data from OpenWeatherMap API
    const forecastCall = await fetch(`
      http://api.openweathermap.org/data/2.5/forecast?id=${buttonId}&APPID=${API_KEY_FORECAST}&units=imperial
    `);
    const forecastData = await forecastCall.json();

    // Call functions to go from the original object to the array of minimum and maximum values
    const forecastArray = createForecastArray(forecastData);
    const groupedTemps = groupForecastArrays(forecastArray, 'key');
    const groupedTempsArray = objectToArray(groupedTemps);
    const hiLoTempArray = getHiLoTemp(groupedTempsArray);

    // Get the current day of the week and the next five days of the week.
    const currentDay = getCurrentDay();
    const tomorrow = getTomorrow(currentDay);
    const forecastFiveDays = getFiveDays(tomorrow);

    this.setState({
      id: buttonId,
      city: currentData.name,
      temperature: Math.round(currentData.main.temp),
      description: toUpper(currentData.weather[0].description),
      currentIcon: currentData.weather[0].icon,
      humidity: currentData.main.humidity,
      speed: currentData.wind.speed,
      direction: getWindDirection(currentData.wind.deg),
      clouds: currentData.clouds.all,
      currentDay: currentDay,
      currentVisible: true,
      forecastVisible: true,
      dayOneName: forecastFiveDays[0],
      dayTwoName: forecastFiveDays[1],
      dayThreeName: forecastFiveDays[2],
      dayFourName: forecastFiveDays[3],
      dayFiveName: forecastFiveDays[4],
      dayOneLowTemp: hiLoTempArray[0][0],
      dayOneHiTemp: hiLoTempArray[0][1],
      dayTwoLowTemp: hiLoTempArray[1][0],
      dayTwoHiTemp: hiLoTempArray[1][1],
      dayThreeLowTemp: hiLoTempArray[2][0],
      dayThreeHiTemp: hiLoTempArray[2][1],
      dayFourLowTemp: hiLoTempArray[3][0],
      dayFourHiTemp: hiLoTempArray[3][1],
      dayFiveLowTemp: hiLoTempArray[4][0],
      dayFiveHiTemp: hiLoTempArray[4][1]
    });
  } // End of getWeather

  render() {
    return(
      <div>
        <Titles
          showCity = { this.state.city }
          currentVisible = { this.state.currentVisible } />
        <Menu
          getWeather = { this.getWeather } />
        <CurrentWeather
          currentVisible = { this.state.currentVisible }
          currentDay = { this.state.currentDay }
          city = { this.state.city }
          temperature = { this.state.temperature }
          humidity = { this.state.humidity }
          speed = { this.state.speed }
          direction = { this.state.direction }
          description = { this.state.description }
          currentIcon = { this.state.currentIcon }
          clouds = { this.state.clouds } />
        <WeatherForecast
          forecastVisible = { this.state.forecastVisible }
          dayOneName = { this.state.dayOneName }
          dayTwoName = { this.state.dayTwoName }
          dayThreeName = { this.state.dayThreeName }
          dayFourName = { this.state.dayFourName }
          dayFiveName = { this.state.dayFiveName }
          dayOneLowTemp = { this.state.dayOneLowTemp }
          dayOneHiTemp = { this.state.dayOneHiTemp }
          dayTwoLowTemp = { this.state.dayTwoLowTemp }
          dayTwoHiTemp = { this.state.dayTwoHiTemp }
          dayThreeLowTemp = { this.state.dayThreeLowTemp }
          dayThreeHiTemp = { this.state.dayThreeHiTemp }
          dayFourLowTemp = { this.state.dayFourLowTemp }
          dayFourHiTemp = { this.state.dayFourHiTemp }
          dayFiveLowTemp = { this.state.dayFiveLowTemp }
          dayFiveHiTemp = { this.state.dayFiveHiTemp } />
      </div>
    ); // End of return
  } // End of render
}; // End of App

export default App;
