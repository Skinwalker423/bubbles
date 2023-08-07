import React from "react";
import { UserButton } from "@clerk/nextjs";

const Onboarding = () => {
  return (
    <main className='mx-auto max-w-3xl flex flex-col justify-start px-10 py-20 border '>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile to use Bubbles
      </p>
      <UserButton />
    </main>
  );
};

export default Onboarding;
