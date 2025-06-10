import { Request, Response, NextFunction } from 'express';
import { auth } from '@libs/auth';
import { db } from '@libs/database';
import { customNext } from '@libs/quasar';
import { StatusCodes } from 'http-status-codes';

export const withAuthTsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    customNext(next, {
      message: 'User not found',
      status: StatusCodes.BAD_REQUEST,
    });
    return;
  }

  req.user.id = user.id;
  req.user.email = user.email;

  const userSessions = await auth.api.listUserSessions({
    body: {
      userId: user.id,
    },
    headers: {
      authorization: `Bearer ${req.headers.authorization}`,
    },
  });

  if (!userSessions) {
    customNext(next, {
      message: 'User Session not found',
      status: StatusCodes.UNAUTHORIZED,
    });
    return;
  }

  customNext(next);
};
