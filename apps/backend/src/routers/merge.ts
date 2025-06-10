import { contract, fileContract, todoContract } from '@libs/contract';
import { todoRouter } from './todo-route';
import { createExpressEndpoints } from '@ts-rest/express';
import { logger } from '@libs/quasar';
import { router } from 'better-auth/api';
import { fileRouter } from './file-router';

const routers = [
  {
    contract: todoContract,
    router: todoRouter,
  },
  {
    contract: fileContract,
    router: fileRouter,
  },
];

export function generateEndPoints(app: any) {
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
