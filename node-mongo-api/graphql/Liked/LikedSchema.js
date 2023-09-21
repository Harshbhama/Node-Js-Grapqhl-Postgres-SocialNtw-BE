const { buildSchema } = require("graphql");
const schema = buildSchema(`
  type Query {
    getAllStoryById: [StoriesData]
    getAllStory: [StoriesData]
    getLikedStoryByUserId: [StoryByUserId]
  }
  type StoriesData {
    id: Int,
    description: String,
    like_count: Int,
    user_id: Int
    picture: String,
    msg: String,
    title: String
  }
  type Stories{
    user_id: Int,
    error: String,
    msg: String,
    id: Int
  }
  type StoryByUserId {
    story_id: Int
    error: String,
  }
  type Mutation {
    likeStory(story_id: Int): Stories
  }
`)

 module.exports = schema