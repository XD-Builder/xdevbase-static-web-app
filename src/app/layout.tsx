import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { detectLanguage, useServerTranslation } from "@/i18n";
import "./globals.css";
import { getServerUser } from "@/utils/auth";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/TailwindIndicator";

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useServerTranslation();

  return {
    title: t("globalMetadata.title"),
    description: t("globalMetadata.description"),
    keywords: (t("globalMetadata.keywords") as string).split(","),
    category: "home & rental management solution",
    metadataBase: new URL("https://www.xdevbase.com/"),
    openGraph: {
      type: "website",
      locale: t("globalMetadata.openGraph.locale"),
      title: t("globalMetadata.openGraph.title"),
      url: "https://www.xdevbase.com/",
      description: t("globalMetadata.openGraph.description"),
      siteName: t("globalMetadata.openGraph.siteName"),
    },
    robots: {
      follow: true,
      index: true,
    },
    twitter: {
      card: "summary_large_image",
      title: t("globalMetadata.twitter.title"),
      description: t("globalMetadata.twitter.description"),
      site: "@xdevbaseva",
    },
  } satisfies Metadata;
}

/**
 * The root layout component for the application.
 * This component wraps several key providers to the children components. These include:
 * {@link AuthProvider} sets and manages the state for the current user.
 * {@link Providers} configures {@link I18NextProvider} for setting up the initial language 
 * using browser language detection, {@link ThemeProvider} for setting up the theme and its 
 * useTheme hook, and {@link AnalyticsProvider} for setting up the analytics provider.
 * {@link Toaster} for creating useToast hook and displaying and dismissing toast messages.
 * and {@link TailwindIndicator} to indicate tailwind is working and the screen size mapped.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLanguage = detectLanguage(); 
  const user = await getServerUser();

  return (
      <html lang={initialLanguage} suppressHydrationWarning={true}>
        <head />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            font.className,
          )}
        >
            <AuthProvider {...user}>
              <Providers initialLanguage={initialLanguage}>
                <div className="flex min-h-screen flex-col gap-6">
                  {children}
                  <TailwindIndicator />
                </div>
                <Toaster />
              </Providers>
            </AuthProvider>
        </body>
      </html>
  );
}
