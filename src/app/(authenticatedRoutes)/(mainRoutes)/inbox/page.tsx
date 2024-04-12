import { useServerTranslation } from "@/i18n";

export default async function Page() {
  const { t } = await useServerTranslation();

  return (
    <>
      <div className="flex w-full justify-center">
        <h1 className="text-3xl font-medium">{t("affiliates.comingSoon")}</h1>
      </div>
      <p>inbox</p>
    </>
  );
}
