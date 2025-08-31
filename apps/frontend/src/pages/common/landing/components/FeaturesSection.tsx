import { Award, Camera, Search, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Your Culinary Journey Starts Here</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From ingredient discovery to recipe mastery, we've got everything you need
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-semibold">Smart Ingredient Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed mb-4">
                Got leftover ingredients? Our smart search finds perfect recipes that use exactly what you have in your
                fridge.
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Badge variant="secondary">Chicken</Badge>
                <span>+</span>
                <Badge variant="secondary">Rice</Badge>
                <span>→</span>
                <span className="text-primary font-medium">47 recipes</span>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold">Share Your Creations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed mb-4">
                Snap a photo, share your recipe, and inspire others. Build your culinary reputation in our foodie
                community.
              </CardDescription>
              <div className="flex items-center justify-center space-x-1 text-sm">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full border-2 border-background"></div>
                  <div className="w-6 h-6 bg-emerald-200 rounded-full border-2 border-background"></div>
                  <div className="w-6 h-6 bg-amber-200 rounded-full border-2 border-background"></div>
                </div>
                <span className="text-muted-foreground ml-2">12.5k+ active chefs</span>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-8">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold">Rate & Discover</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg leading-relaxed mb-4">
                Find the best recipes through community ratings and reviews. Never waste time on a bad recipe again.
              </CardDescription>
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-muted-foreground ml-2 text-sm">4.8 avg rating</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
