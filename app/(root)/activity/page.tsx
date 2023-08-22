import React from "react";
import { fetchCurrentUserAndUserProfile } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Activity = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  return (
    <section>
      <h1 className='text-light-1'>Activity</h1>;
    </section>
  );
};

export default Activity;
