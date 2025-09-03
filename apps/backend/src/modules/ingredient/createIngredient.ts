import { ingredientContract } from '@libs/contract';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { IngredientService } from '../../services/ingredient-service';
import { PrismaIngredientRepo, PrismaIngredientVariantRepo } from '@libs/database';
import { StatusCodes } from 'http-status-codes';

export const createIngredient: AppRouteImplementation<typeof ingredientContract.createIngredient> = async ({
  req,
  body,
}) => {
  try {
    const ingredientRepo = new PrismaIngredientRepo();
    const ingredientVariantRepo = new PrismaIngredientVariantRepo();

    const ingredientService = new IngredientService(ingredientRepo, ingredientVariantRepo);

    const data = await ingredientService.createIngredientWithVariantsAndImages({
      image: body.image,
      name: body.name,
      category: body.category,
      description: body.description,
      calories: body.calories,
      carbohydrates: body.carbohydrates,
      fat: body.fat,
      fiber: body.fiber,
      protein: body.protein,
      sugar: body.sugar,
      ingredient_variants: body.ingredient_variants,
    });

    if (!data) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          isSuccess: false,
          message: 'Failed to create ingredient',
        },
      };
    }

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Ingredient Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
