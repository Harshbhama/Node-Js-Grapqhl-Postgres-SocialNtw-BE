const { buildSchema } = require("graphql");
const schema = buildSchema(`
  type Query {
    getAllStory: [StoriesData]
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
    liked_count: Int,
    num_rows: String,
    inner_picture: [String],
    inner_id: [Int],
    liked_by_user_inner_story: [Int]
  }
  type Stories{
    user_id: Int,
    error: String,
    msg: String,
    id: Int
  }
  type Mutation {
    deleteStory(inner_story_id: Int): Stories
    deleteLikedInnerStoryResolver(inner_story_id: Int): Stories
    likeInnerStoryResolver(liked_inner_story_id: Int, liked_by_user_inner_story: Int): Stories
    unlikeInnerStoryResolver(liked_inner_story_id: Int, liked_by_user_inner_story: Int): Stories
  }
`)

 module.exports = schema