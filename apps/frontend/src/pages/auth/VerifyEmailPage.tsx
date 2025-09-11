import { useState, useEffect, useRef, ClipboardEvent, KeyboardEvent } from 'react';
import { Shield, CheckCircle, Clock, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { BackgroundPattern } from './components/background-pattern';
import { _FULL_ROUTES } from '@/constants/routes';
import { useSendOtpMutation, useVerifyEmailMutation } from '@/apis/auth/query';
import { toastError, toastSuccess } from '@/components/toaster';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TVerifyEmailInput, VerifyEmailInputSchema } from '@/apis/auth/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(_FULL_ROUTES.LOGIN);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-emerald-600">Email Verified!</CardTitle>
            <CardDescription className="text-lg">Your email has been successfully verified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-emerald-800 font-medium">
                <span role="img" aria-label="party">
                  🎉
                </span>{' '}
                Account activated successfully!
              </p>
              <p className="text-emerald-700 text-sm mt-1">Your account is now ready to use.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">Redirecting to login page...</p>
              <p className="text-blue-700 text-sm mt-1">
                You will be automatically redirected to the login page in a few seconds.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              If you are not redirected automatically,{' '}
              <button
                onClick={() => navigate(_FULL_ROUTES.LOGIN)}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                Click here to login
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export const VerifyEmailPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const sendOtpMtn = useSendOtpMutation();
  const verifyEmailMtn = useVerifyEmailMutation();

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const email = params.get('email') ?? '';

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleSubmit, setValue } = useForm<TVerifyEmailInput>({
    mode: 'all',
    resolver: zodResolver(VerifyEmailInputSchema),
    defaultValues: {
      email,
      otp: '',
    },
  });

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      return setCanResend(true);
    }
  }, [countdown, canResend]);

  useEffect(() => {
    if (otp.length) {
      setValue('otp', otp.join(''));
    }
  }, [otp, setValue]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== '') && index === 5) {
      // handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);

    if (pastedData.length === 6) {
      // handleVerifyOtp(pastedData);
    }
  };

  const verifyEmail: SubmitHandler<TVerifyEmailInput> = async (input) => {
    await verifyEmailMtn.mutateAsync(
      {
        email: input.email,
        otp: input.otp,
      },
      {
        onSuccess: (data) => {
          if (data.code !== 'VERIFY_EMAIL_SUCCESS') {
            return toastError(data.message ?? 'Verification failed');
          }

          toastSuccess('Email verified successfully!');
          setIsVerified(true);
        },
        onError: (error) => {
          setError(error.message);
          // toastError(error.message ?? 'Verification failed');
        },
      }
    );
  };

  const resendOtp = async () => {
    setCountdown(60);
    setCanResend(false);
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
          navigate(`${_FULL_ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`);
        },
        onError: (error) => {
          toastError(error.message ?? 'Sending OTP failed');
        },
      }
    );
  };

  if (isVerified) {
    return <EmailVerificationSuccess />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <BackgroundPattern />

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to={_FULL_ROUTES.LOGIN} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit(verifyEmail)}>
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg relative">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <Clock className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">Enter Verification Code</CardTitle>
              <CardDescription className="text-lg">
                We've sent a 6-digit code to <strong className="text-foreground">{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 focus:border-primary"
                      disabled={verifyEmailMtn.isPending}
                    />
                  ))}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <p className="text-red-800 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={otp.some((digit) => digit === '') || verifyEmailMtn.isPending}
                  className="w-full h-12 text-lg font-medium"
                >
                  {verifyEmailMtn.isPending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  <span role="img" aria-label="mobile">
                    📱
                  </span>{' '}
                  Verification Tips
                </h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Enter the 6-digit code from your mail</li>
                  <li>• Code expires in 5 minutes</li>
                  <li>• You can paste the code directly</li>
                </ul>
              </div>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Didn't receive the code?</p>

                <Button
                  type="button"
                  onClick={resendOtp}
                  disabled={!canResend || sendOtpMtn.isPending}
                  variant="outline"
                  className="w-full h-12 bg-transparent"
                >
                  {sendOtpMtn.isPending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : canResend ? (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Resend Code
                    </>
                  ) : (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      Resend in {countdown}s
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Having trouble?{' '}
                  <Link to={_FULL_ROUTES.CONTACT} className="text-primary hover:underline font-medium">
                    Contact support
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Wrong details?{' '}
            <Link to={_FULL_ROUTES.REGISTER} className="text-primary hover:underline">
              Update your details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
