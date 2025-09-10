import { z } from 'zod';
import { UserFollowerSchema } from '../../__generated__';
import { SuccessSchema } from '../../lib/schema';

/** -------- Create User Follower -------- */
export const CreateUserFollowerInputSchema = UserFollowerSchema.pick({
  follower_id: true,
  following_id: true,
});
export type TCreateUserFollowerInput = z.infer<typeof CreateUserFollowerInputSchema>;

export const CreateUserFollowerResponseSchema = SuccessSchema.extend({
  data: UserFollowerSchema,
});
export type TCreateUserFollowerResponse = z.infer<typeof CreateUserFollowerResponseSchema>;

/** -------- Get User Follower By Id -------- */
export const GetUserFollowerInputSchema = UserFollowerSchema.pick({
  follower_id: true,
  following_id: true,
});
export type TGetUserFollowerInput = z.infer<typeof GetUserFollowerInputSchema>;

export const GetUserFollowerResponseSchema = SuccessSchema.extend({
  data: UserFollowerSchema,
});
export type TGetUserFollowerResponse = z.infer<typeof GetUserFollowerResponseSchema>;

/** -------- Get All User Followers -------- */
export const GetAllUserFollowersInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TGetAllUserFollowersInput = z.infer<typeof GetAllUserFollowersInputSchema>;

export const GetAllUserFollowersResponseSchema = SuccessSchema.extend({
  data: z.array(UserFollowerSchema),
});
export type TGetAllUserFollowersResponse = z.infer<typeof GetAllUserFollowersResponseSchema>;

/** -------- Update User Follower -------- */
export const UpdateUserFollowerInputSchema = UserFollowerSchema.pick({
  follower_id: true,
  following_id: true,
});
export type TUpdateUserFollowerInput = z.infer<typeof UpdateUserFollowerInputSchema>;

export const UpdateUserFollowerResponseSchema = SuccessSchema.extend({
  data: UserFollowerSchema,
});
export type TUpdateUserFollowerResponse = z.infer<typeof UpdateUserFollowerResponseSchema>;

/** -------- Delete User Follower -------- */
export const DeleteUserFollowerInputSchema = UserFollowerSchema.pick({
  follower_id: true,
  following_id: true,
});
export type TDeleteUserFollowerInput = z.infer<typeof DeleteUserFollowerInputSchema>;

export const DeleteUserFollowerResponseSchema = SuccessSchema.extend({
  data: UserFollowerSchema,
});
export type TDeleteUserFollowerResponse = z.infer<typeof DeleteUserFollowerResponseSchema>;

/** -------- Toggle User Follower -------- */
export const ToggleUserFollowerInputSchema = UserFollowerSchema.pick({
  follower_id: true,
  following_id: true,
});
export type TToggleUserFollowerInput = z.infer<typeof ToggleUserFollowerInputSchema>;

export const ToggleUserFollowerResponseSchema = SuccessSchema.extend({
  data: UserFollowerSchema,
});
export type TToggleUserFollowerResponse = z.infer<typeof ToggleUserFollowerResponseSchema>;
