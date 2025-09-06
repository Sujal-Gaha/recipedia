import { recipeContract } from '@libs/contract';
import { PrismaRecipeReviewVoteRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const toggleRecipeReviewVote: AppRouteImplementation<typeof recipeContract.toggleRecipeReviewVote> = async ({
  req,
  body,
}) => {
  const recipeReviewVote = new PrismaRecipeReviewVoteRepo();

  try {
    if (body.id) {
      const recipeReviewVoteById = await recipeReviewVote.findById({
        data: {
          id: body.id,
        },
      });

      if (!recipeReviewVoteById) {
        return {
          status: StatusCodes.NOT_FOUND,
          body: {
            isSuccess: false,
            message: 'Recipe Review Vote not found',
          },
        };
      }

      if (body.type === recipeReviewVoteById.type) {
        const data = await recipeReviewVote.delete({
          data: {
            id: body.id,
          },
        });

        if (!data) {
          return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            body: {
              isSuccess: false,
              message: 'Failed to delete recipe review vote',
            },
          };
        }

        return {
          status: StatusCodes.OK,
          body: {
            data,
            isSuccess: true,
            message: 'Removed review vote successfully',
          },
        };
      }

      const data = await recipeReviewVote.update({
        id: body.id,
        data: {
          type: body.type,
        },
      });

      if (!data) {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          body: {
            isSuccess: false,
            message: 'Failed to update recipe review vote',
          },
        };
      }

      return {
        status: StatusCodes.OK,
        body: {
          data,
          isSuccess: true,
          message: 'Updated Recipe Review Vote Successfully',
        },
      };
    }

    const data = recipeReviewVote.create({
      data: {
        review_id: body.review_id,
        type: body.type,
        user_id: body.user_id,
      },
    });

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Recipe Review Vote Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
