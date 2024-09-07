import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, FormControl, Box, Card, CardContent } from '@mui/material';

const CO2Emission = () => {
    const [type, setType] = useState('');
    const [electricityUnit, setElectricityUnit] = useState('mwh');
    const [electricityValue, setElectricityValue] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [passengers, setPassengers] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [destinationAirport, setDestinationAirport] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [weightUnit, setWeightUnit] = useState('g');
    const [distanceValue, setDistanceValue] = useState('');
    const [distanceUnit, setDistanceUnit] = useState('km');
    const [transportMethod, setTransportMethod] = useState('truck');
    const [vehicleModelId, setVehicleModelId] = useState('');
    const [fuelSourceType, setFuelSourceType] = useState('');
    const [fuelSourceUnit, setFuelSourceUnit] = useState('');
    const [fuelSourceValue, setFuelSourceValue] = useState('');
    const [carbonEstimate, setCarbonEstimate] = useState(null);
    const [error, setError] = useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async () => {
        let requestData = {};

        if (type === 'electricity') {
            requestData = {
                type: 'electricity',
                electricity_unit: electricityUnit,
                electricity_value: parseFloat(electricityValue),
                country,
                state: state || undefined,
            };
        } else if (type === 'flight') {
            requestData = {
                type: 'flight',
                passengers: parseInt(passengers, 10),
                legs: [
                    { departure_airport: departureAirport, destination_airport: destinationAirport }
                ],
            };
        } else if (type === 'shipping') {
            requestData = {
                type: 'shipping',
                weight_value: parseFloat(weightValue),
                weight_unit: weightUnit,
                distance_value: parseFloat(distanceValue),
                distance_unit: distanceUnit,
                transport_method: transportMethod,
            };
        } else if (type === 'vehicle') {
            requestData = {
                type: 'vehicle',
                distance_value: parseFloat(distanceValue),
                distance_unit: distanceUnit,
                vehicle_model_id: vehicleModelId,
            };
        } else if (type === 'fuel_combustion') {
            requestData = {
                type: 'fuel_combustion',
                fuel_source_type: fuelSourceType,
                fuel_source_unit: fuelSourceUnit,
                fuel_source_value: fuelSourceValue, // Ensure this is a float
            };
        }
    
        try {
            const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', requestData, {
                headers: {
                    Authorization: `Bearer vwk3LX5lASdQ2Nk29CM1Vw`,
                    'Content-Type': 'application/json'
                }
            });
            setCarbonEstimate(response.data.data.attributes);
            setError('');
        } catch (error) {
            console.error('Error fetching carbon estimate:', error.response ? error.response.data : error.message);
            setError('An error occurred while fetching the carbon estimate. Please check the details and try again.');
            setCarbonEstimate(null);
        }
    };
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>CO2 Emission Calculator</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={handleTypeChange}>
                    <MenuItem value="electricity">Electricity</MenuItem>
                    <MenuItem value="flight">Flight</MenuItem>
                    <MenuItem value="shipping">Shipping</MenuItem>
                    <MenuItem value="vehicle">Vehicle</MenuItem>
                    <MenuItem value="fuel_combustion">Fuel Combustion</MenuItem>
                </Select>
            </FormControl>

            {type === 'electricity' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Electricity Unit"
                            value={electricityUnit}
                            onChange={(e) => setElectricityUnit(e.target.value)}
                            select
                        >
                            <MenuItem value="mwh">MWh</MenuItem>
                            <MenuItem value="kwh">kWh</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Electricity Value"
                            value={electricityValue}
                            onChange={(e) => setElectricityValue(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </Grid>
                </Grid>
            )}

            {type === 'flight' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Passengers"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Departure Airport"
                            value={departureAirport}
                            onChange={(e) => setDepartureAirport(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Destination Airport"
                            value={destinationAirport}
                            onChange={(e) => setDestinationAirport(e.target.value)}
                        />
                    </Grid>
                </Grid>
            )}

            {type === 'shipping' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Weight Value"
                            value={weightValue}
                            onChange={(e) => setWeightValue(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Weight Unit"
                            value={weightUnit}
                            onChange={(e) => setWeightUnit(e.target.value)}
                            select
                        >
                            <MenuItem value="g">Grams</MenuItem>
                            <MenuItem value="kg">Kilograms</MenuItem>
                            <MenuItem value="lb">Pounds</MenuItem>
                            <MenuItem value="mt">Tonnes</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Distance Value"
                            value={distanceValue}
                            onChange={(e) => setDistanceValue(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Distance Unit"
                            value={distanceUnit}
                            onChange={(e) => setDistanceUnit(e.target.value)}
                            select
                        >
                            <MenuItem value="km">Kilometers</MenuItem>
                            <MenuItem value="mi">Miles</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Transport Method"
                            value={transportMethod}
                            onChange={(e) => setTransportMethod(e.target.value)}
                            select
                        >
                            <MenuItem value="truck">Truck</MenuItem>
                            <MenuItem value="ship">Ship</MenuItem>
                            <MenuItem value="plane">Plane</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            )}

            {type === 'vehicle' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Distance Value"
                            value={distanceValue}
                            onChange={(e) => setDistanceValue(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Distance Unit"
                            value={distanceUnit}
                            onChange={(e) => setDistanceUnit(e.target.value)}
                            select
                        >
                            <MenuItem value="km">Kilometers</MenuItem>
                            <MenuItem value="mi">Miles</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vehicle Model ID"
                            value={vehicleModelId}
                            onChange={(e) => setVehicleModelId(e.target.value)}
                        />
                    </Grid>
                </Grid>
            )}

            {type === 'fuel_combustion' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fuel Source Type"
                            value={fuelSourceType}
                            onChange={(e) => setFuelSourceType(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fuel Source Unit"
                            value={fuelSourceUnit}
                            onChange={(e) => setFuelSourceUnit(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fuel Source Value"
                            value={fuelSourceValue}
                            onChange={(e) => setFuelSourceValue(e.target.value)}
                            type="number"
                            step="any"
                        />
                    </Grid>
                </Grid>
            )}

            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Calculate</Button>
            </Box>

            {carbonEstimate && (
                <Card sx={{ marginTop: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Estimated CO2 Emissions:</Typography>
                        <Typography>Carbon Estimate: {carbonEstimate.co2_emission} kg</Typography>
                        {/* Add more details as needed */}
                    </CardContent>
                </Card>
            )}

            {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>
            )}
        </Box>
    );
};

export default CO2Emission;

