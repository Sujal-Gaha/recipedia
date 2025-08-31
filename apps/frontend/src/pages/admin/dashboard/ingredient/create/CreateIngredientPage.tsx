import { useState } from 'react';
import { Plus, X, Upload, Save, ArrowLeft, Carrot, Info, Camera } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../../../constants/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Label } from '../../../../../components/ui/label';
import { Input } from '../../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { Textarea } from '../../../../../components/ui/textarea';
import { Badge } from '../../../../../components/ui/badge';

export const AdminCreateIngredientPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    nutritionalInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
    },
    variants: [] as string[],
    tags: [] as string[],
    seasonality: '',
    storageInstructions: '',
    preparationTips: '',
  });

  const [newVariant, setNewVariant] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const seasonalityOptions = ['Year-round', 'Spring', 'Summer', 'Fall', 'Winter', 'Spring/Summer', 'Fall/Winter'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNutritionalChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      nutritionalInfo: {
        ...prev.nutritionalInfo,
        [field]: value,
      },
    }));
  };

  const addVariant = () => {
    if (newVariant.trim() && !formData.variants.includes(newVariant.trim())) {
      setFormData((prev) => ({
        ...prev,
        variants: [...prev.variants, newVariant.trim()],
      }));
      setNewVariant('');
    }
  };

  const removeVariant = (variant: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v !== variant),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success notification
      //   showToast({
      //     type: 'success',
      //     title: 'Ingredient Added',
      //     message: `${formData.name} has been successfully added to the database`,
      //     duration: 5000,
      //   });

      // Add notification for admins
      //   addNotification({
      //     type: 'info',
      //     title: 'New Ingredient Added',
      //     message: `A new ingredient "${formData.name}" has been added to the database`,
      //     priority: 'low',
      //     category: 'system',
      //     actionUrl: `/ingredients/${formData.name.toLowerCase().replace(/\s+/g, '-')}`,
      //     actionLabel: 'View Ingredient',
      //   });

      // Reset form
      setFormData({
        name: '',
        category: '',
        description: '',
        image: '',
        nutritionalInfo: {
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          fiber: '',
        },
        variants: [],
        tags: [],
        seasonality: '',
        storageInstructions: '',
        preparationTips: '',
      });
    } catch (error) {
      console.log({ error });
      //   showToast({
      //     type: 'error',
      //     title: 'Error',
      //     message: 'Failed to add ingredient. Please try again.',
      //     duration: 5000,
      //   });
    } finally {
      setIsSubmitting(false);
    }
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about the ingredient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ingredient Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Roma Tomatoes"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the ingredient, its characteristics, and common uses..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seasonality">Seasonality</Label>
              <Select value={formData.seasonality} onValueChange={(value) => handleInputChange('seasonality', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="When is this ingredient in season?" />
                </SelectTrigger>
                <SelectContent>
                  {seasonalityOptions.map((season) => (
                    <SelectItem key={season} value={season}>
                      {season}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Camera className="mr-3 h-6 w-6 text-primary" />
              Images
            </CardTitle>
            <CardDescription className="text-lg">Add a high-quality image of the ingredient</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>Different forms or types of this ingredient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newVariant}
                onChange={(e) => setNewVariant(e.target.value)}
                placeholder="e.g., Fresh, Dried, Canned"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
              />
              <Button type="button" onClick={addVariant}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.variants.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.variants.map((variant) => (
                  <Badge key={variant} variant="secondary" className="px-3 py-1">
                    {variant}
                    <button
                      type="button"
                      onClick={() => removeVariant(variant)}
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
                  value={formData.nutritionalInfo.calories}
                  onChange={(e) => handleNutritionalChange('calories', e.target.value)}
                  placeholder="kcal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo.protein}
                  onChange={(e) => handleNutritionalChange('protein', e.target.value)}
                  placeholder="g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbohydrates</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo.carbs}
                  onChange={(e) => handleNutritionalChange('carbs', e.target.value)}
                  placeholder="g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Fat</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo.fat}
                  onChange={(e) => handleNutritionalChange('fat', e.target.value)}
                  placeholder="g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiber">Fiber</Label>
                <Input
                  id="fiber"
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo.fiber}
                  onChange={(e) => handleNutritionalChange('fiber', e.target.value)}
                  placeholder="g"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Storage and preparation tips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="storage">Storage Instructions</Label>
              <Textarea
                id="storage"
                value={formData.storageInstructions}
                onChange={(e) => handleInputChange('storageInstructions', e.target.value)}
                placeholder="How should this ingredient be stored for optimal freshness?"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preparation">Preparation Tips</Label>
              <Textarea
                id="preparation"
                value={formData.preparationTips}
                onChange={(e) => handleInputChange('preparationTips', e.target.value)}
                placeholder="Any special preparation techniques or tips for using this ingredient?"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Fields marked with * are required</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.category || !formData.description}
            >
              {isSubmitting ? (
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
