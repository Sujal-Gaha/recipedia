import { userContract } from '@libs/contract';
import { PrismaUserRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const suspendUser: AppRouteImplementation<typeof userContract.suspendUser> = async ({ req, body }) => {
  try {
    const userRepo = new PrismaUserRepo();

    const data = await userRepo.suspend({
      id: body.id,
    });

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Suspend User Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
