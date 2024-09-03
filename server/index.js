// // import bodyParser from "body-parser";
// // import dotenv from "dotenv";
// // import express from "express";
// // import helmet from "helmet";
// // import morgan from "morgan";
// // import cors from "cors";
// // import mongoose from "mongoose";

// // import generalRoutes from "./routes/generalRoutes.js";
// // import clientRoutes from "./routes/clientRoutes.js";
// // import managementRoutes from "./routes/managementRoutes.js";
// // import salesRoutes from "./routes/salesRoutes.js";
// // import Product from "./models/Product.js";
// // import {
// //   dataAffiliateStat,
// //   dataOverallStat,
// //   dataProduct,
// //   dataProductStat,
// //   dataTransaction,
// // } from "./data/index.js";
// // import ProductStat from "./models/ProductStat.js";
// // import Transaction from "./models/Transaction.js";
// // import OverallStat from "./models/OverallStat.js";
// // import AffiliateStat from "./models/AffiliateStat.js";

// // // CONFIGURATION
// // dotenv.config();
// // const app = express();
// // app.use(express.json());
// // app.use(helmet());
// // app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// // app.use(morgan("common"));
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(cors());

// // // ROUTES
// // app.use("/general", generalRoutes);
// // app.use("/client", clientRoutes);
// // app.use("/management", managementRoutes);
// // app.use("/sales", salesRoutes);

// // // MONGOOSE SETUP
// // const PORT = process.env.PORT || 9000;
// // mongoose
// //   .connect(process.env.MONGO_URL)
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`Server running on port: ${PORT}`);
// //     });
// //     // Product.insertMany(dataProduct)
// //     // ProductStat.insertMany(dataProductStat);
// //     // Transaction.insertMany(dataTransaction);
// //     // OverallStat.insertMany(dataOverallStat);
// //     // AffiliateStat.insertMany(dataAffiliateStat);
// //   })
// //   .catch((error) => {
// //     console.log(error.message);
// //   });

// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import express from "express";
// import helmet from "helmet";
// import morgan from "morgan";
// import cors from "cors";
// import mongoose from "mongoose";

// import generalRoutes from "./routes/generalRoutes.js";
// import clientRoutes from "./routes/clientRoutes.js";
// import managementRoutes from "./routes/managementRoutes.js";
// import salesRoutes from "./routes/salesRoutes.js";
// import Product from "./models/Product.js";
// import {
//   dataAffiliateStat,
//   dataOverallStat,
//   dataProduct,
//   dataProductStat,
//   dataTransaction,
// } from "./data/index.js";
// import ProductStat from "./models/ProductStat.js";
// import Transaction from "./models/Transaction.js";
// import OverallStat from "./models/OverallStat.js";
// import AffiliateStat from "./models/AffiliateStat.js";

// // CONFIGURATION
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // ROUTES
// app.use("/general", generalRoutes);
// app.use("/client", clientRoutes);
// app.use("/management", managementRoutes);
// app.use("/sales", salesRoutes);

// // MONGOOSE SETUP
// const PORT = process.env.PORT || 9000;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//     const dbStatus = mongoose.connection.readyState;
//     if (dbStatus === 1) {
//       console.log("Database is running and ready.");
//     } else {
//       console.log("Database is not running or has issues.");
//     }

//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server running on port: ${PORT}`);
//     });

//     // Insert sample data if needed
//     // Product.insertMany(dataProduct)
//     // ProductStat.insertMany(dataProductStat);
//     // Transaction.insertMany(dataTransaction);
//     // OverallStat.insertMany(dataOverallStat);
//     // AffiliateStat.insertMany(dataAffiliateStat);
//   })
//   .catch((error) => {
//     console.log("Error connecting to MongoDB:", error.message);
//   });


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
import airQualityRoutes from './routes/airQualityRoutes.js'; 
import trafficRoutes from './routes/trafficRoutes.js';
 // Import air quality routes
import weatherRoutes from './routes/weatherRoutes.js';
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
// app.use("/airquality", airQualityRoutes); // Use air quality routes directly
app.use('/api/airquality', airQualityRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/co2emissions', co2EmissionRoutes);
app.use('/api/traffic', trafficRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

    // Uncomment if you want to insert sample data
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
