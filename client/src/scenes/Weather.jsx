// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Card,
//   CardContent,
//   Grid,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import WeatherIcon from './WeatherIcon'; // Component to display weather icons

// // Styled Card with Gradient
// const GradientCard = styled(Card)(({ theme }) => ({
//   background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
//   borderRadius: '15px',
//   padding: '20px',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
// }));

// function Weather() {
//   const [city, setCity] = useState('');
//   const [country, setCountry] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     if (!city || !country) {
//       setError('Please enter both city and country.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setWeatherData(null);

//     try {
//       const response = await axios.get('http://localhost:5001/api/weather', {
//         params: { city, country },
//       });
//       setWeatherData(response.data);
//     } catch (err) {
//       console.error('Error details:', err.response ? err.response.data : err.message);
//       setError('Error fetching weather data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
    
//   };

//   // Prepare data for the forecast chart
//   const forecastData = weatherData
//     ? weatherData.daily.slice(0, 7).map((day) => ({
//         date: new Date(day.dt * 1000).toLocaleDateString(),
//         temp: day.temp.day,
//         precipitation: day.rain || 0,
//       }))
//     : [];

//   // Determine background image based on current weather condition
//   const getWeatherImage = (weather) => {
//     switch (weather.main.toLowerCase()) {
//       case 'rain':
//         return '/images/rain.jpg';
//       case 'clear':
//         return '/images/clear.jpg';
//       case 'clouds':
//         return '/images/clouds.jpg';
//       default:
//         return '/images/default.jpg';
//     }
//   };

//   return (
//     <Box m="2rem">
//       <Typography variant="h4" gutterBottom>
//         Weather Information
//       </Typography>

//       {/* Search Bar */}
//       <Box display="flex" alignItems="center" mb="20px">
//         <TextField
//           label="City"
//           variant="outlined"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           sx={{ mr: '10px', width: '200px' }}
//         />
//         <TextField
//           label="Country"
//           variant="outlined"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           sx={{ mr: '10px', width: '200px' }}
//         />
//         <Button variant="contained" color="primary" onClick={handleSearch}>
//           Search
//         </Button>
//       </Box>

//       {/* Loading and Error States */}
//       {loading && <CircularProgress />}
//       {error && (
//         <Typography color="error" gutterBottom>
//           {error}
//         </Typography>
//       )}

//       {/* Weather Data */}
//       {weatherData && (
//         <GradientCard style={{ backgroundImage: `url(${getWeatherImage(weatherData.current.weather[0])})` }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               Current Weather in {weatherData.timezone}
//             </Typography>
//             <Grid container spacing={2}>
//               {/* Weather Icon and Description */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <WeatherIcon weather={weatherData.current.weather[0]} />
//                 <Typography variant="h6">
//                   {weatherData.current.weather[0].description}
//                 </Typography>
//               </Grid>

//               {/* Temperature */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <Typography variant="h6">Temperature</Typography>
//                 <Typography variant="h4">{weatherData.current.temp}°C</Typography>
//               </Grid>

//               {/* Humidity */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <Typography variant="h6">Humidity</Typography>
//                 <Typography variant="h4">{weatherData.current.humidity}%</Typography>
//               </Grid>

//               {/* Wind Speed */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <Typography variant="h6">Wind Speed</Typography>
//                 <Typography variant="h4">{weatherData.current.wind_speed} m/s</Typography>
//               </Grid>

//               {/* Sunrise and Sunset */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <Typography variant="h6">Sunrise</Typography>
//                 <Typography variant="h4">
//                   {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString()}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6} md={4}>
//                 <Typography variant="h6">Sunset</Typography>
//                 <Typography variant="h4">
//                   {new Date(weatherData.current.sunset * 1000).toLocaleTimeString()}
//                 </Typography>
//               </Grid>
//             </Grid>

//             {/* Forecast Chart */}
//             <Box mt="40px">
//               <Typography variant="h6" gutterBottom>
//                 7-Day Forecast (Temperature & Precipitation)
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={forecastData}>
//                   <CartesianGrid stroke="#ccc" />
//                   <XAxis dataKey="date" />
//                   <YAxis unit="°C" />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="temp" stroke="#8884d8" />
//                   <Line type="monotone" dataKey="precipitation" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Box>

//             {/* Detailed Forecast Table */}
//             <Box mt="40px">
//               <Typography variant="h6" gutterBottom>
//                 Detailed Forecast
//               </Typography>
//               <Box overflow="auto">
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr>
//                       <th style={tableHeaderStyle}>Date</th>
//                       <th style={tableHeaderStyle}>Temp (Day)</th>
//                       <th style={tableHeaderStyle}>Temp (Night)</th>
//                       <th style={tableHeaderStyle}>Humidity</th>
//                       <th style={tableHeaderStyle}>Weather</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {weatherData.daily.slice(0, 7).map((day) => (
//                       <tr key={day.dt}>
//                         <td style={tableCellStyle}>
//                           {new Date(day.dt * 1000).toLocaleDateString()}
//                         </td>
//                         <td style={tableCellStyle}>{day.temp.day}°C</td>
//                         <td style={tableCellStyle}>{day.temp.night}°C</td>
//                         <td style={tableCellStyle}>{day.humidity}%</td>
//                         <td style={tableCellStyle}>
//                           <WeatherIcon weather={day.weather[0]} size={24} />
//                           &nbsp;{day.weather[0].description}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </Box>
//             </Box>
//           </CardContent>
//         </GradientCard>
//       )}
//     </Box>
//   );
// }

