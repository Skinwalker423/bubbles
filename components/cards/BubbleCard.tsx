import Image from "next/image";
import Link from "next/link";
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
  currentUserId: string;
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
    <article className='flex flex-col w-full p-7 rounded-xl bg-dark-4'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link
              className='relative h-11 w-11'
              href={`/profile/${author.id}`}
            >
              <Image
                className='cursor-pointer'
                src={author.image}
                fill
                alt={`avatar for ${author.name}`}
                sizes={"100vh"}
              />
            </Link>

            <div className='thread-card_bar' />
          </div>
        </div>
      </div>

      <h2 className='text-small-regular text-light-2'>
        {content}
      </h2>
    </article>
  );
};

export default BubbleCard;
