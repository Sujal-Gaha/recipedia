import { TGetRecipeBySlugOutput } from '@libs/contract';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { motion } from 'framer-motion';
import { Separator } from '../../../../../components/ui/separator';
import { Button } from '../../../../../components/ui/button';
import { Timer, Printer as Print } from 'lucide-react';
import { Progress } from '../../../../../components/ui/progress';
import { useState } from 'react';

export const RecipeTab = ({ recipe }: { recipe: TGetRecipeBySlugOutput }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepComplete = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex) ? prev.filter((s) => s !== stepIndex) : [...prev, stepIndex]
    );
    setActiveStep(stepIndex + 1);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-xl">Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={ingredient.ingredient_variant.image || '/placeholder.svg'}
                    alt={ingredient.ingredient_variant.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">
                    {ingredient.quantity % 1 === 0 ? ingredient.quantity : ingredient.quantity.toFixed(1)}{' '}
                    {ingredient.unit}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{ingredient.ingredient_variant.name}</div>
                  {ingredient.note && <div className="text-xs text-muted-foreground">{ingredient.note}</div>}
                </div>
              </motion.div>
            ))}

            <Separator />

            {/* BACKLOG_FEATURE */}
            {/* <Button variant="outline" className="w-full bg-transparent">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Shopping List
            </Button> */}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Instructions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Timer className="h-4 w-4 mr-2" />
              Timer
            </Button>
          </div>
        </div>

        {recipe.steps.map((step, index) => (
          <motion.div
            key={step.step_no}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`transition-all duration-300 ${
                completedSteps.includes(index)
                  ? 'bg-green-50 border-green-200'
                  : activeStep === index
                  ? 'ring-2 ring-orange-200 bg-orange-50'
                  : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Button
                      size="sm"
                      variant={completedSteps.includes(index) ? 'default' : 'outline'}
                      className="w-8 h-8 rounded-full p-0"
                      onClick={() => toggleStepComplete(index)}
                    >
                      {completedSteps.includes(index) ? '✓' : ''}
                    </Button>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{step.content}</h3>
                      {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {instruction.time} min
                      </div> */}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{step.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Cooking Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps.length} of {recipe.steps.length} steps
              </span>
            </div>
            <Progress value={(completedSteps.length / recipe.steps.length) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
