export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
  recipesCount: number;
  followers: number;
  following: number;
  joinedAt: string;
  lastActive: string;
  verified: boolean;
  totalUpvotes: number;
  location: string;
  bio: string;
}
