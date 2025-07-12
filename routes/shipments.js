const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");
const axios = require("axios");

// Utility to fetch coordinates using OpenStreetMap Nominatim
async function getCoords(place) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    place
  )}&format=json&limit=1`;

  try {
    const res = await axios.get(url, {
      headers: { "User-Agent": "TrackSmart/1.0" },
    });

    if (res.data.length > 0) {
      return {
        lat: parseFloat(res.data[0].lat),
        lng: parseFloat(res.data[0].lon),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching coordinates for:", place);
    return null;
  }
}

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

// ✅ POST a new shipment (with coordinates)
router.post("/", async (req, res) => {
  try {
    const { id, origin, destination, status, eta } = req.body;

    if (!id || !origin || !destination || !status || !eta) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingShipment = await Shipment.findOne({ id });
    if (existingShipment) {
      return res.status(409).json({ error: "Shipment ID already exists" });
    }

    // Fetch coordinates
    const originCoords = await getCoords(origin);
    const destinationCoords = await getCoords(destination);

    if (!originCoords || !destinationCoords) {
      return res
        .status(400)
        .json({ error: "Invalid origin or destination coordinates" });
    }

    const newShipment = new Shipment({
      id,
      origin,
      destination,
      status,
      eta: new Date(eta),
      originCoords,
      destinationCoords,
    });

    const saved = await newShipment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating shipment:", err.message);
    res.status(500).json({ error: "Failed to add shipment" });
  }
});

module.exports = router;
