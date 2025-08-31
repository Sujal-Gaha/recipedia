import { Bookmark, CheckCircle, Clock, Edit, Heart, Share2, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Badge } from '../../../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar';
import { FormEvent } from 'react';
import { RecipeFormData } from '../types/recipe';

// Mock Data
const currentUser = {
  name: 'Chef Maria Rodriguez',
  image: '/placeholder.svg?height=60&width=60',
  recipesCount: 24,
  followers: 1247,
};

export const PreviewRecipe = ({
  setActiveTab,
  formData,
  completedSteps,
  handleSubmit,
  toggleStep,
}: {
  setActiveTab: (tab: string) => void;
  formData: RecipeFormData;
  completedSteps: string[];
  handleSubmit: (e: FormEvent) => void;
  toggleStep: (stepId: string) => void;
}) => {
  return (
    <div className="space-y-8">
      {/* Preview Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Recipe Preview</h2>
            <p className="text-muted-foreground">This is how your recipe will appear to other users</p>
          </div>
          <Button onClick={() => setActiveTab('create')} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Recipe
          </Button>
        </div>
      </Card>

      {/* Recipe Preview */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Recipe Image */}
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={formData.image || '/placeholder.svg?height=400&width=600'}
              alt={formData.title || 'Recipe preview'}
              //   fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
              <Badge
                variant={
                  formData.difficulty === 'EASY'
                    ? 'secondary'
                    : formData.difficulty === 'MEDIUM'
                    ? 'default'
                    : 'destructive'
                }
                className="text-sm px-3 py-1"
              >
                {formData.difficulty || 'MEDIUM'}
              </Badge>
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" className="h-10 w-10 p-0 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="h-10 w-10 p-0 backdrop-blur-sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="h-10 w-10 p-0 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{formData.title || 'Your Recipe Title'}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {formData.description || 'Your recipe description will appear here...'}
            </p>
          </div>

          {/* Author Info */}
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={currentUser.image || '/placeholder.svg'} alt={currentUser.name} />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                <p className="text-muted-foreground">
                  {currentUser.recipesCount} recipes • {currentUser.followers} followers
                </p>
              </div>
              <Button variant="outline">Follow</Button>
            </div>
          </Card>

          {/* Recipe Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">
                {(Number.parseInt(formData.prepTime) || 0) + (Number.parseInt(formData.cookTime) || 0) || '--'}
              </div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </Card>
            <Card className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{formData.servings || '--'}</div>
              <div className="text-sm text-muted-foreground">Servings</div>
            </Card>
            <Card className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-amber-500 fill-current" />
              <div className="text-2xl font-bold">--</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">--</div>
              <div className="text-sm text-muted-foreground">Upvotes</div>
            </Card>
          </div>

          {/* Tags */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recipe Content Preview */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Ingredients</CardTitle>
              <CardDescription>Servings: {formData.servings || '--'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.ingredients.filter((ing) => ing.ingredient).length > 0 ? (
                  formData.ingredients
                    .filter((ing) => ing.ingredient)
                    .map((ingredient) => (
                      <div key={ingredient.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-baseline space-x-2">
                            <span className="font-semibold">{ingredient.quantity}</span>
                            <span className="text-muted-foreground">{ingredient.unit}</span>
                            <span>{ingredient.ingredient}</span>
                          </div>
                          {ingredient.notes && <p className="text-sm text-muted-foreground mt-1">{ingredient.notes}</p>}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-muted-foreground italic">No ingredients added yet...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Instructions</CardTitle>
              <CardDescription>Follow these steps to create the perfect dish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formData.steps.filter((step) => step.content).length > 0 ? (
                  formData.steps
                    .filter((step) => step.content)
                    .map((step) => (
                      <div key={step.id} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <Button
                            variant={completedSteps.includes(step.id) ? 'default' : 'outline'}
                            size="sm"
                            className="w-10 h-10 rounded-full p-0"
                            onClick={() => toggleStep(step.id)}
                          >
                            {completedSteps.includes(step.id) ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-semibold">{step.stepNumber}</span>
                            )}
                          </Button>
                        </div>
                        <div className="flex-1">
                          <div
                            className={`p-4 rounded-lg border-2 transition-all ${
                              completedSteps.includes(step.id)
                                ? 'border-primary/20 bg-primary/5 opacity-75'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <p className="leading-relaxed">{step.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-muted-foreground italic">No instructions added yet...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Actions */}
      <div className="flex gap-4 justify-center pt-8 border-t">
        <Button onClick={() => setActiveTab('create')} variant="outline" className="h-12 px-8">
          <Edit className="mr-2 h-4 w-4" />
          Continue Editing
        </Button>
        <Button onClick={handleSubmit} className="h-12 px-8">
          Publish Recipe
        </Button>
      </div>
    </div>
  );
};
