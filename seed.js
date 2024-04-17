const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new user and associated posts
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'supersecretpassword', // Ensure this is a hashed password in production
      posts: {
        create: [
          {
            title: 'Post 1',
            content: 'Content of post 1',
            published: true,
          },
          {
            title: 'Post 2',
            content: 'Content of post 2',
            published: false,
          },
        ],
      },
    },
  });

  console.log('Seeded data:', user);
}

main()
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
