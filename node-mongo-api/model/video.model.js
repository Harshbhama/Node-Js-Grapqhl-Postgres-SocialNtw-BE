const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var VideoSchema = new mongoose.Schema({
  videoName: {
    type: String,
    require: 'true'
  },
  videoID: {
    type: Schema.Types.ObjectId,
    ref: 'Login',
    required: true
  }
});
mongoose.model("Video", VideoSchema);


