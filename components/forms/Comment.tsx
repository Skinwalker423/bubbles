"use client";

import React, { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as z from "zod";
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
import { CommentValidation } from "@/lib/validations/bubble";
import { addCommentToBubble } from "@/lib/actions/bubble.actions";
import Image from "next/image";

interface CommentProps {
  bubbleId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({
  bubbleId,
  currentUserImg,
  currentUserId,
}: CommentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      bubble: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CommentValidation>
  ) => {
    console.log("testing", values);
    const newComment = await addCommentToBubble(
      bubbleId,
      values.bubble,
      currentUserId,
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className='flex justify-between items-center gap-5 w-full mt-10 border-t-2 border-b-2 py-7 border-y-dark-2'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='bubble'
          render={({ field }) => (
            <FormItem className='flex items-center w-full gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg || "/assets/user.svg"}
                  width={48}
                  height={48}
                  alt={"user avatar"}
                  className={`rounded-full object-cover ${
                    !currentUserImg && "border"
                  }`}
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  className=' text-light-1 no-focus outline-none'
                  placeholder='Comment...'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
