import { createExpressEndpoints } from "@ts-rest/express";
import { todoContract } from "@recipedia/contract";
import { todoRouter } from "./todo-router";

const routers = [
  // add more
  {
    contract: todoContract,
    router: todoRouter,
  },
];

export function generateEndPoints(app: any) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      requestValidationErrorHandler(err, req, res, next) {
        console.error(err, "Request validation error");
        res.status(400).json({
          error: "Request validation error",
          isSuccess: false,
          fieldErrors: err.body?.flatten().fieldErrors,
        });
      },
    });
  });
}
