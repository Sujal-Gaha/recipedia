import { initContract } from "@ts-rest/core";
import { BASE_API_PATH, ErrorSchema } from "../lib/schema";
import {
  CreateTodoInputSchema,
  CreateTodoOutputSchema,
  DeleteTodoOutputSchema,
  GetAllTodosOutputSchema,
  GetTodoByIdOutputSchema,
  UpdateTodoInputSchema,
  UpdateTodoOutputSchema,
} from "./schema";
import z from "zod";

const c = initContract();

export const todoContract = c.router({
  createTodo: {
    method: "POST",
    path: `${BASE_API_PATH}/todo/createTodo`,
    body: CreateTodoInputSchema,
    responses: {
      201: CreateTodoOutputSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: "Create a todo",
  },

  getTodoById: {
    method: "GET",
    path: `${BASE_API_PATH}/todo/getTodoById/:id`,
    responses: {
      200: GetTodoByIdOutputSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: "Get a todo by id",
  },

  getAllTodos: {
    method: "GET",
    path: `${BASE_API_PATH}/todo/getAllTodos`,
    query: z.object({
      page: z.string(),
      perPage: z.string(),
    }),
    responses: {
      200: GetAllTodosOutputSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: "Get all todos",
  },

  updateTodo: {
    method: "PUT",
    path: `${BASE_API_PATH}/todo/updateTodo/:id`,
    body: UpdateTodoInputSchema,
    responses: {
      200: UpdateTodoOutputSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: "Update a todo",
  },

  deleteTodo: {
    method: "DELETE",
    path: `${BASE_API_PATH}/todo/deleteTodo/:id`,
    responses: {
      200: DeleteTodoOutputSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: "Delete a todo",
  },
});
