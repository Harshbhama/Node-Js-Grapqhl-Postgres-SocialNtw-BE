const { buildSchema } = require("graphql");
const schema = buildSchema(`
  type Query {
    getAllStoryById(id: ID!): [StoriesData]
    getAllStory: [StoriesData]
  }
  type StoriesData {
    id: Int,
    description: String,
    like_count: Int,
    user_id: Int
    picture: String
  }
  type Stories{
    user_id: Int,
    error: String,
    msg: String,
    id: Int
  }
  type Mutation {
    addStory(user_id: Int,  description: String, picture: String, like_count: Int): Stories
    deleteStory(id: Int): Stories
    updateStory(id: Int,  description: String, picture: String, like_count: Int): Stories
  }
`)

module.exports = schema