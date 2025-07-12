// seed.js
const mongoose = require("mongoose");
const Shipment = require("./models/Shipment");

// ✅ Final working MongoDB connection string
mongoose.connect("mongodb+srv://admin:admin1234@tracksmartcluster.xqwworz.mongodb.net/?retryWrites=true&w=majority&appName=TrackSmartCluster", {
  dbName: "tracksmart",
});

const shipments = [
  {
    id: "SHP001",
    origin: "Mumbai",
    originCoords: { lat: 19.076, lng: 72.8777 },
    destination: "Delhi",
    destinationCoords: { lat: 28.6139, lng: 77.2090 },
    status: "In Transit",
    eta: new Date("2025-07-12T15:00:00Z"),
  },
  {
    id: "SHP002",
    origin: "Bangalore",
    originCoords: { lat: 12.9716, lng: 77.5946 },
    destination: "Hyderabad",
    destinationCoords: { lat: 17.385, lng: 78.4867 },
    status: "Delivered",
    eta: new Date("2025-07-08T11:30:00Z"),
  },
  {
    id: "SHP123",
    origin: "Hubli",
    originCoords: { lat: 15.3647, lng: 75.124 },
    destination: "Blr",
    destinationCoords: { lat: 12.9716, lng: 77.5946 },
    status: "In Transit",
    eta: new Date("2025-07-20T10:00:00Z"),
  },
];

async function seedData() {
  try {
    await Shipment.deleteMany({});
    await Shipment.insertMany(shipments);
    console.log("✅ Shipments inserted successfully");
  } catch (err) {
    console.error("❌ Error inserting shipments:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
