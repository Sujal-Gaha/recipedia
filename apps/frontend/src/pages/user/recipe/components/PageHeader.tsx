import { Sparkles } from 'lucide-react';

export const RecipesPageHeader = () => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center px-4 py-2 bg-emerald-50/80 border border-emerald-200/50 rounded-full text-emerald-700 text-sm font-medium mb-6 backdrop-blur-sm">
        <Sparkles className="mr-2 h-4 w-4" />
        Curated Collection
      </div>
      <h1 className="text-5xl font-bold mb-6">All Recipes</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover amazing recipes from our community of home cooks and professional chefs
      </p>
    </div>
  );
};
