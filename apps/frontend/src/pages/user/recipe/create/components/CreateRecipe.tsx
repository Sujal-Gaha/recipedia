import { Dispatch, DragEvent, FormEvent, SetStateAction } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Camera, ChefHat, Clock, Eye, GripVertical, MoveDown, MoveUp, Plus, Upload, Users, X } from 'lucide-react';
import { Label } from '../../../../../components/ui/label';
import { Input } from '../../../../../components/ui/input';
import { RecipeFormData, RecipeIngredient } from '../types/recipe';
import { Textarea } from '../../../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { Button } from '../../../../../components/ui/button';

export const CreateRecipe = ({
  formData,
  handleSubmit,
  updateFormData,
  handleDrop,
  addIngredient,
  addStep,
  handleDragOver,
  handleDragStart,
  moveStep,
  removeIngredient,
  removeStep,
  draggedStep,
  updateIngredient,
  updateStep,
  setActiveTab,
}: {
  formData: RecipeFormData;
  handleSubmit: (e: FormEvent) => void;
  updateFormData: (field: keyof RecipeFormData, value: any) => void;
  handleDrop: (e: DragEvent, targetStepId: string) => void;
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  updateIngredient: (id: string, field: keyof RecipeIngredient, value: string) => void;
  addStep: () => void;
  draggedStep: string | null;
  removeStep: (id: string) => void;
  updateStep: (id: string, content: string) => void;
  moveStep: (stepId: string, direction: 'up' | 'down') => void;
  handleDragOver: (e: DragEvent) => void;
  handleDragStart: (e: DragEvent, stepId: string) => void;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <ChefHat className="mr-3 h-6 w-6 text-primary" />
            Basic Information
          </CardTitle>
          <CardDescription className="text-lg">Tell us about your recipe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-medium">
              Recipe Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder="e.g., Grandma's Famous Chocolate Chip Cookies"
              className="h-12 text-lg mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe your recipe, what makes it special, and any tips for success..."
              rows={4}
              className="text-lg mt-2"
              required
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="prepTime" className="text-base font-medium">
                Prep Time (minutes) *
              </Label>
              <div className="relative mt-2">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="prepTime"
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => updateFormData('prepTime', e.target.value)}
                  placeholder="15"
                  className="pl-12 h-12 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cookTime" className="text-base font-medium">
                Cook Time (minutes) *
              </Label>
              <div className="relative mt-2">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="cookTime"
                  type="number"
                  value={formData.cookTime}
                  onChange={(e) => updateFormData('cookTime', e.target.value)}
                  placeholder="30"
                  className="pl-12 h-12 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="servings" className="text-base font-medium">
                Servings *
              </Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="servings"
                  type="number"
                  value={formData.servings}
                  onChange={(e) => updateFormData('servings', e.target.value)}
                  placeholder="4"
                  className="pl-12 h-12 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="difficulty" className="text-base font-medium">
                Difficulty *
              </Label>
              <Select value={formData.difficulty} onValueChange={(value) => updateFormData('difficulty', value)}>
                <SelectTrigger className="h-12 text-lg mt-2">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Camera className="mr-3 h-6 w-6 text-primary" />
            Recipe Images
          </CardTitle>
          <CardDescription className="text-lg">Add photos to make your recipe more appealing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
            <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <p className="text-lg text-muted-foreground mb-3">Click to upload or drag and drop</p>
            <p className="text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            <Button type="button" variant="outline" className="mt-6 h-12 px-8 bg-transparent">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ingredients</CardTitle>
          <CardDescription className="text-lg">List all ingredients needed for your recipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="grid md:grid-cols-12 gap-4 items-end p-4 bg-muted/30 rounded-lg">
                <div className="md:col-span-1">
                  <Label className="text-base font-medium">{index + 1}.</Label>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`quantity-${ingredient.id}`} className="text-sm font-medium">
                    Quantity
                  </Label>
                  <Input
                    id={`quantity-${ingredient.id}`}
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                    placeholder="1"
                    className="h-10 mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`unit-${ingredient.id}`} className="text-sm font-medium">
                    Unit
                  </Label>
                  <Input
                    id={`unit-${ingredient.id}`}
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                    placeholder="cup"
                    className="h-10 mt-1"
                  />
                </div>
                <div className="md:col-span-5">
                  <Label htmlFor={`ingredient-${ingredient.id}`} className="text-sm font-medium">
                    Ingredient
                  </Label>
                  <Input
                    id={`ingredient-${ingredient.id}`}
                    value={ingredient.ingredient}
                    onChange={(e) => updateIngredient(ingredient.id, 'ingredient', e.target.value)}
                    placeholder="all-purpose flour"
                    className="h-10 mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={formData.ingredients.length === 1}
                    className="h-10 w-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={addIngredient} className="mt-6 h-12 bg-transparent">
            <Plus className="mr-2 h-5 w-5" />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>

      {/* Instructions with Drag & Drop */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Instructions</CardTitle>
          <CardDescription className="text-lg">
            Provide step-by-step instructions. Drag steps to reorder them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.steps.map((step, index) => (
              <div
                key={step.id}
                draggable
                onDragStart={(e) => handleDragStart(e, step.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, step.id)}
                className={`flex gap-4 p-4 bg-muted/30 rounded-lg border-2 transition-all cursor-move ${
                  draggedStep === step.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-transparent hover:border-primary/30'
                }`}
              >
                {/* Drag Handle */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col space-y-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStep(step.id, 'up')}
                      disabled={index === 0}
                      className="h-6 w-6 p-0"
                    >
                      <MoveUp className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStep(step.id, 'down')}
                      disabled={index === formData.steps.length - 1}
                      className="h-6 w-6 p-0"
                    >
                      <MoveDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold">
                  {step.stepNumber}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <Textarea
                    value={step.content}
                    onChange={(e) => updateStep(step.id, e.target.value)}
                    placeholder="Describe this step in detail..."
                    rows={3}
                    className="text-base"
                  />
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeStep(step.id)}
                  disabled={formData.steps.length === 1}
                  className="h-10 w-10 p-0 self-start"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={addStep} className="mt-6 h-12 bg-transparent">
            <Plus className="mr-2 h-5 w-5" />
            Add Step
          </Button>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" className="h-12 px-8 text-base bg-transparent">
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={() => setActiveTab('preview')}
          variant="secondary"
          className="h-12 px-8 text-base"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview Recipe
        </Button>
        <Button type="submit" className="h-12 px-8 text-base">
          Publish Recipe
        </Button>
      </div>
    </form>
  );
};
