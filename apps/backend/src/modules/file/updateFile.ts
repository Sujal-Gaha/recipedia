import { fileContract } from '@libs/contract';
import { PrismaFileRepo } from '@libs/database';
import { getFilePath, handleApiErrorAndRespond, ImageProcessor } from '@libs/quasar';
import { AppRouteImplementation } from '@ts-rest/express';
import { StatusCodes } from 'http-status-codes';

export const updateFile: AppRouteImplementation<typeof fileContract.updateFile> = async ({ req, params, body }) => {
  try {
    const fileRepo = new PrismaFileRepo();
    const fileExists = await fileRepo.findById({
      data: { id: params.id },
    });
    if (!fileExists) {
      return {
        status: StatusCodes.NOT_FOUND,
        body: {
          isSuccess: false,
          message: 'File not found',
        },
      };
    }
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

    let finalPath = path;
    if (mimetype !== 'application/pdf') {
      const imageProcessor = new ImageProcessor(path);
      const { compressedFilePath } = await imageProcessor.compress({
        width: 500,
        height: 500,
        quality: 90,
        resizeOptions: {
          fit: 'cover',
          position: 'center',
        },
      });
      finalPath = getFilePath(compressedFilePath);
    }

    const updatedFile = await fileRepo.update({
      id: params.id,
      data: {
        file_name: originalname,
        file_path: finalPath,
        file_size_in_bytes: size,
      },
    });

    return {
      status: StatusCodes.OK,
      body: {
        isSuccess: true,
        message: 'File updated successfully',
        data: updatedFile,
      },
    };
  } catch (e) {
    return handleApiErrorAndRespond(e, req);
  }
};
