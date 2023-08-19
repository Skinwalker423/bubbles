import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import User from "@/lib/models/user.model";
import { connectToMongoDb } from "@/lib/mongoose";
import PostBubble from "@/components/forms/PostBubble";

const CreateThread = async () => {
  await connectToMongoDb();
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await User.findOne({
    id: user.id,
  });

  if (!userInfo?.onboarded) return redirect("/onboarding");

  return (
    <div>
      <h1 className='head-text'>Create Bubble</h1>
      <PostBubble userId={userInfo._id.toString()} />
    </div>
  );
};

export default CreateThread;
