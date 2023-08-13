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
import { BubbleValidation } from "@/lib/validations/bubble";
import { createBubble } from "@/lib/actions/bubble.actions";
interface PostBubbleProps {
  userId: string;
}

const PostBubble = ({ userId }: PostBubbleProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(BubbleValidation),
    defaultValues: {
      bubble: "",
      accountId: userId,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof BubbleValidation>
  ) => {
    const bubbleData = {
      author: values.accountId,
      path: pathname,
      text: values.bubble,
      communityId: null,
    };
    await createBubble(bubbleData);

    router.push("/");
  };

  return (
    <Form {...form}>
      <h2 className='text-light-2'>Post Bubble</h2>
      <form
        className='flex flex-col justify-start gap-10 max-w-2xl mt-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='bubble'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bubble
              </FormLabel>
              <FormControl>
                <Textarea
                  className='account-form_input no-focus'
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          Create Bubble
        </Button>
      </form>
    </Form>
  );
};

export default PostBubble;
