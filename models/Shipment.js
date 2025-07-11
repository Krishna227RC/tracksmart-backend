const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  id: String,
  origin: String,
  destination: String,
  status: String,
  eta: String,
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;