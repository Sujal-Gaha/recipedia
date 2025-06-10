import { ALLOWED_MIME_TYPES, MAX_SIZE_IN_BYTES } from '@libs/contract';
import multer from 'multer';
import { join } from 'path';

export const __STATIC_PATH =
  process.env['ENVIRONMENT'] === 'prod' ? '' : join(process.cwd(), '/uploads/');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  cb(null, ALLOWED_MIME_TYPES.has(file.mimetype));
};

export function getFilePath(fullPath: string) {
  return `/static/${fullPath.split('uploads/')[1]}`;
}

export const upload: multer.Multer = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_SIZE_IN_BYTES },
});
