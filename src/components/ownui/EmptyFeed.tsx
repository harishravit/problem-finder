interface EmptyFeedProps {
  onCreatePost: () => void;
  category: string;
  searchQuery: string;
}

const EmptyFeedIllustration = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="140" height="90" rx="12" fill="var(--surface)" stroke="var(--surface-border)" strokeWidth="1.5" />
    <rect x="34" y="48" width="80" height="8" rx="4" fill="var(--surface-border)" />
    <rect x="34" y="62" width="112" height="5" rx="2.5" fill="var(--surface-border)" opacity="0.7" />
    <rect x="34" y="73" width="96" height="5" rx="2.5" fill="var(--surface-border)" opacity="0.5" />
    <rect x="34" y="84" width="60" height="5" rx="2.5" fill="var(--surface-border)" opacity="0.4" />
    <circle cx="146" cy="52" r="16" fill="#f97316" fillOpacity="0.12" />
    <path d="M140 52h12M146 46v12" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="90" cy="20" r="8" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="25" cy="110" r="5" fill="#f97316" fillOpacity="0.1" />
    <circle cx="155" cy="25" r="4" fill="#f97316" fillOpacity="0.1" />
  </svg>
);

const EmptySearchIllustration = () => (
  <svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="60" r="38" fill="var(--surface)" stroke="var(--surface-border)" strokeWidth="1.5" />
    <circle cx="70" cy="60" r="26" fill="var(--background)" stroke="var(--surface-border)" strokeWidth="1.5" />
    <rect x="58" y="55" width="24" height="4" rx="2" fill="var(--surface-border)" opacity="0.7" />
    <rect x="62" y="63" width="16" height="4" rx="2" fill="var(--surface-border)" opacity="0.5" />
    <path d="M100 90 L128 115" stroke="var(--surface-border)" strokeWidth="4" strokeLinecap="round" />
    <path d="M100 90 L128 115" stroke="#f97316" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <line x1="63" y1="48" x2="77" y2="48" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="66" y1="43" x2="74" y2="43" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="35" cy="30" r="4" fill="#f97316" fillOpacity="0.1" />
    <circle cx="140" cy="50" r="5" fill="#f97316" fillOpacity="0.08" />
  </svg>
);

export const EmptyFeed = ({ onCreatePost, category, searchQuery }: EmptyFeedProps) => {
  const isFiltered = searchQuery.trim() !== "" || category !== "All";

  if (isFiltered) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-y-3 my-4">
        <EmptySearchIllustration />
        <h4 className="text-sm font-semibold text-[var(--foreground)]">No matches found</h4>
        <p className="text-xs text-[var(--muted-foreground)] max-w-xs leading-relaxed">
          {searchQuery.trim() !== ""
            ? `No problem statements match "${searchQuery}". Try a different search term.`
            : `No problems in the ${category} category yet. Switch categories or be the first to post one!`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-y-4 my-4">
      <EmptyFeedIllustration />
      <div className="flex flex-col gap-y-1.5">
        <h4 className="text-base font-bold text-[var(--foreground)]">Be the first to post a problem</h4>
        <p className="text-xs text-[var(--muted-foreground)] max-w-xs leading-relaxed">
          The feed is empty — a blank slate. Post a real developer pain point you've experienced and challenge the community to solve it.
        </p>
      </div>
      <div className="flex flex-col items-center gap-y-2 mt-1">
        <button
          onClick={onCreatePost}
          className="px-5 py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/25 flex items-center gap-x-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Post a Problem Statement
        </button>
        <p className="text-[11px] text-[var(--muted-foreground)] opacity-70">It only takes 2 minutes</p>
      </div>
    </div>
  );
};
