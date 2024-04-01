import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export const getServerUser = async () => {
  const ckies = cookies();
  const mappedCookies = new Map(ckies);
  const accessToken = mappedCookies.get("access-token")?.value;
  const refreshToken = mappedCookies.get("refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return {
      user: null,
      session: null,
    };
  }

  const { error, data } = await createClient().auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    return {
      user: null,
      session: null,
    };
  }

  return data;
};
