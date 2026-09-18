import { useState, useEffect, useCallback } from "react";
import { useAuth, useUser } from "@clerk/react";
import Header from "@/components/ownui/Header";
import { CategoryFilter } from "@/components/post/CategoryFilter";
import { PostCard } from "@/components/post/PostCard";
import { PostDetailModal } from "@/components/post/PostDetailModal";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { SubmitSolutionModal } from "@/components/solution/SubmitSolutionModal";
import { BottomNav } from "@/components/layout/BottomNav";
import { EmptyFeed } from "@/components/ownui/EmptyFeed";
import LandingPage from "@/pages/LandingPage";
import type { Post, Category, CreatePostPayload, SubmitSolutionPayload } from "@/types";
import { fetchPosts, createPost, submitSolution, setAuthToken } from "@/lib/api";
import { Sparkles, Layers } from "lucide-react";

const App = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeBottomNav, setActiveBottomNav] = useState<"create" | "explore">("explore");
  const [selectedPostDetail, setSelectedPostDetail] = useState<Post | null>(null);
  const [selectedPostSolution, setSelectedPostSolution] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  const refreshToken = useCallback(async () => {
    if (!isSignedIn) return;
    try {
      const token = await getToken();
      setAuthToken(token);
    } catch {
      setAuthToken(null);
    }
  }, [isSignedIn, getToken]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      refreshToken().then(() => setIsAppReady(true));
      const interval = setInterval(refreshToken, 50 * 1000);
      return () => clearInterval(interval);
    } else {
      setAuthToken(null);
      setIsAppReady(false);
    }
  }, [isLoaded, isSignedIn, refreshToken]);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(selectedCategory, searchQuery);
      setPosts(data);
    } catch {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (isAppReady) {
      loadPosts();
    }
  }, [isAppReady, loadPosts]);

  const handleCreatePost = async (payload: CreatePostPayload) => {
    await refreshToken();
    const newPost = await createPost(payload);
    setPosts((prev) => [newPost, ...prev]);
    setIsCreateModalOpen(false);
    setActiveBottomNav("explore");
  };

  const handleSubmitSolution = async (payload: SubmitSolutionPayload) => {
    await refreshToken();
    await submitSolution(payload);
    setSelectedPostSolution(null);
    loadPosts();
  };

  const handleBottomNavChange = (tab: "create" | "explore") => {
    setActiveBottomNav(tab);
    if (tab === "create") {
      setIsCreateModalOpen(true);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-y-4">
          <div className="size-10 rounded-2xl bg-orange-500 flex items-center justify-center animate-pulse">
            <Sparkles className="size-5 text-white" />
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">Loading DevSolve…</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <LandingPage onAuthenticated={() => setIsAppReady(true)} />;
  }

  const displayName = user?.firstName || user?.username || "Developer";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center pb-24 font-sans selection:bg-orange-500/20 selection:text-orange-500">
      <div className="w-full max-w-2xl px-3 sm:px-4 pt-3 sm:pt-4 flex flex-col gap-y-4 sm:gap-y-5">

        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCreate={() => setIsCreateModalOpen(true)}
        />

        <div className="bg-[var(--surface)] border border-[var(--surface-border)] shadow-[var(--surface-shadow)] rounded-2xl p-5 flex flex-col gap-y-2 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 size-32 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-x-2 text-xs font-semibold text-orange-500">
            <Sparkles className="size-4" />
            <span>Welcome back, {displayName} 👋</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)] leading-snug">
            What real problem will you solve today?
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Browse community problem statements, submit your solution, and build the portfolio that gets you hired.
          </p>
        </div>

        <div className="flex items-center justify-between gap-x-3">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <section className="flex flex-col gap-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-x-1.5">
              <Layers className="size-3.5 text-orange-500" />
              <span>{selectedCategory === "All" ? "Recommended Problems" : `${selectedCategory} Problems`}</span>
            </h3>
            {posts.length > 0 && (
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                {posts.length} {posts.length === 1 ? "problem" : "problems"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <EmptyFeed
              onCreatePost={() => setIsCreateModalOpen(true)}
              category={selectedCategory}
              searchQuery={searchQuery}
            />
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSelect={(p) => setSelectedPostDetail(p)}
              />
            ))
          )}
        </section>
      </div>

      <BottomNav
        activeTab={activeBottomNav}
        onTabChange={handleBottomNavChange}
      />

      <PostDetailModal
        post={selectedPostDetail}
        onClose={() => setSelectedPostDetail(null)}
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
