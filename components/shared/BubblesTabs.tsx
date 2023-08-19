import { fetchUserPosts } from "@/lib/actions/user.actions";
import { CommentProps } from "@/lib/types";
import React from "react";
import BubbleCard from "../cards/BubbleCard";

interface BubblesTabsProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const BubblesTabs = async ({
  currentUserId,
  accountId,
  accountType,
}: BubblesTabsProps) => {
  const posts = await fetchUserPosts(accountId);

  const bubblesList = posts.bubbles.map(
    (bubble: CommentProps) => {
      const checkAuthor =
        accountType === "User"
          ? {
              name: posts.name,
              image: posts.image,
              id: posts.id,
            }
          : bubble.author;

      return (
        <BubbleCard
          key={bubble._id}
          id={bubble._id}
          currentUserId={currentUserId || ""}
          content={bubble.text}
          community={bubble.community}
          author={checkAuthor}
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
      <h3 className='text-light-1'>Bubbles</h3>
      <div className='flex flex-col gap-5'>
        {bubblesList}
      </div>
    </section>
  );
};

export default BubblesTabs;
