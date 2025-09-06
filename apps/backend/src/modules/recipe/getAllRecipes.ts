import { recipeContract } from '@libs/contract';
import { PrismaRecipeRepo } from '@libs/database';
import { getNumFromString, handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getAllRecipes: AppRouteImplementation<typeof recipeContract.getAllRecipes> = async ({ req, query }) => {
  try {
    const pageNum = getNumFromString(query.page);
    const perPageNum = getNumFromString(query.perPage);

    const recipeRepo = new PrismaRecipeRepo();

    const recipes = await recipeRepo.findMany({
      data: {
        page: pageNum,
        perPage: perPageNum,
        ...(query.cook_time ? { cook_time: getNumFromString(query.cook_time) } : null),
        ...(query.preparation_time ? { preparation_time: getNumFromString(query.preparation_time) } : null),
        difficulty: query.difficulty,
        is_flagged: query.is_flagged,
        global_filter: query.global_filter,
        status: query.status,
        recipe_ingredients_ids: query.recipe_ingredients_ids,
        recipe_ingredient_variants_id: query.recipe_ingredient_variants_id,
        user_id: query.user_id,
        is_favourited: query.is_favourited,
      },
    });

    if (!recipes) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Recipes not found',
        },
      };
    }

    const { data, pagination } = recipes;

    return {
      status: StatusCodes.OK,
      body: {
        data,
        pagination,
        isSuccess: true,
        message: 'Get Recipes Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
