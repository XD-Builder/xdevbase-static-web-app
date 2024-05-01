"use client";
import React from "react";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";

/**
 * The properties page allows the user to view properties.
 */
export function Properties() {
  const { t } = useTranslation();

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="home" />
      <EmptyPlaceholder.Title>
        {t("propertiesPage.propertiesListEmpty")}
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        {t("propertiesPage.propertiesListEmptyDescription")}
      </EmptyPlaceholder.Description>
      <Link href="/properties/create">
        <Button variant="outline">{t("propertiesPage.createProperties")}</Button>
      </Link>
    </EmptyPlaceholder>
  );
}
