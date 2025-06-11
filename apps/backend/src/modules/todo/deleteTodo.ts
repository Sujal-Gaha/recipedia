import { todoContract } from '@libs/contract';
import { PrismaTodoRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const deleteTodo: AppRouteImplementation<typeof todoContract.deleteTodo> = async ({ req, params }) => {
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

    const data = await todoRepo.delete({
      data: {
        id: params.id,
      },
    });

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Deleted Todo Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
