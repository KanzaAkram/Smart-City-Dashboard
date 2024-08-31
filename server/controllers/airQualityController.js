import axios from 'axios';
import CityAirQuality from '../models/CityAirQuality.js';

const API_KEY = process.env.REACT_APP_AIRVISUAL_API_KEY;

export const getCityAirQuality = async (city, state, country) => {
  try {
    // Fetch data from the AirVisual API
    const response = await axios.get(`http://api.airvisual.com/v2/city`, {
      params: {
        city: city,
        state: state,
        country: country,
        key: API_KEY
      }
    });

    // Extract relevant data from API response
    const { aqi, mainPollutant } = response.data.data.current.pollution;

    // Save the data to the database
    const airQuality = new CityAirQuality({
      city,
      state,
      country,
      aqi,
      mainPollutant
    });

    await airQuality.save();

    return response.data.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};

