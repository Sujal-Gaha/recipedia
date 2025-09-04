'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X, Clock, Users, ChefHat, Camera, Eye, Save, Send } from 'lucide-react';
import { IngredientSelector } from './components/IngredientSelector';
import { FileUpload } from './components/file-upload';

const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  prep_time: z.number().min(1, 'Prep time is required'),
  cook_time: z.number().min(1, 'Cook time is required'),
  servings: z.number().min(1, 'Servings must be at least 1'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  cuisine: z.string().min(1, 'Cuisine is required'),
  category: z.string().min(1, 'Category is required'),
  ingredients: z
    .array(
      z.object({
        ingredient_variant_id: z.string().min(1, 'Ingredient is required'),
        quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
        unit: z.string().min(1, 'Unit is required'),
      })
    )
    .min(1, 'At least one ingredient is required'),
  instructions: z
    .array(
      z.object({
        step_number: z.number(),
        instruction: z.string().min(1, 'Instruction is required'),
      })
    )
    .min(1, 'At least one instruction is required'),
  tags: z.array(z.string()),
  image_url: z.string().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const CreatePage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { showToast } = useNotifications();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ ingredient_variant_id: '', quantity: 1, unit: '' }],
      instructions: [{ step_number: 1, instruction: '' }],
      tags: [],
      difficulty: 'easy',
      servings: 4,
      prep_time: 15,
      cook_time: 30,
    },
  });

  const {
    fields: ingredients,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: instructions,
    append: addInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const watchedData = watch();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue('tags', updatedTags);
  };

  const handleFileUpload = (file: File, url: string) => {
    setImageFile(file);
    setImageUrl(url);
    setValue('image_url', url);
  };

  const onSubmit = async (data: RecipeFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast({
        type: 'success',
        title: 'Recipe Created!',
        message: `"${data.title}" has been successfully created and published.`,
        duration: 5000,
        action: {
          label: 'View Recipe',
          onClick: () => console.log('Navigate to recipe'),
        },
      });

      console.log('Recipe data:', data);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to create recipe. Please try again.',
        duration: 5000,
      });
    }
  };

  const totalTime = (watchedData.prep_time || 0) + (watchedData.cook_time || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Recipe</h1>
            <p className="text-xl text-gray-600">Share your culinary masterpiece with the world</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="media">Media & Tags</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Recipe Details</CardTitle>
                        <CardDescription className="text-lg">Basic information about your recipe</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <Label htmlFor="title" className="text-base font-medium">
                            Recipe Title
                          </Label>
                          <Input
                            id="title"
                            placeholder="e.g., Grandma's Famous Chocolate Chip Cookies"
                            className="h-12 text-lg mt-2"
                            {...register('title')}
                          />
                          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-base font-medium">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your recipe, its origin, or what makes it special..."
                            className="min-h-[120px] text-base mt-2"
                            {...register('description')}
                          />
                          {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="cuisine" className="text-base font-medium">
                              Cuisine
                            </Label>
                            <Select onValueChange={(value) => setValue('cuisine', value)}>
                              <SelectTrigger className="h-12 mt-2">
                                <SelectValue placeholder="Select cuisine" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="italian">Italian</SelectItem>
                                <SelectItem value="mexican">Mexican</SelectItem>
                                <SelectItem value="asian">Asian</SelectItem>
                                <SelectItem value="american">American</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="mediterranean">Mediterranean</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine.message}</p>}
                          </div>

                          <div>
                            <Label htmlFor="category" className="text-base font-medium">
                              Category
                            </Label>
                            <Select onValueChange={(value) => setValue('category', value)}>
                              <SelectTrigger className="h-12 mt-2">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="appetizer">Appetizer</SelectItem>
                                <SelectItem value="main-course">Main Course</SelectItem>
                                <SelectItem value="dessert">Dessert</SelectItem>
                                <SelectItem value="breakfast">Breakfast</SelectItem>
                                <SelectItem value="lunch">Lunch</SelectItem>
                                <SelectItem value="dinner">Dinner</SelectItem>
                                <SelectItem value="snack">Snack</SelectItem>
                                <SelectItem value="beverage">Beverage</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="prep_time" className="text-base font-medium">
                              Prep Time (min)
                            </Label>
                            <Input
                              id="prep_time"
                              type="number"
                              placeholder="15"
                              className="h-12 mt-2"
                              {...register('prep_time', { valueAsNumber: true })}
                            />
                            {errors.prep_time && (
                              <p className="text-red-500 text-sm mt-1">{errors.prep_time.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="cook_time" className="text-base font-medium">
                              Cook Time (min)
                            </Label>
                            <Input
                              id="cook_time"
                              type="number"
                              placeholder="30"
                              className="h-12 mt-2"
                              {...register('cook_time', { valueAsNumber: true })}
                            />
                            {errors.cook_time && (
                              <p className="text-red-500 text-sm mt-1">{errors.cook_time.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="servings" className="text-base font-medium">
                              Servings
                            </Label>
                            <Input
                              id="servings"
                              type="number"
                              placeholder="4"
                              className="h-12 mt-2"
                              {...register('servings', { valueAsNumber: true })}
                            />
                            {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings.message}</p>}
                          </div>

                          <div>
                            <Label htmlFor="difficulty" className="text-base font-medium">
                              Difficulty
                            </Label>
                            <Select
                              onValueChange={(value: 'easy' | 'medium' | 'hard') => setValue('difficulty', value)}
                            >
                              <SelectTrigger className="h-12 mt-2">
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.difficulty && (
                              <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="ingredients" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Ingredients</CardTitle>
                        <CardDescription className="text-lg">
                          List all ingredients needed for your recipe
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {ingredients.map((ingredient, index) => (
                            <div
                              key={ingredient.id}
                              className="grid md:grid-cols-12 gap-4 items-end p-4 bg-muted/30 rounded-lg"
                            >
                              <div className="md:col-span-1">
                                <Label className="text-base font-medium">{index + 1}.</Label>
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor={`quantity-${index}`} className="text-sm font-medium">
                                  Quantity
                                </Label>
                                <Input
                                  id={`quantity-${index}`}
                                  type="number"
                                  step="0.1"
                                  placeholder="1"
                                  className="h-10 mt-1"
                                  {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
                                />
                                {errors.ingredients?.[index]?.quantity && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.ingredients[index]?.quantity?.message}
                                  </p>
                                )}
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor={`unit-${index}`} className="text-sm font-medium">
                                  Unit
                                </Label>
                                <Select onValueChange={(value) => setValue(`ingredients.${index}.unit`, value)}>
                                  <SelectTrigger className="h-10 mt-1">
                                    <SelectValue placeholder="Unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cup">Cup</SelectItem>
                                    <SelectItem value="tbsp">Tablespoon</SelectItem>
                                    <SelectItem value="tsp">Teaspoon</SelectItem>
                                    <SelectItem value="oz">Ounce</SelectItem>
                                    <SelectItem value="lb">Pound</SelectItem>
                                    <SelectItem value="g">Gram</SelectItem>
                                    <SelectItem value="kg">Kilogram</SelectItem>
                                    <SelectItem value="ml">Milliliter</SelectItem>
                                    <SelectItem value="l">Liter</SelectItem>
                                    <SelectItem value="piece">Piece</SelectItem>
                                    <SelectItem value="clove">Clove</SelectItem>
                                    <SelectItem value="pinch">Pinch</SelectItem>
                                    <SelectItem value="dash">Dash</SelectItem>
                                  </SelectContent>
                                </Select>
                                {errors.ingredients?.[index]?.unit && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.ingredients[index]?.unit?.message}
                                  </p>
                                )}
                              </div>
                              <div className="md:col-span-5">
                                <Label htmlFor={`ingredient-${index}`} className="text-sm font-medium">
                                  Ingredient
                                </Label>
                                <div className="mt-1">
                                  <IngredientSelector
                                    value={watchedData.ingredients?.[index]?.ingredient_variant_id || ''}
                                    onValueChange={(value) =>
                                      setValue(`ingredients.${index}.ingredient_variant_id`, value)
                                    }
                                    placeholder="Select ingredient..."
                                  />
                                </div>
                                {errors.ingredients?.[index]?.ingredient_variant_id && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.ingredients[index]?.ingredient_variant_id?.message}
                                  </p>
                                )}
                              </div>
                              <div className="md:col-span-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  disabled={ingredients.length === 1}
                                  onClick={() => removeIngredient(index)}
                                  className="h-10 w-full"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addIngredient({ ingredient_variant_id: '', quantity: 1, unit: '' })}
                          className="mt-6 h-12 bg-transparent"
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Add Ingredient
                        </Button>
                        {errors.ingredients && (
                          <p className="text-red-500 text-sm mt-2">{errors.ingredients.message}</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="instructions" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Instructions</CardTitle>
                        <CardDescription className="text-lg">Step-by-step cooking instructions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {instructions.map((instruction, index) => (
                            <div key={instruction.id} className="flex gap-4 items-start p-4 bg-muted/30 rounded-lg">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <Textarea
                                  placeholder={`Step ${index + 1}: Describe what to do...`}
                                  className="min-h-[80px] resize-none"
                                  {...register(`instructions.${index}.instruction`)}
                                />
                                {errors.instructions?.[index]?.instruction && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.instructions[index]?.instruction?.message}
                                  </p>
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={instructions.length === 1}
                                onClick={() => removeInstruction(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addInstruction({ step_number: instructions.length + 1, instruction: '' })}
                          className="mt-6 h-12 bg-transparent"
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Add Step
                        </Button>
                        {errors.instructions && (
                          <p className="text-red-500 text-sm mt-2">{errors.instructions.message}</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                          <Camera className="mr-3 h-6 w-6 text-primary" />
                          Recipe Image
                        </CardTitle>
                        <CardDescription className="text-lg">
                          Add a beautiful photo of your finished dish
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FileUpload
                          onFileUpload={handleFileUpload}
                          accept="image/*"
                          maxSize={10 * 1024 * 1024} // 10MB
                          className="w-full"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Tags</CardTitle>
                        <CardDescription className="text-lg">
                          Add tags to help people discover your recipe
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            className="h-10"
                          />
                          <Button type="button" onClick={addTag} variant="outline" className="h-10 bg-transparent">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Live Preview */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <Eye className="mr-2 h-5 w-5" />
                        Live Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {imageUrl && (
                        <img
                          src={imageUrl || '/placeholder.svg'}
                          alt="Recipe preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}

                      <div>
                        <h3 className="font-bold text-lg line-clamp-2">{watchedData.title || 'Recipe Title'}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
                          {watchedData.description || 'Recipe description will appear here...'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{totalTime || 0}m</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{watchedData.servings || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{watchedData.difficulty || 'easy'}</span>
                        </div>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-10 bg-transparent"
                          onClick={() => console.log('Save as draft')}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Draft
                        </Button>

                        <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Publishing...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Publish Recipe
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
