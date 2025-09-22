"use client";

import { usePathname } from "next/navigation";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { Toaster } from "react-hot-toast";

export default function LayoutVisibility({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isQuizPage = pathname.startsWith("/quiz/");
  const isAuthPage = pathname.startsWith("/auth/");

  if (isQuizPage || isAuthPage) {
    return (
      <>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </>
    );
  }

  return (
    <HydrogenLayout>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </HydrogenLayout>
  );
}
