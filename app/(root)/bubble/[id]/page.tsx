import BubbleCard from "@/components/cards/BubbleCard";
import React from "react";
import { fetchBubbleById } from "@/lib/actions/bubble.actions";
import { currentUser } from "@clerk/nextjs";

interface BubbleProps {
  params: {
    id: string;
  };
}

const Bubble = async ({ params: { id } }: BubbleProps) => {
  const post = await fetchBubbleById(id);
  const user = await currentUser();
  if (!post) throw new Error("no bubble found");
  const {
    _id,
    text,
    community,
    author,
    createdAt,
    children,
  } = post;
  console.log("this is post", post);
  console.log(post._id);
  return (
    <section>
      Post
      <div>
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
