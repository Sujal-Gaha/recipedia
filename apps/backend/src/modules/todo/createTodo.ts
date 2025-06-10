import { AppRouteImplementation } from '@ts-rest/express';
import { todoContract } from '@libs/contract';
import { PrismaTodoRepo } from '@libs/database';
import { StatusCodes } from 'http-status-codes';
import { handleApiErrorAndRespond } from '@libs/quasar';

export const createTodo: AppRouteImplementation<typeof todoContract.createTodo> = async ({ req, body }) => {
  try {
    const todoRepo = new PrismaTodoRepo();

    const data = await todoRepo.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to create todo',
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Todo Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
