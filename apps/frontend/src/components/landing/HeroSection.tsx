import { BookOpen, ChefHat, Clock, Heart, Search, Sparkles, Star, Utensils } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-16 h-16 text-muted-foreground">
          <Utensils className="w-full h-full" />
        </div>
        <div className="absolute top-32 right-20 w-12 h-12 text-muted-foreground">
          <ChefHat className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 text-muted-foreground">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 right-10 w-10 h-10 text-muted-foreground">
          <Heart className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 text-muted-foreground">
          <Star className="w-full h-full" />
        </div>
      </div>

      <div className="absolute top-20 right-10 hidden lg:block">
        <Card className="w-64 transform rotate-6 hover:rotate-3 transition-transform duration-500">
          <CardContent className="p-4">
            <img
              src="https://t4.ftcdn.net/jpg/12/73/91/71/360_F_1273917170_YM4koZT3Iuwb2pkUjAc5HDVk8ro2yqY7.jpg"
              alt="Recipe preview"
              width={240}
              height={120}
              className="rounded-lg mb-3"
            />
            <h4 className="font-semibold text-sm">Chocolate Lava Cake</h4>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                15min
              </div>
              <div className="flex items-center text-xs text-amber-600">
                <Star className="w-3 h-3 mr-1 fill-current" />
                4.9
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-32 left-10 hidden lg:block">
        <Card className="w-64 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <CardContent className="p-4">
            <img
              src="https://media.istockphoto.com/id/104796223/photo/salad.jpg?s=612x612&w=0&k=20&c=sNNmSJugdrkaNkIn5S63gXlUfR63-yVNfVofiq4oHGA="
              alt="Recipe preview"
              width={240}
              height={120}
              className="rounded-lg mb-3"
            />
            <h4 className="font-semibold text-sm">Fresh Garden Salad</h4>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                10min
              </div>
              <div className="flex items-center text-xs text-emerald-600">
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  HEALTHY
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            New: AI-Powered Recipe Suggestions
          </Badge>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="text-foreground">Cook, Share &</span>
          <br />
          <span className="text-primary">Discover</span>
          <br />
          <span className="text-emerald-600">Amazing Recipes</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your kitchen into a culinary adventure. Find recipes based on ingredients you have, share your
          creations, and join a community of passionate food lovers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-4 text-lg font-medium" asChild>
            <Link to="/ingredients">
              <Search className="mr-3 h-5 w-5" />
              Find Recipes by Ingredients
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-medium" asChild>
            <Link to="/recipes">
              <BookOpen className="mr-3 h-5 w-5" />
              Browse All Recipes
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
