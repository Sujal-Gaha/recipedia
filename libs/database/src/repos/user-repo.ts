import {
  TCreateUserRepoInput,
  TFindManyUsersRepoInput,
  TFindManyUsersRepoOutput,
  TFindUserByEmailRepoInput,
  TFindUserByIdRepoInput,
  TSignUpUserRepoInput,
  TUpdateUserByEmailRepoInput,
  TUpdateUserByIdRepoInput,
  TUser,
  TVerifyEmailRepoInput,
  UserRepo,
} from '@libs/quasar';
import { db } from '../prisma/client';
import { Prisma } from '@prisma/client';
import { TSuspendUserInput } from '@libs/contract';

export class PrismaUserRepo extends UserRepo {
  override async create({ data: { email, name, password } }: TCreateUserRepoInput): Promise<TUser> {
    return await db.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  override async signUp({ data: { email, name, password, user_type } }: TSignUpUserRepoInput): Promise<TUser> {
    return await db.user.create({
      data: {
        name,
        email,
        password,
        user_type,
      },
    });
  }

  override async updateById({
    id,
    data: { image, is_email_verified, name, password, user_type },
  }: TUpdateUserByIdRepoInput): Promise<TUser> {
    return await db.user.update({
      where: {
        id,
      },
      data: {
        image,
        is_email_verified,
        name,
        password,
        user_type,
      },
    });
  }

  override async findById({ data: { id } }: TFindUserByIdRepoInput): Promise<TUser | null> {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  }

  override async updateByEmail({ email, data: { password } }: TUpdateUserByEmailRepoInput): Promise<TUser> {
    return await db.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  }

  override async findByEmail({ data: { email } }: TFindUserByEmailRepoInput): Promise<TUser | null> {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  }

  override async verify({ data: { email } }: TVerifyEmailRepoInput): Promise<TUser> {
    return await db.user.update({
      where: {
        email,
      },
      data: {
        is_email_verified: true,
      },
    });
  }

  override async suspend({ id }: TSuspendUserInput): Promise<TUser> {
    return await db.user.update({
      where: {
        id,
      },
      data: {
        is_suspended: true,
        suspended_at: new Date(),
      },
    });
  }

  override async findMany({
    data: { page, perPage, global_filter, is_email_verified, is_suspended, user_type },
  }: TFindManyUsersRepoInput): Promise<TFindManyUsersRepoOutput> {
    const whereInput: Prisma.UserWhereInput = {
      ...(global_filter ? { name: { contains: global_filter, mode: 'insensitive' } } : null),
      ...(is_email_verified !== undefined ? { is_email_verified: is_email_verified === 'true' } : null),
      ...(is_suspended !== undefined ? { is_suspended: is_suspended === 'true' } : null),
      ...(user_type ? { user_type } : null),
    };

    const users = await db.user.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      where: whereInput,
    });

    const total = await db.user.count({
      where: whereInput,
    });

    return {
      data: users,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
