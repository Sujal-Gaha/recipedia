import { todoContract } from "@recipedia/contract";
import { initServer } from "@ts-rest/express";
import { createTodo } from "../modules/todo/createTodo";
import { deleteTodo } from "../modules/todo/deleteTodo";
import { getAllTodos } from "../modules/todo/getAllTodos";
import { getTodoById } from "../modules/todo/getTodoById";
import { updateTodo } from "../modules/todo/updateTodo";

const s = initServer();

export const todoRouter = s.router(todoContract, {
  createTodo: {
    middleware: [],
    handler: createTodo,
  },
  deleteTodo: {
    middleware: [],
    handler: deleteTodo,
  },
  getAllTodos: {
    middleware: [],
    handler: getAllTodos,
  },
  getTodoById: {
    middleware: [],
    handler: getTodoById,
  },
  updateTodo: {
    middleware: [],
    handler: updateTodo,
  },
});
