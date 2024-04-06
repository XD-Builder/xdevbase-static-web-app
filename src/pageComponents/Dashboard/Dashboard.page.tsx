"use client";
import { api } from "@/trpc/react";

export function DashboardPage() {
  const response = api.example.hello.useQuery({ text: "world" });

  return <p>Response from TRPC: {response.data?.greeting}</p>
}
