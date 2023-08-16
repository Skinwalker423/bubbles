import Image from "next/image";
import Link from "next/link";
// import React, { useState } from "react";

export interface BubbleCardProps {
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
  }[];
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
  isComment,
}: BubbleCardProps) => {
  // const [liked, setLiked] = useState(false);
  return (
    <article
      className={`flex flex-col w-full p-7 rounded-xl ${
        isComment ? "bg-transparent" : "bg-dark-4"
      } `}
    >
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

          <div className='flex w-full flex-col'>
            <Link
              className='w-fit'
              href={`/profile/${author.id}`}
            >
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author.name}
              </h4>
            </Link>
            <p className='text-small-regular text-light-2'>
              {content}
            </p>

            <div className='mt-5 flex flex-col gap-3'>
              <div className='flex gap-3 5'>
                <Image
                  src={"/assets/heart.svg"}
                  width={24}
                  height={24}
                  alt={"like bubble"}
                />
                <Link href={`/bubble/${id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    width={24}
                    height={24}
                    alt={"reply to bubble"}
                  />
                </Link>
                <Image
                  src={"/assets/repost.svg"}
                  width={24}
                  height={24}
                  alt={"repost bubble"}
                />

                <Image
                  src={"/assets/share.svg"}
                  width={24}
                  height={24}
                  alt={"share bubble"}
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/bubble/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BubbleCard;
