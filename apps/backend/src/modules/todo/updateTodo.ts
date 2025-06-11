import { todoContract } from '@libs/contract';
import { PrismaTodoRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const updateTodo: AppRouteImplementation<typeof todoContract.updateTodo> = async ({ req, params, body }) => {
  try {
    const todoRepo = new PrismaTodoRepo();

    const todoExists = await todoRepo.findById({ data: { id: params.id } });

    if (!todoExists) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Todo not found',
        },
      };
    }

    const data = await todoRepo.update({
      id: params.id,
      data: {
        description: body.description,
        name: body.name,
        is_completed: body.is_completed,
      },
    });

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Updated Todo Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
