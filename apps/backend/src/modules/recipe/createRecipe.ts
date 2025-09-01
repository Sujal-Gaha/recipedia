import { recipeContract } from '@libs/contract';
import {
  PrismaRecipeImageRepo,
  PrismaRecipeIngredientRepo,
  PrismaRecipeRepo,
  PrismaRecipeStepRepo,
} from '@libs/database';
import { handleApiErrorAndRespond } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { RecipeCreationService } from '../../services/recipe-creation-service';
import { StatusCodes } from 'http-status-codes';

export const createRecipe: AppRouteImplementation<typeof recipeContract.createRecipe> = async ({ req }) => {
  try {
    const recipeRepo = new PrismaRecipeRepo();
    const recipeImageRepo = new PrismaRecipeImageRepo();
    const recipeIngredientRepo = new PrismaRecipeIngredientRepo();
    const recipeStepRepo = new PrismaRecipeStepRepo();

    const recipeCreationService = new RecipeCreationService(
      recipeRepo,
      recipeImageRepo,
      recipeIngredientRepo,
      recipeStepRepo
    );

    const data = await recipeCreationService.createRecipe(req.body);

    return {
      status: StatusCodes.CREATED,
      body: {
        data,
        isSuccess: true,
        message: 'Created Recipe Successfully',
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
