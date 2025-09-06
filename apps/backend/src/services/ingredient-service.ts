import {
  TCreateIngredientWithVariantsAndImagesInput,
  TGetAllIngredientsWithVariantsAndImagesInput,
  TGetAllIngredientsWithVariantsAndImagesOutput,
  TGetIngredientByIdWithVariantsAndImagesInput,
  TGetIngredientByIdWithVariantsAndImagesOutput,
  TIngredientWithVariantsAndImages,
  TPaginationOutput,
} from '@libs/contract';
import { PrismaIngredientRepo, PrismaIngredientVariantRepo } from '@libs/database';
import { getNumFromString, logger } from '@libs/quasar';

export class IngredientService {
  constructor(
    private readonly ingredientRepo: PrismaIngredientRepo,
    private readonly ingredientVariantRepo: PrismaIngredientVariantRepo
  ) {
    logger.info('Ingredient Service initialized...');
  }

  public createIngredientWithVariantsAndImages = async (
    input: TCreateIngredientWithVariantsAndImagesInput
  ): Promise<TIngredientWithVariantsAndImages> => {
    const ingredient = await this.ingredientRepo.create({
      data: {
        image: input.image,
        name: input.name,
        category: input.category,
        description: input.description,
        calories: input.calories,
        carbohydrates: input.carbohydrates,
        protein: input.protein,
        fat: input.fat,
        sugar: input.sugar,
        fiber: input.fiber,
      },
    });

    if (!ingredient) {
      throw new Error('Failed to create ingredient');
    }

    for (const ingredient_variant of input.ingredient_variants) {
      const createdVariant = await this.ingredientVariantRepo.create({
        data: {
          ingredient_id: ingredient.id,
          name: ingredient_variant.name,
          image: ingredient_variant.image,
        },
      });

      if (!createdVariant) {
        throw new Error('Failed to create ingredient variant');
      }
    }

    const createdIngredient = await this.ingredientRepo.findById({
      data: {
        id: ingredient.id,
      },
    });

    if (!createdIngredient) {
      throw new Error('Failed to find created ingredient');
    }

    const { data } = createdIngredient;

    return data;
  };

  public findManyIngredientsWithVariantsAndImages = async (
    input: TGetAllIngredientsWithVariantsAndImagesInput
  ): Promise<{ data: TGetAllIngredientsWithVariantsAndImagesOutput[]; pagination: TPaginationOutput }> => {
    const pageNum = getNumFromString(input.page);
    const perPageNum = getNumFromString(input.perPage);

    const ingredients = await this.ingredientRepo.findMany({
      data: {
        page: pageNum,
        perPage: perPageNum,
        global_filter: input.global_filter,
      },
    });

    if (!ingredients) {
      throw new Error('Failed to find ingredients');
    }

    return ingredients;
  };

  public findIngredientByIdWithVariantsAndImages = async ({
    id,
  }: TGetIngredientByIdWithVariantsAndImagesInput): Promise<TGetIngredientByIdWithVariantsAndImagesOutput> => {
    const ingredient = await this.ingredientRepo.findById({
      data: {
        id,
      },
    });

    if (!ingredient) {
      throw new Error('Failed to find ingredient');
    }

    return ingredient.data;
  };
}
