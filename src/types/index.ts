export type Category =
  | "All"
  | "Web Dev"
  | "Mobile"
  | "AI/ML"
  | "DevOps"
  | "Data Science"
  | "Cyber Security";

export type Difficulty = "Beginner" | "Medium" | "Advanced";

export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Post {
  id: string;
  author: User;
  title: string;
  category: Category;
  difficulty: Difficulty;
  problemStatement: string;
  status: "open" | "solved";
  upvotesCount: number;
  createdAt: string;
  updatedAt?: string;
  saved?: boolean;
  upvoted?: boolean;
  solutionsCount?: number;
  commentsCount?: number;
}

export interface Solution {
  id: string;
  postId: string;
  author: User;
  repoLink: string;
  liveDemoLink?: string;
  writeup: string;
  upvotesCount: number;
  createdAt: string;
  upvoted?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  parentId?: string | null;
  children?: Comment[];
  content: string;
  upvotesCount: number;
  createdAt: string;
  upvoted?: boolean;
}

export interface CreatePostPayload {
  title: string;
  category: string;
  difficulty: Difficulty;
  problemStatement: string;
}

export interface SubmitSolutionPayload {
  postId: string;
  repoLink: string;
  liveDemoLink?: string;
  writeup: string;
}

export interface CreateCommentPayload {
  postId: string;
  parentId?: string | null;
  content: string;
}
