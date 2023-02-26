const express = require("express");
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    res.json({
        error: false,
        data: "Learn Javascript"
    })
    console.log("here");
    console.log("test nodemon");
})
module.exports = router;