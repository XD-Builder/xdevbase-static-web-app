"use client";

import LoadingDots from "@/components/icons-bak/loading-dots";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as SocialIcons from "@/components/auth/icons";
import { useToast } from "@/components/ui/use-toast";

type Provider = "github" | "google" | "facebook" | "twitter";

export default function LoginButton({provider}: {provider: Provider}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast({variant: "destructive", title: "Something went wrong.", description: errorMessage});
  }, [error, toast]);
  const AuthIcon = SocialIcons[provider];

  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
      }}
      className={`${
        loading
          ? "my-0 cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "my-0 bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      } group flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
    >
      {loading ? <LoadingDots color="#A8A29E" /> : <AuthIcon />}
    </button>
  );
}
