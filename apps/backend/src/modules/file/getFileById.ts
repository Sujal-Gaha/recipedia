import { fileContract } from '@libs/contract';
import { db } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getFileById: AppRouteImplementation<
  typeof fileContract.getFileById
> = async ({ req, params }) => {
  try {
    const file = await db.file.findUnique({
      where: {
        id: params.id,
        is_deleted: false,
      },
    });
    if (!file) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'File not found',
        },
      };
    }
    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: 'Get File Successfully',
        data: file,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
