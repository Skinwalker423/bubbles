import React from "react";

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
  return <div>UserCard</div>;
};

export default UserCard;
