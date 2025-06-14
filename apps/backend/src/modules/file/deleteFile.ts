import { fileContract } from '@libs/contract';
import { PrismaFileRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const deleteFile: AppRouteImplementation<typeof fileContract.deleteFile> = async ({ req, params }) => {
  try {
    const fileRepo = new PrismaFileRepo();
    const fileExists = await fileRepo.findById({
      data: { id: params.id },
    });
    if (!fileExists) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'File not found',
        },
      };
    }
    const data = await fileRepo.delete({
      data: {
        id: params.id,
      },
    });
    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Deleted File Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
