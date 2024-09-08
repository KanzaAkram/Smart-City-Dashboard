import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
  // Use VITE_ prefix for environment variables in Vite
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [city, setCity] = useState("London");
  const [wicon, setWicon] = useState('/images/cloud.png');

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") return;
  
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
  
      if (response.status !== 200) {
        alert(data.message || "An error occurred while fetching the weather data.");
        return;
      }
  
      setTemp(Math.floor(data.main.temp));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCity(element[0].value);
  
      // Log the weather icon and main for debugging
      console.log("Weather main received:", data.weather[0].main);
      console.log("Weather icon received:", data.weather[0].icon);
  
      // Set the icon based on the weather's "main" description
      switch (data.weather[0].main) {
        case "Clear":
          setWicon('/images/clear.png');
          break;
        case "Clouds":
          setWicon('/images/cloud.png');
          break;
        case "Drizzle":
          setWicon('/images/drizzle.png');
          break;
        case "Rain":
          setWicon('/images/rain.png');
          break;
        case "Thunderstorm":
          setWicon('/images/rain.png');
          break;
        case "Snow":
          setWicon('/images/snow.png');
          break;
        case "Mist":
        case "Smoke":
        case "Haze":
        case "Dust":
        case "Fog":
        case "Sand":
        case "Ash":
        case "Squall":
        case "Tornado":
          setWicon('/images/wind.png');
          break;
        default:
          setWicon('/images/clear.png'); // Default to clear weather
          break;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to retrieve weather data. Please try again later.");
    }
  };
  
  
  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='Search Your City Here' />
        <div className="search-icon" onClick={search}>
          <img src="/images/search.png" alt="Search" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="Weather Icon" />
      </div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src="/images/humidity.png" alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src="/images/wind.png" alt="Wind Speed" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

