import React from "react";

interface PostBubbleProps {
  userId: string;
}

const PostBubble = ({ userId }: PostBubbleProps) => {
  return (
    <form action=''>
      <h2 className='text-light-2'>Post Bubble</h2>
    </form>
  );
};

export default PostBubble;
