const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const { addVideoService, listVideoService } = require("../services/videoService");

router.use((req, res, next) => {
  const token = req.headers['authorization'];
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
  console.log(req.session.userData)
  let service = await addVideoService(req, res);
  res.json(service);
})

router.get('/listVideo', async(req, res) => {
  let service = await listVideoService(req, res);
  res.json(service);
})

module.exports = router;