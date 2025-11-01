export interface RecipeIngredient {
  ingredient_variant_id: string;
  note: string | null;
  quantity: number;
  unit: string | null;
}
export interface RecipeStep {
  step_no: number;
  content: string;
  title: string;
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

export interface RecipeTip {
  content: string;
}
