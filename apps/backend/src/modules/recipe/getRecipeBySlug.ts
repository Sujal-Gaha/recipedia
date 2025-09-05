import { recipeContract } from '@libs/contract';
import { PrismaRecipeRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getRecipeBySlug: AppRouteImplementation<typeof recipeContract.getRecipeBySlug> = async ({
  req,
  params,
}) => {
  try {
    const recipeRepo = new PrismaRecipeRepo();

    const recipe = await recipeRepo.findBySlug({
      data: {
        slug: params.slug,
        user_id: params.user_id,
      },
    });

    if (!recipe) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Recipe not found',
        },
      };
    }

    const { data } = recipe;

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Get Recipe By Slug Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
