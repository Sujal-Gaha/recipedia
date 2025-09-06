import { recipeContract } from '@libs/contract';
import { PrismaRecipeReviewRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getRecipeReviewById: AppRouteImplementation<typeof recipeContract.getRecipeReviewById> = async ({
  req,
  query,
}) => {
  try {
    const recipeReviewRepo = new PrismaRecipeReviewRepo();

    const data = await recipeReviewRepo.findById({
      data: {
        id: query.id,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Recipe Review not found',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Get Recipe Review Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
