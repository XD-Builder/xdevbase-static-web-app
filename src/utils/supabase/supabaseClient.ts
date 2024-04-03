import { createClient } from "@supabase/supabase-js";

import { type Database } from "./supabaseTypes";

import { env } from "@/env.mjs";

/**
 * Create a new Supabase client for the server.
 */
export const getServerSupabase = () =>
  createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

/**
 * Create a new Supabase client for the client.
 */
export const clientSupabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

/**
 * Get the Supabase client based on the environment. 
 */
export const supabase = () =>
  typeof window === "undefined" ? getServerSupabase() : clientSupabase;

/**
 * Get the user as an admin.
 * 
 * @param token user token
 * @returns user as an admin
 */
export const getUserAsAdmin = async (token: string) => {
  const { data, error } = await getServerSupabase().auth.getUser(token);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
