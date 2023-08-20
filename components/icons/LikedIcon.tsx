"use client";

import Image from "next/image";
import { useState } from "react";

const LikedIcon = ({
  liked,
  handleOnClick,
  userId,
  bubbleId,
}: {
  liked: boolean;
  userId: string;
  bubbleId: string;
  handleOnClick: (
    userId: string,
    bubbleId: string
  ) => Promise<any>;
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  return (
    <button
      type='button'
      onClick={() => {
        handleOnClick(userId, bubbleId);
        setIsLiked((bool) => !bool);
      }}
    >
      {isLiked ? (
        <Image
          src={"/assets/heart-filled.svg"}
          width={24}
          height={24}
          alt={"like bubble"}
        />
      ) : (
        <Image
          src={"/assets/heart.svg"}
          width={24}
          height={24}
          alt={"like bubble"}
        />
      )}
    </button>
  );
};

export default LikedIcon;
