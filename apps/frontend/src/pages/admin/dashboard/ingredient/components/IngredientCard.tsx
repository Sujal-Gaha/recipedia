import { Edit, Eye, MoreHorizontal, Package, Trash2, TrendingUp } from 'lucide-react';
import { Badge } from '../../../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { Button } from '../../../../../components/ui/button';
import { TGetAllIngredientsWithVariantsAndImagesOutput } from '@libs/contract';

export const IngredientCard = ({ ingredient }: { ingredient: TGetAllIngredientsWithVariantsAndImagesOutput }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <img
        src={ingredient.image || '/placeholder.svg'}
        alt={ingredient.name}
        width={200}
        height={150}
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-2 right-2">
        {/* <Badge
          variant={ingredient.status === 'active' ? 'default' : 'secondary'}
          className={
            ingredient.status === 'active'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
              : 'bg-gray-50 text-gray-700 border border-gray-200/50'
          }
        >
          {ingredient.status}
        </Badge> */}
      </div>
    </div>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg">{ingredient.name}</CardTitle>
      <CardDescription>{ingredient.category}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{ingredient.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1 text-primary" />
            {/* <span className="font-medium">{ingredient.usageCount} uses</span> */}
            <span className="font-medium">0 uses</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{ingredient.ingredient_variants.length} variants</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Added {new Date(ingredient.created_at).toLocaleDateString()}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Ingredient
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Ingredient
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardContent>
  </Card>
);
