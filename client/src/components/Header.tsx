"use client";
import React, { useEffect, useState } from "react";

// Components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ThemeToggler from "./ThemeToggler";
import { usePathname } from "next/navigation";
import SelectedChain from "./SelectedChain";
import ConnectWallet from "./wallet/ConnectWallet";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const scrollEvent: EventListener = (event: Event) => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    };
    window.addEventListener("scroll", scrollEvent);
    // Remove Event
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  return (
    <header
      className={`${
        header ? "py-4 shadow-lg" : "py-6"
      } top-0 z-30 transition-all sticky bg-navbar bg-opacity-100 bg-center bg-no-repeat	bg-cover`}
    >
      <div className="absolute inset-0 bg-white bg-opacity-75 "></div>
      <div className="container mx-auto relative">
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-5">
            <Avatar>
              <AvatarImage src="/logo.jpg" />
            </Avatar>
            {/* nav */}
            <Nav
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative transition-all"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
          </div>

          <div className="flex justify-center items-center space-x-10">
            {/* <ThemeToggler /> */}
            {/* Connect Wallet */}
            <ConnectWallet />
            {/* mobile Nav */}
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
