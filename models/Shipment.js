const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    origin: {
      type: String,
      required: true,
    },
    originCoords: {
      type: {
        lat: { type: Number },
        lng: { type: Number },
      },
      required: false,
    },
    destination: {
      type: String,
      required: true,
    },
    destinationCoords: {
      type: {
        lat: { type: Number },
        lng: { type: Number },
      },
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
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
