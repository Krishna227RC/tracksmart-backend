const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // To avoid duplicates
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"], // Optional but good practice
    },
    eta: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
