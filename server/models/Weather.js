// models/Weather.js
import mongoose from 'mongoose';

const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  current: {
    temp: Number,
    humidity: Number,
    weather: Array,
  },
  hourly: Array,
  daily: Array,
  fetchedAt: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', WeatherSchema);

export default Weather;
