"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { LoadingScreen } from "@/components/Loading";
import { useUser } from "@/providers/AuthProvider/AuthProvider";

/**
 * If a user is already logged in, redirect to the home page.
 */
export const withPublicRoute = <T extends object>(
  WrappedComponent: React.FunctionComponent<T>
) => {
  const ComponentwithPublicRoute = (props: T) => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const isUserDataLoaded = !isLoading;

    useEffect(() => {
      if (user && isUserDataLoaded) {
        router.push("/");
      }
    }, [user, isUserDataLoaded, router]);

    // if the user is not set and the data is not loaded, show the loading screen
    if (user ?? !isUserDataLoaded) return <LoadingScreen />;

    return <WrappedComponent {...props} />;
  };

  return ComponentwithPublicRoute;
};
