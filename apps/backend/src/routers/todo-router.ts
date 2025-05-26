import { todoContract } from "@recipedia/contract";
import { initServer } from "@ts-rest/express";
import { createTodo } from "../modules/todo/createTodo";

const s = initServer();

export const todoRouter = s.router(todoContract, {
  createTodo: {
    handler: createTodo,
  },
});
