import axios from 'axios';
import CO2EmissionModel from '../models/CO2EmissionModel.js';

// Create a new CO2 emission estimate
export const createCO2Estimate = async (req, res) => {
  const { fuel_source_type, fuel_source_unit, fuel_source_value } = req.body;

  try {
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', 
    {
      type: 'fuel_combustion',
      fuel_source_type: fuel_source_type,
      fuel_source_unit: fuel_source_unit,
      fuel_source_value: fuel_source_value
    }, 
    {
      headers: {
        Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const estimate = response.data;

    // Save the estimate in the database (optional)
    await CO2EmissionModel.create({
      estimate_id: estimate.data.id,
      fuel_source_type,
      fuel_source_unit,
      fuel_source_value,
      carbon_mt: estimate.data.attributes.carbon_mt
    });

    res.status(201).json({
      success: true,
      data: estimate.data
    });
  } catch (error) {
    console.error('Error creating CO2 estimate:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create CO2 estimate',
    });
  }
};

// Retrieve a specific CO2 estimate by ID
export const getCO2EstimateById = async (req, res) => {
  const estimateId = req.params.id;

  try {
    const response = await axios.get(`https://www.carboninterface.com/api/v1/estimates/${estimateId}`, 
    {
      headers: {
        Authorization: `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const estimate = response.data;

    res.status(200).json({
      success: true,
      data: estimate.data
    });
  } catch (error) {
    console.error('Error fetching CO2 estimate:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CO2 estimate',
    });
  }
};

