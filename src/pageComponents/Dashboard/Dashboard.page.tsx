"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { Button } from "@/components/ui/button";

import { DashboardHeader } from "./molecules/Header";
import { DashboardShell } from "./molecules/Shell";

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <DashboardShell>
          <DashboardHeader
            heading={t("dashboard.title")}
            text={t("dashboard.headingText")}
          >
            <Link href="/menu/create">
              <Button className="w-full" variant="outline">
                {t("dashboard.createDashboard")}
              </Button>
            </Link>
          </DashboardHeader>
          <div>
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="menu" />
              <EmptyPlaceholder.Title>
                {t("dashboard.noDashboardCreated")}
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                {t("dashboard.noDashboardCreatedDescription")}
              </EmptyPlaceholder.Description>
              <Link href="/menu/create">
                <Button variant="outline">
                  {t("dashboard.createDashboard")}
                </Button>
              </Link>
            </EmptyPlaceholder>
          </div>
        </DashboardShell>
      </main>
    </>
  );
}
