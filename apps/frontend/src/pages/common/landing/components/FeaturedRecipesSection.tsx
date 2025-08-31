import { Link } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Clock, Heart, Star, TrendingUp } from 'lucide-react';
import { _FULL_ROUTES } from '../../../../constants/routes';

const featuredRecipes = [
  {
    id: '1',
    title: 'Spicy Thai Basil Chicken',
    description: 'Authentic Thai flavors in under 30 minutes',
    image: 'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2020/07/Thai-basil-chicken-33.jpg',
    difficulty: 'MEDIUM',
    cookTime: 25,
    rating: 4.8,
    upvotes: 234,
    chef: 'Chef Maria',
    chefImage:
      'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: '2',
    title: 'Classic Margherita Pizza',
    description: 'Homemade pizza with fresh basil and mozzarella',
    image:
      'https://media.istockphoto.com/id/1280329631/photo/italian-pizza-margherita-with-tomatoes-and-mozzarella-cheese-on-wooden-cutting-board-close-up.jpg?s=612x612&w=0&k=20&c=CFDDjavIC5l8Zska16UZRZDXDwd47fwmRsUNzY0Ym6o=',
    difficulty: 'EASY',
    cookTime: 45,
    rating: 4.9,
    upvotes: 456,
    chef: 'Tony Romano',
    chefImage:
      'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: '3',
    title: 'Chicken Tikka Masala',
    description: 'Authentic Indian flavors in under 30 minutes',
    image:
      'https://www.seriouseats.com/thmb/DbQHUK2yNCALBnZE-H1M2AKLkok=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG',
    difficulty: 'HARD',
    cookTime: 30,
    rating: 4.7,
    upvotes: 189,
    chef: 'Chef John Doe',
    chefImage:
      'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740',
  },
];

export const FeaturedRecipesSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Featured Recipes</h2>
            <p className="text-xl text-muted-foreground">Handpicked by our culinary experts</p>
          </div>
          <Button variant="outline" asChild>
            <Link to={_FULL_ROUTES.RECIPE}>View All Recipes</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image || '/placeholder.svg'}
                  alt={recipe.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Recipe Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={recipe.chefImage || '/placeholder.svg'}
                      alt={recipe.chef}
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white"
                    />
                    <span className="text-sm font-medium">{recipe.chef}</span>
                  </div>
                </div>

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
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-10 w-10 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                  {recipe.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">{recipe.description}</CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between text-sm mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{recipe.cookTime}min</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{recipe.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{recipe.upvotes}</span>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to={`${_FULL_ROUTES.RECIPE}/${recipe.id}`}>View Recipe</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
