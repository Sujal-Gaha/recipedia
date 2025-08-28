import {
  RecipeRepo,
  TCreateRecipeRepoInput,
  TDeleteRecipeRepoInput,
  TFindManyRecipesRepoInput,
  TFindManyRecipesRepoOutput,
  TFindRecipeBySlugRepoInput,
  TRecipe,
  TUpdateRecipeRepoInput,
} from '@libs/quasar';
import { db } from '../../prisma/client';
import slugify from 'react-slugify';
import { Prisma } from '@prisma/client';
import { TGetAllRecipesOutput } from '@libs/contract';

export class PrismaRecipeRepo extends RecipeRepo {
  getSlugForRecipe({ title }: { title: string }) {
    return slugify(title);
  }

  override async create({
    data: { cook_time, description, difficulty, preparation_time, status, title, user_id },
  }: TCreateRecipeRepoInput): Promise<TRecipe> {
    const slug = this.getSlugForRecipe({ title });

    return await db.recipe.create({
      data: {
        user_id,
        title,
        description,
        preparation_time,
        cook_time,
        difficulty,
        status,
        slug,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeRepoInput): Promise<TRecipe> {
    return await db.recipe.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  override async update({
    id,
    data: { cook_time, description, difficulty, is_flagged, preparation_time, status, title },
  }: TUpdateRecipeRepoInput): Promise<TRecipe> {
    return await db.recipe.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        preparation_time,
        cook_time,
        difficulty,
        status,
        is_flagged,
      },
    });
  }

  override async findBySlug({ data: { slug } }: TFindRecipeBySlugRepoInput): Promise<TRecipe | null> {
    return await db.recipe.findUnique({
      where: {
        slug,
      },
    });
  }

  override async findMany({
    data: { page, perPage, cook_time, difficulty, is_flagged, preparation_time, status },
  }: TFindManyRecipesRepoInput): Promise<TFindManyRecipesRepoOutput> {
    const whereInput: Prisma.RecipeWhereInput = {
      ...(cook_time ? { cook_time: { lte: cook_time } } : null),
      ...(preparation_time ? { preparation_time: { lte: preparation_time } } : null),
      ...(difficulty ? { difficulty: difficulty } : null),
      ...(is_flagged ? { is_flagged: is_flagged === 'true' } : null),
      ...(status ? { status: status } : null),
      is_deleted: false,
    };

    const recipes = await db.recipe.findMany({
      where: whereInput,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
        images: true,
        steps: true,
        upvotes: true,
      },
    });

    const total = await db.recipe.count({
      where: whereInput,
    });

    const data: TGetAllRecipesOutput[] = await Promise.all(
      recipes.map(async (recipe) => {
        const recipeReviews = await db.recipeReview.findMany({
          where: {
            recipe_id: recipe.id,
          },
          include: {
            votes: true,
          },
        });

        const total_recipe_reviews = await db.recipeReview.count({
          where: {
            recipe_id: recipe.id,
          },
        });

        const total_ratings = recipeReviews.reduce((total, review) => {
          if (review.rating === 'ONE') return (total += 1);
          if (review.rating === 'TWO') return (total += 2);
          if (review.rating === 'THREE') return (total += 3);
          if (review.rating === 'FOUR') return (total += 4);
          if (review.rating === 'FIVE') return (total += 5);
          return total;
        }, 0);

        const average_rating = total_ratings / total_recipe_reviews;

        const total_votes = await db.recipeUpvote.count({
          where: {
            recipe_id: recipe.id,
          },
        });

        return {
          id: recipe.id,
          cook_time: recipe.cook_time,
          created_at: recipe.created_at,
          deleted_at: recipe.deleted_at,
          description: recipe.description,
          difficulty: recipe.difficulty,
          is_deleted: recipe.is_deleted,
          is_flagged: recipe.is_flagged,
          preparation_time: recipe.preparation_time,
          slug: recipe.slug,
          status: recipe.status,
          title: recipe.title,
          updated_at: recipe.updated_at,
          user_id: recipe.user_id,
          user: {
            id: recipe.user.id,
            name: recipe.user.name,
            email: recipe.user.email,
            user_type: recipe.user.user_type,
            image: recipe.user.image,
            is_email_verified: recipe.user.is_email_verified,
          },
          recipe_images: recipe.images.map((image) => ({
            id: image.id,
            created_at: image.created_at,
            url: image.url,
            is_primary: image.is_primary,
            recipe_id: image.recipe_id,
          })),
          recipe_upvotes: {
            total_votes,
          },
          recipe_review: {
            average_rating,
            total_ratings,
            total_reviews: total_recipe_reviews,
            reviews: recipeReviews.map((review) => ({
              id: review.id,
              comment: review.comment,
              created_at: review.created_at,
              rating: review.rating,
              updated_at: review.updated_at,
              total_votes: review.votes.reduce((total, vote) => {
                if (vote.type === 'UPVOTE') return (total += 1);
                if (vote.type === 'DOWNVOTE') return (total -= 1);
                return total;
              }, 0),
            })),
          },
          recipe_steps: recipe.steps.map((step) => ({
            id: step.id,
            step_no: step.step_no,
            content: step.content,
            recipe_id: step.recipe_id,
            created_at: step.created_at,
            updated_at: step.updated_at,
          })),
        };
      })
    );

    return {
      data,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
