import { AppRouteImplementation } from '@ts-rest/express';
import { todoContract } from '@libs/contract';
import { db } from '@libs/database';
import { StatusCodes } from 'http-status-codes';
import { handleApiErrorAndRespond } from '@libs/quasar';

export const createTodo: AppRouteImplementation<
  typeof todoContract.createTodo
> = async ({ req, body }) => {
  try {
    const createdTodo = await db.todo.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return {
      status: StatusCodes.CREATED,
      body: {
        isSuccess: true,
        message: 'Created Todo Successfully',
        data: createdTodo,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
