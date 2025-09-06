import { Award, Calendar, ChefHat, Clock, Edit, Heart, Star, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../constants/routes';
import { Badge } from '../../../components/ui/badge';
import { useState } from 'react';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('recipes');

  // Mock user data
  const user = {
    id: '1',
    name: 'Chef Maria Rodriguez',
    email: 'maria@example.com',
    image: '/placeholder.svg?height=120&width=120',
    bio: 'Passionate home cook sharing family recipes passed down through generations. Specializing in Mediterranean and Latin American cuisine.',
    joinDate: 'January 2023',
    location: 'Barcelona, Spain',
    stats: {
      recipes: 24,
      followers: 1247,
      following: 89,
      totalUpvotes: 3456,
      avgRating: 4.7,
    },
  };

  const userRecipes = [
    {
      id: '1',
      title: 'Authentic Paella Valenciana',
      description: 'Traditional Spanish paella with saffron, chicken, and vegetables',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'MEDIUM',
      cookTime: 45,
      rating: 4.8,
      upvotes: 234,
      status: 'published',
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: "Abuela's Empanadas",
      description: 'Crispy beef empanadas with a secret family spice blend',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'EASY',
      cookTime: 30,
      rating: 4.9,
      upvotes: 456,
      status: 'published',
      createdAt: '2024-01-05',
    },
    {
      id: '3',
      title: 'Mediterranean Seafood Stew',
      description: 'Rich tomato-based stew with fresh catch of the day',
      image: '/placeholder.svg?height=200&width=300',
      difficulty: 'HARD',
      cookTime: 60,
      rating: 4.6,
      upvotes: 189,
      status: 'draft',
      createdAt: '2024-01-15',
    },
  ];

  const favoriteRecipes = [
    {
      id: '4',
      title: 'Perfect Risotto Milanese',
      author: 'Chef Giovanni',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.9,
      upvotes: 567,
    },
    {
      id: '5',
      title: 'Thai Green Curry',
      author: 'Chef Siriporn',
      image: '/placeholder.svg?height=200&width=300',
      rating: 4.7,
      upvotes: 423,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.image || '/placeholder.svg'} alt={user.name} />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Calendar className="mr-1 h-4 w-4" />
                    Joined {user.joinDate}
                  </p>
                </div>
                <Button className="mt-2 sm:mt-0">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              <p className="text-gray-700 mb-4">{user.bio}</p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{user.stats.recipes}</div>
                  <div className="text-sm text-gray-600">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{user.stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{user.stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{user.stats.totalUpvotes.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Upvotes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                    <Star className="mr-1 h-5 w-5 fill-current" />
                    {user.stats.avgRating}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recipes">My Recipes</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* My Recipes Tab */}
        <TabsContent value="recipes">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Recipes ({userRecipes.length})</h2>
            <Button asChild>
              <Link to={_FULL_ROUTES.CREATE_RECIPE}>
                <ChefHat className="mr-2 h-4 w-4" />
                Create New Recipe
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={recipe.image || '/placeholder.svg'}
                    alt={recipe.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                    <Badge
                      variant={
                        recipe.difficulty === 'EASY'
                          ? 'default'
                          : recipe.difficulty === 'MEDIUM'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {recipe.difficulty}
                    </Badge>
                    <Badge variant={recipe.status === 'published' ? 'default' : 'secondary'}>{recipe.status}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.cookTime}min
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {recipe.rating}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {recipe.upvotes}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button asChild className="flex-1">
                      <Link to={`${_FULL_ROUTES.RECIPE}/${recipe.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/recipes/${recipe.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Favorite Recipes ({favoriteRecipes.length})</h2>
            <p className="text-gray-600">Recipes you've saved for later</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={recipe.image || '/placeholder.svg'}
                    alt={recipe.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Button size="sm" variant="secondary" className="absolute top-2 right-2 h-8 w-8 p-0">
                    <Heart className="h-4 w-4 fill-current text-red-500" />
                  </Button>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
                  <CardDescription>by {recipe.author}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {recipe.rating}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {recipe.upvotes}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <p className="text-gray-600">Your recent interactions and achievements</p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Recipe Milestone Reached!</p>
                    <p className="text-sm text-gray-600">Your "Authentic Paella Valenciana" reached 200 upvotes</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ChefHat className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New Recipe Published</p>
                    <p className="text-sm text-gray-600">You published "Mediterranean Seafood Stew"</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">High Rating Received</p>
                    <p className="text-sm text-gray-600">Your "Abuela's Empanadas" received a 5-star review</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};
