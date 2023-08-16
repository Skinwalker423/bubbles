import BubbleCard from "@/components/cards/BubbleCard";
import React from "react";
import { fetchBubbleById } from "@/lib/actions/bubble.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import User from "@/lib/models/user.model";
import Comment from "@/components/forms/Comment";
import { BubbleCardProps } from "@/components/cards/BubbleCard";

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
    parentId,
  } = post;

  console.log("these are the comments", children);

  const commentsList = children.map(
    (comment: {
      _id: string;
      text: string;
      path: string;
      author: {
        id: string;
        image: string;
        name: string;
      };
      createdAt: Date;
      parentId: string;
      children: [];
      community: {
        image: string;
        name: string;
        id: string;
      };
    }) => {
      return (
        <BubbleCard
          key={comment._id}
          id={comment._id}
          currentUserId={user?.id || ""}
          content={comment.text}
          community={comment.community}
          author={comment.author}
          createdAt={comment.createdAt}
          comments={comment.children}
          parentId={comment.parentId || ""}
          isComment={true}
        />
      );
    }
  );

  return (
    <section>
      Post
      <div className='relative'>
        <BubbleCard
          key={_id}
          id={_id}
          currentUserId={user?.id || ""}
          content={text}
          community={community}
          author={author}
          createdAt={createdAt}
          comments={children}
          parentId={parentId || ""}
        />
      </div>
      <div>{children.length > 0 && commentsList}</div>
      <div className='mt-7'>
        <Comment
          bubbleId={_id.toString()}
          currentUserImg={user.imageUrl}
          currentUserId={userDb._id.toString()}
        />
      </div>
    </section>
  );
};

export default Bubble;
