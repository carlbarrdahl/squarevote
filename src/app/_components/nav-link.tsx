"use client";
import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { usePathname } from "next/navigation";

export function NavLink({
  icon,
  href,
  children,
}: ComponentProps<typeof Link> & { icon: ReactNode }) {
  const path = usePathname();
  const isActive = path === href;
  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-1 items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 sm:flex-none",
        {
          ["bg-gray-100"]: isActive,
        },
      )}
    >
      <span>{icon}</span>
      <span className="truncate">{children}</span>
    </Link>
  );
}
