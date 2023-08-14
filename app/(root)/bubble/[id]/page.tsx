import BubbleCard from "@/components/cards/BubbleCard";
import React from "react";
import { fetchBubbleById } from "@/lib/actions/bubble.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import User from "@/lib/models/user.model";

interface BubbleProps {
  params: {
    id: string;
  };
}

const Bubble = async ({ params: { id } }: BubbleProps) => {
  const user = await currentUser();
  if (!user) return null;
  const userDb = await User.findOne({
    id: user?.id,
  });
  console.log("user data", userDb);
  if (!userDb?.onboarded) redirect("/onboarding");

  const post = await fetchBubbleById(id);

  if (!post) return null;
  const {
    _id,
    text,
    community,
    author,
    createdAt,
    children,
  } = post;

  return (
    <section>
      Post
      <div className='relative'>
        <BubbleCard
          key={_id.toString()}
          id={_id.toString()}
          currentUserId={user?.id || ""}
          content={text}
          community={community}
          author={author}
          createdAt={createdAt}
          comments={children}
          parentId={""}
        />
      </div>
    </section>
  );
};

export default Bubble;
