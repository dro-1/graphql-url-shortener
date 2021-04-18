require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const schema = require("./schemas");
const resolvers = require("./resolvers");
const dbConnector = require("../utils/db");
const URL = require("./models");
const urlController = require("./urlController");

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
