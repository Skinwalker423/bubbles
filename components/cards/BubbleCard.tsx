import Image from "next/image";
import React from "react";

interface BubbleCardProps {
  bubble: Omit<Omit<any, never>, never>;
}

const BubbleCard = ({ bubble }: BubbleCardProps) => {
  return (
    <div className=' rounded-lg bg-dark-4'>
      <h2 className='flex items-center gap-2'>
        <Image
          className='rounded-full'
          src={bubble.author.image}
          width={50}
          height={50}
          alt={`avatar for ${bubble.author.username}`}
        />
        <span className='text-light-1'>
          created by: {bubble.author.username}
        </span>{" "}
      </h2>
      <p className='text-light-1'>{bubble.text}</p>
    </div>
  );
};

export default BubbleCard;
