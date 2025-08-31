import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, Clock, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { BackgroundPattern } from './components/background-pattern';

export const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock phone number or email
  const maskedContact = '+1 (555) ***-**67';

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      return setCanResend(true);
    }
  }, [countdown, canResend]);

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
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);

    if (pastedData.length === 6) {
      handleVerifyOtp(pastedData);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setIsVerifying(true);
    setError('');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock validation - accept "123456" as valid OTP
    if (otpCode === '123456') {
      setIsVerified(true);
    } else {
      setError('Invalid verification code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }

    setIsVerifying(false);
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsResending(false);
    setCanResend(false);
    setCountdown(60);
    setError('');
    setOtp(['', '', '', '', '', '']);
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
              <CardTitle className="text-3xl font-bold text-emerald-600">Verification Complete!</CardTitle>
              <CardDescription className="text-lg">
                Your account has been successfully verified. You're all set!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-emerald-800 font-medium">
                  <span role="img" aria-label="party">
                    🎉
                  </span>{' '}
                  Two-factor authentication enabled!
                </p>
                <p className="text-emerald-700 text-sm mt-1">Your account is now more secure.</p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full h-12 text-lg font-medium">
                  <Link to="/profile">Go to Profile</Link>
                </Button>
                <Button variant="outline" asChild className="w-full h-12 bg-transparent">
                  <Link to="/">Continue to Recipedia</Link>
                </Button>
              </div>
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
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/auth/signin" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </Button>
        </div>

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
              We've sent a 6-digit code to <strong className="text-foreground">{maskedContact}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OTP Input */}
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
                    disabled={isVerifying}
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
                onClick={() => handleVerifyOtp(otp.join(''))}
                disabled={otp.some((digit) => digit === '') || isVerifying}
                className="w-full h-12 text-lg font-medium"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                <span role="img" aria-label="mobile">
                  📱
                </span>{' '}
                Verification Tips
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Enter the 6-digit code from your SMS</li>
                <li>• Code expires in 10 minutes</li>
                <li>• You can paste the code directly</li>
              </ul>
            </div>

            {/* Resend section */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Didn't receive the code?</p>

              <Button
                onClick={handleResendOtp}
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

              {/* Demo hint */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  For demo purposes, use: <strong>123456</strong>
                </p>
              </div>
            </div>

            {/* Help section */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Having trouble?{' '}
                <Link to="/contact" className="text-primary hover:underline font-medium">
                  Contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Wrong phone number?{' '}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Update your details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
