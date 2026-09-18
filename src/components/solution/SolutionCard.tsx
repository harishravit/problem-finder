import React, { useState } from "react";
import type { Solution } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitBranch, ExternalLink, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SolutionCardProps {
  solution: Solution;
  onUpvote?: (solutionId: string) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onUpvote }) => {
  const [upvotes, setUpvotes] = useState(solution.upvotesCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((prev) => Math.max(0, prev - 1));
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
    if (onUpvote) onUpvote(solution.id);
  };

  const timeAgo = solution.createdAt
    ? formatDistanceToNow(new Date(solution.createdAt), { addSuffix: true })
    : "recently";

  return (
    <div className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-[var(--surface-shadow)] rounded-xl p-4 sm:p-5 flex flex-col gap-y-3">
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex items-center gap-x-3">
          <Avatar className="size-9 border border-[var(--surface-border)]">
            <AvatarImage src={solution.author?.avatarUrl} alt={solution.author?.username} />
            <AvatarFallback className="bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-bold">
              {solution.author?.username?.slice(0, 2).toUpperCase() || "S"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-x-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {solution.author?.fullName || solution.author?.username}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                @{solution.author?.username}
              </span>
            </div>
            <span className="text-[11px] text-[var(--muted-foreground)]">Submitted {timeAgo}</span>
          </div>
        </div>

        <button
          onClick={handleUpvote}
          className={`flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
            hasUpvoted
              ? "bg-orange-500/10 text-orange-500 border-orange-500/30"
              : "border-[var(--surface-border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          <ThumbsUp className={`size-3.5 ${hasUpvoted ? "fill-orange-500" : ""}`} />
          <span>{upvotes} Upvotes</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line bg-[var(--background)] p-3 rounded-lg border border-[var(--surface-border)]">
        {solution.writeup}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <a
          href={solution.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-x-1.5 px-3 py-1.5 bg-[var(--background)] hover:bg-[var(--surface-border)] text-xs font-semibold text-[var(--foreground)] rounded-lg border border-[var(--surface-border)] transition-colors"
        >
          <GitBranch className="size-3.5 text-orange-500" />
          <span>GitHub Repo</span>
        </a>

        {solution.liveDemoLink && (
          <a
            href={solution.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1.5 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-xs font-semibold text-orange-500 rounded-lg border border-orange-500/30 transition-colors"
          >
            <ExternalLink className="size-3.5" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};
