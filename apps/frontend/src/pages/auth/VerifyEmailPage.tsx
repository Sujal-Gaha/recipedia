import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertCircle, ArrowLeft, CheckCircle, Clock, Mail, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { BackgroundPattern } from './components/background-pattern';
import { _FULL_ROUTES } from '../../constants/routes';

export const VerifyEmailPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Mock email from URL params or state
  const email = 'chef@example.com';

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      return setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsResending(false);
    setCanResend(false);
    setCountdown(60);
    setIsExpired(false);
  };

  const handleVerifyEmail = () => {
    // This would typically be called from a URL parameter or API
    setIsVerified(true);
  };

  // Success state
  if (isVerified) {
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
              <CardDescription className="text-lg">
                Your email has been successfully verified. Welcome to Recipedia!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-emerald-800 font-medium">
                  <span role="img" aria-label="party">
                    🎉
                  </span>{' '}
                  Account activated successfully!
                </p>
                <p className="text-emerald-700 text-sm mt-1">You can now access all features of Recipedia.</p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full h-12 text-lg font-medium">
                  <Link to={_FULL_ROUTES.PROFILE}>Complete Your Profile</Link>
                </Button>
                <Button variant="outline" asChild className="w-full h-12 bg-transparent">
                  <Link to={_FULL_ROUTES.RECIPE}>Start Exploring Recipes</Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Ready to start cooking?{' '}
                <Link to="/" className="text-primary hover:underline font-medium">
                  Go to homepage
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <BackgroundPattern />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Sign In */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to={_FULL_ROUTES.LOGIN} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </Button>
        </div>

        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg relative">
                <Mail className="h-10 w-10 text-primary-foreground" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <Clock className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Verify Your Email</CardTitle>
            <CardDescription className="text-lg">
              We've sent a verification link to <strong className="text-foreground">{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                <span role="img" aria-label="email">
                  📧
                </span>{' '}
                Check your email
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Click the verification link in your email</li>
                <li>• The link will expire in 24 hours</li>
                <li>• Check your spam folder if you don't see it</li>
              </ul>
            </div>

            {/* Expired state */}
            {isExpired && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-800 font-medium">Verification link expired</p>
                </div>
                <p className="text-red-700 text-sm mt-1">Please request a new verification email.</p>
              </div>
            )}

            {/* Resend section */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Didn't receive the email?</p>

              <Button
                onClick={handleResendEmail}
                disabled={!canResend || isResending}
                variant="outline"
                className="w-full h-12 bg-transparent"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : canResend ? (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Resend in {countdown}s
                  </>
                )}
              </Button>

              {/* Demo button for testing */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">For demo purposes:</p>
                <Button onClick={handleVerifyEmail} variant="secondary" size="sm" className="text-xs">
                  Simulate Email Verification
                </Button>
              </div>
            </div>

            {/* Help section */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Need help?{' '}
                <Link to="/contact" className="text-primary hover:underline font-medium">
                  Contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Wrong email address?{' '}
            <Link to={_FULL_ROUTES.REGISTER} className="text-primary hover:underline">
              Sign up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
