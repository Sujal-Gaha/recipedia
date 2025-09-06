import { useState } from 'react';
import { CheckCircle, Grid3X3, List, Search, TrendingUp, UserCheck, Users } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { UserCard } from './components/UserCard';
import { userApi } from '@/apis/user-api';
import { UserTable } from './components/UserTable';
import { toastError, toastSuccess } from '@/components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import { UserTypeSchema, UserTypeType } from '@libs/contract';

type TStatus = 'IS_SUSPENDED' | 'IS_EMAIL_VERIFIED' | 'ALL';

export const AdminUserPage = () => {
  const [status, setStatus] = useState<TStatus>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [userType, setUserType] = useState<UserTypeType | 'ALL'>('ALL');
  const [globalFilter, setGlobalFilter] = useState('');

  const qc = useQueryClient();

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 9,
  });

  const suspendUserMtn = userApi.suspendUser.useMutation();

  const { data: getAllUsersData } = userApi.getAllUsers.useQuery(
    ['getAllUsers', pagination.page, pagination.perPage, userType, status, globalFilter],
    {
      query: {
        page: String(pagination.page),
        perPage: String(pagination.perPage),
        ...(globalFilter ? { global_filter: globalFilter } : null),
        ...(userType !== 'ALL' ? { user_type: userType } : null),
        ...(status === 'IS_EMAIL_VERIFIED' ? { is_email_verified: 'true' } : null),
        ...(status === 'IS_SUSPENDED' ? { is_suspended: 'true' } : null),
      },
    }
  );

  const users = getAllUsersData?.status === 200 ? getAllUsersData.body.data : [];

  const suspendUser = async (id: string) => {
    await suspendUserMtn.mutateAsync(
      {
        body: {
          id,
        },
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({
            queryKey: ['getAllUsers'],
          });
        },
        onError: (error) => {
          if (error.status === 400 || error.status === 500) {
            toastError(error.body.message);
          } else {
            toastError('Something went wrong! Please try again later.');
          }
          console.log(error);
        },
      }
    );
  };

  const verified_users = users.reduce((total, user) => (total += user.is_email_verified ? 1 : 0), 0);

  const active_users = users.reduce((total, user) => (total += user.is_suspended ? 0 : 1), 0);

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">User Management</h1>
        <p className="text-xl text-muted-foreground">Manage user accounts, permissions, and community members</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getAllUsersData?.body.pagination.total}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{active_users}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((active_users / (getAllUsersData?.body.pagination.total || 1)) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{verified_users}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((verified_users / (getAllUsersData?.body.pagination.total || 1)) * 100)}% verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          {/* <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalRecipes}</div>
            <p className="text-xs text-muted-foreground">
              Avg {Math.round(stats.totalRecipes / stats.totalUsers)} per user
            </p>
          </CardContent> */}
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Select value={status} onValueChange={(value) => setStatus(value as TStatus)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="IS_EMAIL_VERIFIED">Verified</SelectItem>
                <SelectItem value="IS_SUSPENDED">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userType} onValueChange={(value) => setUserType(value as UserTypeType)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value={UserTypeSchema.Enum.USER}>User</SelectItem>
                <SelectItem value={UserTypeSchema.Enum.CHEF}>Chef</SelectItem>
                <SelectItem value={UserTypeSchema.Enum.ADMIN}>Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center border rounded-lg p-1">
            <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('table')}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
          <CardDescription>Manage user accounts and community members</CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <UserTable
              users={users}
              pagination={pagination}
              suspendUser={suspendUser}
              isSuspending={suspendUserMtn.isPending}
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} suspendUser={suspendUser} isSuspending={suspendUserMtn.isPending} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
