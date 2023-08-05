import React from "react";
import { UserButton } from "@clerk/nextjs";

const Onboarding = () => {
  return (
    <div className='text-white'>
      Onboarding
      <UserButton />
    </div>
  );
};

export default Onboarding;
