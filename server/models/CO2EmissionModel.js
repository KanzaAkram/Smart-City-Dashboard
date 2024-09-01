// src/models/CO2EmissionModel.js

import mongoose from 'mongoose';

const co2EmissionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  estimateData: { type: Object, required: true },
});

const CO2Emission = mongoose.model('CO2Emission', co2EmissionSchema);

export default CO2Emission;
