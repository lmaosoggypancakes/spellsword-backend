// import prisma and initialize it
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
(async () => {
  await prisma.$connect();

  console.log(`Deleting all unfinished games...`);
  const gamesToDelete = await prisma.game.deleteMany({
    where: {
      NOT: {
        status: 'ENDED',
      },
    },
  });
  console.log(`Deleted ${gamesToDelete.count} unfinished games.`);
})();
