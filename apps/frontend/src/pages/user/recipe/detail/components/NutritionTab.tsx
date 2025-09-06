import { TGetRecipeBySlugOutput } from '@libs/contract';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';

export const NutritionTab = ({ recipe }: { recipe: TGetRecipeBySlugOutput }) => {
  const total_calories = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.calories), 0)
    .toFixed(2);

  const total_protein = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.protein), 0)
    .toFixed(2);

  const total_carbohydrates = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.carbohydrates), 0)
    .toFixed(2);

  const total_fat = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.fat), 0)
    .toFixed(2);

  const total_sugar = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.sugar), 0)
    .toFixed(2);

  const total_fiber = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.fiber), 0)
    .toFixed(2);

  const recipeNutritions = {
    total_protein,
    total_carbohydrates,
    total_fat,
    total_sugar,
    total_fiber,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutritional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">{total_calories}</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(recipeNutritions)
              .filter(([key]) => key !== 'calories')
              .map(([key, value]) => {
                const scaledValue = value;

                const unit = ['total_protein', 'total_fat', 'total_sugar', 'total_fiber'].includes(key) ? 'g' : '';

                return (
                  <div key={key} className="flex justify-between items-center py-2 border-b">
                    <span className="capitalize font-medium">{key.split('_').join(' ')}</span>
                    <span className="font-semibold">
                      {scaledValue}
                      {unit}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
