import { TCreateRecipeWithAllFieldsInput, TCreateRecipeWithAllFieldsOutput } from '@libs/contract';
import {
  PrismaRecipeImageRepo,
  PrismaRecipeIngredientRepo,
  PrismaRecipeRepo,
  PrismaRecipeStepRepo,
  PrismaRecipeTipRepo,
} from '@libs/database';
import { logger } from '@libs/quasar';

export class RecipeCreationService {
  constructor(
    private readonly recipeRepo: PrismaRecipeRepo,
    private readonly recipeImageRepo: PrismaRecipeImageRepo,
    private readonly recipeIngredientRepo: PrismaRecipeIngredientRepo,
    private readonly recipeStepRepo: PrismaRecipeStepRepo,
    private readonly recipeTipRepo: PrismaRecipeTipRepo
  ) {
    logger.info('Recipe Service initialized...');
  }

  public async createRecipe(input: TCreateRecipeWithAllFieldsInput): Promise<TCreateRecipeWithAllFieldsOutput> {
    const recipe = await this.recipeRepo.create({
      data: {
        user_id: input.user_id,
        cook_time: input.cook_time,
        description: input.description,
        difficulty: input.difficulty,
        preparation_time: input.preparation_time,
        title: input.title,
      },
    });

    const recipeImages = await this.recipeImageRepo.createMany({
      data: input.images.map((img) => ({
        recipe_id: recipe.id,
        is_primary: img.is_primary,
        url: img.url,
      })),
    });

    const recipeSteps = await this.recipeStepRepo.createMany({
      data: input.steps.map((step) => ({
        recipe_id: recipe.id,
        step_no: step.step_no,
        content: step.content,
        title: step.title,
      })),
    });

    const recipeTips = await this.recipeTipRepo.createMany({
      data: input.tips.map((tip) => ({
        recipe_id: recipe.id,
        content: tip.content,
      })),
    });

    const recipeIngredients = await this.recipeIngredientRepo.createMany({
      data: input.ingredients.map((ingredient) => ({
        recipe_id: recipe.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        note: ingredient.note,
        ingredient_variant_id: ingredient.ingredient_variant_id,
      })),
    });

    return {
      cook_time: recipe.cook_time,
      description: recipe.description,
      difficulty: recipe.difficulty,
      preparation_time: recipe.preparation_time,
      slug: recipe.slug,
      tips: recipeTips,
      title: recipe.title,
      id: recipe.id,
      images: recipeImages,
      ingredients: recipeIngredients,
      steps: recipeSteps,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at,
      user_id: recipe.user_id,
    };
  }
}
