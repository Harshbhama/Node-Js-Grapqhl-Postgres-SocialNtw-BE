const mongoose = require("mongoose");

var ProductsSchema = new mongoose.Schema({
    title: {
      type:String 
    },
    price: {
      type:Number,
    },
    description: {
      type:String,
    },
    imageUrl: {
      type:String,
    }
})
mongoose.model("Product", ProductsSchema);

module.exports = mongoose.model("Product", ProductsSchema)