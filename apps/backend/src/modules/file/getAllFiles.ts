import { fileContract } from '@libs/contract';
import { db } from '@libs/database';
import { getNumFromString, handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getAllFiles: AppRouteImplementation<typeof fileContract.getAllFiles> = async ({ req, query }) => {
  try {
    const pageNum = getNumFromString(query.page);
    const perPageNum = getNumFromString(query.perPage);

    const files = await db.file.findMany({
      skip: (pageNum - 1) * perPageNum,
      take: perPageNum,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        is_deleted: false,
      },
    });
    if (!files) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'File not found',
        },
      };
    }
    const total = await db.file.count();
    const totalPages = Math.ceil(total / perPageNum);
    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: 'Get All Files Successfully',
        data: files,
        pagination: {
          page: pageNum,
          perPage: perPageNum,
          total,
          totalPages,
        },
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
