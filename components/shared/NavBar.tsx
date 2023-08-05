import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const data = auth();

  const userId = data.userId;

  return (
    <nav className='topbar'>
      <Link href={"/"}>
        <Image
          src={"/assets/logo.svg"}
          alt='Bubbles logo'
          width={60}
          height={60}
        />
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
