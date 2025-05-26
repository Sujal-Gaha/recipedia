import { todoContract } from "@recipedia/contract";
import { db } from "@recipedia/database";
import { handleApiErrorAndRespond } from "@recipedia/quasar";
import { AppRouteImplementation } from "@ts-rest/express";
import { StatusCodes } from "http-status-codes";

export const getTodoById: AppRouteImplementation<typeof todoContract.getTodoById> = async ({ req, params }) => {
  try {
    if (!params.id) {
      return {
        status: StatusCodes.BAD_REQUEST,
        body: {
          isSuccess: false,
          message: "Todo id is required",
        },
      };
    }

    const todo = await db.todo.findUnique({
      where: {
        id: params.id,
        is_deleted: false,
      },
    });

    if (!todo) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: "Todo not found",
        },
      };
    }

    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: "Get Todo Successfully",
        data: todo,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
