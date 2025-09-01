import { fileContract, ingredientContract, todoContract } from '@libs/contract';
import { todoRouter } from './todo-route';
import { createExpressEndpoints } from '@ts-rest/express';
import { logger } from '@libs/quasar';
import { fileRouter } from './file-router';
import type { Express } from 'express';
import { ingredientRouter } from './ingredient-router';

const routers = [
  {
    contract: todoContract,
    router: todoRouter,
  },
  {
    contract: fileContract,
    router: fileRouter,
  },
  {
    contract: ingredientContract,
    router: ingredientRouter,
  },
];

export function generateEndPoints(app: Express) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      requestValidationErrorHandler(err, req, res, next) {
        logger.error(err, 'Request validation error');
        res.status(400).json({
          error: 'Request validation error',
          isSuccess: false,
          fieldErrors: err.body?.flatten().fieldErrors,
        });
      },
    });
  });
}
