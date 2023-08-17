import BubbleCard from "@/components/cards/BubbleCard";
import User from "@/lib/models/user.model";
import { connectToMongoDb } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { CommentProps } from "@/lib/types";
import { redirect } from "next/navigation";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  console.log(params.id);
  connectToMongoDb();
  const user = await currentUser();
  const currentUserProfile = await User.findById(user?.id);

  if (!currentUserProfile.onboarded)
    redirect("/onboarding");

  const userProfile = await User.findOne({
    id: params.id,
  }).populate({
    path: "bubbles",
    model: "Bubble",
    populate: {
      path: "author",
      model: "User",
    },
  });

  if (!userProfile) {
    throw new Error("no user found");
  }

  console.log(userProfile.bubbles);
  const bubblesList = userProfile.bubbles.map(
    (bubble: CommentProps) => {
      return (
        <BubbleCard
          key={bubble._id}
          id={bubble._id}
          currentUserId={user?.id || ""}
          content={bubble.text}
          community={bubble.community}
          author={bubble.author}
          createdAt={bubble.createdAt}
          comments={bubble.children}
          parentId={bubble.parentId || ""}
          isComment={false}
        />
      );
    }
  );

  return (
    <section>
      <h1 className='text-light-1'>
        Profile for {userProfile.username}
      </h1>
      <p className='text-light-1'>{userProfile.bio}</p>
      <div className='flex flex-col gap-5'>
        {userProfile.bubbles.length > 0 && bubblesList}
      </div>
    </section>
  );
};

export default Profile;
