import React, { useState, useEffect } from "react";
import type { Post, Solution, Comment } from "../../types";
import { X, Code2, MessageSquare, Plus, Send, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SolutionCard } from "../solution/SolutionCard";
import { CommentThread } from "../comment/CommentThread";
import { fetchSolutions, fetchComments, addComment } from "../../lib/api";
import { formatDistanceToNow } from "date-fns";

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onOpenSubmitSolution: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onOpenSubmitSolution,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<"problem" | "solutions" | "discussion">("problem");
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (post) {
      loadData(post.id);
    }
  }, [post]);

  const loadData = async (postId: string) => {
    try {
      const [solsData, commsData] = await Promise.all([
        fetchSolutions(postId),
        fetchComments(postId),
      ]);
      setSolutions(solsData);
      setComments(commsData);
    } catch (err) {
      console.error("Failed to load post details:", err);
    }
  };

  const handleAddRootComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !newCommentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      await addComment({
        postId: post.id,
        content: newCommentText,
      });
      setNewCommentText("");
      const updatedComms = await fetchComments(post.id);
      setComments(updatedComms);
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleAddReply = async (postId: string, parentId: string, content: string) => {
    await addComment({ postId, parentId, content });
    const updatedComms = await fetchComments(postId);
    setComments(updatedComms);
  };

  if (!post) return null;

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "recently";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-2xl rounded-2xl w-full max-w-3xl h-[88vh] sm:h-[85vh] max-h-[92dvh] flex flex-col overflow-hidden relative">
        <div className="p-3.5 sm:p-5 border-b border-[var(--surface-border)] flex flex-col gap-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold text-orange-500 bg-[var(--primary-soft)] rounded-full border border-orange-500/20">
                {post.category}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-medium text-[var(--muted-foreground)] bg-[var(--background)] rounded-full border border-[var(--surface-border)]">
                {post.difficulty}
              </span>
              {post.status === "solved" && (
                <span className="flex items-center gap-x-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="size-3.5" /> Solved
                </span>
              )}
            </div>

            <div className="flex items-center gap-x-2">
              {(post.author?.id === "current-user" || post.author?.username === "you") && onDelete ? (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this problem statement? This action cannot be undone.")) {
                      onDelete(post.id);
                      onClose();
                    }
                  }}
                  title="Delete post"
                  className="p-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded-lg border border-red-500/20 cursor-pointer"
                >
                  Delete Post
                </button>
              ) : null}
              <button
                onClick={onClose}
                className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <h2 className="text-base sm:text-xl font-bold text-[var(--foreground)] leading-snug">
            {post.title}
          </h2>

          <div className="flex items-center gap-x-2 text-xs text-[var(--muted-foreground)]">
            <Avatar className="size-5 border border-[var(--surface-border)]">
              <AvatarImage src={post.author?.avatarUrl} alt={post.author?.username} />
              <AvatarFallback className="text-[9px]">{post.author?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[var(--foreground)]">@{post.author?.username}</span>
            <span>•</span>
            <span>Posted {timeAgo}</span>
          </div>

          <div className="flex items-center gap-x-1 mt-1 sm:mt-2 p-1 bg-[var(--background)] border border-[var(--surface-border)] rounded-xl">
            <button
              onClick={() => setActiveTab("problem")}
              className={`flex-1 py-1.5 px-2 sm:px-3 text-[11px] sm:text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
                activeTab === "problem"
                  ? "bg-[var(--surface)] text-orange-500 shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Problem<span className="hidden sm:inline"> Statement</span>
            </button>

            <button
              onClick={() => setActiveTab("solutions")}
              className={`flex-1 py-1.5 px-2 sm:px-3 text-[11px] sm:text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-x-1 cursor-pointer ${
                activeTab === "solutions"
                  ? "bg-[var(--surface)] text-orange-500 shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <Code2 className="size-3.5 shrink-0" />
              <span>Solutions ({solutions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("discussion")}
              className={`flex-1 py-1.5 px-2 sm:px-3 text-[11px] sm:text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-x-1 cursor-pointer ${
                activeTab === "discussion"
                  ? "bg-[var(--surface)] text-orange-500 shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <MessageSquare className="size-3.5 shrink-0" />
              <span>Discussion<span className="hidden sm:inline"> & Replies</span> ({comments.length})</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "problem" && (
            <div className="flex flex-col gap-y-4">
              <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--foreground)] leading-relaxed bg-[var(--background)] p-4 rounded-xl border border-[var(--surface-border)] whitespace-pre-line">
                {post.problemStatement}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onOpenSubmitSolution(post)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl flex items-center gap-x-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "solutions" && (
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--surface-border)]">
                <span className="text-xs font-semibold text-[var(--foreground)]">
                  Community Solutions ({solutions.length})
                </span>
                <button
                  onClick={() => onOpenSubmitSolution(post)}
                  className="px-3 py-1.5 text-xs font-semibold text-orange-500 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center gap-x-1 transition-colors cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>

              {solutions.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center gap-y-2">
                  <Code2 className="size-10 text-[var(--muted-foreground)] opacity-40" />
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">No solutions submitted yet.</p>
                  <p className="text-[11px] text-[var(--muted-foreground)] max-w-xs">Be the first developer to build and submit a solution for this problem statement!</p>
                </div>
              ) : (
                solutions.map((sol) => <SolutionCard key={sol.id} solution={sol} />)
              )}
            </div>
          )}

          {activeTab === "discussion" && (
            <div className="flex flex-col gap-y-4">
              <form onSubmit={handleAddRootComment} className="flex gap-x-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Ask a question or add a discussion point..."
                  className="flex-1 bg-[var(--background)] text-xs text-[var(--foreground)] px-4 py-2.5 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={isSubmittingComment || !newCommentText.trim()}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-xl flex items-center gap-x-1.5 transition-colors cursor-pointer"
                >
                  <Send className="size-3.5" />
                  <span>Post</span>
                </button>
              </form>

              {comments.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center gap-y-2">
                  <MessageSquare className="size-10 text-[var(--muted-foreground)] opacity-40" />
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">No discussions yet.</p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">Start the conversation above!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-y-3">
                  {comments.map((comment) => (
                    <CommentThread
                      key={comment.id}
                      comment={comment}
                      postId={post.id}
                      onAddReply={handleAddReply}
                      depth={0}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
