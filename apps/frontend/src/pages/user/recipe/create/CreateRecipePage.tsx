import { DragEvent, useState } from 'react';
import { Eye, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { PreviewRecipe } from './components/PreviewRecipe';
import { RecipeFormData, RecipeIngredient, RecipeStep } from './types/recipe';
import { CreateRecipe } from './components/CreateRecipe';

export const CreateRecipePage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    difficulty: '',
    servings: '',
    ingredients: [{ id: '1', ingredient: '', quantity: '', unit: '' }],
    steps: [{ id: '1', stepNumber: 1, content: '' }],
    tags: [],
    image: '/placeholder.svg?height=400&width=600',
  });
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [draggedStep, setDraggedStep] = useState<string | null>(null);

  const addIngredient = () => {
    const newIngredient: RecipeIngredient = {
      id: Date.now().toString(),
      ingredient: '',
      quantity: '',
      unit: '',
    };
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
  };

  const removeIngredient = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const updateIngredient = (id: string, field: keyof RecipeIngredient, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)),
    }));
  };

  const addStep = () => {
    const newStep: RecipeStep = {
      id: Date.now().toString(),
      stepNumber: formData.steps.length + 1,
      content: '',
    };
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
  };

  const removeStep = (id: string) => {
    const updatedSteps = formData.steps.filter((step) => step.id !== id);
    const renumberedSteps = updatedSteps.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }));
    setFormData((prev) => ({
      ...prev,
      steps: renumberedSteps,
    }));
  };

  const updateStep = (id: string, content: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => (step.id === id ? { ...step, content } : step)),
    }));
  };

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const currentIndex = formData.steps.findIndex((step) => step.id === stepId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === formData.steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...formData.steps];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // Swap the steps
    [newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]];

    // Renumber all steps
    const renumberedSteps = newSteps.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }));

    setFormData((prev) => ({
      ...prev,
      steps: renumberedSteps,
    }));
  };

  const handleDrop = (e: DragEvent, targetStepId: string) => {
    e.preventDefault();
    if (!draggedStep || draggedStep === targetStepId) return;

    const draggedIndex = formData.steps.findIndex((step) => step.id === draggedStep);
    const targetIndex = formData.steps.findIndex((step) => step.id === targetStepId);

    const newSteps = [...formData.steps];
    const [draggedItem] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(targetIndex, 0, draggedItem);

    // Renumber all steps
    const renumberedSteps = newSteps.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }));

    setFormData((prev) => ({
      ...prev,
      steps: renumberedSteps,
    }));

    setDraggedStep(null);
  };

  const handleDragStart = (e: DragEvent, stepId: string) => {
    setDraggedStep(stepId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const updateFormData = (field: keyof RecipeFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recipe submitted:', formData);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Create New Recipe</h1>
        <p className="text-xl text-muted-foreground">Share your culinary creation with the Recipedia community</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 h-14">
          <TabsTrigger value="create" className="text-lg font-medium">
            <Edit className="mr-2 h-5 w-5" />
            Create Recipe
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-lg font-medium">
            <Eye className="mr-2 h-5 w-5" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <CreateRecipe
            formData={formData}
            handleSubmit={handleSubmit}
            updateFormData={updateFormData}
            handleDrop={handleDrop}
            addIngredient={addIngredient}
            addStep={addStep}
            removeIngredient={removeIngredient}
            removeStep={removeStep}
            updateIngredient={updateIngredient}
            updateStep={updateStep}
            moveStep={moveStep}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            draggedStep={draggedStep}
            setActiveTab={setActiveTab}
          />
        </TabsContent>

        <TabsContent value="preview">
          <PreviewRecipe
            toggleStep={toggleStep}
            completedSteps={completedSteps}
            formData={formData}
            handleSubmit={handleSubmit}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
