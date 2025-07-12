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

// ✅ NEW: Get shipment by ID (custom field 'id')
router.get("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ id: req.params.id });
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    res.status(200).json(shipment);
  } catch (err) {
    console.error("❌ Error fetching shipment by ID:", err.message);
    res.status(500).json({ error: "Failed to fetch shipment" });
  }
});

module.exports = router;
