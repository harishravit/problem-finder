import { SignInButton, SignUpButton, useUser } from "@clerk/react";
import { useEffect } from "react";

interface LandingPageProps {
  onAuthenticated: () => void;
}

const LandingPage = ({ onAuthenticated }: LandingPageProps) => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      onAuthenticated();
    }
  }, [isSignedIn, onAuthenticated]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] flex flex-col">

      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-[var(--surface-border)] bg-[var(--surface)] sticky top-0 z-40">
        <div className="flex items-center gap-x-2.5">
          <div className="size-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">DevSolve</span>
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <SignInButton mode="modal">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[var(--foreground)] border border-[var(--surface-border)] rounded-xl hover:bg-[var(--background)] transition-all cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all cursor-pointer shadow-sm">
              Get Started Free
            </button>
          </SignUpButton>
        </div>
      </header>

      <main className="flex-1 flex flex-col">

        <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 size-64 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 size-48 bg-orange-500/8 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-orange-500/3 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl flex flex-col items-center gap-y-6">
            <div className="flex items-center gap-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>LeetCode for Real-World Projects</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.12]">
              Stop Building{" "}
              <span className="text-orange-500">Tutorial Projects.</span>
              <br />
              Start Solving{" "}
              <span className="relative inline-block">
                Real Problems.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M2 6C40 2 80 1 100 2C120 3 160 6 198 4" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                </svg>
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
              DevSolve gives you structured, community-sourced problem statements from real developer pain points.
              Pick a problem, build a solution, get community feedback, and add it to your portfolio — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <SignUpButton mode="modal">
                <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-2xl transition-all cursor-pointer shadow-lg shadow-orange-500/25 flex items-center gap-x-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Get Started — It's Free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] border border-[var(--surface-border)] bg-[var(--surface)] hover:bg-[var(--background)] rounded-2xl transition-all cursor-pointer flex items-center gap-x-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  I Already Have an Account
                </button>
              </SignInButton>
            </div>

            <div className="flex items-center gap-x-6 text-xs text-[var(--muted-foreground)] mt-1">
              <span className="flex items-center gap-x-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-x-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Free forever for developers
              </span>
              <span className="hidden sm:flex items-center gap-x-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Open community
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 bg-[var(--surface)] border-t border-[var(--surface-border)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Why DevSolve?</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] leading-tight">
                Every developer hits the same wall.
              </h2>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
                Portfolio projects are the difference between getting hired and getting ghosted. But finding real, structured problems to build — ones that impress recruiters — is harder than it looks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
              <div className="bg-[var(--background)] border border-[var(--surface-border)] rounded-2xl p-5 flex flex-col gap-y-3">
                <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)]">Reddit & Stack Overflow are vague</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  "What should I build next?" threads give you 50 suggestions with no context, no scope, and no success criteria. You spend more time choosing than building.
                </p>
              </div>

              <div className="bg-[var(--background)] border border-[var(--surface-border)] rounded-2xl p-5 flex flex-col gap-y-3">
                <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)]">Tutorial projects are invisible</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Another todo app or Netflix clone won't move the needle. Recruiters see thousands of them. Without a clear problem statement behind it, your project has no story.
                </p>
              </div>

              <div className="bg-[var(--background)] border border-[var(--surface-border)] rounded-2xl p-5 flex flex-col gap-y-3">
                <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 15h8" />
                    <path d="M9 9h1" />
                    <path d="M15 9h1" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)]">No feedback loop</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  You build in isolation. No one validates whether your solution is complete, well-architected, or industry-relevant. You're guessing the whole time.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/8 to-orange-500/4 border border-orange-500/20 rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-x-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-500 text-xs font-bold mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  DevSolve solves this
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">
                  The structured way to build portfolio-worthy projects
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex gap-x-3.5 items-start">
                  <div className="size-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">Curated problem statements</h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">Real friction points sourced from the developer community — with scope, success criteria, and difficulty labels so you know exactly what you're building.</p>
                  </div>
                </div>

                <div className="flex gap-x-3.5 items-start">
                  <div className="size-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">Community upvotes validate your work</h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">Submit your solution and get upvotes, code reviews, and feedback from other developers. Proof that your work solves a real problem — not just a tutorial.</p>
                  </div>
                </div>

                <div className="flex gap-x-3.5 items-start">
                  <div className="size-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">Categorized by domain</h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">Web Dev, AI/ML, Mobile, DevOps, Data Science, Cyber Security — filter by the area you're targeting to grow your skills where it counts most.</p>
                  </div>
                </div>

                <div className="flex gap-x-3.5 items-start">
                  <div className="size-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">Post problems you care about</h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">Spotted a real pain point? Post it. The community will build solutions, and you'll get credit for uncovering the problem — building your reputation as a thought leader.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 px-4 text-center bg-[var(--background)]">
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-y-6">
            <div className="size-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/30 mb-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] leading-tight">
              Your next great project<br />is one problem statement away.
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Join developers who stopped wasting time on vague project ideas and started building work that actually matters.
            </p>
            <SignUpButton mode="modal">
              <button className="mt-2 px-8 py-4 text-base font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 rounded-2xl transition-all cursor-pointer shadow-xl shadow-orange-500/25 flex items-center gap-x-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Start Building — Free Forever
              </button>
            </SignUpButton>
          </div>
        </section>

        <footer className="py-6 px-4 border-t border-[var(--surface-border)] text-center">
          <p className="text-xs text-[var(--muted-foreground)]">
            © 2026 DevSolve · Built by developers, for developers
          </p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
