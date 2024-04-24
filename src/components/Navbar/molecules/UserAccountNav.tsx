"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/server/supabase/supabaseClient";
import { api } from "@/trpc/react";
import { CircleUser } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export function UserAccountNav() {
  const { data: user } = api.auth.getProfile.useQuery();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          {user?.avatarUrl ? (
            <Avatar>
            <AvatarImage src={user?.avatarUrl} alt="User avatar" />
            <AvatarFallback><CircleUser className="h-5 w-5" /></AvatarFallback>
          </Avatar>
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          {user?.fullName
            ? `Hi, ${user?.fullName}`
            : t("userAccountNav.settings")}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.fullName && <p className="font-medium">{user?.fullName}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">{t("userAccountNav.dashboard")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">{t("userAccountNav.settings")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            void supabase().auth.signOut();
          }}
        >
          {t("userAccountNav.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
