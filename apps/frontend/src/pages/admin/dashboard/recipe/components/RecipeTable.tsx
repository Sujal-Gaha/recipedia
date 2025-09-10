import { TableComponent } from '@/components/table-component';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { _FULL_ROUTES } from '@/constants/routes';
import { TGetAllRecipesOutput } from '@libs/contract';
import { createColumnHelper } from '@tanstack/react-table';
import { Eye, Flag, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const columnHelperForRecipe = createColumnHelper<TGetAllRecipesOutput>();

const RecipeColumn = ({ flagRecipe }: { flagRecipe: (id: string) => Promise<void> }) => {
  const cols = [
    columnHelperForRecipe.accessor('created_at', {
      header: 'Created At',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('slug', {
      header: 'Slug',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('user.name', {
      header: 'Author',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('status', {
      header: 'Status',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('difficulty', {
      header: 'Difficulty',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('upvotes.total_votes', {
      header: 'Upvotes',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('review.average_rating', {
      header: 'Rating',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('cook_time', {
      header: 'Cook Time',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('preparation_time', {
      header: 'Preparation Time',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForRecipe.accessor('id', {
      header: 'Action',
      cell: (info) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`${_FULL_ROUTES.RECIPE}/${info.row.original.slug}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Recipe
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-amber-600" onClick={() => flagRecipe(info.getValue())}>
                <Flag className="mr-2 h-4 w-4" />
                {info.row.original.is_flagged ? 'Remove Flag' : 'Flag Recipe'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
    }),
  ];

  return cols;
};

export const RecipeTable = ({
  recipes,
  pagination,
  flagRecipe,
}: {
  recipes: TGetAllRecipesOutput[];
  pagination: {
    page: number;
    perPage: number;
  };
  flagRecipe: (id: string) => Promise<void>;
}) => {
  const columns = RecipeColumn({ flagRecipe }) || [];

  return (
    <TableComponent
      columns={columns}
      data={recipes}
      pagination={{
        page: pagination.page,
        perPage: pagination.perPage,
        onPageChange: () => console.log(),
        totalPages: Math.ceil(recipes.length / pagination.perPage),
      }}
    />
  );
};
