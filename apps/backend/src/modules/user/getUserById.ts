import { userContract } from '@libs/contract';
import { PrismaUserRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getUserById: AppRouteImplementation<typeof userContract.getUserById> = async ({ req, params }) => {
  try {
    const userRepo = new PrismaUserRepo();

    const data = await userRepo.findById({ data: { id: params.id } });

    if (!data) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'User not found',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Get User Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
