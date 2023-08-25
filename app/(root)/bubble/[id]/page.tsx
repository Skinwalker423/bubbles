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

  const isBubbleLiked: boolean = userDb?.likes.includes(
    _id.toString()
  );

  const commentsList = children.map(
    (comment: CommentProps) => {
      const isCommentLiked = userDb?.likes.includes(
        comment._id.toString()
      );

      return (
        <BubbleCard
          key={comment._id.toString()}
          id={comment._id.toString()}
          currentUserId={user?.id || ""}
          content={comment.text}
          community={comment.community}
          author={comment.author}
          createdAt={comment.createdAt}
          comments={comment.children}
          parentId={comment.parentId.toString() || ""}
          isComment={true}
          liked={isCommentLiked}
        />
      );
    }
  );

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
          parentId={parentId || ""}
          liked={isBubbleLiked}
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
