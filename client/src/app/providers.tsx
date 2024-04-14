"use client";
import React from "react";

// Theme Provider
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import Web3ModalProvider from "@/components/provider/Web3Modal";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Web3ModalProvider>{children}</Web3ModalProvider>
    </ThemeProvider>
  );
};

export default Providers;
