import { z } from 'zod';
import { UserSchema } from '../__generated__';

export const CreateUserInputSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type TCreateUserInput = z.infer<typeof CreateUserInputSchema>;

export const SignUpUserInputSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
  user_type: true,
});
export type TSignUpUserInput = z.infer<typeof SignUpUserInputSchema>;

export const UpdateUserByIdInputSchema = UserSchema.pick({
  name: true,
  user_type: true,
  password: true,
  image: true,
  is_email_verified: true,
});
export type TUpdateUserByIdInput = z.infer<typeof UpdateUserByIdInputSchema>;

export const UpdateUserByEmailInputSchema = UserSchema.pick({
  password: true,
});
export type TUpdateUserByEmailInput = z.infer<typeof UpdateUserByEmailInputSchema>;

export const GetUserByIdInputSchema = UserSchema.pick({
  id: true,
});
export type TGetUserByIdInput = z.infer<typeof GetUserByIdInputSchema>;

export const GetUserByEmailInputSchema = UserSchema.pick({
  email: true,
});
export type TGetUserByEmailInput = z.infer<typeof GetUserByEmailInputSchema>;

export const VerifyEmailInputSchema = UserSchema.pick({
  email: true,
});
export type TVerifyEmailInput = z.infer<typeof VerifyEmailInputSchema>;
