import { todoContract } from "@recipedia/contract";
import { db } from "@recipedia/database";
import { handleApiErrorAndRespond } from "@recipedia/quasar";
import { AppRouteImplementation } from "@ts-rest/express";
import { StatusCodes } from "http-status-codes";

export const deleteTodo: AppRouteImplementation<typeof todoContract.deleteTodo> = async ({ req, params }) => {
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

    const deletedTodo = await db.todo.update({
      where: {
        id: params.id,
      },
      data: {
        is_deleted: true,
      },
    });

    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: "Deleted Todo Successfully",
        data: deletedTodo,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
