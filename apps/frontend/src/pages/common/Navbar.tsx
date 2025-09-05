import { ChefHat, LogOut, Menu, Plus, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { _FULL_ROUTES } from '../../constants/routes';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../../components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Button } from '../../components/ui/button';
import { useUserStore } from '../../stores/useUserStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { useLogoutMutation } from '../../apis/auth/query';
import { toastError, toastSuccess } from '../../components/toaster';

const navigationItems = [
  {
    title: 'All Recipes',
    href: _FULL_ROUTES.RECIPE,
    description: 'Browse our complete collection of recipes from the community.',
  },
  {
    title: 'Ingredient Filter',
    href: _FULL_ROUTES.INGREDIENT,
    description: 'Find recipes based on ingredients you have available.',
  },
  {
    title: 'Create Recipe',
    href: _FULL_ROUTES.CREATE_RECIPE,
    description: 'Share your own recipe with the community.',
  },
  {
    title: 'Profile',
    href: _FULL_ROUTES.PROFILE,
    description: 'Manage your recipes and view your cooking activity.',
  },
];

export const Navbar = () => {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:flex lg:justify-center">
      <div className="container flex h-16 items-center mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link to={_FULL_ROUTES.HOME} className="mr-6 flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Recipedia</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink href={_FULL_ROUTES.HOME}>
                        <ChefHat className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">Recipedia</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Discover amazing recipes from our community of home cooks and professional chefs.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href={_FULL_ROUTES.RECIPE}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">All Recipes</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse our complete collection of recipes.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href={`${_FULL_ROUTES.RECIPE}?difficulty=easy`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Easy Recipes</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Quick and simple recipes for beginners.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href={`${_FULL_ROUTES.RECIPE}?sort=popular`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Popular Recipes</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Most loved recipes by our community.
                        </p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href={_FULL_ROUTES.INGREDIENT} className={navigationMenuTriggerStyle()}>
                  Ingredient Filter
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href={_FULL_ROUTES.CREATE_RECIPE} className={navigationMenuTriggerStyle()}>
                  Create Recipe
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>
                <Link to={_FULL_ROUTES.HOME} className="flex items-center space-x-2">
                  <ChefHat className="h-6 w-6 text-primary" />
                  <span className="font-bold">Recipedia</span>
                </Link>
              </SheetTitle>
              <SheetDescription>Discover and share amazing recipes with our community.</SheetDescription>
            </SheetHeader>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to={_FULL_ROUTES.HOME} className="flex items-center space-x-2 md:hidden">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="font-bold">Recipedia</span>
            </Link>
          </div>
          {!user ? (
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to={_FULL_ROUTES.LOGIN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link to={_FULL_ROUTES.REGISTER}>Get Started</Link>
              </Button>
            </nav>
          ) : (
            <>
              <Button asChild className="hidden md:flex">
                <Link to={_FULL_ROUTES.CREATE_RECIPE}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Recipe
                </Link>
              </Button>

              {/* BACKLOG_FEATURE */}
              {/* <NotificationBell /> */}

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
                  {/* BACKLOG_FEATURE */}
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};
