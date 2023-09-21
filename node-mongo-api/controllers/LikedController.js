const schema = require("../graphql/Liked/LikedSchema");
const resolvers = require("../graphql/Liked/LikedResolver");
async function likedGraphql(path, application, graphqlHTTP) {
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
    likedGraphql: likedGraphql
}