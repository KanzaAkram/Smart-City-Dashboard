// // models/Weather.js
// import mongoose from 'mongoose';

// const WeatherSchema = new mongoose.Schema({
//   city: { type: String, required: true },
//   country: { type: String, required: true },
//   coordinates: {
//     lat: { type: Number, required: true },
//     lon: { type: Number, required: true },
//   },
//   current: {
//     temp: Number,
//     humidity: Number,
//     weather: Array,
//   },
//   hourly: Array,
//   daily: Array,
//   fetchedAt: { type: Date, default: Date.now },
// });

// const Weather = mongoose.model('Weather', WeatherSchema);

// export default Weather;


import mongoose from 'mongoose';

// Define schema for current weather data
const CurrentWeatherSchema = new mongoose.Schema({
  dt: { type: Number }, // Timestamp
  sunrise: { type: Number }, // Sunrise timestamp
  sunset: { type: Number }, // Sunset timestamp
  temp: { type: Number }, // Temperature
  feels_like: { type: Number }, // Feels like temperature
  pressure: { type: Number }, // Atmospheric pressure
  humidity: { type: Number }, // Humidity percentage
  dew_point: { type: Number }, // Dew point temperature
  uvi: { type: Number }, // UV index
  clouds: { type: Number }, // Cloudiness percentage
  visibility: { type: Number }, // Visibility distance
  wind_speed: { type: Number }, // Wind speed
  wind_deg: { type: Number }, // Wind direction
  weather: [{ // Weather condition
    id: { type: Number },
    main: { type: String },
    description: { type: String },
    icon: { type: String },
  }],
});

// Define schema for hourly and daily weather data
const HourlyWeatherSchema = new mongoose.Schema({
  dt: { type: Number }, // Timestamp
  temp: { type: Number }, // Temperature
  feels_like: { type: Number }, // Feels like temperature
  pressure: { type: Number }, // Atmospheric pressure
  humidity: { type: Number }, // Humidity percentage
  dew_point: { type: Number }, // Dew point temperature
  uvi: { type: Number }, // UV index
  clouds: { type: Number }, // Cloudiness percentage
  visibility: { type: Number }, // Visibility distance
  wind_speed: { type: Number }, // Wind speed
  wind_deg: { type: Number }, // Wind direction
  weather: [{ // Weather condition
    id: { type: Number },
    main: { type: String },
    description: { type: String },
    icon: { type: String },
  }],
  pop: { type: Number }, // Probability of precipitation
});

// Define schema for daily weather data
const DailyWeatherSchema = new mongoose.Schema({
  dt: { type: Number }, // Timestamp
  sunrise: { type: Number }, // Sunrise timestamp
  sunset: { type: Number }, // Sunset timestamp
  temp: { // Temperature object with daily min and max
    day: { type: Number },
    min: { type: Number },
    max: { type: Number },
    night: { type: Number },
    eve: { type: Number },
    morn: { type: Number },
  },
  feels_like: { // Feels like temperature object
    day: { type: Number },
    night: { type: Number },
    eve: { type: Number },
    morn: { type: Number },
  },
  pressure: { type: Number }, // Atmospheric pressure
  humidity: { type: Number }, // Humidity percentage
  dew_point: { type: Number }, // Dew point temperature
  uvi: { type: Number }, // UV index
  clouds: { type: Number }, // Cloudiness percentage
  visibility: { type: Number }, // Visibility distance
  wind_speed: { type: Number }, // Wind speed
  wind_deg: { type: Number }, // Wind direction
  weather: [{ // Weather condition
    id: { type: Number },
    main: { type: String },
    description: { type: String },
    icon: { type: String },
  }],
  pop: { type: Number }, // Probability of precipitation
  rain: { type: Number }, // Rain volume
  snow: { type: Number }, // Snow volume
});

// Define the Weather schema
const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  current: CurrentWeatherSchema,
  hourly: [HourlyWeatherSchema],
  daily: [DailyWeatherSchema],
  fetchedAt: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', WeatherSchema);

export default Weather;
