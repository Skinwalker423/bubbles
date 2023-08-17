import Image from "next/image";
import React from "react";

interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  bio,
  imgUrl,
  name,
  username,
}: ProfileHeaderProps) => {
  return (
    <div className='flex w-full flex-col justify-start gap-3 mb-10'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              fill
              alt={"user profile avatar"}
              className='rounded-full'
            />
          </div>
          <div className='flex-1'>
            <h1 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h1>
            <p className='text-base-medium text-gray-1'>
              @{username}
            </p>
          </div>
        </div>
      </div>
      <p className='text-light-2 max-w-lg text-base-regular'>
        {bio}
      </p>
      <div className='w-full h-0.5 mt-12 bg-dark-3' />
    </div>
  );
};

export default ProfileHeader;
