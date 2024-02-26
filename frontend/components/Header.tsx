"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConnectWallet } from "./ConnectWallet";
import { useAccountInfo, useParticleConnect } from "@particle-network/connect-react-ui";
import "@particle-network/connect-react-ui/dist/index.css";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/home",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Proposals Made",
    href: "/proposals-made",
    icon: <EnvelopeIcon className="h-4 w-4" />,
  },
  {
    label: "Proposals Received",
    href: "/proposals-received",
    icon: <EnvelopeOpenIcon className="h-4 w-4" />,
  },
  {
    label: "Creator Profile",
    href: "/creator-profile",
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    label: "Advertiser Profile",
    href: "/advertiser-profile",
    icon: <UserIcon className="h-4 w-4" />,
  },
];

const logoutLink = {
  label: "Logout",
  icon: <ArrowLeftOnRectangleIcon className="h-4 w-4" />,
};

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  const userToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userType = userToken ? JSON.parse(atob(userToken)).type : null;

  const filteredLinks = menuLinks.filter(link => {
    if (userType === "creator") {
      return ["/home", "/creator-profile", "/proposals-received", "/"].includes(link.href);
    } else if (userType === "advertiser") {
      return ["/home", "/advertiser-profile", "/proposals-made", "/"].includes(link.href);
    }
    return false;
  });

  return (
    <>
      {filteredLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    // Add any other cleanup logic if needed

    // Redirect to the root of the app
    disconnect();
    router.push("/");
  };

  // const connectKit = useConnectKit();
  // const userInfo = connectKit?.particle?.auth.getUserInfo();

  const { disconnect } = useParticleConnect();
  const { account } = useAccountInfo();

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/home" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="MAC logo" className="cursor-pointer" fill src="/favicon.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Avalanche MAC</span>
            <span className="text-xs">Marketplace for Advertisers and Creators</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <ConnectWallet />
        {account && (
          <button className="ml-2 btn btn-ghost" onClick={handleLogout} title="Disconnect">
            {logoutLink.icon}
            <span>{logoutLink.label}</span>
          </button>
        )}
      </div>
    </div>
  );
};
