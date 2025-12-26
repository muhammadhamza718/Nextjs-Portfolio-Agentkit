"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

function SidebarToggle() {
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  const { isSignedIn } = useUser();

  const isSidebarOpen = isMobile ? openMobile : open;

  if (isSidebarOpen) return null;

  const buttonStyles = `relative w-16 h-16 rounded-full 
    bg-white dark:bg-black
    border-2 border-neutral-200 dark:border-neutral-700
    shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)]
    hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)]
    transition-all duration-300
    hover:scale-105
    flex items-center justify-center
    overflow-hidden`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Animated subtle glow rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

      {/* Sparkle badge */}
      <div className="absolute -top-1 -right-1 z-10">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg flex items-center justify-center animate-bounce [animation-duration:2s]">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
        Chat with My AI Twin
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1 right-6 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-b border-white/40 dark:border-white/20" />
      </div>

      {isSignedIn ? (
        <button
          type="button"
          onClick={toggleSidebar}
          className={buttonStyles}
          aria-label="Chat with AI Twin"
        >
          {/* Pulsing internal glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-500/20 dark:to-purple-500/20 animate-pulse" />

          {/* Letter H */}
          <span className="relative text-4xl font-black bg-gradient-to-br from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent transition-transform group-hover:scale-110">
            H
          </span>
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            type="button"
            className={buttonStyles}
            aria-label="Sign in to chat with AI Twin"
          >
            {/* Pulsing internal glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-500/20 dark:to-purple-500/20 animate-pulse" />

            {/* Letter H */}
            <span className="relative text-4xl font-black bg-gradient-to-br from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent transition-transform group-hover:scale-110">
              H
            </span>
          </button>
        </SignInButton>
      )}
    </div>
  );
}

export default SidebarToggle;
