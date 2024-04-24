"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/utils/cn";
import { Icons } from "@/components/Icons";
import { MobileNav } from "./MobileNav";
import { type Route } from "next";
import { XDevBaseLogo } from "./XDevBaseLogo";
import { buttonVariants } from "@/components/ui/button";

export type NavItem = {
  title: string | React.ReactNode;
  href: Route<string>;
  icon: keyof typeof Icons;
  disabled?: boolean;
  mobileOnly?: boolean;
};

interface MainNavProps {
  items?: NavItem[];
  userLoggedIn: boolean;
  children?: React.ReactNode;
}

export function MainNav({ items, userLoggedIn, children }: MainNavProps) {
  const path = usePathname();
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={userLoggedIn ? "/home" : "/"}
        className="hidden items-center space-x-2 md:flex"
      >
        <XDevBaseLogo />
      </Link>
      {userLoggedIn ? (
        <>
          {items?.length ? (
            <nav className="hidden gap-1 md:flex">
              {items?.map((item, index) => { 
                const Icon = Icons[item.icon || "arrowRight"];
                return (
                <Link
                  key={index}
                  href={item.disabled ? ("#" as Route) : item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${segment || ""}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80",
                    item.mobileOnly && "md:hidden",
                    item.href === path ? "bg-accent" : "transparent"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4"/>
                  {item.title}
                </Link>
               );
              })}
            </nav>
          ) : null}
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.menu />}
            <span className="font-bold">XDevBase</span>
          </button>
          {showMobileMenu && items && (
            <MobileNav items={items}>{children}</MobileNav>
          )}
        </>
      ) : null}
    </div>
  );
}
