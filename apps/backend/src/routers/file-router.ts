import { initServer } from "@ts-rest/express";
import { fileContract } from "@recipedia/contract";
import { upload } from "@recipedia/quasar";
import { createFile } from "../modules/file/createFile";

const s = initServer();

const fileRouter = s.router(fileContract, {
  createFile: {
    middleware: [upload.single("file")],
    handler: createFile,
  },
});
