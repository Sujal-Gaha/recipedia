import { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Bookmark,
  Share2,
  ChefHat,
  Leaf,
  Thermometer,
  Droplets,
  Calendar,
  Package,
  Heart,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { _FULL_ROUTES } from '@/constants/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Recipe {
  id: string;
  title: string;
  image: string;
  difficulty: string;
  cookTime: number;
  rating: number;
  author: string;
}

export const AdminIngredientDetailPage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock ingredient data - in real app, this would be fetched based on slug
  const ingredient = {
    id: '1',
    name: 'Roma Tomatoes',
    category: 'Vegetables',
    description:
      'Roma tomatoes are a plum tomato variety known for their meaty texture and low moisture content, making them ideal for sauces, pastes, and cooking. They have fewer seeds and a more concentrated flavor compared to regular slicing tomatoes.',
    image: '/placeholder.svg?height=400&width=600',
    seasonality: 'Summer',
    origin: 'Italy',
    variants: ['Fresh', 'Canned', 'Paste', 'Dried'],
    tags: ['Italian', 'Cooking', 'Sauce', 'Low-acid'],
    nutritionalInfo: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      vitaminC: 13.7,
      potassium: 237,
    },
    storageInstructions:
      'Store at room temperature until ripe, then refrigerate for up to 1 week. For best flavor, bring to room temperature before using.',
    preparationTips:
      'Remove skin by blanching in boiling water for 30 seconds, then plunging into ice water. Score an X on the bottom before blanching for easier peeling.',
    usageStats: {
      recipesUsing: 1247,
      averageRating: 4.6,
      totalViews: 15420,
      bookmarks: 892,
    },
    healthBenefits: [
      'Rich in lycopene, a powerful antioxidant',
      'Good source of vitamin C and potassium',
      'Low in calories and fat',
      'Contains folate and vitamin K',
    ],
    cookingMethods: ['Roasting', 'Sautéing', 'Stewing', 'Grilling', 'Raw in salads'],
    pairings: ['Basil', 'Garlic', 'Olive oil', 'Mozzarella', 'Oregano', 'Onions'],
  };

  // Mock recipes using this ingredient
  const relatedRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Classic Marinara Sauce',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'EASY',
      cookTime: 30,
      rating: 4.8,
      author: 'Chef Maria',
    },
    {
      id: '2',
      title: 'Roasted Tomato Soup',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'MEDIUM',
      cookTime: 45,
      rating: 4.7,
      author: 'Sarah Chen',
    },
    {
      id: '3',
      title: 'Caprese Salad',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'EASY',
      cookTime: 10,
      rating: 4.9,
      author: 'Tony Romano',
    },
    {
      id: '4',
      title: 'Tomato Basil Pasta',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'EASY',
      cookTime: 25,
      rating: 4.6,
      author: 'Chef Gordon',
    },
  ];

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ingredient.name,
        text: ingredient.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Ingredients
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={ingredient.image || '/placeholder.svg'}
                alt={ingredient.name}
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{ingredient.name}</h1>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {ingredient.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Calendar className="h-3 w-3 mr-1" />
                        {ingredient.seasonality}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleBookmark}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleShare}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <ChefHat className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{ingredient.usageStats.recipesUsing}</div>
              <div className="text-sm text-muted-foreground">Recipes</div>
            </Card>
            <Card className="p-4 text-center">
              <Star className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{ingredient.usageStats.averageRating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </Card>
            <Card className="p-4 text-center">
              <Eye className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{ingredient.usageStats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </Card>
            <Card className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{ingredient.usageStats.bookmarks}</div>
              <div className="text-sm text-muted-foreground">Bookmarks</div>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="cooking">Cooking</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {ingredient.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{ingredient.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Variants</h4>
                      <div className="flex flex-wrap gap-2">
                        {ingredient.variants.map((variant) => (
                          <Badge key={variant} variant="outline">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {ingredient.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Storage & Preparation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Storage Instructions</h4>
                    <p className="text-muted-foreground">{ingredient.storageInstructions}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Preparation Tips</h4>
                    <p className="text-muted-foreground">{ingredient.preparationTips}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Health Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {ingredient.healthBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Information</CardTitle>
                  <CardDescription>Per 100g serving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Calories</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.calories} kcal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Protein</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.protein}g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Carbohydrates</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.carbs}g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Fat</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.fat}g</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Fiber</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.fiber}g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Vitamin C</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.vitaminC}mg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Potassium</span>
                        <span className="font-bold">{ingredient.nutritionalInfo.potassium}mg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cooking" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Thermometer className="h-5 w-5 mr-2" />
                      Cooking Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ingredient.cookingMethods.map((method) => (
                        <div key={method} className="flex items-center p-3 bg-muted rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span className="font-medium">{method}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets className="h-5 w-5 mr-2" />
                      Perfect Pairings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.pairings.map((pairing) => (
                        <Badge key={pairing} variant="outline" className="px-3 py-1">
                          {pairing}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recipes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recipes Using {ingredient.name}</CardTitle>
                  <CardDescription>{relatedRecipes.length} recipes feature this ingredient</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedRecipes.map((recipe) => (
                      <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={recipe.image || '/placeholder.svg'}
                            alt={recipe.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                          <Badge
                            variant={
                              recipe.difficulty === 'EASY'
                                ? 'secondary'
                                : recipe.difficulty === 'MEDIUM'
                                ? 'default'
                                : 'destructive'
                            }
                            className="absolute top-2 right-2"
                          >
                            {recipe.difficulty}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">by {recipe.author}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              {recipe.cookTime}min
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                              {recipe.rating}
                            </div>
                          </div>
                          <Button className="w-full mt-4" asChild>
                            <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="outline">{ingredient.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Season</span>
                <span className="font-medium">{ingredient.seasonality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Origin</span>
                <span className="font-medium">{ingredient.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variants</span>
                <span className="font-medium">{ingredient.variants.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Cherry Tomatoes', 'San Marzano Tomatoes', 'Beefsteak Tomatoes'].map((similar) => (
                <Link
                  key={similar}
                  to={`/ingredients/${similar.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  <span className="font-medium">{similar}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
