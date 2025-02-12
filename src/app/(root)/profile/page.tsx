"use client";

import { Loader, ProfileForm } from "@/components/shared";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

export default function ProfilePage() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (!data?.user) {
    return notFound();
  }

  return <ProfileForm data={data?.user} />;
}
