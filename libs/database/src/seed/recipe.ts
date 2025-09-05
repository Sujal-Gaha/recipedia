import { RecipeDifficultyType } from '@libs/contract';
import { PrismaClient, RecipeStep, RecipeTip } from '@prisma/client';
import slugify from 'react-slugify';
import { dummyIngredients } from './data/ingredient';

const dummyRecipes: {
  cook_time: number;
  description: string;
  preparation_time: number;
  slug: string;
  title: string;
  difficulty: RecipeDifficultyType;
  image: string;
  steps: Pick<RecipeStep, 'title' | 'step_no' | 'content'>[];
  ingredients: string[];
  tips: Pick<RecipeTip, 'content'>[];
}[] = [
  {
    cook_time: 25,
    description: 'Authentic Thai flavors with fresh basil, chilies, and tender chicken served over jasmine rice',
    preparation_time: 15,
    slug: slugify('Spicy Thai Basil Chicken'),
    title: 'Spicy Thai Basil Chicken',
    difficulty: 'MEDIUM',
    image: 'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2020/07/Thai-basil-chicken-33.jpg',
    steps: [
      {
        step_no: 1,
        title: 'Prepare the Ingredients',
        content: 'Mince the garlic, slice the chilies, and chop the chicken into bite-sized pieces.',
      },
      {
        step_no: 2,
        title: 'Cook the Chicken',
        content: 'Heat oil in a wok or large pan over medium-high heat.',
      },
      {
        step_no: 3,
        title: 'Add the Ingredients',
        content: 'Add garlic and chilies, stir-frying quickly until fragrant.',
      },
      {
        step_no: 4,
        title: 'Cook the Chicken',
        content: 'Add the chicken and stir-fry until fully cooked and tender.',
      },
      {
        step_no: 5,
        title: 'Add the Sauce',
        content: 'Pour in soy sauce, fish sauce, and a pinch of sugar. Stir well to coat the chicken evenly.',
      },
      {
        step_no: 6,
        title: 'Serve and Enjoy',
        content: 'Turn off the heat and add fresh Thai basil leaves, stirring until just wilted.',
      },
      {
        step_no: 7,
        title: 'Serve Over Jasmine Rice',
        content: 'Serve hot over steamed jasmine rice.',
      },
    ],
    ingredients: ['Jasmine Rice', 'Boneless Chicken Breast', 'Fresh Garlic', 'Thai Basil'],
    tips: [
      {
        content: 'You can use any type of rice, such as white or brown, depending on your preference.',
      },
      {
        content: 'You can use any type of chicken, such as boneless or skinless, depending on your preference.',
      },
      {
        content: 'You can use any type of chilies, such as red, green, or yellow, depending on your preference.',
      },
    ],
  },
  {
    cook_time: 45,
    description: 'Homemade pizza dough topped with fresh mozzarella, basil, and San Marzano tomatoes',
    preparation_time: 30,
    slug: slugify('Classic Margherita Pizza'),
    title: 'Classic Margherita Pizza',
    difficulty: 'EASY',
    image:
      'https://media.istockphoto.com/id/1280329631/photo/italian-pizza-margherita-with-tomatoes-and-mozzarella-cheese-on-wooden-cutting-board-close-up.jpg?s=612x612&w=0&k=20&c=CFDDjavIC5l8Zska16UZRZDXDwd47fwmRsUNzY0Ym6o=',
    steps: [
      {
        step_no: 1,
        title: 'Prepare the Dough',
        content: 'Prepare the pizza dough and let it rise until doubled in size.',
      },
      {
        step_no: 2,
        title: 'Preheat the Oven',
        content: 'Preheat oven to 250°C (480°F) with a pizza stone inside.',
      },
      {
        step_no: 3,
        title: 'Roll Out the Dough',
        content: 'Roll out the dough into a thin round base.',
      },
      {
        step_no: 4,
        title: 'Spread the Sauce',
        content: 'Spread San Marzano tomato sauce evenly over the dough.',
      },
      {
        step_no: 5,
        title: 'Add the Toppings',
        content: 'Top with slices of fresh mozzarella and basil leaves.',
      },
      {
        step_no: 6,
        title: 'Bake the Pizza',
        content: 'Bake until the crust is golden and cheese is bubbling.',
      },
    ],
    ingredients: ['Sweet Basil', 'Fresh Tomato', 'Fresh Mozzarella'],
    tips: [
      {
        content: 'You can use any type of pizza dough, such as thin or thick, depending on your preference.',
      },
      {
        content: 'You can use any type of tomatoes, such as San Marzano or Roma, depending on your preference.',
      },
      {
        content: 'You can use any type of cheese, such as mozzarella or provolone, depending on your preference.',
      },
    ],
  },
  {
    cook_time: 35,
    description: 'Rich and creamy Arborio rice with wild mushrooms and Parmesan cheese',
    preparation_time: 10,
    slug: slugify('Creamy Mushroom Risotto'),
    title: 'Creamy Mushroom Risotto',
    difficulty: 'MEDIUM',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.loveandlemons.com%2Fwp-content%2Fuploads%2F2023%2F01%2Fmushroom-risotto.jpg&f=1&nofb=1&ipt=e6563256f66789a37a094ccc91529c1ff0714d6c19f5cf3014a8333e16259172',
    steps: [
      {
        step_no: 1,
        title: 'Prepare the Ingredients',
        content: 'Heat broth in a saucepan and keep it warm over low heat.',
      },
      {
        step_no: 2,
        title: 'Cook the Rice',
        content: 'Sauté onions and garlic in butter until translucent.',
      },
      {
        step_no: 3,
        title: 'Add the Rice',
        content: 'Add Arborio rice and toast for 2 minutes.',
      },
      {
        step_no: 4,
        title: 'Add the Sauce',
        content: 'Gradually add warm broth, stirring constantly until absorbed.',
      },
      {
        step_no: 5,
        title: 'Add the Mushrooms',
        content: 'Stir in sautéed mushrooms and Parmesan cheese before serving.',
      },
    ],
    ingredients: ['Arborio Rice', 'White Mushroom', 'Shredded Mozzarella'],
    tips: [
      {
        content: 'You can use any type of rice, such as Arborio or Quinoa, depending on your preference.',
      },
      {
        content: 'You can use any type of mushrooms, such as wild or red, depending on your preference.',
      },
      {
        content: 'You can use any type of cheese, such as mozzarella or provolone, depending on your preference.',
      },
    ],
  },
  {
    cook_time: 15,
    description: 'Decadent individual chocolate cakes with molten chocolate centers',
    preparation_time: 20,
    slug: slugify('Chocolate Lava Cake'),
    title: 'Chocolate Lava Cake',
    difficulty: 'EASY',
    image: 'https://t4.ftcdn.net/jpg/12/73/91/71/360_F_1273917170_YM4koZT3Iuwb2pkUjAc5HDVk8ro2yqY7.jpg',
    steps: [
      {
        step_no: 1,
        title: 'Preheat the Oven',
        content: 'Preheat oven to 220°C (425°F) and grease ramekins.',
      },
      {
        step_no: 2,
        title: 'Prepare the Batter',
        content: 'Melt chocolate and butter together until smooth.',
      },
      {
        step_no: 3,
        title: 'Add the Ingredients',
        content: 'Whisk in eggs, sugar, and flour until just combined.',
      },
      {
        step_no: 4,
        title: 'Bake the Cakes',
        content: 'Pour batter into ramekins and bake until edges are set but center is soft.',
      },
      {
        step_no: 5,
        title: 'Serve the Cakes',
        content: 'Invert cakes onto plates and serve immediately.',
      },
    ],
    ingredients: ['Dark Chocolate', 'Butter', 'Large Egg', 'Sugar', 'All-Purpose Flour'],
    tips: [
      {
        content: 'You can use any type of chocolate, such as milk or dark, depending on your preference.',
      },
      {
        content: 'You can use any type of butter, such as unsalted or salted, depending on your preference.',
      },
      {
        content: 'You can use any type of eggs, such as large or small, depending on your preference.',
      },
    ],
  },
  {
    cook_time: 40,
    description: 'Traditional Korean mixed rice bowl with vegetables, meat, and gochujang',
    preparation_time: 25,
    slug: slugify('Korean Bibimbap'),
    title: 'Korean Bibimbap',
    difficulty: 'MEDIUM',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2F4Dp-1foTVieumGmhq5f8NJyeESw%3D%2F3714x2476%2Ffilters%3Afill(auto%2C1)%2Fclassic-korean-bibimbap-recipe-2118765-hero-01-091c0e0f8c20426d8f70747955efa61d.jpg&f=1&nofb=1&ipt=0145d585239bc1988592ea451d287f98ad4c019d2d8e2afdbcd9da4a7f5ca895',
    steps: [
      {
        step_no: 1,
        title: 'Prepare the Ingredients',
        content: 'Cook rice and set aside.',
      },
      {
        step_no: 2,
        title: 'Cook the Vegetables',
        content: 'Sauté assorted vegetables like spinach, carrots, and mushrooms separately.',
      },
      {
        step_no: 3,
        title: 'Cook the Meat',
        content: 'Cook beef slices in a pan with soy sauce and garlic.',
      },
      {
        step_no: 4,
        title: 'Fry the Egg',
        content: 'Fry an egg sunny side up.',
      },
      {
        step_no: 5,
        title: 'Assemble the Bowl',
        content: 'Arrange rice in a bowl, top with vegetables, meat, and egg.',
      },
      {
        step_no: 6,
        title: 'Add the Sauce',
        content: 'Serve with gochujang and mix well before eating.',
      },
    ],
    ingredients: [
      'Jasmine Rice',
      'Boneless Chicken Breast',
      'Spinach',
      'Carrot',
      'White Mushroom',
      'Large Egg',
      'Red Pepper',
    ],
    tips: [
      {
        content: 'You can use any type of rice, such as jasmine or white, depending on your preference.',
      },
      {
        content: 'You can use any type of chicken, such as boneless or skinless, depending on your preference.',
      },
      {
        content: 'You can use any type of vegetables, such as spinach or carrots, depending on your preference.',
      },
    ],
  },
  {
    cook_time: 30,
    description: 'Traditional Japanese rice cake with a sweet and savory filling',
    preparation_time: 20,
    slug: slugify('Japanese Omurice'),
    title: 'Japanese Omurice',
    difficulty: 'MEDIUM',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcookingwithdog.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fomurice-00.jpg&f=1&nofb=1&ipt=53385fc0a83071c9897264ecbe9b7fc132fb74ceaaea0be3cd5f29127b3a807e',
    steps: [
      {
        step_no: 1,
        title: 'Prepare the Ingredients',
        content: 'Cook rice and let it cool slightly.',
      },
      {
        step_no: 2,
        title: 'Cook the Vegetables',
        content: 'Sauté diced chicken and vegetables until cooked through.',
      },
      {
        step_no: 3,
        title: 'Prepare the Rice Mixture',
        content: 'Add rice and ketchup, stir-frying until evenly coated.',
      },
      {
        step_no: 4,
        title: 'Make the Omelet',
        content: 'Make a thin omelet in a pan.',
      },
      {
        step_no: 5,
        title: 'Assemble the Omurice',
        content: 'Place the rice mixture on a plate, cover with the omelet, and drizzle with ketchup.',
      },
    ],
    ingredients: ['Jasmine Rice', 'Boneless Chicken Breast', 'Spinach', 'Carrot', 'White Mushroom', 'Large Egg'],
    tips: [
      {
        content: 'You can use any type of rice, such as jasmine or white, depending on your preference.',
      },
      {
        content: 'You can use any type of chicken, such as boneless or skinless, depending on your preference.',
      },
      {
        content: 'You can use any type of vegetables, such as spinach or carrots, depending on your preference.',
      },
    ],
  },
];

