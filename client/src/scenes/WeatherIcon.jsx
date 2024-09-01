// src/components/WeatherIcon.jsx
import React from 'react';
import { Box } from '@mui/material';

// You can use OpenWeather icons or any other icon library
const WeatherIcon = ({ weather, size = 50 }) => {
  const iconCode = weather.icon;
  const description = weather.description;

  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Box display="flex" alignItems="center">
      <img src={iconUrl} alt={description} width={size} height={size} />
    </Box>
  );
};

export default WeatherIcon;
