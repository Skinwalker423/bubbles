import React, { use } from "react";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignOutButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";

const NavBar = () => {
  const data = auth();

  const userId = data.userId;
  console.log(userId);

  return (
    <nav className='topbar'>
      <Link className='flex items-center gap-4' href={"/"}>
        <Image
          src={"/assets/bubbles2.png"}
          alt='Bubbles logo'
          width={60}
          height={60}
        />
        <span className='text-light-1 text-heading3-bold max-xs:hidden'>
          Bubbles
        </span>
      </Link>
      <div className='flex items-center gap-1'>
        {!userId && (
          <Link className='text-light-1' href={"/sign-in"}>
            Sign In
          </Link>
        )}
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                  src={"/assets/logout.svg"}
                  alt='logout icon'
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "py-2 px-4 text-white",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
