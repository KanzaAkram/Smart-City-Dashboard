// src/routes/co2EmissionRoutes.js

import express from 'express';
import CO2EmissionController from '../controllers/CO2EmissionController.js';

const router = express.Router();

router.post('/estimates', CO2EmissionController.createEstimate);
router.get('/estimates/:id', CO2EmissionController.getEstimate);

export default router;

