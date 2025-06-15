import {
  TCreateFileRepoInput,
  TDeleteFileRepoInput,
  TFindManyFilesRepoInput,
  TFindManyFilesRepoOutput,
  TFindFileByIdRepoInput,
  FileRepo,
  TFile,
  TUpdateFileRepoInput,
} from '@libs/quasar';
import { db } from '../prisma/client';

export class PrismaFileRepo extends FileRepo {
  override async create({ data: { file_name, file_path, file_size_in_bytes } }: TCreateFileRepoInput): Promise<TFile> {
    return await db.file.create({
      data: {
        file_name,
        file_path,
        file_size_in_bytes,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteFileRepoInput): Promise<TFile> {
    return await db.file.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }
  override async update({
    id,
    data: { file_size_in_bytes, file_name, file_path },
  }: TUpdateFileRepoInput): Promise<TFile> {
    return await db.file.update({
      where: { id },
      data: {
        file_name,
        file_path,
        file_size_in_bytes,
      },
    });
  }

  override async findById({ data: { id } }: TFindFileByIdRepoInput): Promise<TFile | null> {
    return await db.file.findFirst({
      where: {
        id,
        is_deleted: false,
      },
    });
  }
  override async findMany({ data: { page, perPage } }: TFindManyFilesRepoInput): Promise<TFindManyFilesRepoOutput> {
    const files = await db.file.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        is_deleted: false,
      },
    });
    const count = await db.file.count({
      where: {
        is_deleted: false,
      },
    });
    return {
      data: files,
      pagination: {
        page,
        perPage,
        total: count,
        totalPages: Math.ceil(count / perPage),
      },
    };
  }
}
