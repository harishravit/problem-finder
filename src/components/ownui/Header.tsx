import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Input } from "@/components/ui/input";
import { Bell, Search, Sparkles } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCreate: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-2 sm:top-3 z-40 w-full bg-[var(--surface)] border border-[var(--surface-border)] shadow-[var(--surface-shadow)] px-3.5 sm:px-5 py-3 rounded-2xl transition-all">
      <div className="flex items-center justify-between gap-x-3 w-full">
        <div className="flex items-center gap-x-2 cursor-pointer shrink-0" onClick={() => window.location.reload()}>
          <div className="size-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
            <Sparkles className="size-4 sm:size-5 text-orange-500" />
          </div>
          <h1 className="text-lg sm:text-xl text-[var(--foreground)] font-bold tracking-tight">DevSolve</h1>
        </div>

        <div className="hidden sm:flex relative flex-1 max-w-xs md:max-w-md mx-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--muted-foreground)]" />
          <Input
            className="bg-[var(--background)] text-xs sm:text-sm text-[var(--foreground)] pl-10 pr-4 py-2 rounded-xl border border-[var(--surface-border)] placeholder:text-[var(--muted-foreground)] focus-visible:ring-2 focus-visible:ring-orange-500 w-full"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search problem statements..."
          />
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-3 shrink-0">
          <div className="relative p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer">
            <span className="absolute top-1 right-1 size-2 bg-orange-500 rounded-full"></span>
            <Bell className="size-4 sm:size-5" />
          </div>

          <div className="flex items-center">
            <Show when="signed-out">
              <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                <SignInButton mode="modal">
                  <button className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--background)] rounded-xl transition-all cursor-pointer border border-[var(--surface-border)]">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all cursor-pointer shadow-xs">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton appearance={{
                elements: {
                  avatarBox: "size-8 sm:size-9 border border-[var(--surface-border)] shadow-xs hover:opacity-90 transition-opacity"
                }
              }} />
            </Show>
          </div>
        </div>
      </div>

      <div className="sm:hidden relative w-full mt-2.5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[var(--muted-foreground)]" />
        <Input
          className="bg-[var(--background)] text-xs text-[var(--foreground)] pl-9 pr-3 py-1.5 rounded-xl border border-[var(--surface-border)] placeholder:text-[var(--muted-foreground)] focus-visible:ring-2 focus-visible:ring-orange-500 w-full"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search problem statements..."
        />
      </div>
    </header>
  );
};

export default Header;
