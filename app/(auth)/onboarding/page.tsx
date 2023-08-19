import React from "react";
import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import User from "@/lib/models/user.model";
import { redirect } from "next/navigation";
import { UserDataProps } from "@/lib/types";

const Onboarding = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInDb = await User.findOne({
    id: user?.id,
  });

  if (userInDb?.onboarded) {
    redirect("/");
  }

  const userInfo = {
    _id: "",
    username: "",
    name: "",
    bio: "",
    image: user?.imageUrl,
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
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text text-dark-2'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-4'>
        Complete your profile now, to use Bubbles.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile
          user={userData}
          btnTitle='Continue'
        />
      </section>
    </main>
  );
};

export default Onboarding;
