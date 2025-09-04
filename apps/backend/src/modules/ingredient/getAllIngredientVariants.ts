import { ingredientContract } from '@libs/contract';
import { PrismaIngredientVariantRepo } from '@libs/database';
import { getNumFromString, handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const getAllIngredientVariants: AppRouteImplementation<
  typeof ingredientContract.getAllIngredientVariants
> = async ({ req, query }) => {
  try {
    const pageNum = getNumFromString(query.page);
    const perPageNum = getNumFromString(query.perPage);

    const ingredientVariantRepo = new PrismaIngredientVariantRepo();

    const ingredientVariants = await ingredientVariantRepo.findMany({
      data: {
        page: pageNum,
        perPage: perPageNum,
        ingredient_id: query.ingredient_id,
      },
    });

    if (!ingredientVariants) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Ingredient variants not found',
        },
      };
    }

    const { data, pagination } = ingredientVariants;

    return {
      status: StatusCodes.OK,
      body: {
        data,
        pagination,
        isSuccess: true,
        message: 'Get All Ingredient Variants Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
