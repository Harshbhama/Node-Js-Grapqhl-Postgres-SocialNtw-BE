const express = require("express");
const router = express.Router();
const { imageKitMethod } = require("../utilities/imageKitUpload");
router.post('/uploadStory', async (req, res) => {
  const name = req.files.file.name
  const data = req.files.file.data
  let result = await imageKitMethod(name, data)
  if(result) {
    res.json({
      result: result,
      error: false
    })
  }else{
    res.json({
      result: null,
      error: true
    })
  }
  
})


module.exports = router;