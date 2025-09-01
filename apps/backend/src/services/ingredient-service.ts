import {
  TCreateIngredientWithVariantsAndImagesInput,
  TGetAllIngredientsWithVariantsAndImagesInput,
  TGetIngredientByIdWithVariantsAndImagesInput,
  TIngredientWithVariantsAndImages,
  TPaginationOutput,
} from '@libs/contract';
import { PrismaIngredientRepo, PrismaIngredientVariantImageRepo, PrismaIngredientVariantRepo } from '@libs/database';
import { getNumFromString, logger } from '@libs/quasar';

export class IngredientService {
  constructor(
    private readonly ingredientRepo: PrismaIngredientRepo,
    private readonly ingredientVariantRepo: PrismaIngredientVariantRepo,
    private readonly ingredientVariantImageRepo: PrismaIngredientVariantImageRepo
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
        slug: input.slug,
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
        },
      });

      if (!createdVariant) {
        throw new Error('Failed to create ingredient variant');
      }

      for (const ingredient_variant_image of ingredient_variant.ingredient_variant_images) {
        await this.ingredientVariantImageRepo.create({
          data: {
            url: ingredient_variant_image.url,
            is_primary: ingredient_variant_image.is_primary,
            ingredient_variant_id: createdVariant.id,
          },
        });
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
  ): Promise<{ data: TIngredientWithVariantsAndImages[]; pagination: TPaginationOutput }> => {
    const pageNum = getNumFromString(input.page);
    const perPageNum = getNumFromString(input.perPage);

    const ingredients = await this.ingredientRepo.findMany({
      data: {
        page: pageNum,
        perPage: perPageNum,
      },
    });

    if (!ingredients) {
      throw new Error('Failed to find ingredients');
    }

    return ingredients;
  };

  public findIngredientByIdWithVariantsAndImages = async ({
    id,
  }: TGetIngredientByIdWithVariantsAndImagesInput): Promise<TIngredientWithVariantsAndImages> => {
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
