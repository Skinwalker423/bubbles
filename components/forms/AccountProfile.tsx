"use client";

import React from "react";
import { UserDataProps } from "@/app/(auth)/onboarding/page";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";

interface AccountProfileProps {
  user: UserDataProps;
  btnTitle: string;
}

const AccountProfile = ({
  user,
  btnTitle,
}: AccountProfileProps) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: "",
    },
  });
  return <div>AccountProfile</div>;
};

export default AccountProfile;
