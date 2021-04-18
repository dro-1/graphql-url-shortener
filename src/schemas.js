const { buildSchema } = require("graphql");

const schema = buildSchema(`

    type RootQuery{
        shortenURL(url: String!): String!
    }

    schema{
        query: RootQuery
    }
`);

module.exports = schema;
