const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    posts: async () => {
      return await prisma.post.findMany({
        include: {
          author: true,
        },
      });
    },
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createPost: async (_, { title, content, published, userId }) => {
      // Check if the user exists
      let user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        // If the user doesn't exist, create a new user
        user = await prisma.user.create({ // Update 'user' with the result of create
          data: {
            name: 'Unknown User',
            email: `user${userId}@example.com`,
            password: 'a-default-password', // Use a hashed password in production
          },
        });
      }

      // Now create the post, including the author information in the response
      const post = await prisma.post.create({
        data: {
          title,
          content,
          published,
          author: {
            connect: { id: user.id }, // Connect the post to the user
          },
        },
        include: {
          author: true, // Include the author information in the result
        },
      });

      if (!post) {
        throw new Error('Post creation failed');
      }

      return post;
    },
  },
}
module.exports = resolvers;