import axios from 'axios';
import Weather from '../models/Weather.js'; // Ensure this model exists if you use it

const API_KEY = process.env.WEATHER_API_KEY;

// Function to get coordinates using Geocoding API
export const getCoordinates = async (city, country) => {
  try {
    const geoResponse = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: `${city},${country}`,
        limit: 1,
        appid: b4e244a10d98f01695cc093449f743b8,
      },
    });

    if (geoResponse.data.length === 0) {
      throw new Error('Location not found');
    }

    const { lat, lon } = geoResponse.data[0];
    return { lat, lon };
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

// Function to get weather data using One Call API
export const getWeatherData = async (lat, lon) => {
  try {
    const weatherResponse = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
      params: {
        lat,
        lon,
        exclude: 'minutely,alerts', // Exclude unnecessary data
        units: 'metric', // Metric units (Celsius)
        appid: b4e244a10d98f01695cc093449f743b8,
      },
    });

    return weatherResponse.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
};

// Controller to handle weather data request
export const fetchWeather = async (req, res) => {
  const { city, country } = req.query;

  if (!city || !country) {
    return res.status(400).json({ error: 'City and country are required' });
  }

  try {
    // Get coordinates
    const { lat, lon } = await getCoordinates(city, country);

    // Get weather data
    const weatherData = await getWeatherData(lat, lon);

    // Optional: Save to database
    const weatherEntry = new Weather({
      city,
      country,
      coordinates: { lat, lon },
      current: weatherData.current,
      hourly: weatherData.hourly,
      daily: weatherData.daily,
    });

    await weatherEntry.save();

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};
