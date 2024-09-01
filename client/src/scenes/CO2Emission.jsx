import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, FormControl, Box, Card, CardContent } from '@mui/material';

const CO2Emission = () => {
    const [type, setType] = useState('');
    const [electricityUnit, setElectricityUnit] = useState('mwh');
    const [electricityValue, setElectricityValue] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [passengers, setPassengers] = useState(1);
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

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async () => {
        let requestData = {};
        if (type === 'electricity') {
            requestData = {
                type: 'electricity',
                electricity_unit: electricityUnit,
                electricity_value: electricityValue,
                country,
                state,
            };
        } else if (type === 'flight') {
            requestData = {
                type: 'flight',
                passengers,
                legs: [
                    { departure_airport: departureAirport, destination_airport: destinationAirport }
                ],
            };
        } else if (type === 'shipping') {
            requestData = {
                type: 'shipping',
                weight_value: weightValue,
                weight_unit: weightUnit,
                distance_value: distanceValue,
                distance_unit: distanceUnit,
                transport_method: transportMethod,
            };
        } else if (type === 'vehicle') {
            requestData = {
                type: 'vehicle',
                distance_value: distanceValue,
                distance_unit: distanceUnit,
                vehicle_model_id: vehicleModelId,
            };
        } else if (type === 'fuel_combustion') {
            requestData = {
                type: 'fuel_combustion',
                fuel_source_type: fuelSourceType,
                fuel_source_unit: fuelSourceUnit,
                fuel_source_value: fuelSourceValue,
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
        } catch (error) {
            console.error('Error fetching carbon estimate:', error);
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
                            <MenuItem value="train">Train</MenuItem>
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
                            select
                        >
                            <MenuItem value="l">Liters</MenuItem>
                            <MenuItem value="gal">Gallons</MenuItem>
                            <MenuItem value="kg">Kilograms</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fuel Source Value"
                            value={fuelSourceValue}
                            onChange={(e) => setFuelSourceValue(e.target.value)}
                            type="number"
                        />
                    </Grid>
                </Grid>
            )}

            <Box mt={4}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Calculate CO2 Emission
                </Button>
            </Box>

            {carbonEstimate && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            CO2 Emission Estimate
                        </Typography>
                        <Typography variant="body1">
                            Carbon in kg: {carbonEstimate.carbon_kg}
                        </Typography>
                        <Typography variant="body1">
                            Carbon in tonnes: {carbonEstimate.carbon_mt}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default CO2Emission;
