import { ChefHat, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:flex lg:justify-center">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
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
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/"
                        >
                          <ChefHat className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">Recipedia</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover amazing recipes from our community of home cooks and professional chefs.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`${_FULL_ROUTES.RECIPE}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">All Recipes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse our complete collection of recipes.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`${_FULL_ROUTES.RECIPE}?difficulty=easy`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Easy Recipes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Quick and simple recipes for beginners.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`${_FULL_ROUTES.RECIPE}?sort=popular`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Popular Recipes</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Most loved recipes by our community.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={_FULL_ROUTES.INGREDIENT}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ingredient Filter</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={_FULL_ROUTES.CREATE_RECIPE}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Create Recipe</NavigationMenuLink>
                </Link>
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
                <Link to="/" className="flex items-center space-x-2">
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
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="font-bold">Recipedia</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to={_FULL_ROUTES.LOGIN}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link to={_FULL_ROUTES.REGISTER}>Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
