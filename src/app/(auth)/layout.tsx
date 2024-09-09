"use client";

import Link from "next/link";
import { type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { Icons } from "@/components/Icons";
import { Navbar } from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { withPublicRoute } from "@/providers/AuthProvider/withPublicRoute";

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="container relative flex h-full w-full grow-1/2 flex-col items-center justify-center">
        <Link href="/">
          <Button
            variant="ghost"
            className="absolute left-4 top-4 md:left-8 md:top-8"
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              {t("common.backButton")}
            </>
          </Button>
        </Link>
        {children}
      </div>
    </>
  );
};

export default withPublicRoute(Layout);
