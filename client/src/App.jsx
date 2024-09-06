import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { themeSettings } from "./theme";
import Layout from "./scenes/Layout";
import Dashboard from "./scenes/Dashboard";
import AirQuality from "./scenes/AirQuality";
import Customers from "./scenes/Customers";
import Transactions from "./scenes/Transactions";
import Geography from "./scenes/Geography";
import Overview from "./scenes/Overview";
import Daily from "./scenes/Daily";
import Monthly from "./scenes/Monthly";
import Breakdown from "./scenes/Breakdown";
import Admin from "./scenes/Admin";
import Performance from "./scenes/Performance";
import Weather from "./scenes/Weather";
import CO2Emission from "./scenes/CO2Emission";
import TrafficFlowMap from "./scenes/TrafficFlowMap"; // Import TrafficFlowMap component
import WaterUsage from "./scenes/WaterUsage";
import EnergyConsumption from "./scenes/EnergyConsumption";
import ParkingAvailability from "./scenes/ParkingAvailability"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/airquality" element={<AirQuality />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/geography" element={<Geography />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/co2emissions" element={<CO2Emission />} />
      <Route path="/trafficflow" element={<TrafficFlowMap />} /> {/* Added route */}
      <Route path="/waterusage" element={<WaterUsage />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/breakdown" element={<Breakdown />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/energy-consumption" element={<EnergyConsumption />} />
      <Route path="/parkingavailability" element={<ParkingAvailability />} />



    </Route>
  )
);

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
