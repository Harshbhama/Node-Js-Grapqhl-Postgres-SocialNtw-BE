const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Project", { useNewUrlParser: true}, (err) => {
    if(err)
    console.log("err",err);
    else
    console.log("Connected to Mongo DB")
});

const course = require("./courses.model")
const login = require("./login.model")
const products = require("./products.model")
const user = require("./user.model")
const video = require("./video.model")
const tour = require("./tour.model")
const review = require("./reviewModel");
const country = require("./countries.model");
