import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const LeftSideBar = () => {
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map(({ imgURL, label, route }) => {
          return (
            <Link
              key={label}
              className='leftsidebar_link group relative'
              href={route}
            >
              <Image
                src={imgURL}
                alt={label}
                width={24}
                height={2}
              />

              <p className='text-light-1 max-lg:hidden'>
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

export default LeftSideBar;
