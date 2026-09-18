import React, { useState } from "react";
import type { Comment } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommentThreadProps {
  comment: Comment;
  postId: string;
  onAddReply: (postId: string, parentId: string, content: string) => Promise<void>;
  depth?: number;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  comment,
  postId,
  onAddReply,
  depth = 0,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvotesCount || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => Math.max(0, prev - 1));
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddReply(postId, comment.id, replyText);
      setReplyText("");
      setShowReplyForm(false);
    } catch (err) {
      console.error("Failed to submit reply:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChildren = comment.children && comment.children.length > 0;
  const timeAgo = comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "recently";

  return (
    <div className={`relative flex flex-col gap-y-3 ${depth > 0 ? "ml-4 sm:ml-7 border-l-2 border-[var(--surface-border)] pl-3 sm:pl-4 mt-2" : "mt-4"}`}>
      <div className="flex gap-x-3 items-start group">
        <Avatar className="size-8 border border-[var(--surface-border)] shrink-0">
          <AvatarImage src={comment.author?.avatarUrl} alt={comment.author?.username} />
          <AvatarFallback className="bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-medium">
            {comment.author?.username?.slice(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl p-3.5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="flex items-center justify-between gap-x-2 mb-1.5">
            <div className="flex items-center gap-x-2">
              <span className="text-xs font-semibold text-[var(--foreground)]">
                {comment.author?.fullName || comment.author?.username || "Anonymous"}
              </span>
              <span className="text-[11px] text-[var(--muted-foreground)]">
                @{comment.author?.username}
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)] font-light">• {timeAgo}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line mb-3">
            {comment.content}
          </p>

          <div className="flex items-center gap-x-4 text-xs text-[var(--muted-foreground)]">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-x-1 transition-colors hover:text-orange-500 cursor-pointer ${
                hasUpvoted ? "text-orange-500 font-semibold" : ""
              }`}
            >
              <ThumbsUp className={`size-3.5 ${hasUpvoted ? "fill-orange-500" : ""}`} />
              <span>{upvotes}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-x-1 hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <MessageSquare className="size-3.5" />
              <span>Reply</span>
            </button>
          </div>

          {showReplyForm && (
            <form onSubmit={handleSubmitReply} className="mt-3 pt-3 border-t border-[var(--surface-border)] flex gap-x-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Replying to @${comment.author?.username}...`}
                className="flex-1 bg-[var(--background)] text-xs text-[var(--foreground)] px-3 py-2 rounded-lg border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
                autoFocus
              />
              <button
                type="submit"
                disabled={isSubmitting || !replyText.trim()}
                className="px-3 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg flex items-center gap-x-1 transition-colors cursor-pointer"
              >
                <Send className="size-3" />
                <span>Send</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {hasChildren && (
        <div className="flex flex-col gap-y-2">
          {comment.children!.map((child) => (
            <CommentThread
              key={child.id}
              comment={child}
              postId={postId}
              onAddReply={onAddReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
