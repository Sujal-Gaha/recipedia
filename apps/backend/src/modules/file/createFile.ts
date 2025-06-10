import { handleApiErrorAndRespond } from '@libs/quasar';
import { db } from '@libs/database';
import { AppRouteImplementation } from '@ts-rest/express';
import { fileContract } from '@libs/contract';
import { StatusCodes } from 'http-status-codes';

export const createFile: AppRouteImplementation<
  typeof fileContract.createFile
> = async ({ req }) => {
  try {
    if (!req.file) {
      return {
        status: StatusCodes.BAD_REQUEST,
        body: {
          isSuccess: false,
          message: 'No file uploaded',
        },
      };
    }
    const { originalname, path, size } = req.file;

    const createdFile = await db.file.create({
      data: {
        file_name: originalname,
        file_path: path,
        file_size_in_bytes: size,
      },
    });

    return {
      status: StatusCodes.CREATED,
      body: {
        message: 'File created successfully',
        isSuccess: true,
        data: createdFile,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
