"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { urlFor } from "@/sanity/lib/image";
import { ProfileImage } from "./ProfileImage";
import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "@/components/ui/background-paths";

interface HeroSectionClientProps {
  profile: any;
}

export function HeroSectionClient({ profile }: HeroSectionClientProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const words = fullName.split(" ");

  return (
    <section id="home" className="relative">
      <BackgroundPaths className="min-h-screen py-20 px-6">
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="@container">
            <div className="grid grid-cols-1 @3xl:grid-cols-[1.2fr_0.8fr] gap-8 @lg:gap-12 items-center">
              {/* Text Content */}
              <div className="@container/hero space-y-4 @md/hero:space-y-6">
                <h1 className="text-3xl @md/hero:text-5xl @lg/hero:text-6xl @2xl/hero:text-7xl font-bold tracking-tighter whitespace-nowrap">
                  {words.map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="inline-block mr-3 md:mr-5 last:mr-0"
                    >
                      {word.split("").map((letter, letterIndex) => (
                        <motion.span
                          key={`${wordIndex}-${letterIndex}`}
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: wordIndex * 0.1 + letterIndex * 0.03,
                            type: "spring",
                            stiffness: 150,
                            damping: 25,
                          }}
                          className="inline-block text-transparent bg-clip-text 
                          bg-linear-to-r from-neutral-900 to-neutral-700/80 
                          dark:from-white dark:to-white/80"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </h1>

                {profile.headlineStaticText &&
                profile.headlineAnimatedWords &&
                profile.headlineAnimatedWords.length > 0 ? (
                  <LayoutTextFlip
                    text={profile.headlineStaticText}
                    words={profile.headlineAnimatedWords}
                    duration={profile.headlineAnimationDuration || 3000}
                    className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium"
                  />
                ) : (
                  <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium">
                    {profile.headline}
                  </p>
                )}
                <p className="text-base @md/hero:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {profile.shortBio}
                </p>

                {profile.socialLinks && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {Object.entries(profile.socialLinks).map(([key, url]) => {
                      if (!url || typeof url !== "string") return null;
                      if (key === "website" || key === "_type") return null;

                      const labelMapping: Record<string, string> = {
                        github: "GitHub",
                        linkedin: "LinkedIn",
                        twitter: "Twitter",
                        x: "X",
                      };
                      const label =
                        labelMapping[key.toLowerCase()] ||
                        key.charAt(0).toUpperCase() + key.slice(1);

                      return (
                        <div
                          key={key}
                          className="inline-block group relative bg-linear-to-b from-black/10 to-white/10 
                          dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                          overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              className="rounded-[1.15rem] px-6 py-4 text-sm font-semibold backdrop-blur-md 
                              bg-white/95 hover:bg-white dark:bg-black/95 dark:hover:bg-black 
                              text-black dark:text-white transition-all duration-300 
                              group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                              hover:shadow-md dark:hover:shadow-neutral-800/50 h-auto"
                            >
                              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                {label}
                              </span>
                              <span
                                className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 
                                transition-all duration-300"
                              >
                                →
                              </span>
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 @md/hero:gap-6 pt-4 text-xs @md/hero:text-sm text-muted-foreground">
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span className="truncate">{profile.email}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.availability && (
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      <span>{profile.availability}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Image */}
              {profile.profileImage && (
                <ProfileImage
                  imageUrl={urlFor(profile.profileImage)
                    .width(600)
                    .height(600)
                    .url()}
                  firstName={profile.firstName || ""}
                  lastName={profile.lastName || ""}
                />
              )}
            </div>
          </div>
        </div>
      </BackgroundPaths>
    </section>
  );
}
