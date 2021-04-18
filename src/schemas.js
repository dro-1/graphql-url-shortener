const { buildSchema } = require("graphql");

const schema = buildSchema(`

    type CreateLinkResponse{
        shortUrl: String!
    }

    type RootMutation{
        createLink(url: String!): CreateLinkResponse
    }

    type RootQuery{
        hello: String
    }

    schema{
        mutation: RootMutation
        query: RootQuery
    }
`);

module.exports = schema;
