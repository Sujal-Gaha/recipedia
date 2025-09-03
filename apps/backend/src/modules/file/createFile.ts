import { env, getFilePath, handleApiErrorAndRespond, ImageProcessor } from '@libs/quasar';
import { db } from '@libs/database';
import { AppRouteImplementation } from '@ts-rest/express';
import { fileContract } from '@libs/contract';
import { StatusCodes } from 'http-status-codes';

export const createFile: AppRouteImplementation<typeof fileContract.createFile> = async ({ req }) => {
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
    const { originalname, path, size, mimetype } = req.file;

    if (mimetype === 'application/pdf') {
      const staticPath = getFilePath(path);

      const fullUrl = `${env.BACKEND_URL}${staticPath}`;

      const createdFile = await db.file.create({
        data: {
          file_name: originalname,
          file_path: fullUrl,
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
    }

    const imageProcessor = new ImageProcessor(path);

    const { compressedFilePath } = await imageProcessor.compress({
      width: 500,
      height: 500,
      quality: 100,
      resizeOptions: {
        fit: 'cover',
        position: 'center',
      },
    });

    const staticPath = getFilePath(compressedFilePath);

    const fullUrl = `${env.BACKEND_URL}${staticPath}`;

    const createdFile = await db.file.create({
      data: {
        file_name: originalname,
        file_path: fullUrl,
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
