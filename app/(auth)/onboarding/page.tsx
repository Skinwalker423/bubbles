import React from "react";
import { UserButton } from "@clerk/nextjs";
import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export interface UserDataProps {
  id?: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  objectId: string;
}

const Onboarding = async () => {
  const user = await currentUser();

  // interface UserInfoProps {
  //   _id: string;
  //   username: string;
  //   name: string;
  //   bio: string;
  //   image: string;
  // }

  const userInfo = {
    _id: "",
    username: "",
    name: "",
    bio: "",
    image: "",
  };

  const userData: UserDataProps = {
    id: user?.id,
    objectId: userInfo?._id,
    username: user?.username || userInfo.username,
    name: user?.lastName || userInfo.name || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",
  };

  return (
    <main className='mx-auto max-w-3xl flex flex-col justify-start px-10 py-20 border '>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile to use Bubbles
      </p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile
          user={userData}
          btnTitle={"Continue"}
        />
      </section>
    </main>
  );
};

export default Onboarding;
