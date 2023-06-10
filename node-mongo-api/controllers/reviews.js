const express = require("express");
const router = express.Router();

const {addReviewService, listAllReviewService} = require("../services/reviewService");

router.post('/addReview', async(req, res) => {
  try{
    const service =  await addReviewService(req.body);
    res.json(service)
  }catch(err){
    res.json(err)
  }
})
router.post('/listReviews', async(req, res) => {
  try{
    const service = await listAllReviewService();
    res.json(service)
  }catch(err){
    res.json(err)
  }
})
module.exports = router;