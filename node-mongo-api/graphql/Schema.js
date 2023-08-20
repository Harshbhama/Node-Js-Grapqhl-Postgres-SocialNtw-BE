const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
    password: String!
    error: Boolean
    msg: String!
    data: User
  }
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
  type Mutation {
    createUser(email: String!, first_name: String!, last_name: String!, password: String!): User
    updateUser(id: ID!, first_name: String, last_name: String, password: String): User
    deleteUser(id: ID!): User
  }
`);

module.exports = schema;