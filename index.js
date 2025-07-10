const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // Needed to parse JSON

// Import the /shipments route
const shipmentRoutes = require("./routes/shipments");
app.use("/shipments", shipmentRoutes);

// Root route for sanity check
app.get("/", (req, res) => {
  res.send("✅ TrackSmart backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
