const mongoose = require("mongoose");

var CountrySchema = new mongoose.Schema({
  city: {
    type: String
  }
})
mongoose.model("Countries", CountrySchema)