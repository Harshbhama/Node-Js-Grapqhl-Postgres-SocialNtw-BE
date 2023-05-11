const mongoose = require("mongoose");
const VideoModel = mongoose.model("Video");

var { addDao, findOne, listAllData } = require("../dao/coursesDao");

const addVideoService = async (req, res) => {
  const video = new VideoModel();
  const {videoName, videoID} = req.body;
  if(videoName){
    video.videoName = videoName;
    video.videoID = req.session.userData.user_id;
    let checkForUsername = await findOne(VideoModel, videoName);
    if(!checkForUsername.data){
      return new Promise ((resolve, reject) => {
        addDao(video).then(res => resolve(res)).catch(err => reject(err))
      })
    }else{
      return {error: true, data: "Video with name already exists"}
    }
  }else{
    return {error: true, data: "Video name missing !"}
  }
}

const listVideoService = async (req, res) => {
  let obj = {videoID: req.session.userData.user_id}
  return new Promise((resolve, reject) => {
    listAllData(VideoModel, obj).then(res => resolve(res)).catch(err => reject(err))
  })

}

module.exports = {
  addVideoService: addVideoService,
  listVideoService: listVideoService
}