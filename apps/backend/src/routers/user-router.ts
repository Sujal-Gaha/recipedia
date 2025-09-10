import { validateAccessToken } from '@baijanstack/express-auth';
import { userContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { getAllUsers } from '../modules/user/getAllUsers';
import { getUserById } from '../modules/user/getUserById';
import { suspendUser } from '../modules/user/suspendUser';
import { toggleUserFollower } from '../modules/user/toggleUserFollower';

const s = initServer();

export const userRouter = s.router(userContract, {
  getAllUsers: {
    middleware: [validateAccessToken],
    handler: getAllUsers,
  },

  getUserById: {
    middleware: [validateAccessToken],
    handler: getUserById,
  },

  suspendUser: {
    middleware: [validateAccessToken],
    handler: suspendUser,
  },

  toggleUserFollower: {
    middleware: [validateAccessToken],
    handler: toggleUserFollower,
  },
});
