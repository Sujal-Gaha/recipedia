import { useState } from 'react';
import { Search, Filter, Clock, Star, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';

interface Ingredient {
  id: string;
  name: string;
  slug: string;
  image: string;
  variants: IngredientVariant[];
}

interface IngredientVariant {
  id: string;
  name: string;
  ingredient_id: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  cookTime: number;
  rating: number;
  upvotes: number;
  ingredients: string[];
}

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Mock data - in real app, this would come from your API
  const mockIngredients: Ingredient[] = [
    {
      id: '1',
      name: 'Chicken',
      slug: 'chicken',
      image: '/placeholder.svg?height=60&width=60',
      variants: [
        { id: '1a', name: 'Chicken Breast', ingredient_id: '1' },
        { id: '1b', name: 'Chicken Thigh', ingredient_id: '1' },
        { id: '1c', name: 'Whole Chicken', ingredient_id: '1' },
      ],
    },
    {
      id: '2',
      name: 'Tomato',
      slug: 'tomato',
      image: '/placeholder.svg?height=60&width=60',
      variants: [
        { id: '2a', name: 'Cherry Tomatoes', ingredient_id: '2' },
        { id: '2b', name: 'Roma Tomatoes', ingredient_id: '2' },
        { id: '2c', name: 'Canned Tomatoes', ingredient_id: '2' },
      ],
    },
    {
      id: '3',
      name: 'Onion',
      slug: 'onion',
      image: '/placeholder.svg?height=60&width=60',
      variants: [
        { id: '3a', name: 'Yellow Onion', ingredient_id: '3' },
        { id: '3b', name: 'Red Onion', ingredient_id: '3' },
        { id: '3c', name: 'Green Onion', ingredient_id: '3' },
      ],
    },
    {
      id: '4',
      name: 'Garlic',
      slug: 'garlic',
      image: '/placeholder.svg?height=60&width=60',
      variants: [
        { id: '4a', name: 'Fresh Garlic', ingredient_id: '4' },
        { id: '4b', name: 'Garlic Powder', ingredient_id: '4' },
      ],
    },
    {
      id: '5',
      name: 'Rice',
      slug: 'rice',
      image: '/placeholder.svg?height=60&width=60',
      variants: [
        { id: '5a', name: 'Basmati Rice', ingredient_id: '5' },
        { id: '5b', name: 'Jasmine Rice', ingredient_id: '5' },
        { id: '5c', name: 'Brown Rice', ingredient_id: '5' },
      ],
    },
    {
      id: '6',
      name: 'Pasta',
      slug: 'pasta',
      image: '/placeholder.svg?height=60&width=60',
      variants: [
        { id: '6a', name: 'Spaghetti', ingredient_id: '6' },
        { id: '6b', name: 'Penne', ingredient_id: '6' },
        { id: '6c', name: 'Fusilli', ingredient_id: '6' },
      ],
    },
  ];

  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Chicken Tomato Rice',
      description: 'A hearty one-pot meal with tender chicken and flavorful rice',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'EASY',
      cookTime: 35,
      rating: 4.6,
      upvotes: 128,
      ingredients: ['Chicken', 'Tomato', 'Rice', 'Onion', 'Garlic'],
    },
    {
      id: '2',
      title: 'Garlic Chicken Pasta',
      description: 'Creamy pasta with perfectly seasoned chicken',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'MEDIUM',
      cookTime: 25,
      rating: 4.8,
      upvotes: 256,
      ingredients: ['Chicken', 'Pasta', 'Garlic', 'Onion'],
    },
    {
      id: '3',
      title: 'Simple Tomato Rice',
      description: 'Quick and easy tomato rice perfect for busy weeknights',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'EASY',
      cookTime: 20,
      rating: 4.4,
      upvotes: 89,
      ingredients: ['Tomato', 'Rice', 'Onion', 'Garlic'],
    },
  ];

  const filteredIngredients = mockIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIngredientToggle = (ingredientName: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientName) ? prev.filter((name) => name !== ingredientName) : [...prev, ingredientName]
    );
  };

  const handleFindRecipes = () => {
    if (selectedIngredients.length === 0) return;

    const recipes = mockRecipes.filter((recipe) =>
      selectedIngredients.every((ingredient) => recipe.ingredients.includes(ingredient))
    );
    setFilteredRecipes(recipes);
    setShowResults(true);
  };

  const removeIngredient = (ingredientName: string) => {
    setSelectedIngredients((prev) => prev.filter((name) => name !== ingredientName));
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
              {/* Search */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>

              {/* Selected Ingredients */}
              {selectedIngredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-lg">Selected Ingredients:</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedIngredients.map((ingredient) => (
                      <Badge key={ingredient} variant="default" className="px-4 py-2 text-sm">
                        {ingredient}
                        <button onClick={() => removeIngredient(ingredient)} className="ml-2 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredIngredients.map((ingredient) => (
                  <Card
                    key={ingredient.id}
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedIngredients.includes(ingredient.name)
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient.name)}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={selectedIngredients.includes(ingredient.name)}
                          onChange={() => handleIngredientToggle(ingredient.name)}
                        />
                        <img
                          src={ingredient.image || '/placeholder.svg'}
                          alt={ingredient.name}
                          width={48}
                          height={48}
                          className="rounded-xl"
                        />
                        <div>
                          <p className="font-semibold">{ingredient.name}</p>
                          <p className="text-sm text-muted-foreground">{ingredient.variants.length} variants</p>
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
                      Selected: {selectedIngredients.length} ingredients
                    </p>
                    <div className="text-3xl font-bold text-primary mb-2">{selectedIngredients.length}</div>
                    <p className="text-sm text-muted-foreground">Ready to cook</p>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleFindRecipes}
                  disabled={selectedIngredients.length === 0}
                  className="w-full h-12 text-lg font-medium"
                >
                  <Search className="mr-3 h-5 w-5" />
                  Find Recipes
                </Button>

                {selectedIngredients.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedIngredients([])}
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

      {/* Results */}
      {showResults && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recipes You Can Make ({filteredRecipes.length})</h2>
              <p className="text-lg text-muted-foreground">Perfect matches for your ingredients</p>
            </div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image || '/placeholder.svg'}
                      alt={recipe.title}
                      width={300}
                      height={200}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge
                      variant={
                        recipe.difficulty === 'EASY'
                          ? 'secondary'
                          : recipe.difficulty === 'MEDIUM'
                          ? 'default'
                          : 'destructive'
                      }
                      className="absolute top-4 right-4"
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {recipe.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {recipe.cookTime}min
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                        {recipe.rating}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-primary" />
                        {recipe.upvotes}
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
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
}
