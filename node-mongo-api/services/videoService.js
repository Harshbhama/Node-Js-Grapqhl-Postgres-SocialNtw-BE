const mongoose = require("mongoose");
const VideoModel = mongoose.model("Video");

var { addDao, findOne } = require("../dao/coursesDao");

const addVideoService = async (req, res) => {
  const video = new VideoModel();
  const {videoName, videoID} = req.body;
  video.videoName = videoName;
  video.videoID = videoID;
  let checkForUsername = await findOne(VideoModel, videoName);
  if(!checkForUsername.data){
    return new Promise ((resolve, reject) => {
      addDao(video).then(res => resolve(res)).catch(err => reject(err))
    })
  }else{
    return {error: true, data: "Video with name already exists"}
  }
  console.log(checkForUsername)
  
}
module.exports = {
  addVideoService: addVideoService
}