import React, { useState } from "react";
import type { Post } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Code2, ThumbsUp, Bookmark, Share2, CheckCircle2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onSelect: (post: Post) => void;
  onUpvote?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUserId = "current-user",
  onSelect,
  onUpvote,
  onDelete,
}) => {
  const [upvotes, setUpvotes] = useState(post.upvotesCount || 0);
  const [hasUpvoted, setHasUpvoted] = useState(post.upvoted || false);
  const [isSaved, setIsSaved] = useState(post.saved || false);

  // Check if current user is post creator / owner
  const isOwner = post.author?.id === currentUserId || post.author?.username === "you";

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes((prev) => Math.max(0, prev - 1));
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
    if (onUpvote) onUpvote(post.id);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this problem statement? This action cannot be undone.")) {
      if (onDelete) onDelete(post.id);
    }
  };

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "recently";

  const difficultyColor =
    post.difficulty === "Advanced"
      ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
      : post.difficulty === "Beginner"
      ? "bg-green-500/10 text-green-500 border-green-500/20"
      : "bg-blue-500/10 text-blue-500 border-blue-500/20";

  return (
    <div
      onClick={() => onSelect(post)}
      className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-[var(--surface-shadow)] rounded-xl p-5 hover:border-orange-500/40 transition-all cursor-pointer group flex flex-col gap-y-3 relative"
    >
      {/* Top Category Badge & Meta */}
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <span className="px-2.5 py-0.5 text-[11px] font-semibold text-orange-500 bg-[var(--primary-soft)] rounded-full border border-orange-500/20">
            {post.category}
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${difficultyColor}`}>
            {post.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          {post.status === "solved" && (
            <span className="flex items-center gap-x-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="size-3" /> Solved
            </span>
          )}

          {/* Delete Button (VISIBLE ONLY FOR POST CREATOR) */}
          {isOwner && (
            <button
              onClick={handleDelete}
              title="Delete your problem statement"
              className="p-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border border-red-500/20"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Author & Title */}
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2 text-xs text-[var(--muted-foreground)]">
          <Avatar className="size-5 border border-[var(--surface-border)]">
            <AvatarImage src={post.author?.avatarUrl} alt={post.author?.username} />
            <AvatarFallback className="text-[9px]">{post.author?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-[var(--foreground)]">@{post.author?.username}</span>
          {isOwner && (
            <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.2 rounded-md border border-orange-500/20">
              You (Author)
            </span>
          )}
          <span>•</span>
          <span>{timeAgo}</span>
        </div>

        <h3 className="text-base font-semibold text-[var(--foreground)] group-hover:text-orange-500 transition-colors leading-snug">
          {post.title}
        </h3>
      </div>

      {/* Problem Statement Snippet */}
      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
        {post.problemStatement}
      </p>

      {/* Post Actions Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--surface-border)] text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-x-4">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-x-1 hover:text-orange-500 transition-colors cursor-pointer ${
              hasUpvoted ? "text-orange-500 font-semibold" : ""
            }`}
          >
            <ThumbsUp className={`size-4 ${hasUpvoted ? "fill-orange-500" : ""}`} />
            <span>{upvotes}</span>
          </button>

          <div className="flex items-center gap-x-1 hover:text-[var(--foreground)] transition-colors">
            <Code2 className="size-4 text-orange-500" />
            <span>{post.solutionsCount || 0} Solutions</span>
          </div>

          <div className="flex items-center gap-x-1 hover:text-[var(--foreground)] transition-colors">
            <MessageSquare className="size-4" />
            <span>{post.commentsCount || 0} Discussion</span>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <button
            onClick={handleToggleSave}
            className={`hover:text-orange-500 transition-colors cursor-pointer ${
              isSaved ? "text-orange-500" : ""
            }`}
          >
            <Bookmark className={`size-4 ${isSaved ? "fill-orange-500" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(window.location.href);
            }}
            className="hover:text-[var(--foreground)] transition-colors cursor-pointer"
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
