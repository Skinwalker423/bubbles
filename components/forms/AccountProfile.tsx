"use client";

import React, { ChangeEvent } from "react";
import { UserDataProps } from "@/app/(auth)/onboarding/page";
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
import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";

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

  function onSubmit(
    values: z.infer<typeof UserValidation>
  ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function handleChangeImage(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start gap-10'
      >
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 '>
              <FormLabel className='account-form_image-label '>
                {field?.value ? (
                  <Image
                    className='rounded-full object-contain'
                    src={field.value}
                    width={96}
                    height={96}
                    alt={"profile photo"}
                    priority
                  />
                ) : (
                  <Image
                    className='object-contain '
                    src={"/assets/profile.svg"}
                    width={24}
                    height={24}
                    alt={"profile photo"}
                    priority
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200 border'>
                <Input
                  type='file'
                  accept='image/'
                  placeholder='upload a photo'
                  className='account-form_image-input'
                  onChange={(e) =>
                    handleChangeImage(e, field.onChange)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
