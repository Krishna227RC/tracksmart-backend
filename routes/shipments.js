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

// @route   GET /api/shipments/:id
// @desc    Get a single shipment by custom field 'id'
// @access  Public
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

// ✅ NEW: POST /api/shipments
// @desc   Add a new shipment
// @access Public
router.post("/", async (req, res) => {
  try {
    const { id, origin, destination, status, eta } = req.body;

    // Check for required fields
    if (!id || !origin || !destination || !status || !eta) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if shipment with same id already exists
    const existing = await Shipment.findOne({ id });
    if (existing) {
      return res.status(409).json({ error: "Shipment ID already exists" });
    }

    const newShipment = new Shipment({
      id,
      origin,
      destination,
      status,
      eta,
    });

    const saved = await newShipment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating shipment:", err.message);
    res.status(500).json({ error: "Failed to add shipment" });
  }
});

module.exports = router;
