import { TodoSchema } from '../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../lib/schema';
import z from 'zod';

/** -------- Create Todo -------- */
export const CreateTodoInputSchema = TodoSchema.pick({
  name: true,
  description: true,
});
export type TCreateTodoInput = z.infer<typeof CreateTodoInputSchema>;

export const CreateTodoOutputSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TCreateTodoOutput = z.infer<typeof CreateTodoOutputSchema>;

/** -------- Get Todo By Id -------- */
export const GetTodoByIdInputSchema = TodoSchema.pick({
  id: true,
});
export type TGetTodoByIdInput = z.infer<typeof GetTodoByIdInputSchema>;

export const GetTodoByIdOutputSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TGetTodoByIdOutput = z.infer<typeof GetTodoByIdOutputSchema>;

/** -------- Get All Todos -------- */
export const GetAllTodosInputSchema = z.object({});
export type TGetAllTodosInput = z.infer<typeof GetAllTodosInputSchema>;

export const GetAllTodosOutputSchema = SuccessSchema.extend({
  data: z.array(TodoSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllTodosOutput = z.infer<typeof GetAllTodosOutputSchema>;

/** -------- Update Todo -------- */
export const UpdateTodoInputSchema = TodoSchema.pick({
  name: true,
  description: true,
  is_completed: true,
});
export type TUpdateTodoInput = z.infer<typeof UpdateTodoInputSchema>;

export const UpdateTodoOutputSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TUpdateTodoOutput = z.infer<typeof UpdateTodoOutputSchema>;

/** -------- Delete Todos -------- */
export const DeleteTodoInputSchema = TodoSchema.pick({
  id: true,
});
export type TDeleteTodoInput = z.infer<typeof DeleteTodoInputSchema>;

export const DeleteTodoOutputSchema = SuccessSchema.extend({
  data: TodoSchema,
});
export type TDeleteTodoOutput = z.infer<typeof DeleteTodoOutputSchema>;
