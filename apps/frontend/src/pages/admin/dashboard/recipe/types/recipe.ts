export interface IRecipe {
  id: string;
  title: string;
  author: string;
  authorId: string;
  status: string;
  difficulty: string;
  upvotes: number;
  rating: number;
  cookTime: number;
  flagged: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  description: string;
  views: number;
  comments: number;
  category: string;
}
