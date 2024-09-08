import React from 'react';
import { useTheme, Box, Typography, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Sample data
const data = {
  airQuality: { aqi: 75, description: "Moderate" },
  weather: { temperature: 30, description: "Sunny", humidity: "60%", windSpeed: "10 km/h" },
  co2Emissions: { electricity: 350, flight: 200, shipping: 150, vehicle: 100 },
  traffic: { congestion: "High", averageSpeed: 25, incidents: 5 },
  parking: { availableSpaces: 20, totalSpaces: 100, occupancyRate: "80%" },
  energy: { consumption: { residential: 500, commercial: 300, industrial: 400 }, generation: { solar: 40, wind: 30, fossilFuel: 60 } },
  water: { usage: { residential: 2000, industrial: 5000 }, availability: "Good" },
  mapCenter: [30.3753, 69.3451], // Coordinates for a map center (e.g., Pakistan)
  parkingSpaces: [
    { position: [30.3753, 69.3451], name: "Parking Lot 1" },
    { position: [30.2753, 69.3451], name: "Parking Lot 2" }
  ]
};

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
        Dashboard Overview
      </Typography>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Air Quality */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <img src="/images/wind.png" alt="Air Quality" style={{ width: 100, height: 100, marginBottom: '1rem' }} />
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Air Quality Index
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.secondary[300] }}>
            {data.airQuality.aqi}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary[200] }}>
            {data.airQuality.description}
          </Typography>
        </Box>

        {/* Weather */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <img src="/images/cloud.png" alt="Weather" style={{ width: 100, height: 100, marginBottom: '1rem' }} />
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Weather
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.secondary[300] }}>
            {data.weather.temperature} °C
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary[200] }}>
            {data.weather.description} | Humidity: {data.weather.humidity} | Wind Speed: {data.weather.windSpeed}
          </Typography>
        </Box>

        {/* CO2 Emissions Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            CO2 Emissions Breakdown
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={Object.keys(data.co2Emissions).map(key => ({ name: key, value: data.co2Emissions[key] }))} dataKey="value" outerRadius={60} label>
                <Cell fill="#8884d8" />
                <Cell fill="#82ca9d" />
                <Cell fill="#ffc658" />
                <Cell fill="#ff6f61" />
              </Pie>
              <Tooltip contentStyle={{ fontSize: '12px', backgroundColor: '#fff', borderColor: '#ddd' }} />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '13px', paddingTop: '200px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Traffic Flow Line Chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Traffic Flow
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{ name: 'Traffic', speed: data.traffic.averageSpeed, incidents: data.traffic.incidents }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ fontSize: '14px', backgroundColor: '#fff', borderColor: '#ddd' }} />
              <Line type="monotone" dataKey="speed" stroke="#8884d8" />
              <Line type="monotone" dataKey="incidents" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <Typography variant="body2" sx={{
            marginTop: "5rem",
            fontWeight: "bold",
            fontSize: "1rem",  // Adjust size as needed
            textAlign: "center"
          }}>
            Average Speed: {data.traffic.averageSpeed} km/h | Incidents: {data.traffic.incidents}
          </Typography>
        </Box>

        {/* Parking Availability Bar Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] ,marginBottom:"70px"}}>
            Parking Availability
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: 'Available Spaces', value: data.parking.availableSpaces }, { name: 'Total Spaces', value: data.parking.totalSpaces }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ fontSize: '14px', backgroundColor: '#fff', borderColor: '#ddd' }} />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Energy Consumption Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="0.1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], paddingTop:"10px", paddingLeft:"80px" }}>
            Energy Consumption
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={Object.keys(data.energy.consumption).map(key => ({ name: key, value: data.energy.consumption[key] }))} dataKey="value" outerRadius={60} label>
                <Cell fill="#8884d8" />
                <Cell fill="#82ca9d" />
                <Cell fill="#ffc658" />
              </Pie>
              <Tooltip contentStyle={{ fontSize: '14px', backgroundColor: '#fff', borderColor: '#ddd' }} />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '14px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Water Usage Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], marginLeft:"90px" }}>
            Water Usage
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={Object.keys(data.water.usage).map(key => ({ name: key, value: data.water.usage[key] }))} dataKey="value" outerRadius={60} label>
                <Cell fill="#8884d8" />
                <Cell fill="#82ca9d" />
                <Cell fill="#ffc658" />
              </Pie>
              <Tooltip contentStyle={{ fontSize: '14px', backgroundColor: '#fff', borderColor: '#ddd' }} />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '14px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Parking Map */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Parking Locations
          </Typography>
          <MapContainer center={data.mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />
            {data.parkingSpaces.map((space, index) => (
              <Marker key={index} position={space.position}>
                <Popup>{space.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
