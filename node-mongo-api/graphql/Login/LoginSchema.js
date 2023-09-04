const { buildSchema } = require("graphql");

const schema = buildSchema(`

  type Res {
    rows: [String]
  }
  type User {
    email: String!
    name: String!
    password: String!
    error: Boolean
    msg: String!
    data: User
    res: Res
    token: String
  }
  type UserLogin{
    error: Boolean!
    msg: String!
    token: String
    user_id: Int
  }
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
  type Mutation {
    createUser(email: String!, name: String!, password: String!): User
    updateUser(id: ID!, first_name: String, last_name: String, password: String): User
    deleteUser(id: ID!): User
    loginUser(email: String!, password: String!): UserLogin
  }
`);

module.exports = schema;