import { useState } from 'react';
import { Search, Filter, Clock, Star, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import { _FULL_ROUTES } from '../../constants/routes';
import { ingredientApi } from '@/apis/ingredient-api';
import { recipeApi } from '@/apis/recipe-api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import clsx from 'clsx';

export const IngredientsPage = () => {
  const [selectedIngredientVariantsId, setSelectedIngredientVariantsId] = useState<string[]>([]);
  const [pagination] = useState({
    page: 1,
    perPage: 6,
  });
  const [globalFilter, setGlobalFilter] = useState('');

  const [isRecipeQueryEnabled, setRecipeQuery] = useState(false);

  const { data: getAllIngredientVariantsData } = ingredientApi.getAllIngredientVariants.useQuery(
    ['getAllIngredientVariants', pagination.page, pagination.perPage, globalFilter],
    {
      query: {
        page: String(pagination.page),
        perPage: String(pagination.perPage),
        global_filter: globalFilter,
      },
    }
  );

  const ingredientVariants = getAllIngredientVariantsData?.status === 200 ? getAllIngredientVariantsData.body.data : [];

  const { data: getAllRecipesData } = recipeApi.getAllRecipes.useQuery(
    ['getAllRecipes', 1, 100],
    {
      query: {
        page: '1',
        perPage: '100',
        recipe_ingredient_variants_id: selectedIngredientVariantsId,
      },
    },
    {
      queryKey: ['getAllRecipes', 1, 100],
      enabled: isRecipeQueryEnabled && !!selectedIngredientVariantsId.length,
    }
  );

  const recipes = getAllRecipesData?.status === 200 ? getAllRecipesData.body.data : [];

  const handleIngredientToggle = (id: string) => {
    setSelectedIngredientVariantsId((prev) => (prev.includes(id) ? prev.filter((name) => name !== id) : [...prev, id]));
  };

  const handleFindRecipes = () => {
    if (selectedIngredientVariantsId.length === 0) return;

    setRecipeQuery(true);
  };

  const removeIngredient = (new_id: string) => {
    setSelectedIngredientVariantsId((prev) => prev.filter((id) => id !== new_id));
  };

  const getIngredientVariantNameFromId = (id: string) => {
    return ingredientVariants.find((ingVar) => ingVar.id === id)?.name || '';
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Find Recipes by Ingredients</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Select the ingredients you have available and discover recipes you can make right now!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ingredients Selection */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-2xl font-semibold">
                <Filter className="mr-3 h-6 w-6 text-primary" />
                Select Your Ingredients
              </CardTitle>
              <CardDescription className="text-lg">
                Choose from the ingredients you have in your kitchen
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search ingredients..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>

              {selectedIngredientVariantsId.length > 0 ? (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-lg">Selected Ingredients:</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedIngredientVariantsId.map((variant_id) => (
                      <Badge key={variant_id} variant="default" className="px-4 py-2 text-sm">
                        {getIngredientVariantNameFromId(variant_id)}
                        <button onClick={() => removeIngredient(variant_id)} className="ml-2 hover:text-gray-50">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-lg">Selected Ingredients:</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default" className="px-4 py-2 text-sm">
                      None
                      <button className="ml-2 hover:text-gray-50">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ingredientVariants.map((ingredient) => (
                  <Card
                    key={ingredient.id}
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedIngredientVariantsId.includes(ingredient.id)
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient.id)}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedIngredientVariantsId.includes(ingredient.id)}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                        />
                        <img
                          src={ingredient.image || '/placeholder.svg'}
                          alt={ingredient.name}
                          className="rounded-xl h-12 w-12"
                        />
                        <div>
                          <p className="font-semibold">{ingredient.name}</p>
                          {/* <p className="text-sm text-muted-foreground">{ingredient.variants.length} variants</p> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Actions */}
        <div className="lg:col-span-1">
          <Card className="p-8 sticky top-28">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-semibold">Recipe Search</CardTitle>
              <CardDescription className="text-lg">Find recipes with your selected ingredients</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-6">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      Selected: {selectedIngredientVariantsId.length} ingredients
                    </p>
                    <div className="text-3xl font-bold text-primary mb-2">{selectedIngredientVariantsId.length}</div>
                    <p className="text-sm text-muted-foreground">Ready to cook</p>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleFindRecipes}
                  disabled={selectedIngredientVariantsId.length === 0}
                  className="w-full h-12 text-lg font-medium"
                >
                  <Search className="mr-3 h-5 w-5" />
                  Find Recipes
                </Button>

                {selectedIngredientVariantsId.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRecipeQuery(false);
                      setSelectedIngredientVariantsId([]);
                    }}
                    className="w-full h-12 font-medium"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isRecipeQueryEnabled && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recipes You Can Make ({recipes.length})</h2>
              <p className="text-lg text-muted-foreground">Perfect matches for your ingredients</p>
            </div>
          </div>

          {recipes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden border-0 group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.images.find((img) => img.is_primary)?.url || '/placeholder.svg'}
                      alt={recipe.title}
                      width={300}
                      height={200}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <Badge
                        variant={
                          recipe.difficulty === 'EASY'
                            ? 'secondary'
                            : recipe.difficulty === 'MEDIUM'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={recipe.user.image || '/placeholder.svg'} alt={recipe.user.name} />
                        <AvatarFallback>{recipe.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-600">{recipe.user.name}</span>
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                      {recipe.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed truncate">
                      {recipe.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.cook_time + recipe.preparation_time}min
                      </div>
                      <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                        {recipe.review.average_rating}
                      </div>
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                        <TrendingUp
                          className={clsx('h-4 w-4 mr-1', recipe.is_upvoted ? 'text-primary' : 'text-gray_500')}
                        />
                        {recipe.upvotes.total_votes}
                      </div>
                    </div>

                    <Button className="w-full font-medium" asChild>
                      <Link to={`${_FULL_ROUTES.RECIPE}/${recipe.slug}`}>View Recipe</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">No recipes found</h3>
                <p className="text-lg text-muted-foreground mb-6">No recipes found with your selected ingredients.</p>
                <p className="text-muted-foreground">Try selecting fewer ingredients or different combinations.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
