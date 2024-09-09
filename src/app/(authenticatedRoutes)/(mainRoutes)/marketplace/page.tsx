import { Skeleton } from "@/components/ui/skeleton";
import { useServerTranslation } from "@/i18n";

export default async function Page() {
  const { t } = await useServerTranslation();

  return (
    <>
      <div className="flex w-full justify-center">
        <h1 className="text-3xl font-medium">{t("affiliates.comingSoon")}</h1>
      </div>
      <p>Marketplace</p>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
}
