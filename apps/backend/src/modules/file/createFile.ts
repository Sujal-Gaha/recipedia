import { AppRouteImplementation } from "@ts-rest/express";
import { fileContract } from "@recipedia/contract";
import { handleApiErrorAndRespond } from "@recipedia/quasar";
import { db } from "@recipedia/database";

export const createFile: AppRouteImplementation<typeof fileContract.createFile> = async ({ req }) => {
  try {
    if (!req.file) {
      throw new Error("File not sent");
    }

    const file = await db.file.create({
      data: {
        file_name: req.file,
      },
    });
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
