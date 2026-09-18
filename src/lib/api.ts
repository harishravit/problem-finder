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

export const fetchPosts = async (category?: Category, search?: string): Promise<Post[]> => {
  const res = await apiClient.get("/posts", { params: { category, search } });
  return res.data.content || res.data;
};

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const res = await apiClient.post("/posts", payload);
  return res.data;
};

export const fetchSolutions = async (postId: string): Promise<Solution[]> => {
  const res = await apiClient.get(`/solutions/post/${postId}`);
  return res.data;
};

export const submitSolution = async (payload: SubmitSolutionPayload): Promise<Solution> => {
  const res = await apiClient.post("/solutions", payload);
  return res.data;
};

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  const res = await apiClient.get(`/comments/post/${postId}`);
  return res.data;
};

export const addComment = async (payload: CreateCommentPayload): Promise<Comment> => {
  const res = await apiClient.post("/comments", payload);
  return res.data;
};
