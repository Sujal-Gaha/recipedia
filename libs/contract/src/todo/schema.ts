import { TodoSchema } from "database";
import z from "zod";

export const CreateTodoInputSchema = TodoSchema.pick({
  name: true,
  description: true,
});

export type TCreateTodoInput = z.infer<typeof CreateTodoInputSchema>;

export const GetTodoByIdInputSchema = TodoSchema.pick({
  id: true,
});

export type TGetTodoByIdInput = z.infer<typeof GetTodoByIdInputSchema>;

export const GetAllTodosInputSchema = z.object({});

export type TGetAllTodosInput = z.infer<typeof GetAllTodosInputSchema>;

export const UpdateTodoInputSchema = TodoSchema.pick({
  id: true,
  name: true,
  description: true,
  is_completed: true,
});

export type TUpdateTodoInput = z.infer<typeof UpdateTodoInputSchema>;

export const DeleteTodoInputSchema = TodoSchema.pick({
  id: true,
});

export type TDeleteTodoInput = z.infer<typeof DeleteTodoInputSchema>;
