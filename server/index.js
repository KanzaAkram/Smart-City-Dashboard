import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import generalRoutes from "./routes/generalRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
// import airQualityRoutes from './routes/airQualityRoutes.js';
import trafficRoutes from './routes/trafficRoutes.js';
// import weatherRoutes from './routes/weatherRoutes.js';
import co2EmissionRoutes from './routes/co2EmissionRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
// app.use('/api/airquality', airQualityRoutes);
// app.use('/api/weather', weatherRoutes);
app.use('/api/co2emissions', co2EmissionRoutes);
app.use('/api/traffic', trafficRoutes);


// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    const dbStatus = mongoose.connection.readyState;
    if (dbStatus === 1) {
      console.log("Database is running and ready.");
    } else {
      console.log("Database is not running or has issues.");
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

