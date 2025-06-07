import { StatusCodes } from 'http-status-codes';

export class InternalServerError extends Error {
  constructor(message: string, stack?: string) {
    super(message);
    this.name = 'INTERNAL_SERVER_ERROR';
    this.message = message;
    this.stack = stack;
    Error.captureStackTrace(this, InternalServerError);
  }
}

export class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CLIENT_ERROR';
    this.message = message;
    Error.captureStackTrace(this, ClientError);
  }
}

export type TLibError =
  | {
      type: 'client';
      data: ClientError;
      status?: StatusCodes;
    }
  | {
      type: 'server';
      data: InternalServerError;
      status?: StatusCodes;
    };

export type TLibOutputPromise<TData> = Promise<
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: TLibError;
    }
>;
export type TLibOutput<TData> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error:
        | {
            type: 'client';
            data: ClientError;
          }
        | {
            type: 'server';
            data: InternalServerError;
          };
    };
