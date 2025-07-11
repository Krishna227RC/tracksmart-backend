const mongoose = require("mongoose");
const Shipment = require("./models/Shipment");

const MONGO_URI = "mongodb+srv://admin:admin123@tracksmartcluster.xqwworz.mongodb.net/tracksmart?retryWrites=true&w=majority&appName=TrackSmartCluster";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  return Shipment.insertMany([
    {
      id: "SHP001",
      origin: "Mumbai",
      destination: "Delhi",
      status: "In Transit",
      eta: "2025-07-12T15:00:00Z",
    },
    {
      id: "SHP002",
      origin: "Bangalore",
      destination: "Hyderabad",
      status: "Delivered",
      eta: "2025-07-08T11:30:00Z",
    },
  ]);
})
.then(() => {
  console.log("✅ Sample data inserted");
  mongoose.disconnect();
})
.catch((err) => {
  console.error(err);
});