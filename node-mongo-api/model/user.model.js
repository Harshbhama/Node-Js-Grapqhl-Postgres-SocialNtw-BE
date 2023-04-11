const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  courseId: {
    type: String,

  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{ productId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' }, quantity: { type: Number, required: true } }]
  }
});
mongoose.model("User", UserSchema);
