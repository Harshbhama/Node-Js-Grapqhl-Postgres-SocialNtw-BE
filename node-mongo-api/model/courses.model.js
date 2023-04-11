const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: "Required"
  },
  courseId: {
    type: String,

  },
  courseDuration: {
    type: String
  },
  courseFee: {
    type: String
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
mongoose.model("Course", CourseSchema);


