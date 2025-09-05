import { recipeContract } from '@libs/contract';
import { PrismaRecipeReviewRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const deleteRecipeReview: AppRouteImplementation<typeof recipeContract.deleteRecipeReview> = async ({
  req,
  body,
}) => {
  try {
    const recipeReviewRepo = new PrismaRecipeReviewRepo();

    const data = await recipeReviewRepo.delete({
      data: {
        id: body.id,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to delete recipe review',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Deleted Recipe Review Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
