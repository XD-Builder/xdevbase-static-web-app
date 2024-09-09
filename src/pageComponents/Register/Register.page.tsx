import React from "react";

import { useServerTranslation } from "@/i18n";

import { UserAuthForm } from "./molecules/UserAuthForm";

export const Register = async () => {
  const { t } = await useServerTranslation();

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("register.title")}
        </h1>
      </div>
      <UserAuthForm />
    </div>
  );
};
