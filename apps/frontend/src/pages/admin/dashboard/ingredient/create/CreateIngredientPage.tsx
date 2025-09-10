import { useState } from 'react';
import { Plus, X, Save, ArrowLeft, Carrot, Info } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../../../constants/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Label } from '../../../../../components/ui/label';
import { Input } from '../../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { Textarea } from '../../../../../components/ui/textarea';
import { Badge } from '../../../../../components/ui/badge';
import { ingredientApi } from '../../../../../apis/ingredient-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateIngredientWithVariantsAndImagesInputSchema,
  TCreateIngredientWithVariantsAndImagesInput,
} from '@libs/contract';
// import { AdditionalInformation } from './components/AdditionalInformations';
import { toastError, toastSuccess } from '../../../../../components/toaster';
import { FileUpload } from '../../../../../components/file-upload';
import { zodResolver } from '@hookform/resolvers/zod';

export const AdminCreateIngredientPage = () => {
  const [addedVariant, setAddedVariant] = useState({
    image: '',
    name: '',
  });

  const createIngredientMtn = ingredientApi.createIngredient.useMutation();

  const { register, setValue, watch, handleSubmit } = useForm<TCreateIngredientWithVariantsAndImagesInput>({
    defaultValues: {
      ingredient_variants: [
        {
          image: 'test',
          name: '',
        },
      ],
    },
    resolver: zodResolver(CreateIngredientWithVariantsAndImagesInputSchema),
  });

  const { category, ingredient_variants, image } = watch();

  const categories = [
    'Vegetables',
    'Fruits',
    'Meat',
    'Poultry',
    'Seafood',
    'Dairy',
    'Grains',
    'Legumes',
    'Herbs',
    'Spices',
    'Nuts & Seeds',
    'Oils & Fats',
    'Condiments',
    'Other',
  ];

  const addVariant = () => {
    if (!ingredient_variants[0].name) {
      setValue('ingredient_variants.0', addedVariant);
    } else {
      setValue('ingredient_variants', [...ingredient_variants, addedVariant]);
    }
    setAddedVariant({
      image: '',
      name: '',
    });
  };

  const removeVariant = (variant_name: string) => {
    setValue(
      'ingredient_variants',
      ingredient_variants.filter((v) => v.name !== variant_name)
    );
  };

  const createIngredient: SubmitHandler<TCreateIngredientWithVariantsAndImagesInput> = async (input) => {
    await createIngredientMtn.mutateAsync(
      {
        body: {
          image: input.image,
          name: input.name,
          category: input.category,
          description: input.description,
          calories: input.calories,
          protein: input.protein,
          fat: input.fat,
          fiber: input.fiber,
          carbohydrates: input.carbohydrates,
          sugar: input.sugar,
          ingredient_variants: input.ingredient_variants.map((variant) => ({
            name: variant.name,
            image: input.image,
          })),
        },
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
        },
        onError: (error) => {
          if (error.status === 400 || error.status === 500) {
            toastError(error.body.message);
          } else {
            toastError('Something went wrong! Please try again later.');
          }
        },
      }
    );
  };

  const onFileUpload = (url: string) => {
    setValue('image', url);
  };

  const onFileRemove = (url: string) => {
    setValue('image', '');

    ingredient_variants.forEach((_, index) => {
      setValue(`ingredient_variants.${index}.image`, '');
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ingredients
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Carrot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Add New Ingredient</h1>
            <p className="text-xl text-muted-foreground">Expand the ingredient database</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(createIngredient)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about the ingredient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Ingredient Name <span className="text-red-500">*</span>
                </Label>
                <Input id="name" required placeholder="e.g., Roma Tomatoes" {...register('name')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                rows={4}
                required
                placeholder="Describe the ingredient, its characteristics, and common uses..."
                {...register('description')}
              />
            </div>
          </CardContent>
        </Card>

        <FileUpload
          isSingleUpload
          onFileUpload={onFileUpload}
          cardDescription="Add a high-quality image of the ingredient"
          defaultPreviewUrls={[image].filter(Boolean)}
          onFileRemove={onFileRemove}
        />

        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>Different forms or types of this ingredient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Fresh, Dried, Canned"
                value={addedVariant.name}
                onChange={(e) => {
                  setAddedVariant({ ...addedVariant, name: e.target.value });
                }}
              />
              <Button type="button" onClick={addVariant}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {ingredient_variants.length > 0 && !!ingredient_variants[0].name && (
              <div className="flex flex-wrap gap-2">
                {ingredient_variants.map((variant) => (
                  <Badge key={variant.name} variant="secondary" className="px-3 py-1">
                    {variant.name}
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.name)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutritional Information</CardTitle>
            <CardDescription>Per 100g serving (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="kcal"
                  {...register('calories', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  placeholder="g"
                  {...register('protein', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbohydrates</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  placeholder="g"
                  {...register('carbohydrates', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Fat</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  placeholder="g"
                  {...register('fat', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiber">Fiber</Label>
                <Input
                  id="fiber"
                  type="number"
                  step="0.1"
                  placeholder="g"
                  {...register('fiber', { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sugar">Sugar</Label>
                <Input
                  id="sugar"
                  type="number"
                  step="0.1"
                  placeholder="g"
                  {...register('sugar', { valueAsNumber: true })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* !BACKLOG_FEATURE */}
        {/* <AdditionalInformation /> */}

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Fields marked with * are required</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={createIngredientMtn.isPending}>
              {createIngredientMtn.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Adding...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Ingredient
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
