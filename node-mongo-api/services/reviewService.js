const mongoose = require("mongoose");
const ReviewModel = mongoose.model("Review");

const {addTourDao, listAllReviewsDao} = require("../dao/coursesDao");

async function addReviewService(obj){
  try{
    return(await addTourDao(ReviewModel, obj))
  }catch(err){
    return(err)
  }
}

async function listAllReviewService(){
  try{
    return(await listAllReviewsDao(ReviewModel))
  }catch(err){
    return(err)
  }
}

// async function listReviewService
module.exports = {
  addReviewService: addReviewService,
  listAllReviewService: listAllReviewService
}