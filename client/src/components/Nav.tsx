import React, { useEffect } from "react";
import Link from "next/link";
// NextJs Hooks
import { usePathname } from "next/navigation";
// Framer motion
import { motion } from "framer-motion";

const links = [
  { path: "/", name: "Dashboard" },
  { path: "/swap", name: "Swap" },
  { path: "/staking", name: "Stake" },
  { path: "/borrowing", name: "Borrow" },
  { path: "/governance", name: "Governance" },
];

const getParentPath = (path: string) => {
  const arrayNamePath = path.split("/");
  return `/${arrayNamePath[1]}`;
};

const Nav = ({
  containerStyles,
  linkStyles,
  underlineStyles,
}: {
  containerStyles: any;
  linkStyles: any;
  underlineStyles: any;
}) => {
  const path = usePathname();
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${`capitalize ${linkStyles}`} ${
              getParentPath(path!) === link.path
                ? `font-bold`
                : "hover:text-blue hover:font-bold"
            }`}
          >
            {getParentPath(path!) === link.path && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`${underlineStyles}`}
              />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
