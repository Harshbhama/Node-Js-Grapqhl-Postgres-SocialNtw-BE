const { likeStoryDao, getStoryByUserId, makeLikeDao, unLikeDao } = require("../../dao/postgres/likedDao");
const { authoraziation } = require("../../utilities/commonUtilities");

const resolvers = {
  likeStory: async ({ story_id }, _res) => {
    try {
      let auth = await authoraziation(_res.cookies.token)
      console.log(auth.user_id)
      let like = await likeStoryDao(auth.user_id, story_id)

    } catch (err) {
      console.log(err)
      return (err)
    }
  },
  getLikedStoryByUserId: async ({}, _res) => {
    try {
      let auth = await authoraziation(_res.cookies.token)
      let like = await getStoryByUserId(auth.user_id)
      if(Array.isArray(like.rows)){
        return(like.rows)
      }else{
        return([])
      }
    } catch (err) {
      console.log(err)
      return (err)
    }
  },
  makeLike: async ({story_id}, _res) => {
    try {
      let auth = await authoraziation(_res.cookies.token)
      let like = await makeLikeDao(auth.user_id, story_id)
      if(like){
        return({
          error: "false",
          msg: "Liked successfully"
        })
      }
    } catch (err) {
      console.log(err)
      return (err)
    }
  },
  unLike: async ({story_id}, _res) => {
    try {
      let auth = await authoraziation(_res.cookies.token)
      let unlike = await unLikeDao(auth.user_id, story_id)
      if(unlike){
        return({
          error: "false",
          msg: "Unliked successfully"
        })
      }
    } catch (err) {
      console.log(err)
      return (err)
    }
  }
}
module.exports = resolvers