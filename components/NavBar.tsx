import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  const data = auth();

  const userId = data.userId;

  return (
    <nav className='flex justify-between items-center w-full py-3 px-10 bg-slate-200'>
      <div>Logo</div>
      {userId ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>Sign In</Link>
      )}
    </nav>
  );
};

export default NavBar;
