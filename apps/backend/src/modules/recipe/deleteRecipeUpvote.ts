import { recipeContract } from '@libs/contract';
import { PrismaRecipeUpvoteRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const deleteRecipeUpvote: AppRouteImplementation<typeof recipeContract.deleteRecipeUpvote> = async ({
  req,
  body,
}) => {
  try {
    const recipeUpvoteRepo = new PrismaRecipeUpvoteRepo();

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
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
