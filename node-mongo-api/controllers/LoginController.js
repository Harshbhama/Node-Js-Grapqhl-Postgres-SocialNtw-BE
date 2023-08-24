const schema = require("../graphql/Login/Schema");
const resolvers = require("../graphql/Login/Resolver");
async function loginGrapgql(path, application, graphqlHTTP){
  application.use(
    path,
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true,
    })
);
}

module.exports = {
  loginGrapgql: loginGrapgql
}