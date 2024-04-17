const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // Resolver to read all posts
    posts: async () => await prisma.post.findMany({ include: { author: true } }),

    // Resolver to read a single post by ID
    post: async (_, { id }) => {
      const postId = parseInt(id, 10);
      return await prisma.post.findUnique({
        where: { id: postId },
        include: { author: true },
      });
    },
    
    // Resolver to read all users
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    // Existing createPost mutation resolver
    createPost: async (_, { title, content, published, userId }) => {
      // ... (existing logic for createPost)
    },

    // Resolver to update a post
    updatePost: async (_, { id, title, content, published }) => {
      const postId = parseInt(id, 10);
      return await prisma.post.update({
        where: { id: postId },
        data: { title, content, published },
      });
    },

    // Resolver to delete a post
    deletePost: async (_, { id }) => {
      const postId = parseInt(id, 10);
      return await prisma.post.delete({
        where: { id: postId },
      });
    },
  },
};

module.exports = resolvers;
