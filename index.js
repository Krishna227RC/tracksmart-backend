const express = require("express");
const cors = require("cors"); // <-- Import CORS
const connectDB = require("./db");
const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins (you can restrict it later if needed)
app.use(cors());

// For parsing JSON
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Routes
const shipmentRoutes = require("./routes/shipments");
app.use("/api/shipments", shipmentRoutes); // ✅ Add /api to route for clarity

// Root route
app.get("/", (req, res) => {
  res.send("✅ TrackSmart backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
