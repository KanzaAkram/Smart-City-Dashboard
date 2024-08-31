import { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, CircularProgress, useTheme } from "@mui/material";
import Header from "@/components/Header";

function AirQuality() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(`http://localhost:5001/api/airquality`, {
        params: {
          city: city,
          state: "",  // Add state if needed
          country: "", // Add country if needed
        }
      });

      if (response.data) {
        setData(response.data);
      } else {
        setError("Invalid response structure from the API.");
      }
    } catch (err) {
      setError("Error fetching air quality data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Air Quality" subtitle="Search for a city's air quality index." />

      <Box mb="20px">
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mr: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress color="secondary" />}
      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <Box>
          <Typography variant="h6" color={theme.palette.primary.main}>
            Air Quality Index (AQI) for {data.city}
          </Typography>
          <Typography>
            AQI: {data.aqi}
          </Typography>
          <Typography>
            Main Pollutant: {data.mainPollutant}
          </Typography>
          {/* Add more details and styles as needed */}
        </Box>
      )}
    </Box>
  );
}

export default AirQuality;

