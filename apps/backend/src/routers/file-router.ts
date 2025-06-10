import { initServer } from '@ts-rest/express';
import { fileContract } from '@libs/contract';
import { upload } from '@libs/quasar';
import { createFile } from '../modules/file/createFile';
import { getFileById } from '../modules/file/getFileById';
import { getAllFiles } from '../modules/file/getAllFiles';

const s = initServer();

export const fileRouter = s.router(fileContract, {
  createFile: {
    middleware: [upload.single('file')],
    handler: createFile,
  },
  getFileById: {
    handler: getFileById,
  },
  getAllFiles: {
    handler: getAllFiles,
  },
});
