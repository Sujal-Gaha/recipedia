import { AppRouteImplementation } from '@ts-rest/express';
import { todoContract } from '@recipedia/contract';
import { db } from '@recipedia/database';
import { StatusCodes } from 'http-status-codes';
import { handleApiErrorAndRespond } from '../../error-handler';

export const createTodo: AppRouteImplementation<
  typeof todoContract.createTodo
> = async ({ req, body }) => {
  try {
    if (!body.name || !body.description) {
      return {
        status: StatusCodes.BAD_REQUEST,
        body: {
          isSuccess: false,
          message: 'Todo name and description is required',
        },
      };
    }

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
    console.log('Error while creating todo', e);
    return handleApiErrorAndRespond(e, req);
  }
};
