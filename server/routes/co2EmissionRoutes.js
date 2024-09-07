import express from 'express';
import { createCO2Estimate, getCO2EstimateById } from '../controllers/CO2EmissionController.js';

const router = express.Router();

// Route for creating a new CO2 emission estimate
router.post('/estimate', createCO2Estimate);

// Route for fetching a specific CO2 emission estimate by ID
router.get('/estimate/:id', getCO2EstimateById);

export default router;


