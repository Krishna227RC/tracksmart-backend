const express = require("express");
const router = express.Router();

// Mock shipment data
const shipments = [
  {
    id: "SHP001",
    origin: "Mumbai",
    destination: "Delhi",
    status: "In Transit",
    eta: "2025-07-12T15:00:00Z",
  },
  {
    id: "SHP002",
    origin: "Bangalore",
    destination: "Hyderabad",
    status: "Delivered",
    eta: "2025-07-08T11:30:00Z",
  },
];

// GET /shipments
router.get("/", (req, res) => {
  res.json(shipments);
});

module.exports = router;