import {
  TCreateTodoRepoInput,
  TDeleteTodoRepoInput,
  TFindManyTodosRepoInput,
  TFindManyTodosRepoOutput,
  TFindTodoByIdRepoInput,
  TodoRepo,
  TTodo,
  TUpdateTodoRepoInput,
} from '@libs/quasar';
import { db } from '../prisma/client';

export class PrismaTodoRepo extends TodoRepo {
  override async create({ data: { description, name } }: TCreateTodoRepoInput): Promise<TTodo> {
    return await db.todo.create({
      data: {
        name,
        description,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteTodoRepoInput): Promise<TTodo> {
    return await db.todo.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  override async update({ id, data: { description, is_completed, name } }: TUpdateTodoRepoInput): Promise<TTodo> {
    return await db.todo.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        is_completed,
      },
    });
  }

  override async findById({ data: { id } }: TFindTodoByIdRepoInput): Promise<TTodo | null> {
    return await db.todo.findUnique({
      where: {
        id,
        is_deleted: false,
      },
    });
  }

  override async findMany({ data: { page, perPage } }: TFindManyTodosRepoInput): Promise<TFindManyTodosRepoOutput> {
    const todos = await db.todo.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        is_deleted: false,
      },
    });

    const count = await db.todo.count({
      where: {
        is_deleted: false,
      },
    });

    return {
      data: todos,
      pagination: {
        page,
        perPage,
        total: count,
        totalPages: Math.ceil(count / perPage),
      },
    };
  }
}
