import { todoContract } from "@recipedia/contract";
import { db } from "@recipedia/database";
import { handleApiErrorAndRespond } from "@recipedia/quasar";
import { AppRouteImplementation } from "@ts-rest/express";
import { StatusCodes } from "http-status-codes";

export const updateTodo: AppRouteImplementation<typeof todoContract.updateTodo> = async ({ req, params, body }) => {
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

    const updatedTodo = await db.todo.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: "Updated Todo Successfully",
        data: updatedTodo,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
