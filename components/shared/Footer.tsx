"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

const Footer = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map(({ imgURL, label, route }) => {
          const isActive =
            route === path ||
            (path.includes(route) && route.length > 1);
          return (
            <Link
              key={label}
              className={`bottombar_link group relative ${
                isActive && "bg-primary-500"
              }`}
              href={route}
            >
              <Image
                src={imgURL}
                alt={label}
                width={24}
                height={2}
              />

              <p className='text-light-1 text-subtle-medium max-sm:hidden text-center truncate w-[76px]'>
                {label}
              </p>
              <span
                className='lg:hidden group-hover:opacity-100 transition-opacity bg-light-1 px-1 text-[12px] text-dark-1 rounded-md absolute bottom-14 left-1/2 
                -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto truncate'
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Footer;