// // Styles for table
// const tableHeaderStyle = {
//   borderBottom: '1px solid #ddd',
//   padding: '8px',
//   textAlign: 'left',
// };

// const tableCellStyle = {
//   borderBottom: '1px solid #ddd',
//   padding: '8px',
// };

// export default Weather;

import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import WeatherIcon from './WeatherIcon'; // Component to display weather icons

// Styled Card with Gradient
const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

function Weather() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city || !country) {
      setError('Please enter both city and country.');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get('http://localhost:5001/api/weather', {
        params: { city, country },
      });
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error details:', err.response ? err.response.data : err.message);
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the forecast chart
  const forecastData = weatherData
    ? weatherData.daily.slice(0, 7).map((day) => ({
        date: new Date(day.dt * 1000).toLocaleDateString(),
        temp: day.temp.day,
        precipitation: day.rain || 0,
      }))
    : [];

  // Determine background image based on current weather condition
  const getWeatherImage = (weather) => {
    if (weather && weather.main) {
      switch (weather.main.toLowerCase()) {
        case 'rain':
          return '/images/rain.jpg';
        case 'clear':
          return '/images/clear.jpg';
        case 'clouds':
          return '/images/clouds.jpg';
        default:
          return '/images/default.jpg';
      }
    }
    return '/images/default.jpg';
  };

  return (
    <Box m="2rem">
      <Typography variant="h4" gutterBottom>
        Weather Information
      </Typography>

      {/* Search Bar */}
      <Box display="flex" alignItems="center" mb="20px">
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mr: '10px', width: '200px' }}
        />
        <TextField
          label="Country"
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          sx={{ mr: '10px', width: '200px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Loading and Error States */}
      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Weather Data */}
      {weatherData && (
        <GradientCard style={{ backgroundImage: `url(${getWeatherImage(weatherData.current.weather[0])})` }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Current Weather in {weatherData.timezone}
            </Typography>
            <Grid container spacing={2}>
              {/* Weather Icon and Description */}
              <Grid item xs={12} sm={6} md={4}>
                <WeatherIcon weather={weatherData.current.weather[0]} />
                <Typography variant="h6">
                  {weatherData.current.weather[0].description}
                </Typography>
              </Grid>

              {/* Temperature */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6">Temperature</Typography>
                <Typography variant="h4">{weatherData.current.temp}°C</Typography>
              </Grid>

              {/* Humidity */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6">Humidity</Typography>
                <Typography variant="h4">{weatherData.current.humidity}%</Typography>
              </Grid>

              {/* Wind Speed */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6">Wind Speed</Typography>
                <Typography variant="h4">{weatherData.current.wind_speed} m/s</Typography>
              </Grid>

              {/* Sunrise and Sunset */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6">Sunrise</Typography>
                <Typography variant="h4">
                  {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6">Sunset</Typography>
                <Typography variant="h4">
                  {new Date(weatherData.current.sunset * 1000).toLocaleTimeString()}
                </Typography>
              </Grid>
            </Grid>

            {/* Forecast Chart */}
            <Box mt="40px">
              <Typography variant="h6" gutterBottom>
                7-Day Forecast (Temperature & Precipitation)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date" />
                  <YAxis unit="°C" />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                  <Line type="monotone" dataKey="precipitation" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Detailed Forecast Table */}
            <Box mt="40px">
              <Typography variant="h6" gutterBottom>
                Detailed Forecast
              </Typography>
              <Box overflow="auto">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Date</th>
                      <th style={tableHeaderStyle}>Temp (Day)</th>
                      <th style={tableHeaderStyle}>Temp (Night)</th>
                      <th style={tableHeaderStyle}>Humidity</th>
                      <th style={tableHeaderStyle}>Weather</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.daily.slice(0, 7).map((day) => (
                      <tr key={day.dt}>
                        <td style={tableCellStyle}>
                          {new Date(day.dt * 1000).toLocaleDateString()}
                        </td>
                        <td style={tableCellStyle}>{day.temp.day}°C</td>
                        <td style={tableCellStyle}>{day.temp.night}°C</td>
                        <td style={tableCellStyle}>{day.humidity}%</td>
                        <td style={tableCellStyle}>
                          <WeatherIcon weather={day.weather[0]} size={24} />
                          &nbsp;{day.weather[0].description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </CardContent>
        </GradientCard>
      )}
    </Box>
  );
}

// Styles for table
const tableHeaderStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
};

export default Weather;

