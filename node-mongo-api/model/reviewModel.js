//review /rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user:
  {
    type: mongoose.Schema.ObjectId,
    ref: "Login"
  },
  tours: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour"
  },
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
}
)
reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: 'tours',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'first_name email'
  })
  next();
})

mongoose.model("Review", reviewSchema);