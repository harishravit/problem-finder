import { useState, useEffect } from "react";
import { useUser } from "@clerk/react";
import Header from "@/components/ownui/Header";
import { CategoryFilter } from "@/components/post/CategoryFilter";
import { PostCard } from "@/components/post/PostCard";
import { PostDetailModal } from "@/components/post/PostDetailModal";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { SubmitSolutionModal } from "@/components/solution/SubmitSolutionModal";
import { BottomNav } from "@/components/layout/BottomNav";
import LandingPage from "@/pages/LandingPage";
import type { Post, Category, CreatePostPayload, SubmitSolutionPayload } from "@/types";
import { fetchPosts, createPost, deletePost, submitSolution } from "@/lib/api";
import { Sparkles, Layers, SearchX, UserCheck, Flame } from "lucide-react";

const App = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [feedSection, setFeedSection] = useState<"recommended" | "my-posts">("recommended");
  const [activeBottomNav, setActiveBottomNav] = useState<"create" | "explore">("explore");

  // Modals state
  const [selectedPostDetail, setSelectedPostDetail] = useState<Post | null>(null);
  const [selectedPostSolution, setSelectedPostSolution] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, searchQuery]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(selectedCategory, searchQuery);
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (payload: CreatePostPayload) => {
    const newPost = await createPost(payload);
    setPosts((prev) => [newPost, ...prev]);
    setIsCreateModalOpen(false);
    setFeedSection("my-posts");
    setActiveBottomNav("explore");
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleSubmitSolution = async (payload: SubmitSolutionPayload) => {
    await submitSolution(payload);
    if (selectedPostSolution) {
      setSelectedPostSolution(null);
    }
    loadPosts();
  };

  const handleBottomNavChange = (tab: "create" | "explore") => {
    setActiveBottomNav(tab);
    if (tab === "create") {
      setIsCreateModalOpen(true);
    }
  };

  // Filter posts based on active section
  const filteredPosts = posts.filter((post) => {
    const isMyPost = post.author?.id === "current-user" || post.author?.username === "you";
    if (feedSection === "my-posts") {
      return isMyPost;
    }
    return !isMyPost;
  });

  const myPostsCount = posts.filter((p) => p.author?.id === "current-user" || p.author?.username === "you").length;
  const recommendedCount = posts.length - myPostsCount;

  // While Clerk is initialising, show nothing to avoid flash
  if (!isLoaded) return null;

  // Not signed in → show landing page
  if (!isSignedIn) {
    return <LandingPage onAuthenticated={() => { }} />;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center pb-24 font-sans selection:bg-orange-500/20 selection:text-orange-500">
      {/* Centered App Container */}
      <div className="w-full max-w-2xl px-3.5 sm:px-4 pt-3 sm:pt-4 flex flex-col gap-y-5">

        {/* Sticky Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCreate={() => setIsCreateModalOpen(true)}
        />

        {/* Hero Section Banner */}
        {/* <div className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-[var(--surface-shadow)] rounded-2xl p-4 sm:p-5 flex flex-col gap-y-2 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 size-32 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-x-2 text-xs font-semibold text-orange-500">
            <Sparkles className="size-4" />
            <span>LeetCode for Real-World Project Building</span>
          </div>
          <h2 className="text-base sm:text-xl font-bold tracking-tight text-[var(--foreground)] leading-snug">
            Solve structured problem statements. Build resume-worthy portfolio projects.
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Stop wasting time searching Reddit for project ideas. Pick a categorized problem statement below, build a solution, and get community upvotes.
          </p>
        </div> */}

        {/* Feed Section Selector Tabs (Separate Owner Created vs Recommended Server Posts) */}
        <div className="flex items-center gap-x-2 p-1 bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl shadow-xs">
          <button
            onClick={() => setFeedSection("recommended")}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-x-2 cursor-pointer ${feedSection === "recommended"
                ? "bg-orange-500 text-white shadow-xs"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]"
              }`}
          >
            <Flame className="size-4" />
            <span>Recommended Problems ({recommendedCount})</span>
          </button>

          <button
            onClick={() => setFeedSection("my-posts")}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-x-2 cursor-pointer ${feedSection === "my-posts"
                ? "bg-orange-500 text-white shadow-xs"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]"
              }`}
          >
            <UserCheck className="size-4" />
            <span>My Created Problems ({myPostsCount})</span>
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-between gap-x-3">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Feed Listing */}
        <section className="flex flex-col gap-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-x-1.5">
              <Layers className="size-3.5 text-orange-500" />
              <span>
                {feedSection === "my-posts"
                  ? "Your Problem Statements"
                  : selectedCategory === "All"
                    ? "Recommended Problems"
                    : `${selectedCategory} Problems`}
              </span>
            </h3>
            <span className="text-xs text-[var(--muted-foreground)] font-medium">
              {filteredPosts.length} {filteredPosts.length === 1 ? "problem" : "problems"}
            </span>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-y-3 my-2">
              <SearchX className="size-10 text-[var(--muted-foreground)] opacity-50" />
              <h4 className="text-sm font-semibold text-[var(--foreground)]">
                {feedSection === "my-posts" ? "You haven't posted any problems yet" : "No problem statements found"}
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] max-w-xs">
                {feedSection === "my-posts"
                  ? "Create a problem statement to challenge other developers and manage your posts here."
                  : "No problem statements match your category filter or search query. Be the first to create one!"}
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors cursor-pointer"
              >
                + Post a Problem Statement
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSelect={(p) => setSelectedPostDetail(p)}
                onDelete={handleDeletePost}
              />
            ))
          )}
        </section>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav
        activeTab={activeBottomNav}
        onTabChange={handleBottomNavChange}
      />

      {/* Modals */}
      <PostDetailModal
        post={selectedPostDetail}
        onClose={() => setSelectedPostDetail(null)}
        onDelete={handleDeletePost}
        onOpenSubmitSolution={(post) => {
          setSelectedPostDetail(null);
          setSelectedPostSolution(post);
        }}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setActiveBottomNav("explore");
        }}
        onSubmit={handleCreatePost}
      />

      {selectedPostSolution && (
        <SubmitSolutionModal
          isOpen={!!selectedPostSolution}
          postId={selectedPostSolution.id}
          postTitle={selectedPostSolution.title}
          onClose={() => setSelectedPostSolution(null)}
          onSubmit={handleSubmitSolution}
        />
      )}
    </div>
  );
};

export default App;
