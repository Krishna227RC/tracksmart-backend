const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// ✅ GET all shipments
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (err) {
    console.error("❌ Error fetching shipments:", err.message);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});

// ✅ GET a single shipment by custom 'id' field
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

// ✅ POST a new shipment
router.post("/", async (req, res) => {
  try {
    const { id, origin, destination, status, eta } = req.body;

    // Validate input
    if (!id || !origin || !destination || !status || !eta) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if shipment already exists
    const existingShipment = await Shipment.findOne({ id });
    if (existingShipment) {
      return res.status(409).json({ error: "Shipment ID already exists" });
    }

    // Create and save new shipment
    const newShipment = new Shipment({
      id,
      origin,
      destination,
      status,
      eta: new Date(eta),
    });

    const savedShipment = await newShipment.save();
    res.status(201).json(savedShipment);
  } catch (err) {
    console.error("❌ Error creating shipment:", err.message);
    res.status(500).json({ error: "Failed to add shipment" });
  }
});

module.exports = router;
