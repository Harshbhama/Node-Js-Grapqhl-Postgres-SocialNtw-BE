const connection = require("./model")

const express = require("express")
const application = express();
const path = require("path")
const bodyparser = require("body-parser")
const cors = require('cors');
const redis = require('redis');
const client = redis.createClient();
const session = require("express-session")
client.on('connect', function() {
    console.log('Connected to redis server');
}).on('error', function (error) {
    console.log(error);
});

const CourseController = require('./controllers/courses');
const LoginController = require('./controllers/authentication');
const ProductController = require('./controllers/products');
const UserController = require('./controllers/user');
const VideoController = require('./controllers/videoController')
// const LearnJavascrpt = require('./controllers/learnJavascript');
application.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
application.use(bodyparser.urlencoded({
    extended: true
}));

application.use(bodyparser.json({limit: '2mb'}))

application.use(cors());

//  application.use("/", LearnJavascrpt);

application.get("/", (req, res) => {
    res.json({
        error: false,
        data: "Get request successfull"
    })
})
application.use("/authentication", LoginController);

application.use("/course", CourseController);
application.use("/products",ProductController);
application.use("/user", UserController);
application.use("/video", VideoController);
application.listen("4000", () => {
    console.log("server started");

})
