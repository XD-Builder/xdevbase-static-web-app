"use client";

import React from "react";
import { UserAccountNav } from "./molecules/UserAccountNav";
import { MainNav, type NavItem } from "./molecules/MainNav";
import { cn } from "@/utils/cn";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { useUser } from "@/providers/AuthProvider/AuthProvider";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";
import { useTranslation } from "react-i18next";
import { TranslatedText } from "../TranslatedText";
import { ModeToggle } from "./molecules/ModeToggle";

const navbarItems: NavItem[] = [
  {
    title: <TranslatedText id="navbar.inbox"></TranslatedText>,
    href: "/inbox",
  },
  {
    title: <TranslatedText id="navbar.properties"></TranslatedText>,
    href: "/properties",
  },
  {
    title: <TranslatedText id="navbar.automation"></TranslatedText>,
    href: "/automation",
  },
  {
    title: <TranslatedText id="navbar.marketplace"></TranslatedText>,
    href: "/marketplace",
  }
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
                "px-4",
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
