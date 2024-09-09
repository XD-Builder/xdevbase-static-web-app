import { useServerTranslation } from "@/i18n";
import { DashboardHeader } from "@/pageComponents/Dashboard/molecules/Header";
import { DashboardShell } from "@/pageComponents/Dashboard/molecules/Shell";

import { ProfileSettingsForm } from "./molecules/ProfileSettingsForm";

export const ProfilePage = async () => {
  const { t } = await useServerTranslation();

  return (
    <DashboardShell className="flex-1">
      <DashboardHeader
        heading={t("dashboardSidenav.profile")}
        text={t("profilePage.headerDescription")}
      />
      <div className="flex justify-center">
        <ProfileSettingsForm />
      </div>
    </DashboardShell>
  );
};
