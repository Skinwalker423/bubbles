import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const data = auth();

  const userId = data.userId;

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
      {userId ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>Sign In</Link>
      )}
    </nav>
  );
};

export default NavBar;
