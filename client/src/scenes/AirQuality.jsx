import React, { useState } from 'react';
import './AirQuality.css'; // Ensure this path is correct
import axios from 'axios';

const AirQuality = () => {
  const [aqiData, setAqiData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  
  // Use the API key you provided
  const apiKey = 'f9dd8fbc-68c6-4b86-aeb4-42c595b2ef30';

  const fetchAirQuality = async () => {
    setLoaded(false); // Set loading state
    try {
      const response = await axios.get(`https://api.airvisual.com/v2/city`, {
        params: {
          city,
          state,
          country,
          key: apiKey
        }
      });
      setAqiData(response.data.data);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      setLoaded(true); // Stop the loader even on error
    }
  };

  const airQualityStatus = (aqiVal) => {
    if (aqiVal <= 60) {
      return "Get outside and breathe that fresh air!";
    } else if (aqiVal > 60 && aqiVal < 130) {
      return "Take it easy, the air quality is less than ideal!";
    } else if (aqiVal > 130 && aqiVal < 200) {
      return "It is getting bad, stay inside!";
    } else {
      return "Don't even bother breathing...";
    }
  };

  return (
    <div className="airQualityContainer">
      <h2>Check Air Quality by City</h2>
      <div className="inputGroup">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={fetchAirQuality}>Get Air Quality</button>
      </div>

      {!loaded && (
        <img className="loadingGif" src="/lg.rainy-preloader.gif" alt="loading" />
      )}

      {loaded && aqiData?.current && (
        <div className="airQualityData">
          <p className="temp">
            {aqiData.current.pollution.aqius}
            <span className="degrees"> Air Quality</span>
          </p>
          <p>{airQualityStatus(aqiData.current.pollution.aqius)}</p>
        </div>
      )}

      {loaded && !aqiData?.current && (
        <p>No data available for the provided inputs. Please try again.</p>
      )}
    </div>
  );
};

export default AirQuality;

