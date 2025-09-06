import { TableComponent } from '@/components/table-component';
import { TGetAllIngredientsWithVariantsAndImagesOutput } from '@libs/contract';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelperForIngredient = createColumnHelper<TGetAllIngredientsWithVariantsAndImagesOutput>();

const IngredientColumn = () => {
  const cols = [
    columnHelperForIngredient.accessor('created_at', {
      header: 'Created At',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('slug', {
      header: 'Slug',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('image', {
      header: 'Image',
      cell: (info) => <img src={info.getValue()} alt="" className="h-[50px] w-[50px]" />,
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('calories', {
      header: 'Calories',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('protein', {
      header: 'Protein',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('fat', {
      header: 'Fat',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('fiber', {
      header: 'Fiber',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('carbohydrates', {
      header: 'Carbohydrates',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelperForIngredient.accessor('sugar', {
      header: 'Sugar',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
  ];

  return cols;
};

export const IngredientTable = ({ ingredients }: { ingredients: TGetAllIngredientsWithVariantsAndImagesOutput[] }) => {
  const columns = IngredientColumn() || [];

  return <TableComponent columns={columns} data={ingredients} />;
};
