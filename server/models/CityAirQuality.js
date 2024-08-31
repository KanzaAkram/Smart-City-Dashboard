import mongoose from 'mongoose';

const CityAirQualitySchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: false },
  country: { type: String, required: true },
  aqi: { type: Number, required: true },
  mainPollutant: { type: String, required: true },
  // Add more fields based on the API response structure
});

const CityAirQuality = mongoose.model('CityAirQuality', CityAirQualitySchema);

export default CityAirQuality;


