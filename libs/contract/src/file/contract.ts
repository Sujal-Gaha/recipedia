import { initContract } from "@ts-rest/core";
import { BASE_API_PATH, ErrorSchema } from "../lib/schema";
import { z } from "zod";
import { CreateFileResponseSchema } from "./schema";

const c = initContract();

export const fileContract = c.router({
  createFile: {
    method: "POST",
    path: `${BASE_API_PATH}/file/createFile`,
    contentType: "multipart/form-data",
    body: z.object({
      file: z.any(),
    }),
    responses: {
      201: CreateFileResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },
});
