// routes/weatherRoutes.js
import express from 'express';
import { fetchWeather } from '../controllers/weatherController.js';

const router = express.Router();

// Route: GET /api/weather?city=CityName&country=CountryName
router.get('/', fetchWeather);

export default router;

