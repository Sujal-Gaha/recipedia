import { logger } from '@libs/quasar';
import { db } from '../prisma/client';
import { seedRecipes } from './recipe';

console.log('ENVIRONMENT', process.env.ENVIRONMENT);

const main = async () => {
  logger.info('Seeding Started...');

  await seedRecipes(db);

  logger.info('Seeding Completed...');
};

main()
  .catch((e) => {
    logger.error('Something Went Wrong', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
