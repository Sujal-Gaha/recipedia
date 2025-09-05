import { recipeContract } from '@libs/contract';
import { PrismaRecipeReviewRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const createRecipeReview: AppRouteImplementation<typeof recipeContract.createRecipeReview> = async ({
  req,
  body,
}) => {
  try {
    const recipeReviewRepo = new PrismaRecipeReviewRepo();

    const data = await recipeReviewRepo.create({
      data: {
        user_id: body.user_id,
        recipe_id: body.recipe_id,
        comment: body.comment,
        rating: body.rating,
      },
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to create recipe review',
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Recipe Review Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