export const seedRecipes = async (db: PrismaClient) => {
  db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: 'JohnDoe@123',
        image:
          'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
        is_email_verified: true,
        user_type: 'CHEF',
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    for (const ingredient of dummyIngredients) {
      await tx.ingredient.create({
        data: {
          category: ingredient.category,
          description: ingredient.description,
          image: ingredient.image,
          name: ingredient.name,
          slug: slugify(ingredient.name),
          calories: ingredient.calories,
          carbohydrates: ingredient.carbohydrates,
          fat: ingredient.fat,
          fiber: ingredient.fiber,
          protein: ingredient.protein,
          sugar: ingredient.sugar,
          variants: {
            createMany: {
              data: ingredient.variants.map((variant) => ({
                name: variant.name,
                image: variant.image,
              })),
            },
          },
        },
      });
    }

    const ingredientVariants = await tx.ingredientVariant.findMany({});

    for (const recipe of dummyRecipes) {
      await tx.recipe.create({
        data: {
          cook_time: recipe.cook_time,
          description: recipe.description,
          preparation_time: recipe.preparation_time,
          slug: recipe.slug,
          title: recipe.title,
          difficulty: recipe.difficulty,
          user_id: user.id,
          steps: {
            createMany: {
              data: recipe.steps.map((step) => ({
                step_no: step.step_no,
                content: step.content,
                title: step.title,
              })),
            },
          },
          images: {
            create: {
              url: recipe.image,
              is_primary: true,
            },
          },
          ingredients: {
            createMany: {
              data: recipe.ingredients
                .filter((ingredientName) => ingredientVariants.some((ingVar) => ingVar.name === ingredientName))
                .map((ingredientName) => {
                  const variant = ingredientVariants.find((ingVar) => ingVar.name === ingredientName);
                  if (!variant) throw new Error(`Variant not found: ${ingredientName}`);

                  const units = ['g', 'ml', 'pcs', 'tbsp'];
                  return {
                    quantity: Math.floor(Math.random() * 10) + 1,
                    unit: units[Math.floor(Math.random() * units.length)],
                    note: '',
                    ingredient_variant_id: variant.id,
                  };
                }),
            },
          },
          tips: {
            createMany: {
              data: recipe.tips.map((tip) => ({
                content: tip.content,
              })),
            },
          },
        },
      });
    }
  });
};
