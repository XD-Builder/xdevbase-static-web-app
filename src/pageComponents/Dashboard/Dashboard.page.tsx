"use client";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { DashboardHeader } from "./molecules/Header";
import { DashboardShell } from "./molecules/Shell";
import { api } from "@/trpc/react";
import { LoadingScreen } from "@/components/Loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  const { t } = useTranslation();

  if (false) return <LoadingScreen />;

  return  <>
    <main className="flex w-full flex-1 flex-col overflow-hidden">
      <DashboardShell>
        <DashboardHeader
          heading={t("dashboard.title")}
          text={t("dashboard.headingText")}
        >
          <Link href="/menu/create">
            <Button className="w-full" variant="outline">
              {t("dashboard.createMenu")}
            </Button>
          </Link>
        </DashboardHeader>
        <div>
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="menu" />
              <EmptyPlaceholder.Title>
                {t("dashboard.noMenusCreated")}
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                {t("dashboard.noMenusCreatedDescription")}
              </EmptyPlaceholder.Description>
              <Link href="/menu/create">
                <Button variant="outline">{t("dashboard.createMenu")}</Button>
              </Link>
            </EmptyPlaceholder>
        </div>
      </DashboardShell>
    </main>
  </>;
}
