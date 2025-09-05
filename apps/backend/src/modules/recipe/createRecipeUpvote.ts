import { recipeContract } from '@libs/contract';
import { PrismaRecipeUpvoteRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const createRecipeUpvote: AppRouteImplementation<typeof recipeContract.createRecipeUpvote> = async ({
  req,
  body,
}) => {
  try {
    const recipeUpvoteRepo = new PrismaRecipeUpvoteRepo();

    const data = await recipeUpvoteRepo.create({
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
          message: 'Failed to create recipe upvote',
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Recipe Upvote Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
