import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ArrowRight, ChefHat, Lock, User, X } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../constants/routes';

const LoginRequiredDialog = ({
  setLoginRequiredDialog,
}: {
  setLoginRequiredDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <div className="space-y-4 mt-6">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Already have an account?</h3>
                  <p className="text-sm text-muted-foreground">Sign in to continue</p>
                </div>
              </div>
              <Button asChild>
                <Link to={_FULL_ROUTES.LOGIN} onClick={() => setLoginRequiredDialog(false)}>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">New to Recipedia?</h3>
                  <p className="text-sm text-muted-foreground">Create your free account</p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to={_FULL_ROUTES.REGISTER} onClick={() => setLoginRequiredDialog(false)}>
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-semibold mb-3 text-center">What you'll get:</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
            Save and organize your favorite recipes
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
            Create and share your own recipes
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
            Follow your favorite chefs
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
            Rate and review recipes
          </li>
        </ul>
      </div>
    </div>
  );
};

export const useLoginRequiredDialog = ({
  title = 'Login Required',
  description = 'You need to be logged in to continue',
  action = 'perform this action',
}: {
  title?: string;
  description?: string;
  action?: string;
}) => {
  const [isLoginRequiredDialogOpen, setLoginRequiredDialog] = useState(false);

  return {
    isLoginRequiredDialogOpen,
    setLoginRequiredDialog,
    LoginRequiredDialogNode: (
      <Dialog open={isLoginRequiredDialogOpen} onOpenChange={setLoginRequiredDialog}>
        <DialogContent className="xl:max-w-xl">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {description}. Please sign in or create an account to {action}.
            </DialogDescription>
          </DialogHeader>

          <LoginRequiredDialog setLoginRequiredDialog={setLoginRequiredDialog} />
        </DialogContent>
      </Dialog>
    ),
  };
};
