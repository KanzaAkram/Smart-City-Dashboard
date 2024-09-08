// src/components/ParkingAvailability.jsx

import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Sample parking data
const sampleParkingData = [
  {
    id: 1,
    location: 'Downtown Area',
    availableSpots: 12,
    totalSpots: 20,
    coordinates: { lat: 40.7128, lon: -74.0060 }
  },
  {
    id: 2,
    location: 'Central Park',
    availableSpots: 5,
    totalSpots: 15,
    coordinates: { lat: 40.7851, lon: -73.9683 }
  },
  {
    id: 3,
    location: 'Uptown District',
    availableSpots: 8,
    totalSpots: 10,
    coordinates: { lat: 40.7995, lon: -73.9597 }
  }
];

// Parking Map Component
const ParkingMap = () => (
  <MapContainer center={[40.7128, -74.0060]} zoom={12} style={{ height: "500px", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {sampleParkingData.map((data) => (
      <Marker position={[data.coordinates.lat, data.coordinates.lon]} key={data.id}>
        <Popup>
          <div>
            <strong>{data.location}</strong><br />
            Available Spots: {data.availableSpots}<br />
            Total Spots: {data.totalSpots}
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

// Parking Dashboard Component
const ParkingAvailability = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ffffff', backgroundColor: '#003366', padding: '10px' }}>
      Parking Availability Dashboard
    </Typography>
    
    <Grid container spacing={3}>
      {sampleParkingData.map((data) => (
        <Grid item xs={12} sm={6} md={4} key={data.id}>
          <Card variant="outlined" style={{ backgroundColor: '#003366', color: '#ffffff' }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ color: '#ffffff' }}>
                {data.location}
              </Typography>
              <Typography color="textSecondary" style={{ color: '#b0c4de' }}>
                Available Spots: {data.availableSpots}
              </Typography>
              <Typography color="textSecondary" style={{ color: '#b0c4de' }}>
                Total Spots: {data.totalSpots}
              </Typography>
              <Typography color="textSecondary" style={{ color: '#b0c4de' }}>
                Coordinates: Lat {data.coordinates.lat}, Lon {data.coordinates.lon}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Typography variant="h5" component="div" style={{ marginTop: '20px', backgroundColor: '#003366', color: '#ffffff', padding: '10px' }}>
      Parking Locations Map
    </Typography>
    
    <ParkingMap />
  </Container>
);

export default ParkingAvailability;



