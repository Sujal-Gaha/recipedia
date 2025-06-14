import { initServer } from '@ts-rest/express';
import { fileContract } from '@libs/contract';
import { upload } from '@libs/quasar';
import { createFile } from '../modules/file/createFile';
import { getFileById } from '../modules/file/getFileById';
import { getAllFiles } from '../modules/file/getAllFiles';
import { updateFile } from '../modules/file/updateFile';
import { deleteFile } from '../modules/file/deleteFile';

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
  updateFile: {
    handler: updateFile,
  },
  deleteFile: {
    handler: deleteFile,
  },
});
