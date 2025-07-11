const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// @route   GET /api/shipments
// @desc    Get all shipment data
// @access  Public
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (err) {
    console.error("❌ Error fetching shipments:", err.message);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});

module.exports = router;
