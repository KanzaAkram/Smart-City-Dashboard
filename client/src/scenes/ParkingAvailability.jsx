// src/scenes/ParkingAvailability.jsx

import React from 'react';
import { Grid, Card, CardContent, Typography, Divider, Box, TextField, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bar } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';

const ParkingAvailability = () => {
  // Dummy data for the example
  const parkingData = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
    datasets: [
      {
        label: 'Available Spots',
        data: [15, 22, 8, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Parking Zones',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Available Spots',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Parking Availability Dashboard
            </Typography>
            <Divider style={{ margin: '10px 0' }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="div">
                  Search Parking
                </Typography>
                <TextField label="Enter Location" variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
                <Button variant="contained" color="primary">
                  Search
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="div">
                  Parking Map
                </Typography>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>Available Parking Spot</Popup>
                  </Marker>
                </MapContainer>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Parking Availability by Zone
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                  <Bar data={parkingData} options={chartOptions} />
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ParkingAvailability;
