import React from "react";

interface ProfileProps {
  params: {
    id: string;
  };
}

const Profile = ({ params }: ProfileProps) => {
  console.log(params.id);
  return (
    <div>
      <h1 className='text-light-1'>Profile for...</h1>
    </div>
  );
};

export default Profile;
