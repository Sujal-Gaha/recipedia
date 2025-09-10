import { Bookmark, CheckCircle, Clock, Edit, Heart, Share2, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  RecipeDifficultySchema,
  TCreateRecipeWithAllFieldsInput,
  TGetAllIngredientVariantsOutput,
} from '@libs/contract';
import { SubmitHandler, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import { useUserStore } from '@/stores/useUserStore';

export const PreviewRecipe = ({
  fetchedIngredientVariants,
  setActiveTab,
  completedSteps,
  handleSubmit,
  createRecipe,
  toggleStep,
  watch,
  isCreatingRecipe,
}: {
  fetchedIngredientVariants: TGetAllIngredientVariantsOutput[];
  setActiveTab: (tab: string) => void;
  completedSteps: number[];
  toggleStep: (step_no: number) => void;
  handleSubmit: UseFormHandleSubmit<TCreateRecipeWithAllFieldsInput>;
  createRecipe: SubmitHandler<TCreateRecipeWithAllFieldsInput>;
  watch: UseFormWatch<TCreateRecipeWithAllFieldsInput>;
  isCreatingRecipe: boolean;
}) => {
  const { cook_time, description, difficulty, images, ingredients, preparation_time, steps, title } = watch();

  const { user } = useUserStore();

  const getIngredientVariantNameFromId = (id: string) => {
    return fetchedIngredientVariants.find((ing) => ing.id === id)?.name || '';
  };

  const currentUser = {
    name: `Chef ${user?.name || 'John Doe'}`,
    image: user ? user.image : '/placeholder.svg?height=60&width=60',
    recipesCount: 24,
    followers: 1247,
  };

  return (
    <form onSubmit={handleSubmit(createRecipe)} className="space-y-8">
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Recipe Preview</h2>
            <p className="text-muted-foreground">This is how your recipe will appear to other users</p>
          </div>
          <Button type="button" onClick={() => setActiveTab('create')} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Recipe
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
            {images.find((img) => img.is_primary)?.url && (
              <img
                src={images.find((img) => img.is_primary)?.url}
                alt={title || 'Recipe preview'}
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
              <Badge
                variant={
                  difficulty === RecipeDifficultySchema.Enum.EASY
                    ? 'secondary'
                    : difficulty === RecipeDifficultySchema.Enum.MEDIUM
                    ? 'default'
                    : 'destructive'
                }
                className="text-sm px-3 py-1"
              >
                {difficulty}
              </Badge>
              <div className="flex space-x-2">
                <Button type="button" size="sm" variant="secondary" className="h-10 w-10 p-0 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button type="button" size="sm" variant="secondary" className="h-10 w-10 p-0 backdrop-blur-sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button type="button" size="sm" variant="secondary" className="h-10 w-10 p-0 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{title || 'Your Recipe Title'}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description || 'Your recipe description will appear here...'}
            </p>
          </div>

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
              <Button type="button" variant="outline">
                Follow
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{preparation_time + cook_time || '--'}</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
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
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ingredients.filter((ing) => ing.ingredient_variant_id).length > 0 ? (
                  ingredients
                    .filter((ing) => ing.ingredient_variant_id)
                    .map((ingredient) => (
                      <div
                        key={ingredient.ingredient_variant_id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-baseline space-x-2">
                            <span className="font-semibold">{ingredient.quantity}</span>
                            <span className="text-muted-foreground">{ingredient.unit}</span>
                            <span>{getIngredientVariantNameFromId(ingredient.ingredient_variant_id)}</span>
                          </div>
                          {ingredient.note && <p className="text-sm text-muted-foreground mt-1">{ingredient.note}</p>}
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

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Instructions</CardTitle>
              <CardDescription>Follow these steps to create the perfect dish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {steps.filter((step) => step.content).length > 0 ? (
                  steps
                    .filter((step) => step.content)
                    .map((step) => (
                      <div key={step.step_no} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <Button
                            type="button"
                            variant={completedSteps.includes(step.step_no) ? 'default' : 'outline'}
                            size="sm"
                            className="w-10 h-10 rounded-full p-0"
                            onClick={() => toggleStep(step.step_no)}
                          >
                            {completedSteps.includes(step.step_no) ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-sm font-semibold">{step.step_no}</span>
                            )}
                          </Button>
                        </div>
                        <div className="flex-1">
                          <div
                            className={`p-4 rounded-lg border-2 transition-all ${
                              completedSteps.includes(step.step_no)
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

      <div className="flex gap-4 justify-center pt-8 border-t">
        <Button type="button" onClick={() => setActiveTab('create')} variant="outline" className="h-12 px-8">
          <Edit className="mr-2 h-4 w-4" />
          Continue Editing
        </Button>
        <Button type="submit" className="h-12 px-8">
          {isCreatingRecipe ? 'Publishing...' : 'Publish Recipe'}
        </Button>
      </div>
    </form>
  );
};
