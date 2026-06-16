"use client";

import { getActiveTemplate } from "@/templates";

export default function Home() {
  const ActivePage = getActiveTemplate();
  return <ActivePage />;
}
