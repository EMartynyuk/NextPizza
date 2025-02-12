"use client";

import { queryClient } from "@/lib/tanstack/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen />
        <Toaster />
        <NextTopLoader />
      </QueryClientProvider>
    </SessionProvider>
  );
};
