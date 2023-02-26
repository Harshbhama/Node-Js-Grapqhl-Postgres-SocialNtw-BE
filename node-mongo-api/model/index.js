const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Project", { useNewUrlParser: true}, (err) => {
    if(err)
    console.log("err",err);
    else
    console.log("Connected to DB")
});

const course = require("./courses.model")
const login = require("./login.model")
const products = require("./products.model")