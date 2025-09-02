import {
  ISignUpHandler,
  ILoginHandler,
  ILogoutHandler,
  IRefreshHandler,
  IResetPasswordHandler,
  IMeRouteHandler,
  IVerifyEmailHandler,
  IForgotPasswordHandler,
  ISendOtpHandler,
} from '@baijanstack/express-auth';
import { PrismaUserRepo } from '@libs/database';
import { logger } from '@libs/quasar';
import { UserType } from '@prisma/client';

export type TUser = {
  name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  user_type: UserType;
};

type TEmailObj = {
  email: string;
};

interface TSignUpBodyInput extends TEmailObj {
  name: string;
  password: string;
  user_type: UserType;
}

const prismaUserRepo = new PrismaUserRepo();

export class SignUpHandler implements ISignUpHandler {
  constructor() {
    //
  }

  doesUserExists: (body: TSignUpBodyInput) => Promise<boolean> = async ({ email }) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });
    return !!user;
  };

  saveUser: (body: TSignUpBodyInput, hashedPassword: string) => Promise<void> = async (
    { email, name, user_type },
    hashedPassword
  ) => {
    await prismaUserRepo.signUp({
      data: {
        name,
        email,
        password: hashedPassword,
        user_type,
      },
    });
  };
}

export class LoginHandler implements ILoginHandler {
  getUserByEmail: (email: string) => Promise<TUser | null> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });

    if (!user) {
      logger.error(
        {
          message: 'User not found',
          user,
        },
        'LoginHandler - getUserByEmail'
      );

      return null;
    }

    return {
      name: user?.name,
      email: user?.email,
      password: user?.password,
      is_email_verified: user?.is_email_verified,
      user_type: user?.user_type,
    };
  };

  getTokenPayload: (email: string) => Promise<{
    name: string;
    email: string;
  } | null> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });

    if (!user) {
      return null;
    }

    return {
      id: user?.id,
      user_type: user?.user_type,
      is_email_verified: user?.is_email_verified,
      email: user?.email,
      name: user?.name,
    };
  };
}

export class LogoutHandler implements ILogoutHandler {
  shouldLogout: () => Promise<boolean> = async () => {
    return true;
  };
}

export class RefreshHandler implements IRefreshHandler {
  getTokenPayload: (email: string) => Promise<{
    name: string;
    email: string;
  } | null> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      name: user?.name,
    };
  };
}

export class ResetPasswordHandler implements IResetPasswordHandler {
  saveHashedPassword: (email: string, hashedPassword: string) => Promise<void> = async (email, hashedPassword) => {
    await prismaUserRepo.updateByEmail({ email, data: { password: hashedPassword } });
  };
  getOldPasswordHash: (email: string) => Promise<string> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });

    if (!user) {
      return '';
    }
    return user.password;
  };
}

export class MeRouteHandler implements IMeRouteHandler {
  getMeByEmail: (email: string) => Promise<{ email: string; name: string } | null> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      user_type: user.user_type,
      is_email_verified: user.is_email_verified,
      name: user.name,
      email: user.email,
    };
  };
}

export class VerifyEmailHandler implements IVerifyEmailHandler {
  updateIsEmailVerifiedField: (email: string) => Promise<void> = async (email) => {
    await prismaUserRepo.verify({ data: { email } });
  };

  isEmailAlreadyVerified: (email: string) => Promise<boolean> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });
    return !user?.is_email_verified;
  };
}

export class SendOtpHandler implements ISendOtpHandler {
  doesUserExists: (email: string) => Promise<boolean> = async (email) => {
    const user = await prismaUserRepo.findByEmail({ data: { email } });
    return !!user;
  };
}

export class ForgotPasswordHandler implements IForgotPasswordHandler {
  saveNewPassword: (email: string, password: string) => Promise<void> = async (email, password) => {
    await prismaUserRepo.updateByEmail({ email, data: { password } });
  };
}
