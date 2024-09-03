// // src/controllers/CO2EmissionController.js

// import axios from 'axios';
// import CO2Emission from '../models/CO2EmissionModel.js';

// const API_KEY = 'vwk3LX5lASdQ2Nk29CM1Vw';
// const BASE_URL = 'https://www.carboninterface.com/api/v1/estimates';

// const createEstimate = async (req, res) => {
//   const { type, ...params } = req.body;

//   try {
//     const response = await axios.post(BASE_URL, { type, ...params }, {
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const estimateData = response.data;
//     await CO2Emission.create({ type, estimateData });
    
//     res.status(200).json(estimateData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while creating the estimate.' });
//   }
// };

// const getEstimate = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const response = await axios.get(`${BASE_URL}/${id}`, {
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`,
//       },
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while retrieving the estimate.' });
//   }
// };

// export default {
//   createEstimate,
//   getEstimate,
// };


// src/controllers/CO2EmissionController.js

import axios from 'axios';
import CO2Emission from '../models/CO2EmissionModel.js'; // Ensure this model is correctly defined

const API_KEY = process.env.CARBON_INTERFACE_API_KEY; // Use environment variable for API key
const BASE_URL = 'https://www.carboninterface.com/api/v1/estimates';

const createEstimate = async (req, res) => {
  const { type, ...params } = req.body;

  try {
    const response = await axios.post(BASE_URL, { type, ...params }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const estimateData = response.data;

    // Adjust data structure according to your model
    await CO2Emission.create({
      type,
      estimateData: estimateData.data, // Ensure this matches your model schema
    });
    
    res.status(200).json(estimateData);
  } catch (error) {
    console.error('Error creating estimate:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'An error occurred while creating the estimate.' });
  }
};

const getEstimate = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error retrieving estimate:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'An error occurred while retrieving the estimate.' });
  }
};

export default {
  createEstimate,
  getEstimate,
};

