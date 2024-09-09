import { useServerTranslation } from "@/i18n";
import { DashboardHeader } from "@/pageComponents/Dashboard/molecules/Header";
import { DashboardShell } from "@/pageComponents/Dashboard/molecules/Shell";

import { ResetPasswordSettingsForm } from "./molecules/ResetPasswordSettingsForm";

export const AccountPage = async () => {
  const { t } = await useServerTranslation();

  return (
    <DashboardShell className="flex-1">
      <DashboardHeader
        heading={t("dashboardSidenav.settings")}
        text={t("settingsPage.headerDescription")}
      />
      <div className="flex justify-center">
        <ResetPasswordSettingsForm></ResetPasswordSettingsForm>
      </div>
    </DashboardShell>
  );
};
