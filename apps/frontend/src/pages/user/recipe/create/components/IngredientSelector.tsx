import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../../components/ui/popover';
import { Button } from '../../../../../components/ui/button';
import { Badge } from '../../../../../components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../../../components/ui/command';
import { cn } from '../../../../../lib/utils';

interface IngredientVariant {
  id: string;
  name: string;
  ingredient_name: string;
  variant_type: string;
  description?: string;
  image_url?: string;
}

interface IngredientSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Mock data - replace with actual API call
const mockIngredients: IngredientVariant[] = [
  {
    id: '1',
    name: 'All-Purpose Flour',
    ingredient_name: 'Flour',
    variant_type: 'all-purpose',
    description: 'Versatile wheat flour for baking and cooking',
    image_url: '/bag-of-flour.png',
  },
  {
    id: '2',
    name: 'Whole Wheat Flour',
    ingredient_name: 'Flour',
    variant_type: 'whole-wheat',
    description: 'Nutritious flour made from whole wheat grains',
    image_url: '/wheat-flour.jpg',
  },
  {
    id: '3',
    name: 'Extra Virgin Olive Oil',
    ingredient_name: 'Olive Oil',
    variant_type: 'extra-virgin',
    description: 'Premium cold-pressed olive oil',
    image_url: '/olive-oil.jpg',
  },
  {
    id: '4',
    name: 'Sea Salt',
    ingredient_name: 'Salt',
    variant_type: 'sea',
    description: 'Natural salt harvested from seawater',
    image_url: '/sea-salt.jpg',
  },
  {
    id: '5',
    name: 'Kosher Salt',
    ingredient_name: 'Salt',
    variant_type: 'kosher',
    description: 'Coarse-grained salt perfect for cooking',
    image_url: '/kosher-salt.jpg',
  },
  {
    id: '6',
    name: 'Fresh Basil',
    ingredient_name: 'Basil',
    variant_type: 'fresh',
    description: 'Aromatic fresh basil leaves',
    image_url: '/fresh-basil.jpg',
  },
  {
    id: '7',
    name: 'Dried Basil',
    ingredient_name: 'Basil',
    variant_type: 'dried',
    description: 'Concentrated dried basil for seasoning',
    image_url: '/dried-basil.jpg',
  },
  {
    id: '8',
    name: 'Roma Tomatoes',
    ingredient_name: 'Tomatoes',
    variant_type: 'roma',
    description: 'Meaty tomatoes perfect for sauces',
    image_url: '/roma-tomatoes.jpg',
  },
  {
    id: '9',
    name: 'Cherry Tomatoes',
    ingredient_name: 'Tomatoes',
    variant_type: 'cherry',
    description: 'Sweet, bite-sized tomatoes',
    image_url: '/cherry-tomatoes.jpg',
  },
  {
    id: '10',
    name: 'Yellow Onion',
    ingredient_name: 'Onion',
    variant_type: 'yellow',
    description: 'Classic cooking onion with strong flavor',
    image_url: '/yellow-onion.jpg',
  },
];

export function IngredientSelector({
  value,
  onValueChange,
  placeholder = 'Select ingredient...',
  disabled,
}: IngredientSelectorProps) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientVariant[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call to fetch ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIngredients(mockIngredients);
      setLoading(false);
    };

    fetchIngredients();
  }, []);

  const selectedIngredient = ingredients.find((ingredient) => ingredient.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-10 justify-between font-normal bg-transparent"
          disabled={disabled}
        >
          {selectedIngredient ? (
            <div className="flex items-center gap-2">
              <img
                src={selectedIngredient.image_url || '/placeholder.svg'}
                alt={selectedIngredient.name}
                className="h-5 w-5 rounded object-cover"
              />
              <span className="truncate">{selectedIngredient.name}</span>
              <Badge variant="secondary" className="text-xs">
                {selectedIngredient.variant_type}
              </Badge>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search ingredients..." className="h-9" />
          <CommandList>
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">Loading ingredients...</div>
            ) : (
              <>
                <CommandEmpty>No ingredients found.</CommandEmpty>
                <CommandGroup>
                  {ingredients.map((ingredient) => (
                    <CommandItem
                      key={ingredient.id}
                      value={`${ingredient.name} ${ingredient.ingredient_name} ${ingredient.variant_type}`}
                      onSelect={() => {
                        onValueChange(ingredient.id === value ? '' : ingredient.id);
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 p-3"
                    >
                      <img
                        src={ingredient.image_url || '/placeholder.svg'}
                        alt={ingredient.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{ingredient.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {ingredient.variant_type}
                          </Badge>
                        </div>
                        {ingredient.description && (
                          <p className="text-xs text-muted-foreground truncate mt-1">{ingredient.description}</p>
                        )}
                      </div>
                      <Check className={cn('ml-auto h-4 w-4', value === ingredient.id ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
