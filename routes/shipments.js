const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

// GET all shipments
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
});

module.exports = router;