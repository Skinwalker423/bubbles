"use client";

import React, { FormEvent } from "react";
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
import {
  BubbleValidation,
  CommentValidation,
} from "@/lib/validations/bubble";
import { createBubble } from "@/lib/actions/bubble.actions";
import Image from "next/image";

interface CommentProps {
  bubbleId: string;
  currentUserImg: string;
}

const Comment = ({
  bubbleId,
  currentUserImg,
}: CommentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CommentValidation>
  ) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <h2 className='text-light-2'>Comment</h2>
      <form
        className='flex justify-between items-center gap-10 max-w-3xl mt-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between w-full gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                <Image
                  src={currentUserImg}
                  width={24}
                  height={24}
                  alt={"user avatar"}
                />
              </FormLabel>
              <FormControl>
                <Textarea
                  className='account-form_input no-focus'
                  rows={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='bg-primary-500 rounded-full'
        >
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
