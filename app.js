require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const schema = require("./src/schemas");
const resolvers = require("./src/resolvers");
const dbConnector = require("./utils/db");
const URL = require("./src/models");
const urlController = require("./src/urlController");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/short/:hash", urlController.getLink);

dbConnector(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
