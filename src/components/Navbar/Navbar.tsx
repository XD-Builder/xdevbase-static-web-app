"use client";

import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

import { LanguageToggle } from "@/components/LanguageToggle/LanguageToggle";
import { TranslatedText } from "@/components/TranslatedText";
import { buttonVariants } from "@/components/ui/button";
import { useUser } from "@/providers/AuthProvider/AuthProvider";
import { cn } from "@/utils/cn";

import { MainNav, type NavItem } from "./molecules/MainNav";
import { ModeToggle } from "./molecules/ModeToggle";
import { UserAccountNav } from "./molecules/UserAccountNav";

const navbarItems: NavItem[] = [
  {
    title: <TranslatedText id="navbar.inbox"></TranslatedText>,
    href: "/inbox",
    icon: "message",
  },
  {
    title: <TranslatedText id="navbar.properties"></TranslatedText>,
    href: "/properties",
    icon: "home",
  },
  {
    title: <TranslatedText id="navbar.automation"></TranslatedText>,
    href: "/automation",
    icon: "workflow",
  },
  {
    title: <TranslatedText id="navbar.marketplace"></TranslatedText>,
    href: "/marketplace",
    icon: "store",
  },
];

/**
 * Navigation bar with the user information
 */
export const Navbar = () => {
  const { user } = useUser();
  // log something
  const userLoggedIn = !!user;
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={navbarItems} userLoggedIn={userLoggedIn} />
        <div className="flex items-center justify-center gap-4">
          <LanguageToggle />
          <ModeToggle />
          {userLoggedIn ? (
            <UserAccountNav />
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "premium", size: "sm" }),
                "px-4"
              )}
            >
              {t("navbar.login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
