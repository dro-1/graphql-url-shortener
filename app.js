require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/schemas");
const resolvers = require("./src/resolvers");
const dbConnector = require("./utils/db");
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

app.get("/:hash", urlController.getLink);

app.use((req, res) =>
  res.send(
    "WELCOME :) to my GraphQL Url Shortener. Go to /graphiql to get started"
  )
);

dbConnector(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
