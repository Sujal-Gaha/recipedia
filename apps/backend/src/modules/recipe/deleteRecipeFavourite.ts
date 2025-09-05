import { recipeContract } from '@libs/contract';
import { PrismaRecipeFavouriteRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const deleteRecipeFavourite: AppRouteImplementation<typeof recipeContract.deleteRecipeFavourite> = async ({
  req,
  body,
}) => {
  try {
    const recipeFavouriteRepo = new PrismaRecipeFavouriteRepo();

    const data = await recipeFavouriteRepo.delete({
      data: {
        id: body.id,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to delete recipe favourite',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Deleted Recipe Favourite Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
