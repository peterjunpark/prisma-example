import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AddUserType {
  name: string;
  email: string;
}

interface AddUserWithPostType extends AddUserType {
  postTitle: string;
}

async function addUser({ name, email }: AddUserType) {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });

  console.log('Created user', user);
}

async function addUserWithPost({ name, email, postTitle }: AddUserWithPostType) {
  const userWithPost = await prisma.user.create({
    data: {
      name: name,
      email: email,
      posts: {
        create: {
          title: postTitle,
        },
      },
    },
  });
}

async function getAllUsers() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.log('All users: ', users);
}

async function main() {
  //   addUser({ name: 'Peter3', email: 'peter3@email.com' });
  getAllUsers();
  //   addUserWithPost({
  //     name: 'Peter4',
  //     email: 'Peter4@email.com',
  //     postTitle: 'Hello World!',
  //   });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
