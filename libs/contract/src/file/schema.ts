import { z } from 'zod';
import { PaginationOutputSchema, SuccessSchema } from '../lib/schema';
import { FileSchema } from '../__generated__';

export const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024; // 10MB Limit

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

export type TFile = z.infer<typeof FileSchema>;

/** -------- Get Files -------- */
export const GetFilesInputSchema = z.object({});
export type TGetFilesInput = z.infer<typeof GetFilesInputSchema>;

export const GetFilesResponseSchema = SuccessSchema.extend({
  data: z.array(FileSchema),
  pagination: PaginationOutputSchema,
});
export type TGetFilesResponse = z.infer<typeof GetFilesResponseSchema>;

/** -------- Get File -------- */
export const GetFileInputSchema = FileSchema.pick({
  id: true,
});
export type TGetFileInput = z.infer<typeof GetFileInputSchema>;

export const GetFileResponseSchema = SuccessSchema.extend({
  data: FileSchema,
});
export type TGetFileResponse = z.infer<typeof GetFileResponseSchema>;

/** -------- Create File -------- */
export const CreateFileInputSchema = FileSchema.pick({
  file_name: true,
  file_path: true,
  file_size_in_bytes: true,
});
export type TCreateFileInput = z.infer<typeof CreateFileInputSchema>;

export const CreateFileResponseSchema = SuccessSchema.extend({
  data: FileSchema,
});
export type TCreateFileResponse = z.infer<typeof CreateFileResponseSchema>;

/** -------- Delete File -------- */
export const DeleteFileInputSchema = FileSchema.pick({
  id: true,
});
export type TDeleteFileInput = z.infer<typeof DeleteFileInputSchema>;

export const DeleteFileResponseSchema = SuccessSchema.extend({
  data: FileSchema,
});
export type TDeleteFileResponse = z.infer<typeof DeleteFileResponseSchema>;

/** -------- Update File -------- */
export const UpdateFileInputSchema = FileSchema.pick({
  file_name: true,
  file_path: true,
  file_size_in_bytes: true,
});
export type TUpdateFileInput = z.infer<typeof UpdateFileInputSchema>;

export const UpdateFileResponseSchema = SuccessSchema.extend({
  data: FileSchema,
});
export type TUpdateFileResponse = z.infer<typeof UpdateFileResponseSchema>;
