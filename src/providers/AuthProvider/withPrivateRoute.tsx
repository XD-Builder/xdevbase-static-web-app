"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/providers/AuthProvider/AuthProvider";

/**
 * 1. Renders the page only if the user is set.
 * 2. Listens to the user, router and loading change, if the user is not set
 * and the loading is done, then the user is redirected to the login page.
 */
export const withPrivateRoute = <T extends object>(
  WrappedComponent: React.FunctionComponent<T>,
) => {
  const ComponentWithPrivateRoute = (props: T) => {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
      if (!user && !isLoading) {
        router.push("/login");
      }
    }, [user, router, isLoading]);

    if (!user) return null;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoute;
};
