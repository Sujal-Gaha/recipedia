import { z } from 'zod';
import { PaginationOutputSchema, SuccessSchema } from '../lib/schema';
import { FileSchema } from '../__generated__';

export const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024; // 10MB Limit

export const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

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

/** -------- Get All Files -------- */
export const GetAllFilesInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TGetAllFilesInput = z.infer<typeof GetAllFilesInputSchema>;

export const GetAllFilesOutputSchema = FileSchema;

export type TGetAllFilesOutput = z.infer<typeof GetAllFilesOutputSchema>;

export const GetAllFilesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllFilesOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetFilesResponse = z.infer<typeof GetAllFilesResponseSchema>;

/** -------- Get File By Id -------- */
export const GetFileInputSchema = FileSchema.pick({
  id: true,
});
export type TGetFileByIdInput = z.infer<typeof GetFileInputSchema>;

export const GetFileByIdResponseSchema = SuccessSchema.extend({
  data: FileSchema,
});
export type TGetFileByIdResponse = z.infer<typeof GetFileByIdResponseSchema>;

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
