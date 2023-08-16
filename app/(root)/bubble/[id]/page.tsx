import BubbleCard from "@/components/cards/BubbleCard";
import React from "react";
import { fetchBubbleById } from "@/lib/actions/bubble.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import User from "@/lib/models/user.model";
import Comment from "@/components/forms/Comment";
import { CommentProps } from "@/lib/types";

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
  console.log("user in db", userDb);

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
    (comment: CommentProps) => {
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
          isComment={false}
        />
      </div>
      <div className='mt-7'>
        <Comment
          bubbleId={_id.toString()}
          currentUserImg={userDb.image}
          currentUserId={userDb._id.toString()}
        />
      </div>
      <div className='mt-10 px-7'>
        {children.length > 0 && commentsList}
      </div>
    </section>
  );
};

export default Bubble;
