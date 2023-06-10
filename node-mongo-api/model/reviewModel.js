//review /rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  guides: [
   { type: mongoose.Schema.ObjectId,
    ref: "Login"}
  ],
  tours: [{
    type: mongoose.Schema.ObjectId,
    ref: "Tour"
  }]
})
mongoose.model("Review", reviewSchema);