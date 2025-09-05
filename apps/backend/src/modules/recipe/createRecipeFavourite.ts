import { recipeContract } from '@libs/contract';
import { PrismaRecipeFavouriteRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const createRecipeFavourite: AppRouteImplementation<typeof recipeContract.createRecipeFavourite> = async ({
  req,
  body,
}) => {
  try {
    const recipeFavouriteRepo = new PrismaRecipeFavouriteRepo();

    const data = await recipeFavouriteRepo.create({
      data: {
        user_id: body.user_id,
        recipe_id: body.recipe_id,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to create recipe favourite',
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Recipe Favourite Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
