const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const User = require("./user.model");
const Login = mongoose.model("Login");
var tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true
  },
  duration: {
    type: Number,
    require: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    require: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false //To hide from get output
  },
  startDates: [Date],
  startLocation: {
    //GeoJson
    type: {
      type: String,
      default:'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
      
    }
  ],
  // guides: Array -- This is child referencing
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Login"
    }

  ]
},
{
  toJSON: { virtuals: true} ,
  toObject: {virtuals: true}
}
);
// Single field index ---  
// tourSchema.index({price: 1, ratingsAverage: -1}) // Indexing to speed up search, usually given index to that property which is used most in queries

// Used for performance gain



// virtual property is created every time values is get from database.
//  This is not persistant in the DB, it is called everytime we get data.
tourSchema.virtual('durationWeeks').get(function (){
  return this.duration / 7;
});

// Parent referencing was done in review Model, and here we are linking that parent refering via virtuals
// We prevented childrefering for reviews in tours model, by virtuals
tourSchema.virtual('reviews', {
  ref: 'Review', // Name of the model
  foreignField: 'tours', // The field which is want to connect from reviewModal
  localField: '_id' // The field which we want to connect from tourModal
})

//Document Middleware: runs before .save() and .create()

// tourSchema.pre('save', async function(next){
//   const guidesPromises = this.guides.map(async id => await Login.findById(id))
//   this.guides = await Promise.all(guidesPromises);
// })

 
mongoose.model("Tour", tourSchema);