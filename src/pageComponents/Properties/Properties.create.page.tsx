"use client";
import React from "react";
import { AddressForm } from "./molecules/AddressForm";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * The properties page allows the user to view properties.
 */
export function PropertiesCreate() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("propertiesPage.createProperties")}</CardTitle>
        <CardDescription>{t("propertiesPage.enterAddress")}</CardDescription>
      </CardHeader>
      <CardContent>
        <AddressForm />
      </CardContent>
    </Card>
  );
}
