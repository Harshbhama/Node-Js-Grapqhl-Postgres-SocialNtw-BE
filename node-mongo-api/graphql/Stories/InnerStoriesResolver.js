const { createStory} = require("../../dao/postgres/storyDao");
const { deleteInnerStory } = require("../../dao/postgres/innerStoryDao"); 
const { authoraziation } = require("../../utilities/commonUtilities");

const resolvers = {

  deleteStory: async ({inner_story_id}, _res) => {
    try{
      let auth = await authoraziation(_res.cookies.token);
      let story = await deleteInnerStory(inner_story_id);
      console.log(story)
      return({
        msg: "Deleted Successfully"
      })
      // return story.rows
    }catch(err){
      console.log(err);
    }
  },
}
module.exports = resolvers