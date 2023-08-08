import React from "react";
import { UserDataProps } from "@/app/(auth)/onboarding/page";

interface AccountProfileProps {
  user: UserDataProps;
  btnTitle: string;
}

const AccountProfile = ({
  user,
  btnTitle,
}: AccountProfileProps) => {
  return <div>AccountProfile</div>;
};

export default AccountProfile;
