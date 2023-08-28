const schema = require("../graphql/Login/LoginSchema");
const resolvers = require("../graphql/Login/LoginResolver"); 
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