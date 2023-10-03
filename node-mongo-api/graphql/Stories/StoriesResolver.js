const {createStory, deleteStoryDao, updateStoryDao, getStories, getStoriesWithLikes} = require("../../dao/postgres/storyDao");
const { authoraziation } = require("../../utilities/commonUtilities");

const resolvers = {
  addStory: async({description, picture, user_id, title}, res) => {
    try{
      let story = await createStory(description, picture, user_id, title);
      return({
        error: false,
        msg: "Story added successfully"
      })
    }catch(err){
      console.log(err)
      return({
        error: true,
        msg: err
      })
    }
  },
  deleteStory: async({id}) => {
    try{
      let story = await deleteStoryDao(id);
      if(story.rowCount !==0){
        return({
          error: false,
          msg: "Story deleted successfully",
          id: id
        })
      }else{
        return({
          error: true,
          msg: "Story not found",
          id: id
        })
      }
     
    }catch(err){
      console.log(err)
    }
  },
  updateStory: async ({id, description, picture, like_count}) => {
    try{
      let update = await updateStoryDao(id, description, picture, like_count);
      if(update.rowCount !== 0){
        return({
          error: false,
          msg: "Update is successfull",
          id: id
        })
      }else{
        return({
          error: true,
          msg: "Id doesnot exist",
          id: id
        })
      }
     
    }catch(err){
      console.log(err)
    }
  },
  getAllStoryById: async({}, _res) => {
    try{
      let auth = await authoraziation(_res.cookies.token)
      console.log(auth.user_id)
      let story = await getStories(auth.user_id, true);
      return story.rows
    }catch(err){
      console.log(err)
    }
  },
  getAllStory: async({}, _res) => {
    try{
     let auth = await authoraziation(_res.cookies.token)
      let story = await getStories(auth.user_id);
      if(story.rows.length > 0){
        return(story.rows)
      }
    }catch(err){
      console.log(err)
      return(err)
    }
  },
  getStoryWithLikes: async({}, _res) => {
    try{
      let auth = await authoraziation(_res.cookies.token)
      let story = await getStoriesWithLikes(auth.user_id);
      if(story.rows.length > 0){
        return(story.rows)
      }
    }catch(err){
      console.log(err)
      return(err)
    }
  },
  getStoryWithLikesById: async({}, _res) => {
    try{
     let auth = await authoraziation(_res.cookies.token)
      let story = await getStoriesWithLikes(auth.user_id, true);
      if(story.rows.length > 0){
        return(story.rows)
      }
    }catch(err){
      console.log(err)
      return(err)
    }
  }
}
module.exports = resolvers