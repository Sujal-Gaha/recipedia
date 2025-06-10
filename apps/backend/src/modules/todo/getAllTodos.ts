import { todoContract } from '@libs/contract';
import { PrismaTodoRepo } from '@libs/database';
import { getNumFromString, handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getAllTodos: AppRouteImplementation<typeof todoContract.getAllTodos> = async ({ req, query }) => {
  try {
    const pageNum = getNumFromString(query.page);
    const perPageNum = getNumFromString(query.perPage);

    const todoRepo = new PrismaTodoRepo();

    const todos = await todoRepo.findMany({
      data: {
        page: pageNum,
        perPage: perPageNum,
      },
    });

    if (!todos) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Todos not found',
        },
      };
    }

    const { data, pagination } = todos;

    return {
      status: StatusCodes.OK,
      body: {
        data,
        pagination,
        isSuccess: true,
        message: 'Get All Todos Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
