import { todoContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { createTodo } from '../modules/todo/createTodo';
import { getTodoById } from '../modules/todo/getTodoById';
import { getAllTodos } from '../modules/todo/getAllTodos';
import { updateTodo } from '../modules/todo/updateTodo';
import { deleteTodo } from '../modules/todo/deleteTodo';

const s = initServer();

export const todoRouter = s.router(todoContract, {
  createTodo: {
    handler: createTodo,
  },
  getTodoById: {
    handler: getTodoById,
  },
  getAllTodos: {
    handler: getAllTodos,
  },
  updateTodo: {
    handler: updateTodo,
  },
  deleteTodo: {
    handler: deleteTodo,
  },
});
