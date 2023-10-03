const { buildSchema } = require("graphql");
const schema = buildSchema(`
  type Query {
    getAllStoryById: [StoriesData]
    getAllStory: [StoriesData]
    getStoryWithLikes: [StoriesData]
    getStoryWithLikesById: [StoriesData]
  }
  type StoriesData {
    id: Int,
    description: String,
    like_count: Int,
    user_id: Int
    picture: String,
    msg: String,
    title: String,
    story_id: Int,
    liked_by_user: [Int],
    liked_count: Int
  }
  type Stories{
    user_id: Int,
    error: String,
    msg: String,
    id: Int
  }
  type Mutation {
    addStory(user_id: Int,  description: String, picture: String, title: String): Stories
    deleteStory(id: Int): Stories
    updateStory(id: Int,  description: String, picture: String, like_count: Int): Stories
  }
`)

 module.exports = schema