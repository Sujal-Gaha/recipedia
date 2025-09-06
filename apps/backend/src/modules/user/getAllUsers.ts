import { userContract } from '@libs/contract';
import { PrismaUserRepo } from '@libs/database';
import { getNumFromString, handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getAllUsers: AppRouteImplementation<typeof userContract.getAllUsers> = async ({ req, query }) => {
  try {
    const userRepo = new PrismaUserRepo();

    const pageNum = getNumFromString(query.page);
    const perPageNum = getNumFromString(query.perPage);

    const users = await userRepo.findMany({
      data: {
        page: pageNum,
        perPage: perPageNum,
        global_filter: query.global_filter,
        is_email_verified: query.is_email_verified,
        is_suspended: query.is_suspended,
        user_type: query.user_type,
      },
    });

    if (!users) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Users not found',
        },
      };
    }

    const { data, pagination } = users;

    return {
      status: StatusCodes.OK,
      body: {
        data,
        pagination,
        isSuccess: true,
        message: 'Get Users Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
