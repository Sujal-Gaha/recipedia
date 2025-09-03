import { ingredientContract } from '@libs/contract';
import { PrismaIngredientRepo, PrismaIngredientVariantRepo } from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { IngredientService } from '../../services/ingredient-service';
import { StatusCodes } from 'http-status-codes';

export const getIngredientById: AppRouteImplementation<typeof ingredientContract.getIngredientById> = async ({
  req,
  query,
}) => {
  try {
    const ingredientRepo = new PrismaIngredientRepo();
    const ingredientVariantRepo = new PrismaIngredientVariantRepo();

    const ingredientService = new IngredientService(ingredientRepo, ingredientVariantRepo);

    const data = await ingredientService.findIngredientByIdWithVariantsAndImages({
      id: query.id,
    });

    if (!data) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'Ingredient not found',
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        data,
        isSuccess: true,
        message: 'Get Ingredient Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
