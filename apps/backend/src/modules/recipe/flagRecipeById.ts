import { recipeContract } from '@libs/contract';
import { PrismaRecipeRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const flagRecipeById: AppRouteImplementation<typeof recipeContract.flagRecipeById> = async ({ req, body }) => {
  try {
    const recipeRepo = new PrismaRecipeRepo();

    const recipeById = await recipeRepo.findById({
      data: {
        id: body.id,
      },
    });

    if (!recipeById) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Recipe not found',
        },
      };
    }

    const data = await recipeRepo.update({
      id: body.id,
      data: {
        is_flagged: !recipeById.is_flagged,
        cook_time: recipeById.cook_time,
        preparation_time: recipeById.preparation_time,
        description: recipeById.description,
        difficulty: recipeById.difficulty,
        status: recipeById.status,
        title: recipeById.title,
      },
    });

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Flagged Recipe Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
