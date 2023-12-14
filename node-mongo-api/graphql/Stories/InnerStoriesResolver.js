const { createStory} = require("../../dao/postgres/storyDao");
const { deleteInnerStory, deleteLikedInnerStory, likeInnerStory, unlikeInnerStory} = require("../../dao/postgres/innerStoryDao"); 
const { authoraziation } = require("../../utilities/commonUtilities");

const resolvers = {

  deleteStory: async ({inner_story_id}, _res) => {
    try{
      let auth = await authoraziation(_res.cookies.token);
      let innerStory = await deleteLikedInnerStory(inner_story_id);
      let story = await deleteInnerStory(inner_story_id);
      return({
        msg: "Deleted Successfully"
      })
      // return story.rows
    }catch(err){
      console.log(err);
    }
  },
  checkForLikes: async({}, _res) => {
    try{
      
    }catch(err){
      console.log(err);
    }
  },
  deleteLikedInnerStoryResolver: async({inner_story_id}, _res) => {
    try{
      let innerStory = await deleteLikedInnerStory(inner_story_id);
      return({
        msg: "Deleted Successfully"
      })
    }catch(err){
      console.log(err);
    }
  },
  likeInnerStoryResolver: async({liked_inner_story_id, liked_by_user_inner_story}, _res) => {
    try{
      let innerStoryLike = likeInnerStory(liked_inner_story_id, liked_by_user_inner_story)
      return({
        msg: "Liked Successfully",
        error: "false"
      })
    }catch(err){
      return({
        msg: err,
        error: true
      })
    }
  },
  unlikeInnerStoryResolver: async({liked_inner_story_id, liked_by_user_inner_story}, _res) => {
    try{
      let innerStoryLike = unlikeInnerStory(liked_inner_story_id, liked_by_user_inner_story)
      return({
        msg: "Unliked Successfully"
      })
    }catch(err){
      return({
        msg: err,
        error: true
      })
    }
  }

}
module.exports = resolvers