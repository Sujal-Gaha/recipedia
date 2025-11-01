import { Dispatch, SetStateAction, useState } from 'react';
import { BackgroundPattern } from './components/background-pattern';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';
import { ArrowLeft, Check, ChefHat, Eye, EyeOff, Key, Lock, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForgotPasswordMutation, useSendOtpMutation } from '@/apis/auth/query';
import { toastError, toastSuccess } from '@/components/toaster';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ForgotPasswordInputSchema,
  SendOtpInputSchema,
  TForgotPasswordInput,
  TSendOtpInput,
} from '@/apis/auth/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';

const SentOtpComponent = ({ setIsOtpSent }: { setIsOtpSent: Dispatch<SetStateAction<boolean>> }) => {
  const sendOtpMutation = useSendOtpMutation();

  const { register, handleSubmit } = useForm<TSendOtpInput>({
    mode: 'all',
    resolver: zodResolver(SendOtpInputSchema),
  });

  const resendOtp = async (input: { email: string }) => {
    try {
      await sendOtpMutation.mutateAsync(
        {
          email: input.email,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'SEND_OTP_SUCCESS') {
              toastError(res.message ?? 'Sending OTP failed');
              return;
            }
            setIsOtpSent(true);
            toastSuccess('OTP sent successfully!');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Sending OTP failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Sending OTP failed');
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">Forgot your password?</CardTitle>
        <CardDescription className="text-lg">
          No worries! Enter your email address and we'll send you an OTP to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(resendOtp)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="chef@example.com"
                {...register('email')}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Button
            disabled={sendOtpMutation.isPending}
            type="submit"
            color="primary"
            className="w-full h-12 text-lg font-medium"
          >
            {sendOtpMutation.isPending ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link to={_FULL_ROUTES.LOGIN} className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const NewPasswordComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const forgotPasswordMtn = useForgotPasswordMutation();

  const { register, handleSubmit, watch } = useForm<TForgotPasswordInput>({
    mode: 'all',
    resolver: zodResolver(ForgotPasswordInputSchema),
    defaultValues: {
      newPassword: '',
    },
  });

  const { newPassword } = watch();

  const forgotPassword: SubmitHandler<TForgotPasswordInput> = async (input) => {
    try {
      await forgotPasswordMtn.mutateAsync(
        {
          email: input.email,
          newPassword: input.newPassword,
          otp: input.otp,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'FORGOT_PASSWORD_SUCCESS') {
              toastError(res.message ?? 'Password change failed');
              return;
            }
            toastSuccess('Password changed successfully!');
            navigate(_FULL_ROUTES.LOGIN);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Password change failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Password change failed');
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: newPassword.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(newPassword) },
    { text: 'Contains number', met: /\d/.test(newPassword) },
  ];

  const hasEveryRequirementMet = passwordRequirements.every((requirement) => requirement.met);

  return (
    <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">Forgot your password?</CardTitle>
        <CardDescription className="text-lg">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(forgotPassword)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="chef@example.com"
                {...register('email')}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="pl-10 pr-10 h-12"
                placeholder="Create a strong password"
                {...register('newPassword')}
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
          {newPassword && (
            <div className="space-y-2 mt-3">
              <p className="text-xs text-muted-foreground">Password requirements:</p>
              <div className="grid grid-cols-2 gap-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        req.met ? 'bg-emerald-500' : 'bg-muted'
                      }`}
                    >
                      {req.met && <Check className="w-2 h-2 text-white" />}
                    </div>
                    <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              OTP
            </Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="otp" type="text" placeholder="eg. 123456" {...register('otp')} className="pl-10 h-12" />
            </div>
          </div>

          <Button
            disabled={forgotPasswordMtn.isPending || (!!newPassword && !hasEveryRequirementMet)}
            type="submit"
            color="primary"
            className="w-full h-12 text-lg font-medium"
          >
            {forgotPasswordMtn.isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link to={_FULL_ROUTES.LOGIN} className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const ForgotPasswordPageV2 = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <BackgroundPattern />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to={_FULL_ROUTES.LOGIN} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </Button>
        </div>

        {isOtpSent ? <NewPasswordComponent /> : <SentOtpComponent setIsOtpSent={setIsOtpSent} />}
      </div>
    </div>
  );
};
