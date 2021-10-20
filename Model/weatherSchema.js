const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("error connecting to database");
  });

const weatherSchema = new mongoose.Schema({
  localTitle:     { type: String },
  localType:      { type: String },
  localLatLon:    { type: String },
  wheaStatus:     { type: String },
  wheaStatusDesc: { type: String },
  wheaCount:      { type: String },
  wheaIcon:       { type: String },
  wheaPressure:   { type: String },
  wheaHumid:      { type: String },
});

const WeaValue = mongoose.model("weather_stats", weatherSchema);

module.exports = WeaValue;