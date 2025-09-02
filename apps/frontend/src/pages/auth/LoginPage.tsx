import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Checkbox } from '../../components/ui/checkbox';
import { ChefHat, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { _FULL_ROUTES } from '../../constants/routes';
import { BackgroundPattern } from './components/background-pattern';
import { useLoginMutation, useSendOtpMutation } from '../../apis/auth/query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TLoginInput, TLoginInputSchema } from '../../apis/auth/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '../../components/toaster';

const isGoogleAndFacebookLoginProviderEnabled = false;

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const loginMtn = useLoginMutation();
  const sendOtpMtn = useSendOtpMutation();

  const { handleSubmit, register, getValues } = useForm<TLoginInput>({
    mode: 'all',
    resolver: zodResolver(TLoginInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const loginUser: SubmitHandler<TLoginInput> = async (input) => {
    await loginMtn.mutateAsync(
      {
        email: input.email,
        password: input.password,
      },
      {
        onSuccess: (data) => {
          if (data.code !== 'LOGIN_SUCCESS') {
            return toastError(data.message ?? 'Login failed');
          }

          toastSuccess('Login successful!');
          navigate(_FULL_ROUTES.HOME);
        },
        onError: (error) => {
          toastError(error.message ?? 'Login failed');
        },
      }
    );
  };

  const resendOtp = async () => {
    const email = getValues('email');
    if (!email) {
      return toastError('Email is required');
    }
    await sendOtpMtn.mutateAsync(
      {
        email,
      },
      {
        onSuccess: (res) => {
          if (res.code !== 'SEND_OTP_SUCCESS') {
            return toastError(res.message ?? 'Sending OTP failed');
          }

          toastSuccess('OTP sent successfully!');
          navigate(`${_FULL_ROUTES.FORGOT_PASSWORD}?email=${encodeURIComponent(email)}`);
        },
        onError: (error) => {
          toastError(error.message ?? 'Sending OTP failed');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <BackgroundPattern />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to={_FULL_ROUTES.HOME} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipedia
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit(loginUser)}>
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-lg">
                Sign in to your account to continue your culinary journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 h-12"
                        placeholder="chef../..example.com"
                        {...register('email')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10 pr-10 h-12"
                        placeholder="Enter your password"
                        {...register('password')}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" asChild disabled={sendOtpMtn.isPending}>
                    <p onClick={resendOtp} className="text-sm text-primary hover:underline">
                      {sendOtpMtn.isPending ? 'Sending OTP...' : 'Forgot password?'}
                    </p>
                  </Button>
                </div>

                <Button type="submit" className="w-full h-12 text-lg font-medium">
                  Sign In
                </Button>
              </div>
              {isGoogleAndFacebookLoginProviderEnabled ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant="outline" className="h-12">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button type="button" variant="outline" className="h-12">
                      <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </>
              ) : null}

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to={_FULL_ROUTES.REGISTER} className="text-primary hover:underline font-medium">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
