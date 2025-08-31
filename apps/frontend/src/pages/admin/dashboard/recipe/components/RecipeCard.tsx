import { CheckCircle, Clock, Edit, Eye, Flag, MoreHorizontal, Star, Trash2 } from 'lucide-react';
import { Badge } from '../../../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { IRecipe } from '../types/recipe';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { Button } from '../../../../../components/ui/button';
import { Link } from 'react-router-dom';

export const RecipeCard = ({
  recipe,
  handleApproveRecipe,
  handleDeleteRecipe,
  handleFlagRecipe,
}: {
  recipe: IRecipe;
  handleApproveRecipe: (recipe: IRecipe) => void;
  handleFlagRecipe: (recipe: IRecipe) => void;
  handleDeleteRecipe: (recipe: IRecipe) => void;
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <img
        src={recipe.image || '/placeholder.svg'}
        alt={recipe.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        <Badge
          variant={
            recipe.difficulty === 'EASY' ? 'secondary' : recipe.difficulty === 'MEDIUM' ? 'default' : 'destructive'
          }
        >
          {recipe.difficulty}
        </Badge>
        {recipe.flagged && (
          <Badge variant="destructive">
            <Flag className="mr-1 h-3 w-3" />
            Flagged
          </Badge>
        )}
      </div>
    </div>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg line-clamp-1">{recipe.title}</CardTitle>
      <CardDescription>by {recipe.author}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{recipe.description}</p>
      <div className="grid grid-cols-3 gap-2 text-sm mb-4">
        <div className="text-center">
          <div className="font-semibold">{recipe.views}</div>
          <div className="text-muted-foreground">Views</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{recipe.upvotes}</div>
          <div className="text-muted-foreground">Upvotes</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{recipe.comments}</div>
          <div className="text-muted-foreground">Comments</div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Badge
          variant={recipe.status === 'published' ? 'default' : 'secondary'}
          className={
            recipe.status === 'published'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
              : 'bg-gray-50 text-gray-700 border border-gray-200/50'
          }
        >
          {recipe.status}
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {recipe.cookTime}min
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
          <span className="font-medium">{recipe.rating}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/recipes/${recipe.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Recipe
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Recipe
            </DropdownMenuItem>
            {recipe.flagged ? (
              <DropdownMenuItem className="text-emerald-600" onClick={() => handleApproveRecipe(recipe)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-amber-600" onClick={() => handleFlagRecipe(recipe)}>
                <Flag className="mr-2 h-4 w-4" />
                Flag Recipe
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteRecipe(recipe)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Recipe
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
);
