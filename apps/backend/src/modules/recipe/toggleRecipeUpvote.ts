import { recipeContract } from '@libs/contract';
import { PrismaRecipeUpvoteRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const toggleRecipeUpvote: AppRouteImplementation<typeof recipeContract.toggleRecipeUpvote> = async ({
  req,
  body,
}) => {
  try {
    const recipeUpvoteRepo = new PrismaRecipeUpvoteRepo();

    if (body.id) {
      const data = await recipeUpvoteRepo.delete({
        data: {
          id: body.id,
        },
      });

      if (!data) {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          body: {
            isSuccess: false,
            message: 'Failed to delete recipe Upvote',
          },
        };
      }

      return {
        status: StatusCodes.OK,
        body: {
          data,
          isSuccess: true,
          message: 'Deleted Recipe Upvote Successfully',
        },
      };
    }

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
