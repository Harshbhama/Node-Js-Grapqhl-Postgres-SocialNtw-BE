const mongoose = require("mongoose");

var LoginSchema = new mongoose.Schema({
    email : {
        type: String,
        required: "Required", unique: true 
    },
    first_name: {
        type: String,
        required: "Required", default: null
    },
    last_name: {
        type: String,
        required: "Required", default: null
    },
    password: {
        type: String,
        required: "Required"
    }
});
mongoose.model("Login", LoginSchema);


