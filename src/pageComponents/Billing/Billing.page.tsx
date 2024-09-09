import { useServerTranslation } from "@/i18n";
import { DashboardHeader } from "@/pageComponents/Dashboard/molecules/Header";
import { DashboardShell } from "@/pageComponents/Dashboard/molecules/Shell";

import { BillingForm } from "./molecules/BillingForm";

export const BillingPage = async () => {
  const { t } = await useServerTranslation();

  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("billing.heading")}
        text={t("billing.description")}
      />
      <BillingForm />
    </DashboardShell>
  );
};
