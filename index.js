const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON

// Routes
const shipmentRoutes = require("./routes/shipments");
app.use("/api/shipments", shipmentRoutes); // Your API endpoint

// Root route
app.get("/", (req, res) => {
  res.send("✅ TrackSmart backend is running!");
});

// Optional: Catch-all for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
