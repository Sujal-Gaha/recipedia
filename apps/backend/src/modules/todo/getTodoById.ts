import { todoContract } from '@libs/contract';
import { db } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getTodoById: AppRouteImplementation<typeof todoContract.getTodoById> = async ({ req, params }) => {
  try {
    const todo = await db.todo.findUnique({
      where: {
        id: params.id,
        is_deleted: false,
      },
    });

    if (!todo) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Todo not found',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: 'Get Todo Successfully',
        data: todo,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
