import {
  RecipeStepRepo,
  TCreateManyRecipeStepsRepoInput,
  TCreateRecipeStepRepoInput,
  TDeleteManyRecipeStepsRepoOuput,
  TDeleteRecipeStepRepoInput,
  TFindManyRecipeStepsRepoInput,
  TFindRecipeStepByIdRepoInput,
  TRecipeStep,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaRecipeStepRepo extends RecipeStepRepo {
  override async create({
    data: { recipe_id, content, step_no, title },
  }: TCreateRecipeStepRepoInput): Promise<TRecipeStep> {
    return await db.recipeStep.create({
      data: {
        recipe_id,
        content,
        step_no,
        title,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeStepRepoInput): Promise<TRecipeStep> {
    return await db.recipeStep.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeStepByIdRepoInput): Promise<TRecipeStep | null> {
    return await db.recipeStep.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { recipe_id } }: TFindManyRecipeStepsRepoInput): Promise<TRecipeStep[]> {
    return await db.recipeStep.findMany({
      where: {
        recipe_id,
      },
    });
  }

  override async deleteMany({ data: { recipe_id } }: TDeleteManyRecipeStepsRepoOuput): Promise<TRecipeStep[]> {
    const steps = db.recipeStep.findMany({
      where: {
        recipe_id,
      },
    });

    await db.recipeStep.deleteMany({
      where: {
        recipe_id,
      },
    });

    return steps;
  }

  override async createMany({ data }: TCreateManyRecipeStepsRepoInput): Promise<TRecipeStep[]> {
    return await db.recipeStep.createManyAndReturn({
      data: data.map((recipeStep) => ({
        recipe_id: recipeStep.recipe_id,
        content: recipeStep.content,
        step_no: recipeStep.step_no,
        title: recipeStep.title,
      })),
    });
  }
}
