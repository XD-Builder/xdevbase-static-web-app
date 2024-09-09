"use client";

import { DashboardNav } from "@/components/DashboardNav";
import { TranslatedText } from "@/components/TranslatedText";

const sidebarNavItems = [
  {
    title: <TranslatedText id="dashboardSidenav.profile" />,
    href: "/settings/profile",
    icon: "user",
  },
  {
    title: <TranslatedText id="dashboardSidenav.account" />,
    href: "/settings/account",
    icon: "cog",
  },
  {
    title: <TranslatedText id="dashboardSidenav.billing" />,
    href: "/settings/billing",
    icon: "billing",
  },
] as const;

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full flex-1 flex-col gap-4 md:flex-row">
        <aside className=" flex flex-col  md:w-[200px]">
          <DashboardNav items={sidebarNavItems} />
        </aside>
        {children}
      </div>
    </>
  );
}

export default RootLayout;
