import { TGetRecipeBySlugOutput } from '@libs/contract';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { motion } from 'framer-motion';

export const TipsTab = ({ recipe }: { recipe: TGetRecipeBySlugOutput }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chef's Tips & Tricks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recipe.tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
