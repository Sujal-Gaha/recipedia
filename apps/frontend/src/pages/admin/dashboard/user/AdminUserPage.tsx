import { useState } from 'react';
import { users } from './constants/users';
import { Link } from 'react-router-dom';
import {
  Ban,
  CheckCircle,
  Crown,
  Download,
  Edit,
  Eye,
  Grid3X3,
  List,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { UserCard } from './components/UserCard';
import { IUser } from './types/user';

export const AdminUserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    suspendedUsers: users.filter((u) => u.status === 'suspended').length,
    verifiedUsers: users.filter((u) => u.verified).length,
    totalRecipes: users.reduce((sum, u) => sum + u.recipesCount, 0),
    totalFollowers: users.reduce((sum, u) => sum + u.followers, 0),
  };

  const handleSuspendUser = (user: IUser) => {
    // showToast({
    //   type: 'warning',
    //   title: 'User Suspended',
    //   message: `${user.name} has been suspended`,
    //   duration: 4000,
    // });
    // addNotification({
    //   type: 'warning',
    //   title: 'Account Suspended',
    //   message:
    //     'Your account has been temporarily suspended due to policy violations. Please contact our support team for more information and to resolve this issue.',
    //   priority: 'high',
    //   category: 'admin',
    //   metadata: {
    //     userId: user.id,
    //     userName: user.name,
    //     action: 'suspended',
    //   },
    // });
  };

  const handleActivateUser = (user: IUser) => {
    // showToast({
    //   type: 'success',
    //   title: 'User Activated',
    //   message: `${user.name} has been reactivated`,
    //   duration: 3000,
    // });
    // addNotification({
    //   type: 'success',
    //   title: 'Account Reactivated',
    //   message:
    //     'Great news! Your account has been reactivated. Welcome back to Recipedia! You can now access all features and continue sharing your amazing recipes.',
    //   priority: 'medium',
    //   category: 'admin',
    //   metadata: {
    //     userId: user.id,
    //     userName: user.name,
    //     action: 'reactivated',
    //   },
    // });
  };

  const handleVerifyUser = (user: IUser) => {
    // showToast({
    //   type: 'success',
    //   title: 'User Verified',
    //   message: `${user.name} has been verified`,
    //   duration: 3000,
    // });
    // addNotification({
    //   type: 'success',
    //   title: 'Account Verified!',
    //   message:
    //     'Congratulations! Your account has been verified. You now have access to additional features and your profile will display a verification badge.',
    //   priority: 'medium',
    //   category: 'admin',
    //   metadata: {
    //     userId: user.id,
    //     userName: user.name,
    //     action: 'verified',
    //   },
    // });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">User Management</h1>
        <p className="text-xl text-muted-foreground">Manage user accounts, permissions, and community members</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.verifiedUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.verifiedUsers / stats.totalUsers) * 100)}% verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalRecipes}</div>
            <p className="text-xs text-muted-foreground">
              Avg {Math.round(stats.totalRecipes / stats.totalUsers)} per user
            </p>
          </CardContent>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
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
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and community members</CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipes</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{user.name}</span>
                              {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                              {user.role === 'chef' && <Crown className="h-4 w-4 text-amber-500" />}
                            </div>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === 'chef' ? 'default' : user.role === 'moderator' ? 'secondary' : 'outline'
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === 'active' ? 'default' : 'destructive'}
                          className={
                            user.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              : 'bg-red-50 text-red-700 border border-red-200/50'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{user.recipesCount}</TableCell>
                      <TableCell className="font-medium">{user.followers}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.joinedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/profile/${user.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            {!user.verified && user.status === 'active' && (
                              <DropdownMenuItem className="text-blue-600" onClick={() => handleVerifyUser(user)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Verify User
                              </DropdownMenuItem>
                            )}
                            {user.status === 'active' ? (
                              <DropdownMenuItem className="text-amber-600" onClick={() => handleSuspendUser(user)}>
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-emerald-600" onClick={() => handleActivateUser(user)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  handleActivateUser={handleActivateUser}
                  handleSuspendUser={handleSuspendUser}
                  handleVerifyUser={handleVerifyUser}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
