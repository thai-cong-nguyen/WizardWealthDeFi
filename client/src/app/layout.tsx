import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// Components
import Header from "@/components/Header";
// Provider
import Providers from "./providers";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wizard Wealth",
  description: "Wizard Wealth Dapps in Ethereum Goerli Testnet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Providers>
            <Header />
            <main>{children}</main>
            <Toaster duration={Infinity} />
            {/* <Footer /> */}
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
