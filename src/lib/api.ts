import axios from "axios";
import type { Post, Solution, Comment, CreatePostPayload, SubmitSolutionPayload, CreateCommentPayload, Category } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Starting with clean state so users add fresh posts
export const INITIAL_MOCK_POSTS: Post[] = [];

let localPostsState: Post[] = [...INITIAL_MOCK_POSTS];
let localSolutionsState: Record<string, Solution[]> = {};
let localCommentsState: Record<string, Comment[]> = {};

export const fetchPosts = async (category?: Category, search?: string): Promise<Post[]> => {
  try {
    const res = await apiClient.get("/posts", { params: { category, search } });
    return res.data.content || res.data;
  } catch (err) {
    let posts = [...localPostsState];
    if (category && category !== "All") {
      posts = posts.filter((p) => p.category === category);
    }
    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.problemStatement.toLowerCase().includes(q));
    }
    return posts;
  }
};

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  try {
    const res = await apiClient.post("/posts", payload);
    return res.data;
  } catch (err) {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: "current-user",
        email: "you@devsolve.org",
        username: "you",
        fullName: "You (Active User)",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      },
      title: payload.title,
      category: payload.category as Category,
      difficulty: payload.difficulty,
      problemStatement: payload.problemStatement,
      status: "open",
      upvotesCount: 0,
      createdAt: new Date().toISOString(),
      solutionsCount: 0,
      commentsCount: 0,
    };
    localPostsState.unshift(newPost);
    return newPost;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    await apiClient.delete(`/posts/${postId}`);
  } catch (err) {
    localPostsState = localPostsState.filter((p) => p.id !== postId);
  }
};

export const fetchSolutions = async (postId: string): Promise<Solution[]> => {
  try {
    const res = await apiClient.get(`/solutions/post/${postId}`);
    const remote: Solution[] = res.data || [];
    const local = localSolutionsState[postId] || [];
    const combined = [...remote];
    for (const loc of local) {
      if (!combined.some((s) => s.id === loc.id)) {
        combined.unshift(loc);
      }
    }
    return combined;
  } catch (err) {
    return localSolutionsState[postId] || [];
  }
};

export const submitSolution = async (payload: SubmitSolutionPayload): Promise<Solution> => {
  try {
    const res = await apiClient.post("/solutions", payload);
    const newSol: Solution = res.data;
    if (!localSolutionsState[payload.postId]) {
      localSolutionsState[payload.postId] = [];
    }
    if (!localSolutionsState[payload.postId].some((s) => s.id === newSol.id)) {
      localSolutionsState[payload.postId].unshift(newSol);
    }
    return newSol;
  } catch (err) {
    const newSol: Solution = {
      id: `sol-${Date.now()}`,
      postId: payload.postId,
      author: {
        id: "current-user",
        email: "you@devsolve.org",
        username: "you",
        fullName: "You (Active User)",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      },
      repoLink: payload.repoLink,
      liveDemoLink: payload.liveDemoLink,
      writeup: payload.writeup,
      upvotesCount: 0,
      createdAt: new Date().toISOString(),
    };
    if (!localSolutionsState[payload.postId]) {
      localSolutionsState[payload.postId] = [];
    }
    localSolutionsState[payload.postId].unshift(newSol);
    return newSol;
  }
};

export const deleteSolution = async (solutionId: string, postId: string): Promise<void> => {
  try {
    await apiClient.delete(`/solutions/${solutionId}`);
  } catch (err) {
    if (localSolutionsState[postId]) {
      localSolutionsState[postId] = localSolutionsState[postId].filter(s => s.id !== solutionId);
    }
  }
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  try {
    const res = await apiClient.get(`/comments/post/${postId}`);
    const remote: Comment[] = res.data || [];
    const local = localCommentsState[postId] || [];
    const combined = [...remote];
    for (const loc of local) {
      if (!combined.some((c) => c.id === loc.id)) {
        combined.push(loc);
      }
    }
    return combined;
  } catch (err) {
    return localCommentsState[postId] || [];
  }
};

export const addComment = async (payload: CreateCommentPayload): Promise<Comment> => {
  try {
    const res = await apiClient.post("/comments", payload);
    const newComment: Comment = res.data;
    if (!localCommentsState[payload.postId]) {
      localCommentsState[payload.postId] = [];
    }
    if (payload.parentId) {
      const insertChild = (tree: Comment[]): boolean => {
        for (const item of tree) {
          if (item.id === payload.parentId) {
            if (!item.children) item.children = [];
            if (!item.children.some((c) => c.id === newComment.id)) {
              item.children.push(newComment);
            }
            return true;
          }
          if (item.children && insertChild(item.children)) return true;
        }
        return false;
      };
      insertChild(localCommentsState[payload.postId]);
    } else {
      if (!localCommentsState[payload.postId].some((c) => c.id === newComment.id)) {
        localCommentsState[payload.postId].push(newComment);
      }
    }
    return newComment;
  } catch (err) {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId: payload.postId,
      parentId: payload.parentId,
      author: {
        id: "current-user",
        email: "you@devsolve.org",
        username: "you",
        fullName: "You (Active User)",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      },
      content: payload.content,
      upvotesCount: 0,
      createdAt: new Date().toISOString(),
      children: [],
    };
    if (!localCommentsState[payload.postId]) {
      localCommentsState[payload.postId] = [];
    }
    if (payload.parentId) {
      const insertChild = (tree: Comment[]): boolean => {
        for (const item of tree) {
          if (item.id === payload.parentId) {
            if (!item.children) item.children = [];
            item.children.push(newComment);
            return true;
          }
          if (item.children && insertChild(item.children)) return true;
        }
        return false;
      };
      insertChild(localCommentsState[payload.postId]);
    } else {
      localCommentsState[payload.postId].push(newComment);
    }
    return newComment;
  }
};

export const deleteComment = async (commentId: string, postId: string): Promise<void> => {
  try {
    await apiClient.delete(`/comments/${commentId}`);
  } catch (err) {
    if (localCommentsState[postId]) {
      const removeRecursive = (tree: Comment[]): Comment[] => {
        return tree
          .filter(c => c.id !== commentId)
          .map(c => ({
            ...c,
            children: c.children ? removeRecursive(c.children) : []
          }));
      };
      localCommentsState[postId] = removeRecursive(localCommentsState[postId]);
    }
  }
};

