const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ prisma }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  app.listen(4001, () => console.log('Server running on http://localhost:4001'));
}

startServer()
  .catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });