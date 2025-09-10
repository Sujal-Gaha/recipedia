import { TToggleRepoInput, TUserFollower, UserFollowerRepo } from '@libs/quasar';
import { db } from '../prisma/client';

export class PrismaUserFollowerRepo extends UserFollowerRepo {
  override toggle = async ({ data: { follower_id, following_id } }: TToggleRepoInput): Promise<TUserFollower> => {
    const userFollower = await db.userFollower.findUnique({
      where: {
        follower_id_following_id: {
          follower_id,
          following_id,
        },
      },
    });

    if (userFollower) {
      return await db.userFollower.delete({
        where: {
          follower_id_following_id: {
            follower_id,
            following_id,
          },
        },
      });
    } else {
      return await db.userFollower.create({
        data: {
          follower_id,
          following_id,
        },
      });
    }
  };
}
