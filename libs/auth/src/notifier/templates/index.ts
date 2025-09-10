import { otpTemplate } from './otp.template';
import { emailVerifiedTemplate } from './email-verified.template';

export const Templates = {
  OTP: (payload: { code: string }) => otpTemplate(payload.code),
  EMAIL_VERIFIED: (payload: { email: string }) => emailVerifiedTemplate(payload.email),
};
