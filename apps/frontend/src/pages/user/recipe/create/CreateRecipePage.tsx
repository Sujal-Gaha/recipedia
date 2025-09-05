import { DragEvent, useState } from 'react';
import { Eye, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { PreviewRecipe } from './components/PreviewRecipe';
import { RecipeIngredient, RecipeStep } from './types/recipe';
import { CreateRecipe } from './components/CreateRecipe';
import { recipeApi } from '../../../../apis/recipe-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TCreateRecipeWithAllFieldsInput } from '@libs/contract';
import { toastError, toastSuccess } from '../../../../components/toaster';
import { ingredientApi } from '../../../../apis/ingredient-api';
import { useUserStore } from '../../../../stores/useUserStore';

export const CreateRecipePage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [draggedStep, setDraggedStep] = useState<number | null>(null);

  const { user } = useUserStore();

  const createRecipeMtn = recipeApi.createRecipe.useMutation();

  const { data: getAllIngredientVariants } = ingredientApi.getAllIngredientVariants.useQuery(
    ['getAllIngredientVariants', '1', '100'],
    {
      query: {
        page: '1',
        perPage: '100',
      },
    }
  );

  const fetchedIngredientVariants = getAllIngredientVariants?.status === 200 ? getAllIngredientVariants.body.data : [];

  const { register, handleSubmit, setValue, watch } = useForm<TCreateRecipeWithAllFieldsInput>({
    defaultValues: {
      user_id: user ? user.id : '',
      ingredients: [
        {
          ingredient_variant_id: '',
          note: '',
          quantity: 0,
          unit: '',
        },
      ],
      steps: [
        {
          step_no: 1,
          content: '',
        },
      ],
      images: [],
    },
  });

  const { ingredients, steps, difficulty, images } = watch();

  const addIngredient = () => {
    const newIngredient: RecipeIngredient = {
      ingredient_variant_id: Date.now().toString(),
      note: '',
      quantity: 0,
      unit: '',
    };

    setValue('ingredients', [...ingredients, newIngredient]);
  };

  const removeIngredient = (index: number) => {
    setValue(
      'ingredients',
      ingredients.filter((_, i) => i !== index)
    );
  };

  const addStep = () => {
    const newStep: RecipeStep = {
      step_no: steps.length + 1,
      content: '',
    };
    setValue('steps', [...steps, newStep]);
  };

  const removeStep = (step_no: number) => {
    const updatedSteps = steps.filter((step) => step.step_no !== step_no);
    const renumberedSteps = updatedSteps.map((step, index) => ({
      ...step,
      step_no: index + 1,
    }));
    setValue('steps', renumberedSteps);
  };

  const moveStep = (step_no: number, direction: 'up' | 'down') => {
    const currentIndex = steps.findIndex((step) => step.step_no === step_no);
    if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === steps.length - 1)) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    [newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]];

    const renumberedSteps = newSteps.map((step, index) => ({
      ...step,
      step_no: index + 1,
    }));

    setValue('steps', [...renumberedSteps]);
  };

  const handleDrop = (e: DragEvent, target_step_no: number) => {
    e.preventDefault();
    if (!draggedStep || draggedStep === target_step_no) return;

    const draggedIndex = steps.findIndex((step) => step.step_no === draggedStep);
    const targetIndex = steps.findIndex((step) => step.step_no === target_step_no);

    const newSteps = [...steps];
    const [draggedItem] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(targetIndex, 0, draggedItem);

    const renumberedSteps = newSteps.map((step, index) => ({
      ...step,
      step_no: index + 1,
    }));

    setValue('steps', renumberedSteps);

    setDraggedStep(null);
  };

  const handleDragStart = (e: DragEvent, step_no: number) => {
    setDraggedStep(step_no);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const toggleStep = (step_no: number) => {
    setCompletedSteps((prev) =>
      prev.includes(step_no) ? prev.filter((stepNo) => stepNo !== step_no) : [...prev, step_no]
    );
  };

  const createRecipe: SubmitHandler<TCreateRecipeWithAllFieldsInput> = async (input) => {
    await createRecipeMtn.mutateAsync(
      {
        body: {
          cook_time: input.cook_time,
          description: input.description,
          difficulty: input.difficulty,
          preparation_time: input.preparation_time,
          title: input.title,
          user_id: input.user_id,
          images: input.images.map((img) => ({
            is_primary: img.is_primary,
            url: img.url,
          })),
          ingredients: input.ingredients.map((ing) => ({
            ingredient_variant_id: ing.ingredient_variant_id,
            note: ing.note,
            quantity: ing.quantity,
            unit: ing.unit,
          })),
          steps: input.steps.map((step) => ({
            content: step.content,
            step_no: step.step_no,
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
          console.log(error);
        },
      }
    );
  };

  const onFileUpload = (url: string) => {
    setValue('images', [
      ...images,
      {
        is_primary: false,
        url,
      },
    ]);
  };

  const onFileRemove = (url: string) => {
    setValue(
      'images',
      images.filter((img) => img.url !== url)
    );
  };

  const onSelectPrimary = (url: string) => {
    setValue(
      'images',
      images.map((img) => ({ ...img, is_primary: img.url === url }))
    );
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
            isCreatingRecipe={createRecipeMtn.isPending}
            fetchedIngredientVariants={fetchedIngredientVariants}
            onFileUpload={onFileUpload}
            onFileRemove={onFileRemove}
            onSelectPrimary={onSelectPrimary}
            images={images}
            difficulty={difficulty}
            ingredients={ingredients}
            steps={steps}
            handleDrop={handleDrop}
            addIngredient={addIngredient}
            addStep={addStep}
            removeIngredient={removeIngredient}
            removeStep={removeStep}
            moveStep={moveStep}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            draggedStep={draggedStep}
            setActiveTab={setActiveTab}
            setValue={setValue}
            register={register}
            handleSubmit={handleSubmit}
            createRecipe={createRecipe}
          />
        </TabsContent>

        <TabsContent value="preview">
          <PreviewRecipe
            fetchedIngredientVariants={fetchedIngredientVariants}
            toggleStep={toggleStep}
            completedSteps={completedSteps}
            setActiveTab={setActiveTab}
            handleSubmit={handleSubmit}
            createRecipe={createRecipe}
            watch={watch}
            isCreatingRecipe={createRecipeMtn.isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
