import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({
  id,
  imgUrl,
  name,
  personType,
  username,
}: UserCardProps) => {
  return (
    <article className='user-card w-full bg-dark-4 px-4 py-2 rounded-lg'>
      <div className='user-card_avatar'>
        <Image
          src={imgUrl}
          width={48}
          height={48}
          className='rounded-full'
          alt={`avatar image for ${username}`}
        />
        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>
            {name}
          </h4>
          <p className='text-small-medium text-gray-1'>
            {username}
          </p>
        </div>
      </div>
      <Link
        href={`/${
          personType === "User" ? "profile" : "communities"
        }/${id}`}
      >
        <Button className='user-card_btn'>
          View Profile
        </Button>
      </Link>
    </article>
  );
};

export default UserCard;
