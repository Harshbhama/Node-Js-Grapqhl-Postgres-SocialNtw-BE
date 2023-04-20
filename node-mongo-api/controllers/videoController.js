const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const { addVideoService } = require("../services/videoService");

router.use((req, res, next) => {
  const token = req.headers['token'];
  console.log(token)

  jwt.verify(token, process.env.TOKEN_KEY , (err, dt) => {
    if (err) {
      res.json("Invalid Token Validation")
    }
    else {
      req.session.userData = dt
      next()
    }
  })
})

router.post('/addVideo', async (req, res) => {
  let service = await addVideoService(req, res);
  res.json(service);
})

module.exports = router;