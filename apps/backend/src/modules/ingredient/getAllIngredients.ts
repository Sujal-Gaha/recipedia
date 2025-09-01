import { ingredientContract } from '@libs/contract';
import { PrismaIngredientRepo, PrismaIngredientVariantImageRepo, PrismaIngredientVariantRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { IngredientService } from '../../services/ingredient-service';
import { StatusCodes } from 'http-status-codes';

export const getAllIngredients: AppRouteImplementation<typeof ingredientContract.getAllIngredients> = async ({
  req,
  query,
}) => {
  try {
    const ingredientRepo = new PrismaIngredientRepo();
    const ingredientVariantRepo = new PrismaIngredientVariantRepo();
    const ingredientVariantImageRepo = new PrismaIngredientVariantImageRepo();

    const ingredientService = new IngredientService(ingredientRepo, ingredientVariantRepo, ingredientVariantImageRepo);

    const ingredients = await ingredientService.findManyIngredientsWithVariantsAndImages({
      page: query.page,
      perPage: query.perPage,
    });

    if (!ingredients) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Ingredients not found',
        },
      };
    }

    const { data, pagination } = ingredients;

    return {
      status: StatusCodes.OK,
      body: {
        data,
        pagination,
        isSuccess: true,
        message: 'Get Ingredients Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
