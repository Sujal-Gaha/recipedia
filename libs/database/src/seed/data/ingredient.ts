import { Ingredient, IngredientVariant } from '@prisma/client';

export const dummyIngredients: (Pick<
  Ingredient,
  'calories' | 'carbohydrates' | 'category' | 'description' | 'fat' | 'fiber' | 'image' | 'name' | 'protein' | 'sugar'
> & {
  variants: Pick<IngredientVariant, 'image' | 'name'>[];
})[] = [
  {
    name: 'Rice',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    category: 'Grain',
    description: 'Staple grain used in dishes worldwide.',
    calories: 130,
    protein: 2.7,
    carbohydrates: 28,
    fat: 0.3,
    sugar: 0.1,
    fiber: 0.4,
    variants: [
      {
        name: 'Jasmine Rice',
        image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
      },
      {
        name: 'Basmati Rice',
        image: 'https://images.pexels.com/photos/8108170/pexels-photo-8108170.jpeg',
      },
      {
        name: 'Arborio Rice',
        image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
      },
    ],
  },
  {
    name: 'Pasta',
    image: 'https://images.pexels.com/photos/5907896/pexels-photo-5907896.jpeg',
    category: 'Grain',
    description: 'Italian staple made from durum wheat, boiled and served with sauces.',
    calories: 157,
    protein: 5.8,
    carbohydrates: 30,
    fat: 0.9,
    sugar: 1.1,
    fiber: 1.8,
    variants: [],
  },

  {
    name: 'Chicken Breast',
    image: 'https://images.pexels.com/photos/5769384/pexels-photo-5769384.jpeg',
    category: 'Protein',
    description: 'Lean protein source used in many savory dishes.',
    calories: 165,
    protein: 31,
    carbohydrates: 0,
    fat: 3.6,
    sugar: 0,
    fiber: 0,
    variants: [
      {
        name: 'Boneless Chicken Breast',
        image: 'https://images.pexels.com/photos/5769384/pexels-photo-5769384.jpeg',
      },
      {
        name: 'Chicken Thigh',
        image: 'https://images.pexels.com/photos/12381147/pexels-photo-12381147.jpeg',
      },
    ],
  },

  {
    name: 'Egg',
    image: 'https://images.pexels.com/photos/2642201/pexels-photo-2642201.jpeg',
    category: 'Protein',
    description: 'Versatile ingredient, excellent protein source.',
    calories: 70,
    protein: 6,
    carbohydrates: 1,
    fat: 5,
    sugar: 0.4,
    fiber: 0,
    variants: [
      {
        name: 'Large Egg',
        image: 'https://images.pexels.com/photos/2642201/pexels-photo-2642201.jpeg',
      },
      {
        name: 'Quail Egg',
        image: 'https://images.pexels.com/photos/6958019/pexels-photo-6958019.jpeg',
      },
    ],
  },

  {
    name: 'Carrot',
    image: 'https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg',
    category: 'Vegetable',
    description: 'Crunchy, sweet root vegetable rich in beta carotene.',
    calories: 41,
    protein: 0.9,
    carbohydrates: 10,
    fat: 0.2,
    sugar: 4.7,
    fiber: 2.8,
    variants: [
      {
        name: 'Carrot',
        image: 'https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg',
      },
    ],
  },

  {
    name: 'Broccoli',
    image: 'https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg',
    category: 'Vegetable',
    description: 'Nutrient-rich cruciferous vegetable with antioxidants.',
    calories: 34,
    protein: 2.8,
    carbohydrates: 7,
    fat: 0.4,
    sugar: 1.7,
    fiber: 2.6,
    variants: [
      {
        name: 'Broccoli',
        image: 'https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg',
      },
    ],
  },
  {
    name: 'Onion',
    image: 'https://images.pexels.com/photos/175415/pexels-photo-175415.jpeg',
    category: 'Vegetable',
    description: 'Pungent bulb vegetable used in cooking for flavor.',
    calories: 40,
    protein: 1.1,
    carbohydrates: 9,
    fat: 0.1,
    sugar: 4.2,
    fiber: 1.7,
    variants: [
      {
        name: 'Red Onion',
        image: 'https://images.pexels.com/photos/175415/pexels-photo-175415.jpeg',
      },
      {
        name: 'Green Onion',
        image: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg',
      },
    ],
  },
  {
    name: 'Avocado',
    image: 'https://images.pexels.com/photos/1759055/pexels-photo-1759055.jpeg',
    category: 'Fruit',
    description: 'Creamy, nutrient-dense fruit high in healthy fats.',
    calories: 160,
    protein: 2,
    carbohydrates: 9,
    fat: 15,
    sugar: 0.7,
    fiber: 7,
    variants: [
      {
        name: 'Hass Avocado',
        image: 'https://images.pexels.com/photos/3029520/pexels-photo-3029520.jpeg',
      },
    ],
  },

  {
    name: 'Banana',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg',
    category: 'Fruit',
    description: 'Sweet tropical fruit rich in potassium.',
    calories: 89,
    protein: 1.1,
    carbohydrates: 23,
    fat: 0.3,
    sugar: 12,
    fiber: 2.6,
    variants: [
      {
        name: 'Ripe Banana',
        image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg',
      },
    ],
  },
  {
    name: 'Apple',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
    category: 'Fruit',
    description: 'Crisp, sweet fruit eaten raw or cooked.',
    calories: 52,
    protein: 0.3,
    carbohydrates: 14,
    fat: 0.2,
    sugar: 10,
    fiber: 2.4,
    variants: [
      {
        name: 'Green Apple',
        image: 'https://images.pexels.com/photos/616837/pexels-photo-616837.jpeg',
      },
      {
        name: 'Red Apple',
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
      },
    ],
  },

  {
    name: 'Basil',
    image: 'https://images.pexels.com/photos/1087902/pexels-photo-1087902.jpeg',
    category: 'Herb',
    description: 'Aromatic herb used in Mediterranean and Asian cooking.',
    calories: 23,
    protein: 3.2,
    carbohydrates: 2.7,
    fat: 0.6,
    sugar: 0.3,
    fiber: 1.6,
    variants: [
      {
        name: 'Thai Basil',
        image: 'https://images.pexels.com/photos/1087902/pexels-photo-1087902.jpeg',
      },
      {
        name: 'Sweet Basil',
        image: 'https://images.pexels.com/photos/1391505/pexels-photo-1391505.jpeg',
      },
    ],
  },
  {
    name: 'Cilantro',
    image: 'https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg',
    category: 'Herb',
    description: 'Fresh herb with citrusy flavor, common in Latin and Asian dishes.',
    calories: 23,
    protein: 2.1,
    carbohydrates: 3.7,
    fat: 0.5,
    sugar: 0.9,
    fiber: 2.8,
    variants: [
      {
        name: 'Coriander Leaves',
        image: 'https://images.pexels.com/photos/3338495/pexels-photo-3338495.jpeg',
      },
    ],
  },

  {
    name: 'Mozzarella Cheese',
    image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
    category: 'Dairy',
    description: 'Soft cheese commonly used on pizzas and pasta.',
    calories: 280,
    protein: 28,
    carbohydrates: 3,
    fat: 17,
    sugar: 1,
    fiber: 0,
    variants: [
      {
        name: 'Fresh Mozzarella',
        image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
      },
      {
        name: 'Shredded Mozzarella',
        image: 'https://images.pexels.com/photos/6287521/pexels-photo-6287521.jpeg',
      },
    ],
  },
  {
    name: 'Milk',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    category: 'Dairy',
    description: 'Nutrient-rich liquid dairy product from cows.',
    calories: 42,
    protein: 3.4,
    carbohydrates: 5,
    fat: 1,
    sugar: 5,
    fiber: 0,
    variants: [
      {
        name: 'Whole Milk',
        image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
      },
      {
        name: 'Chocolate Milk',
        image: 'https://images.pexels.com/photos/7260260/pexels-photo-7260260.jpeg',
      },
    ],
  },

  {
    name: 'Garlic',
    image: 'https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg',
    category: 'Vegetable',
    description: 'Pungent bulb vegetable used in cooking for flavor.',
    calories: 40,
    protein: 1.1,
    carbohydrates: 9,
    fat: 0.1,
    sugar: 4.2,
    fiber: 1.7,
    variants: [
      {
        name: 'Fresh Garlic',
        image: 'https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg',
      },
    ],
  },

  {
    name: 'Tomato',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    category: 'Vegetable',
    description: 'Round, red fruit used in cooking for flavor and texture.',
    calories: 15,
    protein: 0.9,
    carbohydrates: 3.9,
    fat: 0.1,
    sugar: 0.9,
    fiber: 1.1,
    variants: [
      {
        name: 'Fresh Tomato',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      },
    ],
  },

  {
    name: 'Mushroom',
    image: 'https://images.pexels.com/photos/793267/pexels-photo-793267.jpeg',
    category: 'Vegetable',
    description: 'Fungal fruit used in cooking for flavor and texture.',
    calories: 25,
    protein: 1.2,
    carbohydrates: 7,
    fat: 0.1,
    sugar: 1.2,
    fiber: 2.3,
    variants: [
      {
        name: 'Red Mushroom',
        image: 'https://images.pexels.com/photos/757292/pexels-photo-757292.jpeg',
      },
      {
        name: 'White Mushroom',
        image: 'https://images.pexels.com/photos/1249884/pexels-photo-1249884.jpeg',
      },
    ],
  },

  {
    name: 'Chocolate',
    image: 'https://images.pexels.com/photos/1153879/pexels-photo-1153879.jpeg',
    category: 'Dairy',
    description: 'Rich, chocolate used in cooking for flavor and texture.',
    calories: 500,
    protein: 5,
    carbohydrates: 75,
    fat: 72,
    sugar: 72,
    fiber: 5,
    variants: [
      {
        name: 'Dark Chocolate',
        image: 'https://images.pexels.com/photos/6167328/pexels-photo-6167328.jpeg',
      },
    ],
  },

  {
    name: 'Butter',
    image: 'https://images.pexels.com/photos/3821250/pexels-photo-3821250.jpeg',
    category: 'Dairy',
    description: 'Creamy fat used in cooking for flavor and texture.',
    calories: 120,
    protein: 0.8,
    carbohydrates: 0,
    fat: 9,
    sugar: 0,
    fiber: 0,
    variants: [
      {
        name: 'Butter',
        image: 'https://images.pexels.com/photos/3821250/pexels-photo-3821250.jpeg',
      },
    ],
  },

  {
    name: 'Sugar',
    image: 'https://images.pexels.com/photos/2523659/pexels-photo-2523659.jpeg',
    category: 'Dairy',
    description: 'Sweet, sweet sugar used in cooking for flavor and texture.',
    calories: 400,
    protein: 0,
    carbohydrates: 99,
    fat: 0,
    sugar: 99,
    fiber: 0,
    variants: [
      {
        name: 'Sugar',
        image: 'https://images.pexels.com/photos/2523659/pexels-photo-2523659.jpeg',
      },
    ],
  },

  {
    name: 'Red Pepper',
    image: 'https://images.pexels.com/photos/35010/paprika-fruit-the-inside-of-the-peppers-the-grain-of-paprika.jpg',
    category: 'Vegetable',
    description: 'Red fruit used in cooking for flavor and texture.',
    calories: 15,
    protein: 0.9,
    carbohydrates: 3.9,
    fat: 0.1,
    sugar: 0.9,
    fiber: 1.1,
    variants: [
      {
        name: 'Red Pepper',
        image:
          'https://images.pexels.com/photos/35010/paprika-fruit-the-inside-of-the-peppers-the-grain-of-paprika.jpg',
      },
    ],
  },

  {
    name: 'Spinach',
    image: 'https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg',
    category: 'Vegetable',
    description: 'Green fruit used in cooking for flavor and texture.',
    calories: 15,
    protein: 0.9,
    carbohydrates: 3.9,
    fat: 0.1,
    sugar: 0.9,
    fiber: 1.1,
    variants: [
      {
        name: 'Spinach',
        image: 'https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg',
      },
    ],
  },

  {
    name: 'Flour',
    image: 'https://images.pexels.com/photos/6287581/pexels-photo-6287581.jpeg',
    category: 'Vegetable',
    description: 'Pungent bulb vegetable used in cooking for flavor.',
    calories: 40,
    protein: 1.1,
    carbohydrates: 9,
    fat: 0.1,
    sugar: 4.2,
    fiber: 1.7,
    variants: [
      {
        name: 'All-Purpose Flour',
        image: 'https://images.pexels.com/photos/6287581/pexels-photo-6287581.jpeg',
      },
    ],
  },
];
