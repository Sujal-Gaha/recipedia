import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Search, Filter, Clock, Star, TrendingUp, Heart, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../constants/routes';
import { RecipesPageHeader } from './components/PageHeader';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  cookTime: number;
  prepTime: number;
  rating: number;
  upvotes: number;
  author: string;
  authorImage: string;
  isFavorited: boolean;
  isUpvoted: boolean;
}

export const RecipesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Spicy Thai Basil Chicken',
      description: 'Authentic Thai flavors with fresh basil, chilies, and tender chicken served over jasmine rice',
      image: 'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2020/07/Thai-basil-chicken-33.jpg',
      difficulty: 'MEDIUM',
      cookTime: 25,
      prepTime: 15,
      rating: 4.8,
      upvotes: 234,
      author: 'Chef Maria',
      authorImage:
        'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
      isFavorited: false,
      isUpvoted: true,
    },
    {
      id: '2',
      title: 'Classic Margherita Pizza',
      description: 'Homemade pizza dough topped with fresh mozzarella, basil, and San Marzano tomatoes',
      image:
        'https://media.istockphoto.com/id/1280329631/photo/italian-pizza-margherita-with-tomatoes-and-mozzarella-cheese-on-wooden-cutting-board-close-up.jpg?s=612x612&w=0&k=20&c=CFDDjavIC5l8Zska16UZRZDXDwd47fwmRsUNzY0Ym6o=',
      difficulty: 'EASY',
      cookTime: 45,
      prepTime: 30,
      rating: 4.9,
      upvotes: 456,
      author: 'Tony Romano',
      authorImage:
        'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
      isFavorited: true,
      isUpvoted: false,
    },
    {
      id: '3',
      title: 'Creamy Mushroom Risotto',
      description: 'Rich and creamy Arborio rice with wild mushrooms and Parmesan cheese',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.loveandlemons.com%2Fwp-content%2Fuploads%2F2023%2F01%2Fmushroom-risotto.jpg&f=1&nofb=1&ipt=e6563256f66789a37a094ccc91529c1ff0714d6c19f5cf3014a8333e16259172',
      difficulty: 'MEDIUM',
      cookTime: 35,
      prepTime: 10,
      rating: 4.6,
      upvotes: 312,
      author: 'Isabella Rossi',
      authorImage:
        'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
      isFavorited: true,
      isUpvoted: true,
    },
    {
      id: '4',
      title: 'Chocolate Lava Cake',
      description: 'Decadent individual chocolate cakes with molten chocolate centers',
      image: 'https://t4.ftcdn.net/jpg/12/73/91/71/360_F_1273917170_YM4koZT3Iuwb2pkUjAc5HDVk8ro2yqY7.jpg',
      difficulty: 'EASY',
      cookTime: 15,
      prepTime: 20,
      rating: 4.9,
      upvotes: 567,
      author: 'Pastry Chef Anna',
      authorImage:
        'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
      isFavorited: false,
      isUpvoted: true,
    },
    {
      id: '5',
      title: 'Korean Bibimbap',
      description: 'Traditional Korean mixed rice bowl with vegetables, meat, and gochujang',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2F4Dp-1foTVieumGmhq5f8NJyeESw%3D%2F3714x2476%2Ffilters%3Afill(auto%2C1)%2Fclassic-korean-bibimbap-recipe-2118765-hero-01-091c0e0f8c20426d8f70747955efa61d.jpg&f=1&nofb=1&ipt=0145d585239bc1988592ea451d287f98ad4c019d2d8e2afdbcd9da4a7f5ca895',
      difficulty: 'MEDIUM',
      cookTime: 40,
      prepTime: 25,
      rating: 4.5,
      upvotes: 198,
      author: 'Chef Kim',
      authorImage:
        'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
      isFavorited: false,
      isUpvoted: false,
    },
    {
      id: '6',
      title: 'Japanese Omurice',
      description: 'Traditional Japanese rice cake with a sweet and savory filling',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcookingwithdog.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fomurice-00.jpg&f=1&nofb=1&ipt=53385fc0a83071c9897264ecbe9b7fc132fb74ceaaea0be3cd5f29127b3a807e',
      difficulty: 'MEDIUM',
      author: 'Chef Sujal',
      authorImage:
        'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=40',
      cookTime: 30,
      prepTime: 20,
      rating: 4.7,
      upvotes: 423,
      isFavorited: true,
      isUpvoted: false,
    },
  ];

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter.toUpperCase();
    return matchesSearch && matchesDifficulty;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0; // Would sort by creation date in real app
      case 'cookTime':
        return a.cookTime - b.cookTime;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <RecipesPageHeader />

        <Card className="border-0 p-8 mb-12">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="text-lg !h-12 w-full">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="text-lg !h-12 w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="cookTime">Cook Time</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="h-12 text-lg font-medium">
                <Filter className="mr-3 h-5 w-5" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Showing <span className="font-semibold">{sortedRecipes.length}</span> of{' '}
            <span className="font-semibold">{mockRecipes.length}</span> recipes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden border-0 group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image || '/placeholder.svg'}
                  alt={recipe.title}
                  width={300}
                  height={200}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <Badge className="bg-white/90 text-gray-700 border-0 shadow-lg backdrop-blur-sm" variant="secondary">
                    {recipe.difficulty}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={recipe.isFavorited ? 'default' : 'secondary'}
                      className={`h-10 w-10 p-0 shadow-lg backdrop-blur-sm transition-all duration-300 ${
                        recipe.isFavorited
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-white/90 hover:bg-white text-gray-700'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${recipe.isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-10 w-10 p-0 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className="p-6 pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={recipe.authorImage}
                    alt="authors"
                    width={32}
                    height={32}
                    className="rounded-full shadow-sm"
                  />
                  <span className="text-sm font-medium text-gray-600">{recipe.author}</span>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors leading-tight">
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
                    {recipe.cookTime + recipe.prepTime}min
                  </div>
                  <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                    {recipe.rating}
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <TrendingUp className={`h-4 w-4 mr-1 ${recipe.isUpvoted ? 'text-blue-600' : 'text-gray-500'}`} />
                    {recipe.upvotes}
                  </div>
                </div>

                <Button className="w-full font-medium" asChild>
                  <Link to={`${_FULL_ROUTES.RECIPE}/${recipe.id}`}>View Recipe</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="px-12 py-4 text-lg font-medium">
            Load More Recipes
          </Button>
        </div>
      </div>
    </div>
  );
};
