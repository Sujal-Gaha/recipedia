export interface RecipeIngredient {
  id: string;
  ingredient: string;
  quantity: string;
  unit: string;
  notes?: string;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  content: string;
  image?: string;
}

export interface RecipeFormData {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags: string[];
  image?: string;
}
