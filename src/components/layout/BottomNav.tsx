import React from "react";
import { PlusCircle, Compass } from "lucide-react";

interface BottomNavProps {
  activeTab: "create" | "explore";
  onTabChange: (tab: "create" | "explore") => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[var(--surface)] border border-[var(--surface-border)] shadow-lg px-2 py-1.5 rounded-full flex items-center gap-x-1 transition-all">
      <div className="relative flex items-center">
        <div
          className={`absolute top-0 bottom-0 w-1/2 bg-[var(--primary-soft)] rounded-full transition-all duration-200 ease-out border border-orange-500/20 ${
            activeTab === "create" ? "left-0" : "left-1/2"
          }`}
        />

        <button
          onClick={() => onTabChange("create")}
          className={`relative z-10 px-5 py-2 text-xs font-semibold rounded-full flex items-center gap-x-2 transition-colors cursor-pointer ${
            activeTab === "create" ? "text-orange-500" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          <PlusCircle className="size-4" />
          <span>Create</span>
        </button>

        <button
          onClick={() => onTabChange("explore")}
          className={`relative z-10 px-5 py-2 text-xs font-semibold rounded-full flex items-center gap-x-2 transition-colors cursor-pointer ${
            activeTab === "explore" ? "text-orange-500" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          <Compass className="size-4" />
          <span>Explore</span>
        </button>
      </div>
    </nav>
  );
};
