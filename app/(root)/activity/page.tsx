import React from "react";
import {
  fetchCurrentUserAndUserProfile,
  getActivity,
} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Activity = async () => {
  const { user, userProfile } =
    await fetchCurrentUserAndUserProfile();
  if (!user) return null;
  if (!userProfile.onboarded) redirect("/onboarding");

  const replies = await getActivity(userProfile._id);

  const activityList = replies.map((comment) => {
    const isBubbleLiked: boolean =
      userProfile?.likes.includes(comment._id.toString());
    return (
      <Link href={`/bubble/${comment.parentId}`}>
        <article className='activity-card'>
          <Image
            src={comment.author.image}
            alt={`profile image of ${comment.author.name}`}
            width={20}
            height={20}
            className='object-cover rounded-full'
          />
          <p className='!text-small-regular text-light-1'>
            <span className='mr-1 text-primary-500'>
              {comment.author.name}
            </span>{" "}
            replied to your bubble
          </p>
        </article>
      </Link>
    );
  });

  return (
    <section>
      <h1 className='text-light-1'>Activity</h1>;
      <section className='mt-10 flex flex-col gap-5'>
        {activityList.length > 0 ? (
          activityList
        ) : (
          <p className='!text-base-regular text-light-3'>
            No Recent Activity
          </p>
        )}
      </section>
    </section>
  );
};

export default Activity;
