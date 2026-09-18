import React, { useState } from "react";
import { X, Code2, Link } from "lucide-react";
import type { SubmitSolutionPayload } from "../../types";

interface SubmitSolutionModalProps {
  isOpen: boolean;
  postId: string;
  postTitle: string;
  onClose: () => void;
  onSubmit: (payload: SubmitSolutionPayload) => Promise<void>;
}

export const SubmitSolutionModal: React.FC<SubmitSolutionModalProps> = ({
  isOpen,
  postId,
  postTitle,
  onClose,
  onSubmit,
}) => {
  const [repoLink, setRepoLink] = useState("");
  const [liveDemoLink, setLiveDemoLink] = useState("");
  const [writeup, setWriteup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoLink.trim() || !writeup.trim()) {
      setError("Please provide a repository link and a writeup of your solution.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit({
        postId,
        repoLink,
        liveDemoLink: liveDemoLink.trim() ? liveDemoLink : undefined,
        writeup,
      });
      setRepoLink("");
      setLiveDemoLink("");
      setWriteup("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to submit solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl rounded-2xl w-full max-w-xl max-h-[92dvh] overflow-y-auto p-4 sm:p-6 relative">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[var(--surface-border)]">
          <div className="flex items-center gap-x-2 min-w-0">
            <div className="size-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
              <Code2 className="size-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-[var(--foreground)]">Submit Solution</h2>
              <p className="text-[11px] sm:text-xs text-[var(--muted-foreground)] truncate max-w-[200px] sm:max-w-md">
                For: {postTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-y-4">
          {error && (
            <div className="p-3 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              GitHub Repository Link <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--muted-foreground)]" />
              <input
                type="url"
                required
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full bg-[var(--background)] text-xs text-[var(--foreground)] pl-9 pr-3 py-2.5 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              Live Demo URL (Optional)
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--muted-foreground)]" />
              <input
                type="url"
                value={liveDemoLink}
                onChange={(e) => setLiveDemoLink(e.target.value)}
                placeholder="https://your-demo-app.vercel.app"
                className="w-full bg-[var(--background)] text-xs text-[var(--foreground)] pl-9 pr-3 py-2.5 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              Solution Writeup & Architecture Notes <span className="text-orange-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={writeup}
              onChange={(e) => setWriteup(e.target.value)}
              placeholder="Explain your approach, tech stack choices, key algorithms, and instructions to run locally..."
              className="w-full bg-[var(--background)] text-xs text-[var(--foreground)] p-3 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center justify-end gap-x-3 pt-3 border-t border-[var(--surface-border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              {isSubmitting ? "Submitting..." : "Publish Solution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
