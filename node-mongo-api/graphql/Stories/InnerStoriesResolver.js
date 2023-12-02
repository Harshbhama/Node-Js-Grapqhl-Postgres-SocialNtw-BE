const { createStory} = require("../../dao/postgres/storyDao");
const { deleteInnerStory, deleteLikedInnerStory} = require("../../dao/postgres/innerStoryDao"); 
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
  }
}
module.exports = resolvers