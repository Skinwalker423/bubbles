"use client";

import React from "react";
import { UserDataProps } from "@/app/(auth)/onboarding/page";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
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
import { useRouter, usePathname } from "next/navigation";
import { BubbleValidation } from "@/lib/validations/bubble";
interface PostBubbleProps {
  userId: string;
}

const PostBubble = ({ userId }: PostBubbleProps) => {
  const form = useForm({
    resolver: zodResolver(BubbleValidation),
    defaultValues: {
      title: "test",
      bubble: "",
      accountId: userId,
    },
  });
  return (
    <Form {...form}>
      <h2 className='text-light-2'>Post Bubble</h2>
    </Form>
  );
};

export default PostBubble;
