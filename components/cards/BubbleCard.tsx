import Image from "next/image";
import React from "react";

interface BubbleCardProps {
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  comments: {
    author: {
      image: string;
    };
  };
  id: string;
  community: {
    image: string;
    name: string;
    id: string;
  };
  createdAt: Date;
  parentId: string | null;
  currentUserId?: string;
  isComment?: boolean;
}

const BubbleCard = ({
  content,
  author,
  createdAt,
  comments,
  parentId,
  id,
  community,
  currentUserId,
}: BubbleCardProps) => {
  return (
    <div className=' rounded-lg bg-dark-4'>
      <h2 className='flex items-center gap-2'>
        <Image
          className='rounded-full'
          src={author.image}
          width={50}
          height={50}
          alt={`avatar for ${author.name}`}
        />
        <span className='text-light-1'>
          created by: {author.name}
        </span>{" "}
      </h2>
      <p className='text-light-1'>{content}</p>
    </div>
  );
};

export default BubbleCard;
