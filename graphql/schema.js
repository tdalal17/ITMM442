const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    posts: [Post!]!
    users: [User!]!
  }

  type Mutation {
    createPost(title: String!, content: String!, published: Boolean!, userId: Int!): Post
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }
`;

module.exports = typeDefs;