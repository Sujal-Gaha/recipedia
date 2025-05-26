import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export type TNextError = {
  message: string;
  status: StatusCodes;
};

export function errorHandler(err: TNextError, req: Request, res: Response, next: NextFunction) {
  console.error(err, "Caught final exception");
  res.status(err.status || 500).json({ error: "Internal server error" });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({ error: "Not found" });
}

export function customNext(next: NextFunction, arg?: TNextError) {
  if (arg && Object.keys(arg).length) {
    const { message, status } = arg;
    return next({
      message,
      status,
    });
  }

  return next();
}

export function handleApiErrorAndRespond(error: unknown, req: Request) {
  if (error instanceof BaseError) {
    return {
      method: req.method,
      url: req.url,
      error: {
        message: error.message,
        stack: error.stack,
      },
      body: req?.body,
      query: req?.query,
      params: req.params,
      status: error.status ?? (StatusCodes.INTERNAL_SERVER_ERROR as any),
    };
  } else {
    return {
      method: req.method,
      url: req.url,
      error: {
        message: (error as Error).message,
        stack: (error as Error).stack,
      },
      body: req?.body,
      query: req?.query,
      params: req.params,
      status: StatusCodes.INTERNAL_SERVER_ERROR as any,
    };
  }
}

export class BaseError extends Error {
  status: StatusCodes;
  type: "server" | "client";

  constructor({
    message,
    status,
    type = "server",
  }: {
    message: string;
    status: StatusCodes;
    type: "server" | "client";
  }) {
    super(message);
    this.name = "BaseError";
    this.status = status;
    this.type = type;
  }
}
