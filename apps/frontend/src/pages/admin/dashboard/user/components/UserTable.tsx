import { TableComponent } from '@/components/table-component';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TGetAllUsersOutput } from '@libs/contract';
import { createColumnHelper } from '@tanstack/react-table';
import { Ban, CheckCircle, Edit, Mail, MoreHorizontal, Trash2 } from 'lucide-react';

const columnHelperForUser = createColumnHelper<TGetAllUsersOutput>();

const UserColumn = ({
  suspendUser,
  isSuspending,
}: {
  suspendUser: (id: string) => Promise<void>;
  isSuspending: boolean;
}) => {
  const cols = [
    columnHelperForUser.accessor('created_at', {
      header: 'Joined At',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),

    columnHelperForUser.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),

    columnHelperForUser.accessor('email', {
      header: 'Email',
      cell: (info) => (
        <div className="flex items-center gap-x-2">
          {info.getValue()}
          {info.row.original.is_email_verified && <CheckCircle className="h-4 w-4 text-green-500" />}
          {info.row.original.is_suspended && <Ban className="mr-2 h-4 w-4 text-amber-600" />}
        </div>
      ),
      enableSorting: false,
    }),

    columnHelperForUser.accessor('user_type', {
      header: 'User Type',
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),

    columnHelperForUser.accessor('id', {
      header: 'Action',
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            {!info.row.original.is_suspended ? (
              <DropdownMenuItem
                disabled={isSuspending}
                className="text-amber-600"
                onClick={() => suspendUser(info.row.original.id)}
              >
                <Ban className="mr-2 h-4 w-4" />
                Suspend User
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    }),
  ];

  return cols;
};

export const UserTable = ({
  users,
  suspendUser,
  pagination,
  isSuspending,
}: {
  users: TGetAllUsersOutput[];
  suspendUser: (id: string) => Promise<void>;
  pagination: {
    page: number;
    perPage: number;
  };
  isSuspending: boolean;
}) => {
  const columns = UserColumn({ suspendUser, isSuspending }) || [];

  return (
    <TableComponent
      data={users}
      columns={columns}
      pagination={{
        page: pagination.page,
        perPage: pagination.perPage,
        onPageChange: () => console.log(),
        totalPages: Math.ceil(users.length / pagination.perPage),
      }}
    />
  );
};
