import express from 'express';
import { getTrafficFlowMap } from '../controllers/trafficController.js';

const router = express.Router();

// Route to get traffic flow map
router.get('/flow-map', getTrafficFlowMap);

export default router;
