"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import type { CHAT_PROFILE_QUERYResult } from "@/sanity.types";
import { useSidebar } from "../ui/sidebar";
import { useTheme } from "next-themes";
import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";

/**
 * 🚀 OFFICIAL CHATKIT INTEGRATION
 *
 * Reverted to the official React hooks for better state management.
 * Fixed "Invalid Input" by using the official dev domain key.
 */

function ChatComponent({
  profile,
}: {
  profile: CHAT_PROFILE_QUERYResult | null;
}) {
  const { toggleSidebar } = useSidebar();
  const { resolvedTheme, theme: activeTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark" || activeTheme === "dark";

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Stabilize options to prevent re-initialization loops
  const chatkitOptions = useMemo(
    () => ({
      api: {
        url: `${backendUrl}/chatkit`,
        domainKey: "domain_pk_localhost_dev", // �️ Official dev fallback
      },
      header: {
        title: {
          text: profile?.firstName
            ? `${profile.firstName}'s AI Twin`
            : "Portfolio Assistant",
        },
        leftAction: {
          icon: "close",
          onClick: toggleSidebar,
        },
      },
      theme: {
        color: {
          grayscale: { hue: 220, tint: 1, shade: isDark ? -1 : -4 },
          accent: { primary: "#3b82f6", level: 1 },
        },
        radius: "soft",
      },
      startScreen: {
        greeting: `Hello! I'm ${profile?.firstName || "John"}. How can I help you today?`,
        prompts: [
          {
            icon: "suitcase",
            label: "Work",
            prompt: "Tell me about your tech background",
          },
          {
            icon: "square-code",
            label: "Skills",
            prompt: "What technologies do you specialize in?",
          },
          {
            icon: "cube",
            label: "Projects",
            prompt: "Show me your top-rated projects",
          },
        ],
      },
    }),
    [backendUrl, isDark, profile, toggleSidebar]
  );

  const { control } = useChatKit(chatkitOptions as any);

  if (!mounted) return null;

  return (
    <div 
      className="flex-1 flex flex-col w-full h-full min-h-0 bg-background border-l relative overflow-hidden"
      suppressHydrationWarning
    >
      {/* Container MUST have height for ChatKit to render internally */}
      <div className="flex-1 h-full w-full">
        <ChatKit control={control} className="h-full w-full block" />
      </div>

      {/* Visual Identity Overlay (Optional) */}
      <div className="absolute top-3 right-12 z-10 pointer-events-none opacity-20 hidden md:block">
        <span className="text-[7px] font-mono tracking-[0.3em] uppercase">
          Twin Interface v2.0
        </span>
      </div>
    </div>
  );
}

// Ensure no SSR to avoid hydration mismatches with the ChatKit engine
const Chat = dynamic(() => Promise.resolve(ChatComponent), { ssr: false });

export default Chat;
