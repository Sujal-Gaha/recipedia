import { Dispatch, DragEvent, SetStateAction } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Clock, Eye, GripVertical, MoveDown, MoveUp, Plus, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RecipeIngredient, RecipeStep, RecipeTip } from '../types/recipe';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {
  RecipeDifficultySchema,
  RecipeDifficultyType,
  RecipeImage,
  TCreateRecipeWithAllFieldsInput,
  TGetAllIngredientVariantsOutput,
} from '@libs/contract';
import { FileUpload } from '@/components/file-upload';

export const CreateRecipe = ({
  fetchedIngredientVariants,
  images,
  difficulty,
  ingredients,
  steps,
  tips,
  onFileUpload,
  onFileRemove,
  onSelectPrimary,
  handleDrop,
  addIngredient,
  addStep,
  handleDragOver,
  handleDragStart,
  moveStep,
  addTip,
  removeTip,
  removeIngredient,
  removeStep,
  draggedStep,
  setActiveTab,
  handleSubmit,
  createRecipe,
  register,
  setValue,
  isCreatingRecipe,
}: {
  fetchedIngredientVariants: TGetAllIngredientVariantsOutput[];
  images: Pick<RecipeImage, 'is_primary' | 'url'>[];
  difficulty: RecipeDifficultyType;
  ingredients: RecipeIngredient[];
  tips: RecipeTip[];
  steps: RecipeStep[];
  onFileUpload: (url: string) => void;
  onFileRemove: (url: string) => void;
  onSelectPrimary: (url: string) => void;
  handleDrop: (e: DragEvent, target_step_no: number) => void;
  addIngredient: () => void;
  removeIngredient: (index: number) => void;
  addStep: () => void;
  draggedStep: number | null;
  removeStep: (step_no: number) => void;
  moveStep: (step_no: number, direction: 'up' | 'down') => void;
  addTip: () => void;
  removeTip: (index: number) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDragStart: (e: DragEvent, step_no: number) => void;
  setActiveTab: Dispatch<SetStateAction<string>>;
  handleSubmit: UseFormHandleSubmit<TCreateRecipeWithAllFieldsInput>;
  createRecipe: SubmitHandler<TCreateRecipeWithAllFieldsInput>;
  register: UseFormRegister<TCreateRecipeWithAllFieldsInput>;
  setValue: UseFormSetValue<TCreateRecipeWithAllFieldsInput>;
  isCreatingRecipe: boolean;
}) => {
  return (
    <form onSubmit={handleSubmit(createRecipe)} className="space-y-8">
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
              Recipe Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register('title')}
              className="h-12 text-lg mt-2"
              placeholder="e.g., Grandma's Famous Chocolate Chip Cookies"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              rows={4}
              {...register('description')}
              className="text-lg mt-2"
              placeholder="Describe your recipe, what makes it special, and any tips for success..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="prepTime" className="text-base font-medium">
                Prep Time (minutes) <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="prepTime"
                  type="number"
                  placeholder="15"
                  className="pl-12 h-12 text-lg"
                  {...register('preparation_time', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cookTime" className="text-base font-medium">
                Cook Time (minutes) <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="cookTime"
                  type="number"
                  placeholder="30"
                  className="pl-12 h-12 text-lg"
                  {...register('cook_time', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="difficulty" className="text-base font-medium">
                Difficulty <span className="text-red-500">*</span>
              </Label>
              <Select
                value={difficulty}
                onValueChange={(value) => {
                  setValue('difficulty', value as RecipeDifficultyType);
                }}
              >
                <SelectTrigger className="!h-12 mt-2 w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={RecipeDifficultySchema.Enum.EASY}>Easy</SelectItem>
                  <SelectItem value={RecipeDifficultySchema.Enum.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={RecipeDifficultySchema.Enum.HARD}>Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <FileUpload
        defaultPreviewUrls={images.map((image) => image.url)}
        defaultPrimaryUrl={images.find((image) => image.is_primary)?.url}
        onFileUpload={onFileUpload}
        onFileRemove={onFileRemove}
        onSelectPrimary={onSelectPrimary}
        cardTitle="Recipe Images"
        cardDescription="Add a high-quality image of the recipe"
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ingredients</CardTitle>
          <CardDescription className="text-lg">List all ingredients needed for your recipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={(ingredient.ingredient_variant_id, index)}
                className="grid md:grid-cols-8 gap-4 items-end p-4 bg-muted/30 rounded-lg"
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
                    placeholder="1"
                    className="h-10 mt-1"
                    {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`unit-${index}`} className="text-sm font-medium">
                    Unit
                  </Label>
                  <Input
                    id={`unit-${index}`}
                    placeholder="cup"
                    className="h-10 mt-1"
                    {...register(`ingredients.${index}.unit`)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`ingredient-${index}`} className="text-sm font-medium">
                    Ingredient
                  </Label>
                  <Select
                    value={ingredient.ingredient_variant_id ? ingredient.ingredient_variant_id : undefined}
                    onValueChange={(value) => setValue(`ingredients.${index}.ingredient_variant_id`, value)}
                  >
                    <SelectTrigger id={`ingredient-${index}`} className="w-full">
                      <SelectValue placeholder="Select an ingredient" />
                    </SelectTrigger>
                    <SelectContent>
                      {fetchedIngredientVariants.map((ingredient) => (
                        <SelectItem key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-1">
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
          <Button type="button" variant="outline" onClick={addIngredient} className="mt-6 h-12 bg-transparent">
            <Plus className="mr-2 h-5 w-5" />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Instructions</CardTitle>
          <CardDescription className="text-lg">
            Provide step-by-step instructions. Drag steps to reorder them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={(step.step_no, index)}
                draggable
                onDragStart={(e) => handleDragStart(e, step.step_no)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, step.step_no)}
                className={`flex gap-4 p-4 bg-muted/30 rounded-lg border-2 transition-all cursor-move ${
                  draggedStep === step.step_no
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-transparent hover:border-primary/30'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col space-y-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStep(step.step_no, 'up')}
                      disabled={index === 0}
                      className="h-6 w-6 p-0"
                    >
                      <MoveUp className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStep(step.step_no, 'down')}
                      disabled={index === steps.length - 1}
                      className="h-6 w-6 p-0"
                    >
                      <MoveDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold">
                  {step.step_no}
                </div>

                <div className="flex-1 space-y-2">
                  <Input placeholder="Title" className="text-base" {...register(`steps.${index}.title`)} />
                  <Textarea
                    placeholder="Describe this step in detail..."
                    rows={3}
                    className="text-base"
                    {...register(`steps.${index}.content`)}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeStep(step.step_no)}
                  disabled={steps.length === 1}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tips</CardTitle>
          <CardDescription className="text-lg">Provide tips and tricks for the recipe.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tips.map((_, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg border-2 transition-all border-transparent bg-muted/30 shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold">
                  {index + 1}
                </div>

                <Textarea
                  placeholder="Describe this tip in detail..."
                  rows={3}
                  className="text-base"
                  {...register(`tips.${index}.content`)}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTip(index)}
                  disabled={tips.length === 1}
                  className="h-10 w-10 p-0 self-start !cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={addTip} className="mt-6 h-12 bg-transparent">
            <Plus className="mr-2 h-5 w-5" />
            Add Tips
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        {/* BACKLOG_FEATURE */}
        {/* <Button type="button" variant="outline" className="h-12 px-8 text-base bg-transparent">
          Save as Draft
        </Button> */}
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
          {isCreatingRecipe ? 'Publishing...' : 'Publish Recipe'}
        </Button>
      </div>
    </form>
  );
};
