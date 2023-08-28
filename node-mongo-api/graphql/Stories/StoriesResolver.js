const {createStory, deleteStoryDao, updateStoryDao, getStories} = require("../../dao/postgres/storyDao");;
const resolvers = {
  addStory: async({description, picture, like_count, user_id}) => {
    try{
      let story = await createStory(description, picture, like_count, user_id);
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
  getAllStoryById: async({id}) => {
    try{
      let story = await getStories(id);
      return story.rows
    }catch(err){
      console.log(err)
    }
  },
  getAllStory: async({}) => {
    try{
      let story = await getStories();
      if(story.rows.length > 0){
        return(story.rows)
      }
    }catch(err){
      console.log(err)
    }
  }
}
module.exports = resolvers