import {
  RecipeRepo,
  TCreateRecipeRepoInput,
  TDeleteRecipeRepoInput,
  TFindManyRecipesRepoInput,
  TFindManyRecipesRepoOutput,
  TFindRecipeByIdRepoInput,
  TFindRecipeBySlugRepoInput,
  TFindRecipeBySlugRepoOutput,
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
    data: { cook_time, description, difficulty, preparation_time, title, user_id },
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

  override async findById({ data: { id } }: TFindRecipeByIdRepoInput): Promise<TRecipe | null> {
    return await db.recipe.findUnique({
      where: {
        id,
      },
    });
  }

  override async findBySlug({
    data: { slug, user_id },
  }: TFindRecipeBySlugRepoInput): Promise<TFindRecipeBySlugRepoOutput | null> {
    const recipe = await db.recipe.findUnique({
      where: {
        slug,
      },
      include: {
        user: true,
        images: true,
        steps: true,
        ingredients: {
          include: {
            ingredient_variant: {
              include: {
                ingredient: true,
              },
            },
          },
        },
        reviews: {
          include: {
            votes: true,
            user: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        },
        tips: true,
        upvotes: true,
        favourites: true,
      },
    });

    if (!recipe) return null;

    const recipeReviews = recipe.reviews;

    const total_ratings = recipeReviews.reduce((total, review) => {
      if (review.rating === 'ONE') return (total += 1);
      if (review.rating === 'TWO') return (total += 2);
      if (review.rating === 'THREE') return (total += 3);
      if (review.rating === 'FOUR') return (total += 4);
      if (review.rating === 'FIVE') return (total += 5);
      return total;
    }, 0);

    const total_reviews = recipeReviews.length;

    const average_rating = +(total_ratings / total_reviews).toFixed(1);

    const total_votes = recipe.upvotes.length;
    const total_favourites = recipe.favourites.length;

    const userFavourite = await db.recipeFavourite.findFirst({
      where: {
        recipe_id: recipe.id,
        user_id,
      },
    });

    const userUpvote = await db.recipeUpvote.findFirst({
      where: {
        recipe_id: recipe.id,
        user_id,
      },
    });

    const userFollowing = await db.userFollower.findFirst({
      where: {
        following_id: recipe.user_id,
        follower_id: user_id,
      },
    });

    const total_recipes = await db.recipe.count({
      where: {
        is_deleted: false,
        is_flagged: false,
        user_id: recipe.user_id,
      },
    });

    const total_followers = await db.userFollower.count({
      where: {
        following_id: recipe.user_id,
      },
    });

    const is_favourited = !!userFavourite;
    const is_upvoted = !!userUpvote;
    const is_following = !!userFollowing;

    return {
      data: {
        cook_time: recipe.cook_time,
        description: recipe.description,
        difficulty: recipe.difficulty,
        preparation_time: recipe.preparation_time,
        status: recipe.status,
        title: recipe.title,
        id: recipe.id,
        slug: recipe.slug,
        is_flagged: recipe.is_flagged,
        created_at: recipe.created_at,
        updated_at: recipe.updated_at,
        user_id: recipe.user_id,
        images: recipe.images,
        steps: recipe.steps,
        ingredients: recipe.ingredients.map((ing) => ({
          id: ing.id,
          quantity: ing.quantity,
          unit: ing.unit,
          ingredient_variant_id: ing.ingredient_variant_id,
          note: ing.note,
          recipe_id: ing.recipe_id,
          updated_at: ing.updated_at,
          created_at: ing.created_at,
          ingredient_variant: {
            id: ing.ingredient_variant.id,
            name: ing.ingredient_variant.name,
            image: ing.ingredient_variant.image,
            ingredient: {
              calories: ing.ingredient_variant.ingredient.calories,
              carbohydrates: ing.ingredient_variant.ingredient.carbohydrates,
              fat: ing.ingredient_variant.ingredient.fat,
              fiber: ing.ingredient_variant.ingredient.fiber,
              protein: ing.ingredient_variant.ingredient.protein,
              sugar: ing.ingredient_variant.ingredient.sugar,
            },
          },
        })),
        deleted_at: recipe.deleted_at,
        favourites: {
          total_favourites,
        },
        is_deleted: recipe.is_deleted,
        review: {
          average_rating,
          total_reviews,
          total_ratings,
          reviews: recipeReviews.map((review) => {
            const total_upvotes = review.votes.reduce(
              (total, vote) => (vote.type === 'UPVOTE' ? (total += 1) : total),
              0
            );
            const total_downvotes = review.votes.reduce(
              (total, vote) => (vote.type === 'DOWNVOTE' ? (total += 1) : total),
              0
            );

            const is_upvoted = review.votes.some((vote) => vote.type === 'UPVOTE' && vote.user_id === user_id);
            const is_downvoted = review.votes.some((vote) => vote.type === 'DOWNVOTE' && vote.user_id === user_id);

            return {
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
              user: {
                id: review.user.id,
                name: review.user.name,
                email: review.user.email,
                user_type: review.user.user_type,
                image: review.user.image,
                is_email_verified: review.user.is_email_verified,
              },
              is_upvoted,
              is_downvoted,
              total_downvotes,
              total_upvotes,
              votes: review.votes,
            };
          }),
        },
        upvotes: {
          total_votes,
        },
        chef: {
          id: recipe.user.id,
          name: recipe.user.name,
          email: recipe.user.email,
          user_type: recipe.user.user_type,
          image: recipe.user.image,
          is_email_verified: recipe.user.is_email_verified,
          total_followers,
          total_recipes,
        },
        user_favourite_id: recipe.favourites.find((favourite) => favourite.user_id === user_id)?.id || null,
        user_upvote_id: recipe.upvotes.find((upvote) => upvote.user_id === user_id)?.id || null,
        tips: recipe.tips,
        is_favourited,
        is_upvoted,
        is_following,
      },
    };
  }

  override async findMany({
    data: {
      page,
      perPage,
      cook_time,
      difficulty,
      is_flagged,
      preparation_time,
      status,
      global_filter,
      user_id,
      recipe_ingredients_ids,
      recipe_ingredient_variants_id,
      is_favourited,
    },
  }: TFindManyRecipesRepoInput): Promise<TFindManyRecipesRepoOutput> {
    const whereInput: Prisma.RecipeWhereInput = {
      ...(cook_time ? { cook_time: { lte: cook_time } } : null),
      ...(preparation_time ? { preparation_time: { lte: preparation_time } } : null),
      ...(difficulty ? { difficulty: difficulty } : null),
      ...(is_flagged ? { is_flagged: is_flagged === 'true' } : null),
      ...(status ? { status: status } : null),
      ...(global_filter ? { title: { contains: global_filter, mode: 'insensitive' } } : null),
      ...(recipe_ingredient_variants_id
        ? {
            ingredients: {
              some: {
                ingredient_variant_id: {
                  in: recipe_ingredient_variants_id,
                },
              },
            },
          }
        : null),
      ...(recipe_ingredients_ids
        ? {
            ingredients: {
              some: {
                id: {
                  in: recipe_ingredients_ids,
                },
              },
            },
          }
        : null),
      ...(is_favourited ? { favourites: { some: { user_id } } } : null),
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
        ingredients: true,
        favourites: true,
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

        const average_rating = +(total_recipe_reviews !== 0 ? total_ratings / total_recipe_reviews : 0).toFixed(1);

        const total_votes = await db.recipeUpvote.count({
          where: {
            recipe_id: recipe.id,
          },
        });

        const userFavourite = await db.recipeFavourite.findFirst({
          where: {
            recipe_id: recipe.id,
            user_id,
          },
        });

        const userUpvote = await db.recipeUpvote.findFirst({
          where: {
            recipe_id: recipe.id,
            user_id,
          },
        });

        const is_favourited = !!userFavourite;
        const is_upvoted = !!userUpvote;

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
          ingredients: recipe.ingredients.map((ingredient) => ({
            id: ingredient.id,
            created_at: ingredient.created_at,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            ingredient_variant_id: ingredient.ingredient_variant_id,
            recipe_id: ingredient.recipe_id,
            note: ingredient.note,
            updated_at: ingredient.updated_at,
          })),
          images: recipe.images.map((image) => ({
            id: image.id,
            created_at: image.created_at,
            url: image.url,
            is_primary: image.is_primary,
            recipe_id: image.recipe_id,
          })),
          upvotes: {
            total_votes,
          },
          favourites: {
            total_favourites: recipe.favourites.length,
          },
          review: {
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
          steps: recipe.steps.map((step) => ({
            id: step.id,
            step_no: step.step_no,
            content: step.content,
            recipe_id: step.recipe_id,
            created_at: step.created_at,
            updated_at: step.updated_at,
            title: step.title,
          })),
          is_favourited,
          is_upvoted,
          user_favourite_id: is_favourited ? userFavourite.id : null,
          user_upvote_id: is_upvoted ? userUpvote.id : null,
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
