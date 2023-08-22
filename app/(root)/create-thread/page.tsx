import React from "react";
import { redirect } from "next/navigation";

import PostBubble from "@/components/forms/PostBubble";
import { fetchCurrentUserAndUserProfile } from "@/lib/actions/user.actions";

const CreateThread = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  if (!user) return null;
  if (!userProfile?.onboarded)
    return redirect("/onboarding");

  return (
    <div>
      <h1 className='head-text'>Create Bubble</h1>
      <PostBubble userId={userProfile._id.toString()} />
    </div>
  );
};

export default CreateThread;
