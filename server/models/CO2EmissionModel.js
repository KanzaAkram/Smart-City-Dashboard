import mongoose from 'mongoose';

const CO2EmissionSchema = new mongoose.Schema({
  estimate_id: {
    type: String,
    required: true,
    unique: true
  },
  fuel_source_type: {
    type: String,
    required: true
  },
  fuel_source_unit: {
    type: String,
    required: true
  },
  fuel_source_value: {
    type: Number,
    required: true
  },
  carbon_mt: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('CO2Emission', CO2EmissionSchema);


