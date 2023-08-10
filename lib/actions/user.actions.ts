"use server";

import { connectToMongoDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface UpdatedUserDataProps {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export const updateUser = async (
  updatedUserData: UpdatedUserDataProps
): Promise<void> => {
  connectToMongoDb();
  const { bio, image, name, path, userId, username } =
    updatedUserData;
  try {
    const newUser = await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        path,
        image,
      },
      {
        upsert: true,
      }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(
      `Failed to create/update user: ${error}`
    );
  }
};
