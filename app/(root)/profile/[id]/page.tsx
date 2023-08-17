import BubbleCard from "@/components/cards/BubbleCard";
import User from "@/lib/models/user.model";
import { connectToMongoDb } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { CommentProps } from "@/lib/types";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  console.log(params.id);
  connectToMongoDb();
  const user = await currentUser();
  if (!user) return null;
  // const currentUserProfile = await User.findById(user?.id);

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

  if (!userProfile.onboarded) redirect("/onboarding");

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
      <ProfileHeader
        accountId={userProfile.id}
        authUserId={user.id}
        bio={userProfile.bio}
        imgUrl={userProfile.image}
        name={userProfile.name}
        username={userProfile.username}
      />

      <div className='flex flex-col gap-5'>
        {userProfile.bubbles.length > 0 && bubblesList}
      </div>
    </section>
  );
};

export default Profile;
