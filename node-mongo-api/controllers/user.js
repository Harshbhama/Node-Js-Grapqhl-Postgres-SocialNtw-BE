const express = require("express");
const router = express.Router();
var { addUserService, listUserService } = require("../services/userService");
router.get('/', (req, res) => {
  res.json({
    error: false,
    data: "User Controller"
  })
})

router.post('/addUser', async (req, res) => {
  let service = await addUserService(req, res);
  res.json(service);
})
router.get('/listUser', async (req, res) => {
  let service = await listUserService(req, res);
  res.json(service);
})


module.exports = router;