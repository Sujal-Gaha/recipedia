import { z } from 'zod';
import { UserSchema, UserTypeSchema } from '../__generated__';
import { PaginationOutputSchema, SuccessSchema, TrueOrFalseInputSchema } from '../lib/schema';

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

export const GetUserByIdResponseSchema = SuccessSchema.extend({
  data: UserSchema,
});
export type TGetUserByIdResponse = z.infer<typeof GetUserByIdResponseSchema>;

export const GetUserByEmailInputSchema = UserSchema.pick({
  email: true,
});
export type TGetUserByEmailInput = z.infer<typeof GetUserByEmailInputSchema>;

export const VerifyEmailInputSchema = UserSchema.pick({
  email: true,
}).extend({
  otp: z.string().min(6),
});
export type TVerifyEmailInput = z.infer<typeof VerifyEmailInputSchema>;

export const GetAllUsersInputSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  global_filter: z.string().optional(),
  user_type: UserTypeSchema.optional(),
  is_suspended: TrueOrFalseInputSchema.optional(),
  is_email_verified: TrueOrFalseInputSchema.optional(),
});
export type TGetAllUsersInput = z.infer<typeof GetAllUsersInputSchema>;

export const GetAllUsersOutputSchema = UserSchema;
export type TGetAllUsersOutput = z.infer<typeof GetAllUsersOutputSchema>;

export const GetAllUsersResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllUsersOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllUsersResponse = z.infer<typeof GetAllUsersResponseSchema>;

export const SuspendUserInputSchema = UserSchema.pick({
  id: true,
});
export type TSuspendUserInput = z.infer<typeof SuspendUserInputSchema>;

export const SuspendUserResponseSchema = SuccessSchema.extend({
  data: UserSchema,
});
export type TSuspendUserResponseSchema = z.infer<typeof SuspendUserResponseSchema>;
