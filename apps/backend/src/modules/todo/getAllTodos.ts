import { todoContract } from "@recipedia/contract";
import { db } from "@recipedia/database";
import { getNumFromString, handleApiErrorAndRespond } from "@recipedia/quasar";
import { AppRouteImplementation } from "@ts-rest/express";
import { StatusCodes } from "http-status-codes";

export const getAllTodos: AppRouteImplementation<typeof todoContract.getAllTodos> = async ({ req, query }) => {
  try {
    const pageNum = getNumFromString(query.page);
    const perPageNum = getNumFromString(query.perPage);

    const todos = await db.todo.findMany({
      skip: (pageNum - 1) * perPageNum,
      take: perPageNum,
      orderBy: {
        created_at: "desc",
      },
      where: {
        is_deleted: false,
      },
    });

    if (!todos) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: "Todos not found",
        },
      };
    }

    const total = await db.todo.count();
    const totalPages = Math.ceil(total / perPageNum);

    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: "Get All Todos Successfully",
        data: todos,
        pagination: {
          page: pageNum,
          perPage: perPageNum,
          total,
          totalPages,
        },
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
