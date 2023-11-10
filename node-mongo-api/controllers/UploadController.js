const express = require("express");
const router = express.Router();
const { imageKitMethod } = require("../utilities/imageKitUpload");
const { authoraziation } = require("../utilities/commonUtilities");
const { createStory } = require("../dao/postgres/storyDao");
const { uploadInnerStory } = require("../dao/postgres/innerStoryDao");
router.post('/uploadStory', async (req, res) => {
  const name = req.files.file.name
  const data = req.files.file.data
  const { description, title } = JSON.parse(req.headers.inputdata) || ""
  let result = await imageKitMethod(name, data)
  try{
    let auth = await authoraziation(req.cookies.token)
    if(result) {
      const imageUrl = result.url;
      let uploadStory = await createStory(description, imageUrl, auth.user_id, title )
      if(uploadStory){
        res.json({
          result: result,
          error: false
        })
      }else{
        res.json({
          result: null,
          error: false
        })
      }
    }else{
      res.json({
        result: null,
        error: true
      })
    }
  }catch(err){
    res.json({
      result: null,
      error: true,
      msg: err
    })
  }
})

router.post('/uploadInnerStory', async (req, res) => {
  const name = req.files.file.name
  const data = req.files.file.data
  const story_id  = JSON.parse(req.headers.storyid) || ""
  let result = await imageKitMethod(name, data);
  try{
    let auth = await authoraziation(req.cookies.token)
    if(result) {
      const imageUrl = result.url;
      let uploadStory = await uploadInnerStory(imageUrl, story_id )
      if(uploadStory){
        res.json({
          result: result,
          error: false
        })
      }else{
        res.json({
          result: null,
          error: false
        })
      }
    }else{
      res.json({
        result: null,
        error: true
      })
    }
  }catch(err){
    res.json({
      result: null,
      error: true,
      msg: err
    })
  }
})


module.exports = router;