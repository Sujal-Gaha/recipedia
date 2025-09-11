import { LogOut, Shield, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';
import { useUserStore } from '@/stores/useUserStore';
import { useLogoutMutation } from '@/apis/auth/query';
import { toastError, toastSuccess } from '@/components/toaster';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const logoutMtn = useLogoutMutation();

  const logoutUser = async () => {
    await logoutMtn.mutateAsync(
      {},
      {
        onSuccess: (data) => {
          if (data.code === 'LOGOUT_SUCCESS') {
            setUser(null);
            toastSuccess('Logout successful!');
            navigate(_FULL_ROUTES.LOGIN);
          }
        },
        onError: (error) => {
          toastError(error.message ?? 'Logout failed');
        },
      }
    );
  };

  if (!user) {
    navigate(_FULL_ROUTES.LOGIN);
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={`${_FULL_ROUTES.ADMIN_DASHBOARD}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your Recipedia platform</p>
              </div>
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || '/placeholder.svg'} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                  {user.user_type === 'CHEF' && (
                    <Badge variant="secondary" className="w-fit">
                      Chef
                    </Badge>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={_FULL_ROUTES.PROFILE}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {/* !BACKLOG_FEATURE */}
              {/* <DropdownMenuItem asChild>
                <Link to="/notifications">
                  <Settings className="mr-2 h-4 w-4" />
                  Notifications
                </Link>
              </DropdownMenuItem> */}

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutUser} disabled={logoutMtn.isPending}>
                <LogOut className="mr-2 h-4 w-4" />
                {logoutMtn.isPending ? 'Logging out...' : 'Log out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
