// const connection = require("./model")
const db = require("./postgresql/db")
const express = require("express")
const application = express();
const path = require("path")
const bodyparser = require("body-parser")
const cors = require('cors');
const redis = require('redis');
const client = redis.createClient();
const session = require("express-session")
const cookies = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");
const {loginGrapgql} = require("./controllers/LoginController");
const {storyGraphql} = require("./controllers/StoriesController");
const {likedGraphql} = require("./controllers/LikedController");
const {innerStoryGraphql} = require("./controllers/InnerStoryController");
const { Client } = require("pg")
var upload = require('express-fileupload');
client.on('connect', function() {
    console.log('Connected to redis server');
}).on('error', function (error) {
    console.log(error);
})
require('dotenv').config();
// const CourseController = require('./controllers/courses');
// const LoginController = require('./controllers/authentication');
// const ProductController = require('./controllers/products');
// const UserController = require('./controllers/user');
// const VideoController = require('./controllers/videoController')
// const TourController = require('./controllers/tours');
// const ReviewController = require('./controllers/reviews');
// const CountryController = require('./controllers/countriesController');
const UploadController = require("./controllers/UploadController");

// const LearnJavascrpt = require('./controllers/learnJavascript');
application.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
application.use(bodyparser.urlencoded({
    extended: true
}));

application.use(bodyparser.json({limit: '2mb'}))
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true };
application.use(cors(corsOptions));
application.use(cookies())

//  application.use("/", LearnJavascrpt);

application.get("/", (req, res) => {
    res.json({
        error: false,
        data: "Get request successfull"
    })
})
application.use(upload());
// application.use("/authentication", LoginController);

// application.use("/course", CourseController);
// application.use("/products",ProductController);
// application.use("/user", UserController);
// application.use("/video", VideoController);
// application.use("/tour", TourController);
// application.use("/reviews", ReviewController);
// application.use("/countries", CountryController)
application.use("/upload", UploadController);

loginGrapgql("/login", application, graphqlHTTP);
storyGraphql("/stories", application, graphqlHTTP);
likedGraphql("/liked", application, graphqlHTTP);
innerStoryGraphql("/inner_story", application, graphqlHTTP);
application.listen(process.env.API_PORT, () => {
    console.log("server started");
})
