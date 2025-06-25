import {
  TCreateUserRepoInput,
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
}
