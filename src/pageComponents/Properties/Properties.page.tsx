"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

/**
 * The properties page allows the user to view properties.
 */
export function Properties() {
  const { t } = useTranslation();
  const { data } = api.properties.getAllProperties.useQuery();

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
        <Button variant="outline">
          {t("propertiesPage.createProperties")}
        </Button>
      </Link>
      <div>
        {data &&
          data.map((property) => (
            <div key={property.id}>
              <h1>{property.name}</h1>
              <p>{property.description}</p>
              <p>{property.fullAddress}</p>
              <img src={property.imageUrls[0]} />
              <img src={property.imageUrls[1]} />
            </div>
          ))}
      </div>
    </EmptyPlaceholder>
  );
}
