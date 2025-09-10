import { userContract } from '@libs/contract';
import { PrismaUserFollowerRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const toggleUserFollower: AppRouteImplementation<typeof userContract.toggleUserFollower> = async ({
  req,
  body,
}) => {
  try {
    const userRepo = new PrismaUserFollowerRepo();

    const data = await userRepo.toggle({
      data: {
        follower_id: body.follower_id,
        following_id: body.following_id,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to toggle user follower',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Toggle User Follower Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
