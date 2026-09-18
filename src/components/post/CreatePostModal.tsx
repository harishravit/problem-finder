import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import type { Category, Difficulty, CreatePostPayload } from "../../types";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreatePostPayload) => Promise<void>;
}

const CATEGORIES: Category[] = [
  "Web Dev",
  "Mobile",
  "AI/ML",
  "DevOps",
  "Data Science",
  "Cyber Security",
];

const DIFFICULTIES: Difficulty[] = ["Beginner", "Medium", "Advanced"];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Web Dev");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [problemStatement, setProblemStatement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (problemStatement.trim().length < 15) {
      setError("Please provide a detailed problem statement (at least 15 characters).");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit({
        title,
        category,
        difficulty,
        problemStatement,
      });
      setTitle("");
      setProblemStatement("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create problem statement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-2xl rounded-2xl w-full max-w-xl max-h-[92dvh] overflow-y-auto p-4 sm:p-6 relative">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[var(--surface-border)]">
          <div className="flex items-center gap-x-2">
            <div className="size-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[var(--foreground)]">Post a Problem Statement</h2>
              <p className="text-[11px] sm:text-xs text-[var(--muted-foreground)]">
                Challenge developers to build solutions for portfolio projects
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3 sm:mt-4 flex flex-col gap-y-3 sm:gap-y-4">
          {error && (
            <div className="p-3 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              Project Title <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI-Driven Resume Analyzer & Keyword Matcher"
              className="w-full bg-[var(--background)] text-xs text-[var(--foreground)] px-3 py-2.5 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-[var(--background)] text-xs text-[var(--foreground)] px-3 py-2.5 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full bg-[var(--background)] text-xs text-[var(--foreground)] px-3 py-2.5 rounded-xl border border-[var(--surface-border)] focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
              Problem Statement & Specifications <span className="text-orange-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe the real-world friction point, expected features, user stories, and target output..."
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
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
