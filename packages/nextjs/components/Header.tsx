import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

interface HeaderMenuLink {
  label: string;
  href: string;
}

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Outgoing",
    href: "/outgoing",
  },
  {
    label: "Incoming",
    href: "/incoming",
  },
];

export const HeaderMenuLinks = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
  const router = useRouter();

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = router.pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                // TODO: Remove default hover from Link component
                isDrawerOpen
                  ? // Drawer open - mobile view
                    isActive
                    ? "hover:text-neutral-content text-neutral-content underline decoration-neutral"
                    : "hover:text-neutral text-neutral decoration-neutral"
                  : // Drawer closed - desktop view
                  isActive
                  ? "text-secondary"
                  : "text-accent"
              }  hover:underline decoration-secondary px-3 text-lg rounded-full gap-2 grid grid-flow-col`}
            >
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { address } = useGlobalState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky rounded-b-xl bg-[#28112B] lg:static top-0 navbar flex-shrink-0 justify-between z-10 px-0 sm:px-2 box-border p-5">
      <div className="navbar-start w-auto lg:w-1/4 box-border">
        {address && (
          <div className="lg:hidden dropdown" ref={burgerMenuRef}>
            <label
              tabIndex={0}
              className={`ml-1 btn btn-ghost`}
              onClick={() => {
                setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
              }}
            >
              <Bars3Icon className="h-1/2 stroke-accent" />
            </label>
            {isDrawerOpen && (
              // TODO: Fix colors of links in the drawer
              <ul
                tabIndex={0}
                className="text-neutral-content menu menu-compact dropdown-content mt-3 shadow rounded-box w-52"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              >
                <HeaderMenuLinks isDrawerOpen={isDrawerOpen} />
              </ul>
            )}
          </div>
        )}
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-8 shrink-0">
          <div className="text-3xl font-bold text-[#CD98C4]">Adora.Promo</div>
        </Link>
      </div>
      <div className="navbar-end justify-end mr-4 lg:w-2/3">
        {address && (
          <ul className="hidden lg:flex lg:flex-nowrap lg:justify-end menu-horizontal px-1">
            <HeaderMenuLinks isDrawerOpen={false} />
          </ul>
        )}
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
