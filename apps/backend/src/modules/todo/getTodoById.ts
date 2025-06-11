import { todoContract } from '@libs/contract';
import { PrismaTodoRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getTodoById: AppRouteImplementation<typeof todoContract.getTodoById> = async ({ req, params }) => {
  try {
    const todoRepo = new PrismaTodoRepo();

    const data = await todoRepo.findById({ data: { id: params.id } });

    if (!data) {
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
        data,
        isSuccess: true,
        message: 'Get Todo Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
