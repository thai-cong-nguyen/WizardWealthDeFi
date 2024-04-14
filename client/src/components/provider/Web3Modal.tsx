"use client";

import React, { ReactNode } from "react";

// Wagmi && Rainbowkit
import { wagmiConfig, projectId } from "@/config/Wagmi.config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

if (!projectId) throw new Error("Project ID is not defined");

export default function Web3ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="wide">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
