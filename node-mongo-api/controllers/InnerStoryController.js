const schema = require("../graphql/Stories/InnerStoriesSchema");
const resolvers = require("../graphql/Stories/InnerStoriesResolver");
async function innerStoryGraphql(path, application, graphqlHTTP) {
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
    innerStoryGraphql: innerStoryGraphql
}