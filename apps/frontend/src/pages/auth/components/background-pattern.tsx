import { ChefHat } from 'lucide-react';

export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 left-20 w-32 h-32 text-muted-foreground">
        <ChefHat className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-20 w-24 h-24 text-muted-foreground">
        <ChefHat className="w-full h-full" />
      </div>
      <div className="absolute top-1/2 left-10 w-16 h-16 text-muted-foreground">
        <ChefHat className="w-full h-full" />
      </div>
      <div className="absolute top-10 right-1/3 w-20 h-20 text-muted-foreground">
        <ChefHat className="w-full h-full" />
      </div>
    </div>
  );
};
