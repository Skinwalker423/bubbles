import React from "react";
import {
  fetchCurrentUserAndUserProfile,
  getActivity,
} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import BubbleCard from "@/components/cards/BubbleCard";

const Activity = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  const replies = await getActivity(userProfile._id);

  const activityList = replies.map((bubble) => {
    const isBubbleLiked: boolean =
      userProfile?.likes.includes(bubble._id.toString());
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
        liked={isBubbleLiked}
      />
    );
  });

  return (
    <section>
      <h1 className='text-light-1'>Activity</h1>;
      <li>{activityList}</li>
    </section>
  );
};

export default Activity;
