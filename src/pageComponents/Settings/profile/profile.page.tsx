import { useServerTranslation } from "@/i18n";
import { DashboardHeader } from "../../Dashboard/molecules/Header";
import { DashboardShell } from "../../Dashboard/molecules/Shell";

export const ProfilePage = async () => {
  const { t } = await useServerTranslation();

  return (
    <DashboardShell className="flex-1">
      <DashboardHeader
        heading={t("dashboardSidenav.profile")}
        text={t("profilePage.headerDescription")}
      />
      <div className="flex justify-center ">
      </div>
    </DashboardShell>
  );
};