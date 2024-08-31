import express from 'express';
import { getCityAirQuality } from '../controllers/airQualityController.js';

const router = express.Router();

router.get('/airquality', async (req, res) => {
  const { city, state, country } = req.query;
  try {
    const airQualityData = await getCityAirQuality(city, state, country);
    res.json(airQualityData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching air quality data' });
  }
});

export default router;



