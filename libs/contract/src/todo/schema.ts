import { TodoSchema } from '../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../lib/schema';
import z from 'zod';

/** -------- Create Todo -------- */
export const CreateTodoInputSchema = TodoSchema.pick({
  name: true,
  description: true,
});
export type TCreateTodoInput = z.infer<typeof CreateTodoInputSchema>;

export const CreateTodoResponseSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TCreateTodoResponse = z.infer<typeof CreateTodoResponseSchema>;

/** -------- Get Todo By Id -------- */
export const GetTodoByIdInputSchema = TodoSchema.pick({
  id: true,
});
export type TGetTodoByIdInput = z.infer<typeof GetTodoByIdInputSchema>;

export const GetTodoByIdResponseSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TGetTodoByIdResponse = z.infer<typeof GetTodoByIdResponseSchema>;

/** -------- Get All Todos -------- */
export const GetAllTodosInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TGetAllTodosInput = z.infer<typeof GetAllTodosInputSchema>;

export const GetAllTodosOutputSchema = TodoSchema;

export type TGetAllTodosOutput = z.infer<typeof GetAllTodosOutputSchema>;

export const GetAllTodosResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllTodosOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllTodosResponse = z.infer<typeof GetAllTodosResponseSchema>;

/** -------- Update Todo -------- */
export const UpdateTodoInputSchema = TodoSchema.pick({
  name: true,
  description: true,
  is_completed: true,
});
export type TUpdateTodoInput = z.infer<typeof UpdateTodoInputSchema>;

export const UpdateTodoResponseSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TUpdateTodoResponse = z.infer<typeof UpdateTodoResponseSchema>;

/** -------- Delete Todos -------- */
export const DeleteTodoInputSchema = TodoSchema.pick({
  id: true,
});
export type TDeleteTodoInput = z.infer<typeof DeleteTodoInputSchema>;

export const DeleteTodoResponseSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TDeleteTodoResponse = z.infer<typeof DeleteTodoResponseSchema>;
