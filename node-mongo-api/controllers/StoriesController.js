const schema = require("../graphql/Stories/StoriesSchema");
const resolvers = require("../graphql/Stories/StoriesResolver");
async function storyGraphql(path, application, graphqlHTTP) {
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
  storyGraphql: storyGraphql
}